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
    <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-gray-200/80 shadow-sm p-6 md:p-8">
      {/* Closing badge — top right as pill */}
      {job.closingDate && (
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <ClosingBadge closingDate={job.closingDate} locale={locale} variant="pill" />
        </div>
      )}

      <div className="space-y-3 pr-32 md:pr-40">
        {/* Row 1: Pills — Location + Contract */}
        <div className="flex items-center gap-2 flex-wrap">
          {county && (
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {county}
            </span>
          )}
          {duration && (
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {duration}
            </span>
          )}
        </div>

        {/* Row 2: Title with shimmer */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight leading-tight">
          {isConsultant && specialty ? (
            <>
              <span>{categoryLabel}</span>{' '}
              <span className="specialty-shimmer">{specialty}</span>
            </>
          ) : (
            job.title
          )}
        </h1>

        {/* Row 3: Published */}
        {timeAgo && (
          <p className="text-sm text-gray-400">
            {publishedLabel} {timeAgo}
          </p>
        )}
      </div>
    </div>
  )
}
