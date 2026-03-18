'use client'

import { useState, type ReactNode } from 'react'
import type { Locale } from '../types'
import { t } from '../utils/i18n'

interface PastOffersSectionProps {
  count: number
  locale: Locale
  children: ReactNode
}

export function PastOffersSection({ count, locale, children }: PastOffersSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (count === 0) return null

  const countLabel = count === 1
    ? t('past_offers_count_one', locale)
    : t('past_offers_count_other', locale)

  return (
    <section className="max-w-6xl mx-auto">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
        aria-expanded={isOpen}
        aria-controls="past-offers-content"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 group-hover:bg-gray-300 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-base md:text-lg font-semibold text-gray-700">
              {t('past_offers', locale)}
            </h2>
            <p className="text-sm text-gray-500">
              {count} {countLabel}
            </p>
          </div>
        </div>

        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id="past-offers-content"
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-[5000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        {children}

        <p className="mt-6 text-center text-sm text-gray-400">
          {t('past_offers_note', locale)}
        </p>
      </div>
    </section>
  )
}
