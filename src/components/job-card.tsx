import type { ReactNode } from 'react'
import Link from 'next/link'
import type { JobListItem, Locale } from '../types'
import { formatSalary, parseConsultantTitle, truncateSummary } from '../utils/format'
import { getCategoryLabel } from '../constants/categories'
import { ClosingBadge } from './closing-badge'
import { JobPill, LocationIcon, CalendarIcon } from './job-pill'
import { t } from '../utils/i18n'

export interface JobCardProps {
  job: JobListItem
  locale: Locale
  href: string
  index?: number
  variant?: 'default' | 'magic'
  renderWrapper?: (props: { children: ReactNode; job: JobListItem; index: number }) => ReactNode
}

function capitalizeCounty(county: string): string {
  if (!county) return ''
  return county.split(/[\s-]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function formatCounty(county: string): string {
  if (!county) return ''
  const cap = capitalizeCounty(county)
  if (cap.startsWith('Co.')) return cap
  return `Co. ${cap}`
}

function getContractBadge(job: JobListItem, locale: Locale): string | null {
  if (!job.contractType) return null

  if (job.contractType === 'permanent') {
    return locale === 'es' ? 'Permanente' : 'Permanent'
  }

  const typeLabel = job.contractType === 'locum' ? 'Locum'
    : job.contractType === 'maternity' ? (locale === 'es' ? 'Cobertura' : 'Maternity')
    : (locale === 'es' ? 'Temporal' : 'Fixed Term')

  const monthMatch = job.title.match(/(\d+)\s*mo(?:nths?)?/i)
  if (monthMatch) {
    const months = parseInt(monthMatch[1], 10)
    if (months > 0) {
      const unit = locale === 'es'
        ? (months === 1 ? 'mes' : 'meses')
        : (months === 1 ? 'month' : 'months')
      return `${typeLabel}: ${months} ${unit}`
    }
  }

  return typeLabel
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

  const county = job.county ? formatCounty(job.county) : null
  const contractBadge = getContractBadge(job, locale)

  const summary = job.descriptionSummary ? truncateSummary(job.descriptionSummary, 120) : null

  const card = (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
    >
      <article className="job-card-hover flex flex-col h-full bg-white rounded-xl border border-gray-200 job-card-border shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col flex-grow">
          {/* Row 1: Term (left) ← → County (right) */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              {contractBadge && (
                <JobPill icon={<CalendarIcon />}>{contractBadge}</JobPill>
              )}
            </div>
            <div>
              {county && (
                <JobPill icon={<LocationIcon />}>{county}</JobPill>
              )}
            </div>
          </div>

          {/* Row 2: Title with shimmer on specialty */}
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

          {/* Row 3: Description */}
          {summary && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
              {summary}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Row 4: Footer — Closing (left) + CTA (right) */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
            <div className="flex items-center gap-2 min-w-0">
              <ClosingBadge closingDate={job.closingDate} locale={locale} />
              {salaryText && (
                <span className="text-xs font-semibold text-primary tabular-nums truncate">
                  {salaryText}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
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
