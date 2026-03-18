import type { ReactNode } from 'react'
import Link from 'next/link'
import type { JobListItem, Locale } from '../types'
import { formatSalary, parseConsultantTitle, getContractLabel } from '../utils/format'
import { getCategoryLabel, CATEGORY_BADGE_COLORS } from '../constants/categories'
import { CONTRACT_COLORS } from '../constants/contracts'
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

export function JobCard({
  job,
  locale,
  href,
  index = 0,
  variant = 'default',
  renderWrapper,
}: JobCardProps) {
  const salaryText = formatSalary(job.salary, locale)
  const isConsultant = job.category === 'consultant'
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null
  const displayTitle = parsed?.displayTitle || job.title
  const countyForBadge = parsed?.county || job.county

  const card = (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
    >
      <article className="job-card-hover flex flex-col h-full bg-white rounded-xl border border-gray-200 job-card-border shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col flex-grow">
          {/* Header: Badges + Closing Date */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {isConsultant ? (
                <>
                  {countyForBadge && (
                    <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-sky-50 text-sky-700">
                      {countyForBadge}
                    </span>
                  )}
                  {job.contractType && (
                    <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full ${CONTRACT_COLORS[job.contractType]}`}>
                      {getContractLabel(job.contractType, locale)}
                    </span>
                  )}
                </>
              ) : (
                <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full ${CATEGORY_BADGE_COLORS[job.category]}`}>
                  {getCategoryLabel(job.category, locale)}
                </span>
              )}
            </div>
            <ClosingBadge closingDate={job.closingDate} locale={locale} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-primary/80 transition-colors">
            {displayTitle}
          </h3>

          {/* Location - non-consultant */}
          {!isConsultant && job.county && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{job.county}</span>
            </div>
          )}

          {/* Description */}
          {job.descriptionSummary && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">
              {job.descriptionSummary}
            </p>
          )}

          {/* Footer: Salary + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3">
              {salaryText && (
                <span className="text-sm font-semibold text-primary tabular-nums">
                  {salaryText}
                </span>
              )}
              {!isConsultant && job.contractType && (
                <span className={`text-xs px-2 py-0.5 rounded ${CONTRACT_COLORS[job.contractType]}`}>
                  {getContractLabel(job.contractType, locale)}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-200">
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
