import type { Job, Locale } from '../types'
import { getCategoryLabel } from '../constants/categories'
import { parseConsultantTitle } from '../utils/format'
import { JobPill, LocationIcon, CalendarIcon } from './job-pill'
import { formatDistanceToNow } from 'date-fns'
import { es as esLocale } from 'date-fns/locale'

interface JobDetailHeaderProps {
  job: Job
  locale: Locale
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

function getContractBadge(
  contractType?: string | null,
  contractDuration?: string | null,
  locale: Locale = 'en'
): string | null {
  if (!contractType) return null

  if (contractType === 'permanent') {
    return locale === 'es' ? 'Permanente' : 'Permanent'
  }

  const typeLabel = contractType === 'locum' ? 'Locum'
    : contractType === 'maternity' ? (locale === 'es' ? 'Cobertura' : 'Maternity')
    : (locale === 'es' ? 'Temporal' : 'Fixed Term')

  if (contractDuration) {
    const months = parseInt(contractDuration, 10)
    if (!isNaN(months) && months > 0) {
      const unit = locale === 'es'
        ? (months === 1 ? 'mes' : 'meses')
        : (months === 1 ? 'month' : 'months')
      return `${typeLabel}: ${months} ${unit}`
    }
  }

  return typeLabel
}

export function JobDetailHeader({ job, locale }: JobDetailHeaderProps) {
  const isConsultant = job.category === 'consultant' || job.category === 'registrar-sho'
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null
  const categoryLabel = getCategoryLabel(job.category, locale)
  const specialty = parsed?.specialty || null

  const county = job.county ? formatCounty(job.county) : null
  const contractBadge = getContractBadge(job.contractType, job.contractDuration, locale)
  const publishedLabel = locale === 'es' ? 'Publicado' : 'Published'
  const timeAgo = job.publishedAt
    ? formatDistanceToNow(new Date(job.publishedAt), {
        addSuffix: true,
        locale: locale === 'es' ? esLocale : undefined,
      })
    : null

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50/50 border border-gray-200/80 shadow-sm p-6 md:p-8">
      <div className="space-y-3">
        {/* Row 1: Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {contractBadge && (
            <JobPill icon={<CalendarIcon className="w-3.5 h-3.5" />} size="md">{contractBadge}</JobPill>
          )}
          {county && (
            <JobPill icon={<LocationIcon className="w-3.5 h-3.5" />} size="md">{county}</JobPill>
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
