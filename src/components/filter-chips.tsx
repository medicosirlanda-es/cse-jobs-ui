'use client'

import type { Locale } from '../types'
import { t } from '../utils/i18n'

interface FilterChipsProps {
  chips: Array<{ key: string; label: string; onRemove: () => void }>
  onClearAll: () => void
  locale: Locale
  maxVisible?: number
}

export function FilterChips({
  chips,
  onClearAll,
  locale,
  maxVisible = 4,
}: FilterChipsProps) {
  if (chips.length === 0) return null

  const visibleChips = chips.slice(0, maxVisible)
  const hiddenCount = chips.length - maxVisible

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {visibleChips.map(chip => (
        <span
          key={chip.key}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full transition-all duration-200 hover:bg-primary/15 hover:shadow-sm"
        >
          <span className="truncate max-w-[120px]">{chip.label}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            className="flex-shrink-0 p-0.5 hover:bg-primary/30 active:scale-90 rounded-full transition-all duration-150"
            aria-label={`${t('remove_filter', locale)} ${chip.label}`}
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-150 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}

      {hiddenCount > 0 && (
        <span className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
          +{hiddenCount} {t('more', locale)}
        </span>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:underline active:scale-95 transition-all duration-150"
      >
        {t('clear_all', locale)}
      </button>
    </div>
  )
}
