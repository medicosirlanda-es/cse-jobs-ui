import type { JobsApiConfig, JobListItem, Job, JobCounts, JobCategory } from '../types'

interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface PayloadJob {
  id: string
  title: string
  slug: string
  category: JobCategory
  county?: string
  contractType?: string
  salary?: {
    min?: number
    max?: number
    type?: string
  }
  closingDate?: string
  publishedAt?: string
  descriptionSummary?: string
  descriptionHtmlPublic?: string
  description?: unknown
  requirements?: string
  startDate?: string
  contractDuration?: string
  sessionsPerWeek?: number
  specialties?: string[]
  hospitals?: Array<{ name: string }> | string[]
  imcDivisionRequired?: string
  source?: string
  externalLink?: string
  crmVacancyId?: string
  jobStatus?: string
  sites?: Array<{ slug: string }>
  displayOnPastOffers?: boolean
  closedAt?: string
}

function toJobListItem(p: PayloadJob): JobListItem {
  const hospitals = Array.isArray(p.hospitals)
    ? p.hospitals.map(h => typeof h === 'string' ? h : h.name)
    : undefined

  let summary = p.descriptionSummary || undefined
  if (!summary && p.descriptionHtmlPublic) {
    summary = p.descriptionHtmlPublic.replace(/<[^>]*>/g, '').substring(0, 300)
  }

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    county: p.county || '',
    contractType: (p.contractType as JobListItem['contractType']) || null,
    salary: p.salary ? {
      min: p.salary.min,
      max: p.salary.max,
      type: p.salary.type as JobListItem['salary'] extends { type?: infer T } ? T : never,
    } : null,
    closingDate: p.closingDate || null,
    publishedAt: p.publishedAt || null,
    descriptionSummary: summary || null,
    specialties: p.specialties || null,
    hospitals: hospitals || null,
    crmVacancyId: p.crmVacancyId || null,
    externalLink: p.externalLink || null,
  }
}

function toJob(p: PayloadJob): Job {
  const item = toJobListItem(p)
  return {
    ...item,
    description: typeof p.description === 'string' ? p.description : null,
    descriptionHtml: p.descriptionHtmlPublic || null,
    requirements: p.requirements || null,
    startDate: p.startDate || null,
    contractDuration: p.contractDuration || null,
    sessionsPerWeek: p.sessionsPerWeek ?? null,
    imcDivisionRequired: p.imcDivisionRequired || null,
    source: p.source || null,
    sites: p.sites || [],
  }
}

async function payloadFetch<T>(
  config: JobsApiConfig,
  collection: string,
  params: Record<string, string> = {}
): Promise<PayloadResponse<T>> {
  const url = new URL(`/api/${collection}`, config.payloadUrl)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  if (config.locale) {
    url.searchParams.set('locale', config.locale)
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (config.apiKey) {
    headers['Authorization'] = `users API-Key ${config.apiKey}`
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: config.revalidate ?? 60 },
  } as RequestInit)

  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export function buildJobsWhere(
  siteSlug: string,
  category?: string,
  status: 'active' | 'inactive' = 'active'
): Record<string, unknown> {
  const conditions: Record<string, unknown>[] = [
    { 'sites.slug': { contains: siteSlug } },
  ]

  if (status === 'active') {
    conditions.push({ jobStatus: { equals: 'active' } })
  } else {
    conditions.push({
      or: [
        { jobStatus: { equals: 'closed' } },
        { jobStatus: { equals: 'filled' } },
        { jobStatus: { equals: 'expired' } },
      ],
    })
    conditions.push({ displayOnPastOffers: { equals: true } })
    // Only last 60 days
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)
    conditions.push({ closedAt: { greater_than: sixtyDaysAgo.toISOString() } })
  }

  if (category) {
    conditions.push({ category: { equals: category } })
  }

  return { and: conditions }
}

export function createJobsApi(config: JobsApiConfig) {
  const whereToQuery = (where: Record<string, unknown>): Record<string, string> => {
    return { where: JSON.stringify(where) }
  }

  async function getActiveJobs(category?: string): Promise<JobListItem[]> {
    const where = buildJobsWhere(config.siteSlug, category)
    const result = await payloadFetch<PayloadJob>(config, 'jobs', {
      ...whereToQuery(where),
      sort: '-publishedAt',
      limit: '100',
      depth: '1',
    })
    return result.docs.map(toJobListItem)
  }

  async function getJobBySlug(slug: string): Promise<Job | null> {
    const where: Record<string, unknown> = {
      and: [
        { slug: { equals: slug } },
        { 'sites.slug': { contains: config.siteSlug } },
      ],
    }
    const result = await payloadFetch<PayloadJob>(config, 'jobs', {
      where: JSON.stringify(where),
      limit: '1',
      depth: '1',
    })
    return result.docs.length > 0 ? toJob(result.docs[0]) : null
  }

  async function getPastJobs(limit = 20): Promise<JobListItem[]> {
    const where = buildJobsWhere(config.siteSlug, undefined, 'inactive')
    const result = await payloadFetch<PayloadJob>(config, 'jobs', {
      ...whereToQuery(where),
      sort: '-closedAt',
      limit: String(limit),
      depth: '1',
    })
    return result.docs.map(toJobListItem)
  }

  async function getJobCounts(): Promise<JobCounts> {
    const categories: JobCategory[] = ['gp-permanent', 'gp-locum', 'consultant', 'registrar-sho', 'other']
    const results = await Promise.all(
      categories.map(async (cat) => {
        const where = buildJobsWhere(config.siteSlug, cat)
        const result = await payloadFetch<PayloadJob>(config, 'jobs', {
          ...whereToQuery(where),
          limit: '0',
        })
        return [cat, result.totalDocs] as const
      })
    )

    const counts = Object.fromEntries(results) as Record<JobCategory, number>
    const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

    return { ...counts, total }
  }

  async function getSimilarJobs(
    category: string,
    excludeId: string,
    limit = 3
  ): Promise<JobListItem[]> {
    const where: Record<string, unknown> = {
      and: [
        { 'sites.slug': { contains: config.siteSlug } },
        { jobStatus: { equals: 'active' } },
        { category: { equals: category } },
        { id: { not_equals: excludeId } },
      ],
    }
    const result = await payloadFetch<PayloadJob>(config, 'jobs', {
      where: JSON.stringify(where),
      sort: '-publishedAt',
      limit: String(limit),
      depth: '1',
    })
    return result.docs.map(toJobListItem)
  }

  return {
    getActiveJobs,
    getJobBySlug,
    getPastJobs,
    getJobCounts,
    getSimilarJobs,
  }
}
