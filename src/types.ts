export type SiteSlug = 'cseconnect' | 'medicosirlanda' | 'doctorstoireland'
export type Locale = 'en' | 'es'

export type JobCategory = 'gp-permanent' | 'gp-locum' | 'consultant' | 'registrar-sho' | 'other'
export type ContractType = 'permanent' | 'fixed-term' | 'locum' | 'maternity'
export type SalaryType = 'annual' | 'session' | 'hourly'
export type ContractDuration = 'permanent' | 'temporal'
export type SortOption = 'newest' | 'closing'

export interface Salary {
  min?: number | null
  max?: number | null
  type?: SalaryType | null
}

export interface JobListItem {
  id: string
  title: string
  slug: string
  category: JobCategory
  county: string
  contractType?: ContractType | null
  salary?: Salary | null
  closingDate?: string | null
  publishedAt?: string | null
  descriptionSummary?: string | null
  specialties?: string[] | null
  hospitals?: string[] | null
  crmVacancyId?: string | null
  externalLink?: string | null
}

export interface Job extends JobListItem {
  description?: string | null
  descriptionHtml?: string | null
  requirements?: string | null
  startDate?: string | null
  contractDuration?: string | null
  sessionsPerWeek?: number | null
  imcDivisionRequired?: string | null
  source?: string | null
  sites?: { slug: string }[]
}

export interface JobCounts {
  'gp-permanent': number
  'gp-locum': number
  consultant: number
  'registrar-sho': number
  other: number
  total: number
}

export interface JobsApiConfig {
  payloadUrl: string
  apiKey?: string
  siteSlug: SiteSlug
  locale?: Locale
  revalidate?: number
}
