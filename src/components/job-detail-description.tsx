import type { Job, Locale } from '../types'

interface JobDetailDescriptionProps {
  job: Job
  locale: Locale
  renderRichText?: (content: unknown) => React.ReactNode
}

export function JobDetailDescription({
  job,
  locale,
  renderRichText,
}: JobDetailDescriptionProps) {
  const descriptionLabel = locale === 'es' ? 'Descripción' : 'Description'
  const requirementsLabel = locale === 'es' ? 'Requisitos' : 'Requirements'

  return (
    <div className="space-y-8">
      {/* Description */}
      {(job.descriptionHtml || job.description) && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{descriptionLabel}</h2>
          {job.descriptionHtml ? (
            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
            />
          ) : job.description && renderRichText ? (
            <div className="prose prose-gray max-w-none">
              {renderRichText(job.description)}
            </div>
          ) : null}
        </section>
      )}

      {/* Requirements */}
      {job.requirements && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{requirementsLabel}</h2>
          <div
            className="prose prose-gray max-w-none prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: job.requirements }}
          />
        </section>
      )}
    </div>
  )
}
