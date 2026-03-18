import type { SortOption, Locale } from '../types'

export const SORT_OPTIONS = [
  { value: 'newest' as const, en: 'Newest', es: 'Más recientes' },
  { value: 'closing' as const, en: 'Closing soon', es: 'Cierre próximo' },
] as const

export function getSortLabel(sort: SortOption, locale: Locale): string {
  const opt = SORT_OPTIONS.find(s => s.value === sort)
  return opt ? opt[locale] : sort
}
