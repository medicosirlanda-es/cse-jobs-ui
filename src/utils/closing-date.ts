import { isValid, isFuture, differenceInDays } from 'date-fns'
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
  const prefix = locale === 'es' ? 'Cierra en' : 'Closes in'
  const dayWord = (n: number) => {
    if (locale === 'es') return n === 1 ? 'día' : 'días'
    return n === 1 ? 'day' : 'days'
  }

  if (daysLeft === 0) {
    return {
      text: locale === 'es' ? 'Cierra hoy' : 'Closes today',
      daysLeft: 0,
      urgent: true,
      color: 'red',
      pulse: true,
    }
  }

  if (daysLeft <= 3) {
    return {
      text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
      daysLeft,
      urgent: true,
      color: 'red',
      pulse: true,
    }
  }

  if (daysLeft <= 7) {
    return {
      text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
      daysLeft,
      urgent: true,
      color: 'amber',
      pulse: false,
    }
  }

  if (daysLeft <= 30) {
    return {
      text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
      daysLeft,
      urgent: false,
      color: 'emerald',
      pulse: false,
    }
  }

  return {
    text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
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

  const { format } = require('date-fns')
  const { es: esLocale } = require('date-fns/locale')
  return format(date, "MMM ''yy", { locale: locale === 'es' ? esLocale : undefined })
}
