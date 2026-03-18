'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Locale, SortOption } from '../types'
import { IRISH_COUNTIES } from '../constants/counties'
import { t } from '../utils/i18n'

interface FilterOption {
  value: string
  label: string
}

interface MobileFilterSheetProps {
  isOpen: boolean
  onClose: () => void
  locale: Locale
  counties: string[]
  duration: string[]
  sort: SortOption
  categories?: string[]
  specialties?: string[]
  onApply: (filters: {
    counties: string[]
    duration: string[]
    sort: SortOption
    categories?: string[]
    specialties?: string[]
  }) => void
  filterMode: 'categories' | 'specialties'
  categoryOptions?: readonly FilterOption[]
  specialtyOptions?: readonly FilterOption[]
  durationOptions?: readonly FilterOption[]
  sortOptions?: readonly FilterOption[]
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  locale,
  counties,
  duration,
  sort,
  categories = [],
  specialties = [],
  onApply,
  filterMode,
  categoryOptions = [],
  specialtyOptions = [],
  durationOptions = [],
  sortOptions = [],
}: MobileFilterSheetProps) {
  const [localCounties, setLocalCounties] = useState<string[]>(counties)
  const [localDuration, setLocalDuration] = useState<string[]>(duration)
  const [localSort, setLocalSort] = useState<SortOption>(sort)
  const [localCategories, setLocalCategories] = useState<string[]>(categories)
  const [localSpecialties, setLocalSpecialties] = useState<string[]>(specialties)
  const [countySearch, setCountySearch] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleApply = useCallback(() => {
    onApply({
      counties: localCounties,
      duration: localDuration,
      sort: localSort,
      ...(filterMode === 'categories' ? { categories: localCategories } : {}),
      ...(filterMode === 'specialties' ? { specialties: localSpecialties } : {}),
    })
    onClose()
  }, [localCounties, localDuration, localSort, localCategories, localSpecialties, filterMode, onApply, onClose])

  const handleClear = useCallback(() => {
    setLocalCounties([])
    setLocalDuration([])
    setLocalSort('newest')
    setLocalCategories([])
    setLocalSpecialties([])
  }, [])

  const toggleArrayValue = (
    current: string[],
    value: string,
    setter: (v: string[]) => void
  ) => {
    setter(current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    )
  }

  const filteredCounties = countySearch
    ? IRISH_COUNTIES.filter(c => c.toLowerCase().includes(countySearch.toLowerCase()))
    : IRISH_COUNTIES

  const primaryOptions: readonly FilterOption[] = filterMode === 'categories' ? categoryOptions : specialtyOptions
  const primaryValues = filterMode === 'categories' ? localCategories : localSpecialties
  const setPrimaryValues = filterMode === 'categories' ? setLocalCategories : setLocalSpecialties
  const primaryLabel = filterMode === 'categories' ? t('category', locale) : t('specialty', locale)

  const activeCount = localCounties.length + localDuration.length + primaryValues.length

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[90dvh] flex flex-col"
        style={{ animation: 'slide-up 0.2s ease-out' }}
        role="dialog"
        aria-modal="true"
        aria-label={t('filters', locale)}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-1 bg-gray-300 hover:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2 top-2 cursor-grab active:cursor-grabbing transition-colors"
              aria-label={t('close_filter_panel', locale)}
            />
            <h2 className="text-lg font-semibold text-gray-900">{t('filters', locale)}</h2>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary text-white rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t('close_filters', locale)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
          {/* Primary Filter */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {primaryLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {primaryOptions.map((option) => {
                const isSelected = primaryValues.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayValue(primaryValues, option.value, setPrimaryValues)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full min-h-[44px] transition-all duration-150 active:scale-95 ${
                      isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {option.label}
                  </button>
                )
              })}
            </div>
          </section>

          {/* County Filter */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {t('county', locale)}
            </h3>
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="county-search"
                autoComplete="off"
                value={countySearch}
                onChange={(e) => setCountySearch(e.target.value)}
                placeholder={t('search_county', locale)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto">
              {filteredCounties.map((county) => {
                const isSelected = localCounties.includes(county)
                return (
                  <button
                    key={county}
                    type="button"
                    onClick={() => toggleArrayValue(localCounties, county, setLocalCounties)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg min-h-[44px] transition-all duration-150 active:scale-95 ${
                      isSelected
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {county}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Duration */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {t('duration', locale)}
            </h3>
            <div className="flex gap-3">
              {durationOptions.map((option) => {
                const isSelected = localDuration.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayValue(localDuration, option.value, setLocalDuration)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl min-h-[48px] transition-all duration-150 active:scale-95 ${
                      isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {option.label}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Sort */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {t('sort_by_label', locale)}
            </h3>
            <div className="flex gap-3">
              {sortOptions.map((option) => {
                const isSelected = localSort === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLocalSort(option.value as SortOption)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl min-h-[48px] transition-all duration-150 active:scale-95 ${
                      isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {option.label}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        <div className="flex gap-3 px-5 py-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-150 min-h-[48px]"
          >
            {t('clear', locale)}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] px-4 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 min-h-[48px] shadow-md hover:shadow-lg"
          >
            {t('apply_filters', locale)}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
