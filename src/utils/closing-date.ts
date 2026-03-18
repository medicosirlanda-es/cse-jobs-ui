import { isValid, isFuture, differenceInDays, format } from 'date-fns'
import { es as esLocale } from 'date-fns/locale'
import type { Locale } from '../types'

export interface ClosingDateInfo {
  text: string
  daysLeft: number
  urgent: boolean
  color: 'red' | 'amber' | 'emerald' | 'gray'
  pulse: boolean
}

export function getClosingDateInfo(
  closingDate?: string | null,
  locale: Locale = 'en'
): ClosingDateInfo | null {
  if (!closingDate) return null

  const date = new Date(closingDate)
  if (!isValid(date)) return null

  if (!isFuture(date)) {
    return {
      text: locale === 'es' ? 'Cerrada' : 'Closed',
      daysLeft: 0,
      urgent: false,
      color: 'gray',
      pulse: false,
    }
  }

  const daysLeft = differenceInDays(date, new Date())

  if (daysLeft === 0) {
    return {
      text: locale === 'es' ? '¡Hoy!' : 'Today!',
      daysLeft: 0,
      urgent: true,
      color: 'red',
      pulse: true,
    }
  }

  if (daysLeft === 1) {
    return {
      text: locale === 'es' ? '¡1 día!' : '1 day!',
      daysLeft: 1,
      urgent: true,
      color: 'red',
      pulse: true,
    }
  }

  if (daysLeft <= 3) {
    const text = locale === 'es' ? `¡${daysLeft} días!` : `${daysLeft} days!`
    return { text, daysLeft, urgent: true, color: 'red', pulse: true }
  }

  if (daysLeft <= 7) {
    const text = locale === 'es' ? `${daysLeft} días` : `${daysLeft} days`
    return { text, daysLeft, urgent: true, color: 'amber', pulse: false }
  }

  if (daysLeft <= 14) {
    const text = format(date, 'd MMM', { locale: locale === 'es' ? esLocale : undefined })
    return { text, daysLeft, urgent: false, color: 'amber', pulse: false }
  }

  return {
    text: format(date, 'd MMM', { locale: locale === 'es' ? esLocale : undefined }),
    daysLeft,
    urgent: false,
    color: 'emerald',
    pulse: false,
  }
}

export function getClosedDate(closingDate?: string | null, locale: Locale = 'en'): string | null {
  if (!closingDate) return null

  const date = new Date(closingDate)
  if (!isValid(date)) return null

  return format(date, "MMM ''yy", { locale: locale === 'es' ? esLocale : undefined })
}
