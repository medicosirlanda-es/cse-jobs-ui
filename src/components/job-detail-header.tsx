import type { Job, Locale } from '../types'
import { getCategoryLabel, CATEGORY_COLORS } from '../constants/categories'
import { parseConsultantTitle } from '../utils/format'
import { ClosingBadge } from './closing-badge'
import { formatDistanceToNow } from 'date-fns'
import { es as esLocale } from 'date-fns/locale'

interface JobDetailHeaderProps {
  job: Job
  locale: Locale
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
    maternity: { en: 'Maternity Cover', es: 'Cobertura' },
  }
  return labels[contractType]?.[locale] ?? contractType
}

export function JobDetailHeader({ job, locale }: JobDetailHeaderProps) {
  const isConsultant = job.category === 'consultant' || job.category === 'registrar-sho'
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null
  const categoryLabel = getCategoryLabel(job.category, locale)
  const specialty = parsed?.specialty || null
  const colors = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.other

  const county = job.county ? formatCounty(job.county) : null
  const duration = formatDuration(job.contractType, locale)
  const publishedLabel = locale === 'es' ? 'Publicado' : 'Published'
  const timeAgo = job.publishedAt
    ? formatDistanceToNow(new Date(job.publishedAt), {
        addSuffix: true,
        locale: locale === 'es' ? esLocale : undefined,
      })
    : null

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-200 p-6 md:p-8">
      {/* Closing date — top right */}
      {job.closingDate && (
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <ClosingBadge closingDate={job.closingDate} locale={locale} />
        </div>
      )}

      <div className="space-y-4 max-w-2xl">
        {/* Row 1: Location */}
        {county && (
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {county}
          </div>
        )}

        {/* Row 2: Contract type pill */}
        {duration && (
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {duration}
          </span>
        )}

        {/* Row 3: Title with shimmer specialty */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
          {isConsultant && specialty ? (
            <>
              <span>{categoryLabel}</span>{' '}
              <span className="specialty-shimmer">{specialty}</span>
            </>
          ) : (
            job.title
          )}
        </h1>

        {/* Row 4: Published time ago */}
        {timeAgo && (
          <p className="text-sm text-gray-400">
            {publishedLabel} {timeAgo}
          </p>
        )}
      </div>
    </div>
  )
}
