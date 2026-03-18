import type { Locale } from '../types'
import { getClosingDateInfo } from '../utils/closing-date'

interface ClosingBadgeProps {
  closingDate?: string | null
  locale?: Locale
  variant?: 'inline' | 'pill'
}

const INLINE_COLORS = {
  red: 'text-red-600',
  amber: 'text-amber-600',
  emerald: 'text-emerald-600',
  gray: 'text-gray-500',
} as const

const PILL_COLORS = {
  red: 'bg-red-50 text-red-700 border-red-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
} as const

export function ClosingBadge({ closingDate, locale = 'en', variant = 'inline' }: ClosingBadgeProps) {
  const info = getClosingDateInfo(closingDate, locale)
  if (!info) return null

  if (variant === 'pill') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${PILL_COLORS[info.color]}`}>
        {info.pulse && (
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full motion-safe:animate-pulse" />
        )}
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {info.text}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap ${INLINE_COLORS[info.color]}`}>
      {info.pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 motion-safe:animate-pulse" />
      )}
      {info.text}
    </span>
  )
}
