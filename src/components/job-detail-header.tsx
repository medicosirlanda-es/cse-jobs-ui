import type { Job, Locale } from '../types'
import { getCategoryLabel, CATEGORY_BADGE_COLORS } from '../constants/categories'
import { getContractLabel } from '../utils/format'
import { CONTRACT_COLORS } from '../constants/contracts'
import { ClosingBadge } from './closing-badge'
import { format } from 'date-fns'
import { es as esLocale } from 'date-fns/locale'

interface JobDetailHeaderProps {
  job: Job
  locale: Locale
}

export function JobDetailHeader({ job, locale }: JobDetailHeaderProps) {
  const publishedDate = job.publishedAt
    ? format(new Date(job.publishedAt), 'd MMMM yyyy', { locale: locale === 'es' ? esLocale : undefined })
    : null

  return (
    <div className="space-y-4">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full ${CATEGORY_BADGE_COLORS[job.category]}`}>
          {getCategoryLabel(job.category, locale)}
        </span>
        {job.contractType && (
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${CONTRACT_COLORS[job.contractType]}`}>
            {getContractLabel(job.contractType, locale)}
          </span>
        )}
        <ClosingBadge closingDate={job.closingDate} locale={locale} />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {job.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
        {job.county && (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.county}
          </span>
        )}
        {publishedDate && (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {publishedDate}
          </span>
        )}
      </div>
    </div>
  )
}
