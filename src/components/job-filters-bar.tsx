'use client'

import { useState, useCallback } from 'react'
import type { Locale, SortOption } from '../types'
import { JOB_CATEGORIES } from '../constants/categories'
import { MEDICAL_SPECIALTIES } from '../constants/specialties'
import { CONTRACT_DURATIONS } from '../constants/contracts'
import { SORT_OPTIONS } from '../constants/sort'
import { IRISH_COUNTIES } from '../constants/counties'
import { useJobFilters } from '../hooks/use-job-filters'
import { FilterDropdown, type FilterOption } from './filter-dropdown'
import { FilterChips } from './filter-chips'
import { SortDropdown } from './sort-dropdown'
import { MobileFilterSheet } from './mobile-filter-sheet'
import { t } from '../utils/i18n'

interface JobFiltersBarProps {
  mode: 'main' | 'consultant'
  locale: Locale
}

export function JobFiltersBar({ mode, locale }: JobFiltersBarProps) {
  const {
    filters,
    hasActiveFilters,
    activeFilterCount,
    toggleFilter,
    setFilter,
    setSort,
    clearFilters,
  } = useJobFilters()

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)
  const [sheetKey, setSheetKey] = useState(0)

  // Build locale-aware options
  const categoryOptions: FilterOption[] = JOB_CATEGORIES.map(c => ({ value: c.value, label: c[locale] }))
  const specialtyOptions: FilterOption[] = MEDICAL_SPECIALTIES.map(s => ({ value: s.value, label: s[locale] }))
  const countyOptions: FilterOption[] = IRISH_COUNTIES.map(c => ({ value: c, label: c }))
  const durationOptions: FilterOption[] = CONTRACT_DURATIONS.map(d => ({ value: d.value, label: d[locale] }))
  const sortOptions: FilterOption[] = SORT_OPTIONS.map(s => ({ value: s.value, label: s[locale] }))

  const primaryFilterConfig = mode === 'main'
    ? {
        label: t('category', locale),
        options: categoryOptions,
        values: filters.categories,
        filterKey: 'categories' as const,
      }
    : {
        label: t('specialty', locale),
        options: specialtyOptions,
        values: filters.specialties,
        filterKey: 'specialties' as const,
      }

  const handleMobileApply = useCallback((newFilters: {
    counties: string[]
    duration: string[]
    sort: SortOption
    categories?: string[]
    specialties?: string[]
  }) => {
    if (mode === 'main' && newFilters.categories) {
      setFilter('categories', newFilters.categories)
    }
    if (mode === 'consultant' && newFilters.specialties) {
      setFilter('specialties', newFilters.specialties)
    }
    setFilter('counties', newFilters.counties)
    setFilter('duration', newFilters.duration)
    setSort(newFilters.sort)
  }, [mode, setFilter, setSort])

  // Build chips from active filters
  const chips: Array<{ key: string; label: string; onRemove: () => void }> = []
  if (mode === 'main') {
    filters.categories.forEach(cat => {
      const opt = categoryOptions.find(c => c.value === cat)
      if (opt) chips.push({ key: `cat-${cat}`, label: opt.label, onRemove: () => toggleFilter('categories', cat) })
    })
  } else {
    filters.specialties.forEach(spec => {
      const opt = specialtyOptions.find(s => s.value === spec)
      if (opt) chips.push({ key: `spec-${spec}`, label: opt.label, onRemove: () => toggleFilter('specialties', spec) })
    })
  }
  filters.counties.forEach(c => {
    chips.push({ key: `county-${c}`, label: c, onRemove: () => toggleFilter('counties', c) })
  })
  filters.duration.forEach(d => {
    const opt = durationOptions.find(o => o.value === d)
    if (opt) chips.push({ key: `dur-${d}`, label: opt.label, onRemove: () => toggleFilter('duration', d) })
  })

  const secondaryFilterCount = filters.counties.length + filters.duration.length

  return (
    <div className="space-y-4">
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {hasActiveFilters
          ? `${activeFilterCount} ${t('active_filters', locale)}`
          : t('no_active_filters', locale)
        }
      </div>

      <div className="bg-gradient-to-b from-white to-gray-50/80 rounded-xl border border-gray-200/80 shadow-md p-3 md:p-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <FilterDropdown
            label={primaryFilterConfig.label}
            options={primaryFilterConfig.options}
            selectedValues={primaryFilterConfig.values}
            onChange={(values) => setFilter(primaryFilterConfig.filterKey, values)}
            searchable={mode === 'consultant'}
            searchPlaceholder={mode === 'consultant' ? t('search_specialty', locale) : undefined}
            widePanel={mode === 'consultant'}
            locale={locale}
            className={mode === 'consultant' ? 'min-w-[220px]' : 'min-w-[180px]'}
          />

          <FilterDropdown
            label={t('county', locale)}
            options={countyOptions}
            selectedValues={filters.counties}
            onChange={(values) => setFilter('counties', values)}
            searchable
            searchPlaceholder={t('search_county', locale)}
            locale={locale}
            className="min-w-[160px]"
          />

          <FilterDropdown
            label={t('duration', locale)}
            options={durationOptions}
            selectedValues={filters.duration}
            onChange={(values) => setFilter('duration', values)}
            locale={locale}
            className="min-w-[140px]"
          />

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{t('sort_by', locale)}</span>
            <SortDropdown
              value={filters.sort}
              options={sortOptions}
              onChange={(value) => setSort(value as SortOption)}
              locale={locale}
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <FilterDropdown
            label={primaryFilterConfig.label}
            options={primaryFilterConfig.options}
            selectedValues={primaryFilterConfig.values}
            onChange={(values) => setFilter(primaryFilterConfig.filterKey, values)}
            locale={locale}
            className="flex-1"
          />

          <button
            type="button"
            onClick={() => {
              setSheetKey(k => k + 1)
              setIsMobileSheetOpen(true)
            }}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium rounded-lg border transition-all duration-200 ease-out ${
              secondaryFilterCount > 0
                ? 'bg-primary/5 border-primary text-primary shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>{t('filters', locale)}</span>
            {secondaryFilterCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full">
                {secondaryFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Chips - Desktop */}
      {hasActiveFilters && (
        <div className="hidden md:block">
          <FilterChips chips={chips} onClearAll={clearFilters} locale={locale} />
        </div>
      )}

      {/* Chips - Mobile */}
      {hasActiveFilters && (
        <div className="md:hidden">
          <FilterChips chips={chips} onClearAll={clearFilters} locale={locale} maxVisible={3} />
        </div>
      )}

      <MobileFilterSheet
        key={sheetKey}
        isOpen={isMobileSheetOpen}
        onClose={() => setIsMobileSheetOpen(false)}
        locale={locale}
        counties={filters.counties}
        duration={filters.duration}
        sort={filters.sort}
        categories={mode === 'main' ? filters.categories : undefined}
        specialties={mode === 'consultant' ? filters.specialties : undefined}
        onApply={handleMobileApply}
        filterMode={mode === 'main' ? 'categories' : 'specialties'}
        categoryOptions={categoryOptions}
        specialtyOptions={specialtyOptions}
        durationOptions={durationOptions}
        sortOptions={sortOptions}
      />
    </div>
  )
}
