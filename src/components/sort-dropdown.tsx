'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Locale } from '../types'
import { t } from '../utils/i18n'

interface SortDropdownProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  locale?: Locale
}

export function SortDropdown({ value, options, onChange, locale = 'en' }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const selectedOption = options.find(o => o.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
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
      buttonRef.current?.focus()
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between gap-2 min-h-[44px] px-4 py-2.5 min-w-[160px] text-sm font-medium rounded-lg border transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer bg-white border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption?.label || t('select', locale)}</span>
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
          className="absolute right-0 z-50 mt-2 min-w-full bg-white rounded-xl border border-gray-200/80 shadow-xl origin-top animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 overflow-hidden"
          role="listbox"
          onKeyDown={handleKeyDown}
        >
          <div className="p-1">
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`
                    flex items-center gap-3 w-full
                    min-h-[44px] px-3 py-2
                    text-sm text-left rounded-lg
                    transition-colors duration-150
                    cursor-pointer
                    ${isSelected ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={`flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all duration-200 ${isSelected ? 'border-primary' : 'border-gray-300'}`}>
                    <span className={`w-2 h-2 rounded-full bg-primary transition-all duration-200 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                  </span>
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
