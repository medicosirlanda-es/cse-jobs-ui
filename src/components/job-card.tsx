import type { ReactNode } from 'react'
import Link from 'next/link'
import type { JobListItem, Locale } from '../types'
import { formatSalary, parseConsultantTitle, truncateSummary } from '../utils/format'
import { getCategoryLabel, CATEGORY_COLORS } from '../constants/categories'
import { ClosingBadge } from './closing-badge'
import { t } from '../utils/i18n'

export interface JobCardProps {
  job: JobListItem
  locale: Locale
  href: string
  index?: number
  variant?: 'default' | 'magic'
  renderWrapper?: (props: { children: ReactNode; job: JobListItem; index: number }) => ReactNode
}

function formatCounty(county: string): string {
  if (!county) return ''
  if (county.startsWith('Co.')) return county
  return `Co. ${county.charAt(0).toUpperCase()}${county.slice(1)}`
}

function formatDuration(contractType?: string | null, locale: Locale = 'en'): string | null {
  if (!contractType) return null
  const labels: Record<string, Record<Locale, string>> = {
    permanent: { en: 'Permanent', es: 'Permanente' },
    'fixed-term': { en: 'Fixed Term', es: 'Temporal' },
    locum: { en: 'Locum', es: 'Locum' },
    maternity: { en: 'Maternity', es: 'Cobertura' },
  }
  return labels[contractType]?.[locale] ?? contractType
}

export function JobCard({
  job,
  locale,
  href,
  index = 0,
  variant = 'default',
  renderWrapper,
}: JobCardProps) {
  const salaryText = formatSalary(job.salary, locale)
  const isConsultant = job.category === 'consultant' || job.category === 'registrar-sho'
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null

  const categoryLabel = getCategoryLabel(job.category, locale)
  const specialty = parsed?.specialty || null

  // County from job.county field (NOT from title — title may contain hospital name)
  const county = job.county ? formatCounty(job.county) : null
  const duration = formatDuration(job.contractType, locale)
  const colors = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.other

  // Description: truncated to ~2 lines
  const summary = job.descriptionSummary ? truncateSummary(job.descriptionSummary, 120) : null

  const card = (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
    >
      <article className="job-card-hover flex flex-col h-full bg-white rounded-xl border border-gray-200 job-card-border shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col flex-grow">
          {/* Row 1: Badges — County + Duration + Closing Date */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {county && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${colors.bg} ${colors.text}`}>
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {county}
              </span>
            )}
            {duration && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${colors.bg} ${colors.text}`}>
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {duration}
              </span>
            )}
            <div className="ml-auto">
              <ClosingBadge closingDate={job.closingDate} locale={locale} />
            </div>
          </div>

          {/* Row 2: Title — "Category Specialty" with shimmer on specialty */}
          <h3 className="text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/80 mb-1">
            {isConsultant && specialty ? (
              <>
                <span>{categoryLabel}</span>{' '}
                <span className="specialty-shimmer">{specialty}</span>
              </>
            ) : (
              <span>{job.title}</span>
            )}
          </h3>

          {/* Row 3: Description — truncated 2 lines */}
          {summary && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
              {summary}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Row 4: Footer — Salary + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
            {salaryText && (
              <span className="text-sm font-semibold text-primary tabular-nums">
                {salaryText}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-200 ml-auto">
              {t('view_offer', locale)}
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )

  if (renderWrapper) {
    return <>{renderWrapper({ children: card, job, index })}</>
  }

  return card
}
