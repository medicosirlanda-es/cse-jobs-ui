import type { Locale } from '../types'
import { getClosingDateInfo } from '../utils/closing-date'

interface ClosingBadgeProps {
  closingDate?: string | null
  locale?: Locale
}

const COLOR_CLASSES = {
  red: 'text-red-600',
  amber: 'text-amber-600',
  emerald: 'text-emerald-600',
  gray: 'text-gray-500',
} as const

export function ClosingBadge({ closingDate, locale = 'en' }: ClosingBadgeProps) {
  const info = getClosingDateInfo(closingDate, locale)
  if (!info) return null

  return (
    <span className={`text-xs font-medium whitespace-nowrap ${COLOR_CLASSES[info.color]}`}>
      {info.pulse && (
        <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 motion-safe:animate-pulse" />
      )}
      {info.text}
    </span>
  )
}
