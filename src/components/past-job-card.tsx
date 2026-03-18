import Link from 'next/link'
import type { JobListItem, Locale } from '../types'
import { formatSalary, parseConsultantTitle, getContractLabel } from '../utils/format'
import { getCategoryLabel } from '../constants/categories'
import { getClosedDate } from '../utils/closing-date'
import { t } from '../utils/i18n'

interface PastJobCardProps {
  job: JobListItem
  locale: Locale
  href: string
}

export function PastJobCard({ job, locale, href }: PastJobCardProps) {
  const salaryText = formatSalary(job.salary, locale)
  const closedDate = getClosedDate(job.closingDate, locale)
  const isConsultant = job.category === 'consultant'
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null
  const displayTitle = parsed?.displayTitle || job.title
  const countyForBadge = parsed?.county || job.county

  return (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-xl"
    >
      <article className="flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden opacity-60 grayscale-[30%] transition-all duration-200 hover:opacity-80 hover:grayscale-0">
        <div className="p-5 flex flex-col flex-grow">
          {/* Header: Badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-gray-200 text-gray-600">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {closedDate || t('closed', locale)}
              </span>
              {isConsultant ? (
                <>
                  {countyForBadge && (
                    <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500 truncate max-w-[100px]">
                      {countyForBadge}
                    </span>
                  )}
                  {job.contractType && (
                    <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500">
                      {getContractLabel(job.contractType, locale)}
                    </span>
                  )}
                </>
              ) : (
                <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide rounded-full bg-gray-100 text-gray-500">
                  {getCategoryLabel(job.category, locale)}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-600 mb-2 line-clamp-2 group-hover:text-gray-800 transition-colors">
            {displayTitle}
          </h3>

          {/* Location */}
          {!isConsultant && job.county && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{job.county}</span>
            </div>
          )}

          {/* Description */}
          {job.descriptionSummary && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">
              {job.descriptionSummary}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
            <div className="flex items-center gap-3">
              {salaryText && (
                <span className="text-sm font-semibold text-gray-500 tabular-nums">
                  {salaryText}
                </span>
              )}
              {!isConsultant && job.contractType && (
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                  {getContractLabel(job.contractType, locale)}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full group-hover:bg-gray-200 group-hover:text-gray-700 transition-all duration-200">
              {t('view', locale)}
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
