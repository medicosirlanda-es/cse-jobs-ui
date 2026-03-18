'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Locale } from '../types'
import { t } from '../utils/i18n'

export interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  label: string
  options: readonly FilterOption[] | FilterOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  searchable?: boolean
  searchPlaceholder?: string
  className?: string
  widePanel?: boolean
  locale?: Locale
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onChange,
  searchable = false,
  searchPlaceholder,
  className = '',
  widePanel = false,
  locale = 'en',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const filteredOptions = searchable && searchQuery
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      setSearchQuery('')
      buttonRef.current?.focus()
    }
  }, [])

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onChange(newValues)
  }

  const getButtonText = () => {
    if (selectedValues.length === 0) return label
    if (selectedValues.length === 1) {
      const selected = options.find(o => o.value === selectedValues[0])
      return selected?.label || label
    }
    return `${label} (${selectedValues.length})`
  }

  const hasSelection = selectedValues.length > 0
  const defaultSearchPlaceholder = searchPlaceholder || t('search', locale)

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center justify-between gap-2 w-full
          min-h-[44px] px-4 py-2.5
          text-sm font-medium rounded-lg border
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
          cursor-pointer
          ${hasSelection
            ? 'bg-primary/5 border-primary text-primary shadow-sm'
            : 'bg-white border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{getButtonText()}</span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-full max-h-[300px] overflow-hidden bg-white rounded-xl border border-gray-200/80 shadow-xl
            origin-top animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150
            ${widePanel ? 'min-w-[280px]' : 'min-w-[200px]'}`}
          role="listbox"
          aria-multiselectable="true"
          onKeyDown={handleKeyDown}
        >
          {searchable && (
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="filter-search"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={defaultSearchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto max-h-[240px] p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                {t('no_results', locale)}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option.value)}
                    className={`
                      flex items-center gap-3 w-full
                      min-h-[44px] px-3 py-2
                      text-sm text-left rounded-lg
                      transition-colors duration-150
                      cursor-pointer
                      ${isSelected
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span
                      className={`
                        flex items-center justify-center
                        w-5 h-5 rounded border-2
                        transition-all duration-200 ease-out
                        ${isSelected
                          ? 'bg-primary border-primary scale-100'
                          : 'border-gray-300 scale-100 hover:border-primary/50'
                        }
                      `}
                    >
                      <svg
                        className={`w-3 h-3 text-white transition-all duration-200 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="truncate">{option.label}</span>
                  </button>
                )
              })
            )}
          </div>

          {selectedValues.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => onChange([])}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {t('clear_selection', locale)}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
