'use client'

import { useQueryStates, parseAsArrayOf, parseAsStringLiteral, parseAsString } from 'nuqs'
import { useCallback, useMemo } from 'react'
import type { SortOption, ContractDuration } from '../types'

const CATEGORY_VALUES = ['gp-permanent', 'gp-locum', 'consultant', 'registrar-sho', 'other'] as const
const DURATION_VALUES = ['permanent', 'temporal'] as const
const SORT_VALUES = ['newest', 'closing'] as const

export function useJobFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      categories: parseAsArrayOf(parseAsStringLiteral(CATEGORY_VALUES)).withDefault([]),
      specialties: parseAsArrayOf(parseAsString).withDefault([]),
      counties: parseAsArrayOf(parseAsString).withDefault([]),
      duration: parseAsArrayOf(parseAsStringLiteral(DURATION_VALUES)).withDefault([]),
      sort: parseAsStringLiteral(SORT_VALUES).withDefault('newest'),
    },
    {
      shallow: false,
      scroll: false,
      throttleMs: 100,
    }
  )

  const activeFilterCount = useMemo(() => {
    return (
      filters.categories.length +
      filters.specialties.length +
      filters.counties.length +
      filters.duration.length
    )
  }, [filters.categories, filters.specialties, filters.counties, filters.duration])

  const toggleFilter = useCallback(
    <T extends string>(
      key: 'categories' | 'specialties' | 'counties' | 'duration',
      value: T
    ) => {
      const currentValues = filters[key] as string[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      setFilters({ [key]: newValues })
    },
    [filters, setFilters]
  )

  const setFilter = useCallback(
    <T extends string>(
      key: 'categories' | 'specialties' | 'counties' | 'duration',
      values: T[]
    ) => {
      setFilters({ [key]: values })
    },
    [setFilters]
  )

  const setSort = useCallback(
    (value: SortOption) => {
      setFilters({ sort: value })
    },
    [setFilters]
  )

  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      specialties: [],
      counties: [],
      duration: [],
      sort: 'newest',
    })
  }, [setFilters])

  const clearFilterType = useCallback(
    (key: 'categories' | 'specialties' | 'counties' | 'duration') => {
      setFilters({ [key]: [] })
    },
    [setFilters]
  )

  const hasActiveFilters = activeFilterCount > 0

  return {
    filters: filters as {
      categories: string[]
      specialties: string[]
      counties: string[]
      duration: ContractDuration[]
      sort: SortOption
    },
    activeFilterCount,
    hasActiveFilters,
    toggleFilter,
    setFilter,
    setSort,
    clearFilters,
    clearFilterType,
  }
}

export type UseJobFiltersReturn = ReturnType<typeof useJobFilters>
