import type { ContractType, ContractDuration, Locale } from '../types'

export const CONTRACT_TYPES = [
  { value: 'permanent' as const, en: 'Permanent', es: 'Permanente' },
  { value: 'fixed-term' as const, en: 'Fixed Term', es: 'Temporal' },
  { value: 'locum' as const, en: 'Locum', es: 'Locum' },
  { value: 'maternity' as const, en: 'Maternity Cover', es: 'Cobertura' },
] as const

export const CONTRACT_DURATIONS = [
  { value: 'permanent' as const, en: 'Permanent', es: 'Permanente' },
  { value: 'temporal' as const, en: 'Temporary', es: 'Temporal' },
] as const

export const CONTRACT_TYPE_TO_DURATION: Record<ContractType, ContractDuration> = {
  permanent: 'permanent',
  'fixed-term': 'temporal',
  locum: 'temporal',
  maternity: 'temporal',
}

export const CONTRACT_COLORS: Record<ContractType, string> = {
  'fixed-term': 'bg-primary/10 text-primary',
  locum: 'bg-primary/10 text-primary',
  maternity: 'bg-primary/10 text-primary',
  permanent: 'bg-slate-100 text-slate-600',
}

export function getContractLabel(type: ContractType, locale: Locale): string {
  const ct = CONTRACT_TYPES.find(c => c.value === type)
  return ct ? ct[locale] : type
}
