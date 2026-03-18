import type { Job, Locale, SiteSlug } from '../types'
import { formatSalary, formatDuration, formatCounty, getContractLabel } from '../utils/format'
import { getClosingDateInfo } from '../utils/closing-date'
import { ApplyModal } from './apply-modal'

interface JobDetailSidebarProps {
  job: Job
  locale: Locale
  source: SiteSlug
  crmApiUrl: string
  privacyPolicyUrl: string
  glowEffect?: boolean
}

export function JobDetailSidebar({
  job,
  locale,
  source,
  crmApiUrl,
  privacyPolicyUrl,
  glowEffect = false,
}: JobDetailSidebarProps) {
  const salaryText = formatSalary(job.salary, locale)
  const closingInfo = job.closingDate ? getClosingDateInfo(job.closingDate, locale) : null
  const salaryLabel = locale === 'es' ? 'Salario' : 'Salary'
  const locationLabel = locale === 'es' ? 'Ubicación' : 'Location'
  const contractLabel = locale === 'es' ? 'Contrato' : 'Contract'
  const closingLabel = locale === 'es' ? 'Fecha de cierre' : 'Closing date'
  const durationLabel = locale === 'es' ? 'Duración' : 'Duration'
  const specialtiesLabel = locale === 'es' ? 'Especialidades' : 'Specialties'
  const hospitalLabel = locale === 'es' ? 'Hospital' : 'Hospital'

  return (
    <div className="sticky top-6 space-y-6">
      {/* Apply Card */}
      <div className={`bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-4 ${glowEffect ? 'animated-border-glow' : ''}`}>
        <ApplyModal
          crmVacancyId={job.crmVacancyId || ''}
          jobTitle={job.title}
          locale={locale}
          source={source}
          crmApiUrl={crmApiUrl}
          privacyPolicyUrl={privacyPolicyUrl}
          glowEffect={false}
          externalLink={job.externalLink || undefined}
        />
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        {salaryText && (
          <DetailRow label={salaryLabel} value={salaryText} highlight />
        )}
        {job.county && (
          <DetailRow label={locationLabel} value={formatCounty(job.county)} />
        )}
        {job.contractType && (
          <DetailRow label={contractLabel} value={getContractLabel(job.contractType, locale)} />
        )}
        {job.contractDuration && (
          <DetailRow label={durationLabel} value={formatDuration(job.contractDuration, locale)} />
        )}
        {closingInfo && (
          <DetailRow label={closingLabel} value={closingInfo.text} />
        )}
        {job.specialties && job.specialties.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{specialtiesLabel}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {job.specialties.map(s => (
                <span key={s} className="px-2 py-0.5 text-xs bg-violet-50 text-violet-700 rounded-full">{s}</span>
              ))}
            </dd>
          </div>
        )}
        {job.hospitals && job.hospitals.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{hospitalLabel}</dt>
            <dd className="text-sm text-gray-700">{job.hospitals.join(', ')}</dd>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between pt-3 first:pt-0 border-t border-gray-100 first:border-t-0">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</dt>
      <dd className={`text-sm font-semibold ${highlight ? 'text-primary' : 'text-gray-900'} tabular-nums`}>{value}</dd>
    </div>
  )
}
