import type { Salary, SalaryType, ContractType, Locale } from '../types'

const SALARY_TYPE_LABELS: Record<SalaryType, Record<Locale, string>> = {
  annual: { en: '/year', es: '/año' },
  session: { en: '/session', es: '/sesión' },
  hourly: { en: '/hour', es: '/hora' },
}

export function formatSalary(salary?: Salary | null, locale: Locale = 'en'): string | null {
  if (!salary) return null

  const { min, max, type } = salary
  if (!min && !max) return null

  const suffix = type ? SALARY_TYPE_LABELS[type][locale] : ''
  const from = locale === 'es' ? 'Desde' : 'From'
  const to = locale === 'es' ? 'Hasta' : 'Up to'

  if (min && max) {
    return `€${min.toLocaleString()} - €${max.toLocaleString()}${suffix}`
  }
  if (min) {
    return `${from} €${min.toLocaleString()}${suffix}`
  }
  if (max) {
    return `${to} €${max.toLocaleString()}${suffix}`
  }
  return null
}

export function formatCounty(county: string): string {
  if (!county) return ''
  if (county.startsWith('Co. ')) return county
  return `Co. ${county.charAt(0).toUpperCase()}${county.slice(1)}`
}

export function formatSpecialty(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function formatDuration(duration: string, locale: Locale = 'en'): string {
  const num = parseInt(duration, 10)
  if (isNaN(num)) return duration

  if (num >= 12 && num % 12 === 0) {
    const years = num / 12
    const unit = years === 1
      ? (locale === 'es' ? 'año' : 'year')
      : (locale === 'es' ? 'años' : 'years')
    return `${years} ${unit}`
  }

  const unit = num === 1
    ? (locale === 'es' ? 'mes' : 'month')
    : (locale === 'es' ? 'meses' : 'months')
  return `${num} ${unit}`
}

export function getContractLabel(type: ContractType, locale: Locale): string {
  const labels: Record<ContractType, Record<Locale, string>> = {
    permanent: { en: 'Permanent', es: 'Permanente' },
    'fixed-term': { en: 'Fixed Term', es: 'Temporal' },
    locum: { en: 'Locum', es: 'Locum' },
    maternity: { en: 'Maternity Cover', es: 'Cobertura' },
  }
  return labels[type]?.[locale] ?? type
}

interface ParsedConsultantTitle {
  specialty: string
  county: string | null
  term: string | null
  displayTitle: string
}

export function parseConsultantTitle(title: string): ParsedConsultantTitle {
  const fallback = { specialty: title, county: null, term: null, displayTitle: title }

  if (!title.includes('—')) {
    return fallback
  }

  const parts = title.split('—').map(p => p.trim())
  if (parts.length < 2) return fallback

  let specialty = parts[0]
  if (specialty.toLowerCase().startsWith('consultant ')) {
    specialty = specialty.substring(11).trim()
  }

  let county: string | null = null
  if (parts[1] && parts[1].startsWith('Co. ')) {
    county = parts[1].substring(4).trim()
  } else if (parts[1]) {
    county = parts[1]
  }

  const term = parts[2] || null
  const displayTitle = term ? `${specialty} - ${term}` : specialty

  return { specialty, county, term, displayTitle }
}

export function truncateSummary(text: string, maxLength = 300): string {
  if (text.length <= maxLength) return text
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '…'
}
