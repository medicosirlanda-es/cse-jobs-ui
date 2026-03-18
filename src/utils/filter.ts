import type { JobListItem, SortOption, ContractDuration } from '../types'
import { CONTRACT_TYPE_TO_DURATION } from '../constants/contracts'

export interface JobFiltersState {
  categories: string[]
  specialties: string[]
  counties: string[]
  duration: ContractDuration[]
  sort: SortOption
}

export const DEFAULT_FILTERS: JobFiltersState = {
  categories: [],
  specialties: [],
  counties: [],
  duration: [],
  sort: 'newest',
}

export function filterJobs(
  jobs: JobListItem[],
  filters: Partial<JobFiltersState>
): JobListItem[] {
  let filtered = [...jobs]

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(job =>
      filters.categories!.includes(job.category)
    )
  }

  if (filters.specialties && filters.specialties.length > 0) {
    filtered = filtered.filter(job => {
      if (job.specialties && job.specialties.length > 0) {
        const jobSpecialtiesLower = job.specialties.map(s => s.toLowerCase())
        return filters.specialties!.some(spec => {
          const specLower = spec.toLowerCase()
          return jobSpecialtiesLower.some(jobSpec =>
            jobSpec === specLower ||
            jobSpec.includes(specLower) ||
            specLower.includes(jobSpec)
          )
        })
      }
      const titleLower = job.title.toLowerCase()
      return filters.specialties!.some(spec => {
        const searchTerms = spec.replace(/-/g, ' ').toLowerCase()
        return titleLower.includes(searchTerms)
      })
    })
  }

  if (filters.counties && filters.counties.length > 0) {
    const countiesLower = filters.counties.map(c => c.toLowerCase())
    filtered = filtered.filter(job =>
      countiesLower.includes(job.county.toLowerCase())
    )
  }

  if (filters.duration && filters.duration.length > 0) {
    filtered = filtered.filter(job => {
      if (!job.contractType) return true
      const jobDuration = CONTRACT_TYPE_TO_DURATION[job.contractType]
      return filters.duration!.includes(jobDuration)
    })
  }

  return filtered
}

export function sortJobs(
  jobs: JobListItem[],
  sortOption: SortOption
): JobListItem[] {
  const sorted = [...jobs]

  switch (sortOption) {
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
        return dateB - dateA
      })

    case 'closing':
      return sorted.sort((a, b) => {
        if (!a.closingDate && !b.closingDate) return 0
        if (!a.closingDate) return 1
        if (!b.closingDate) return -1
        const dateA = new Date(a.closingDate).getTime()
        const dateB = new Date(b.closingDate).getTime()
        return dateA - dateB
      })

    default:
      return sorted
  }
}

export function filterAndSortJobs(
  jobs: JobListItem[],
  filters: Partial<JobFiltersState>
): JobListItem[] {
  const filtered = filterJobs(jobs, filters)
  return sortJobs(filtered, filters.sort || 'newest')
}
