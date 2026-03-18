import type { Locale } from '../types'
import { t } from '../utils/i18n'

interface EmptyStateProps {
  locale: Locale
  title?: string
  message?: string
  ctaText?: string
  ctaHref?: string
}

export function EmptyState({ locale, title, message, ctaText, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-full max-w-md rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-b from-gray-50 to-white p-10">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title || t('no_jobs_title', locale)}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {message || t('no_jobs_message', locale)}
        </p>
        {ctaHref && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
          >
            {ctaText || t('send_cv_cta', locale)}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
