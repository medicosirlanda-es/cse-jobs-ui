import type { Locale } from '../types'
import { t } from '../utils/i18n'

interface ApplyButtonProps {
  locale: Locale
  glowEffect?: boolean
  onClick?: () => void
  href?: string
  className?: string
}

export function ApplyButton({ locale, glowEffect = false, onClick, href, className = '' }: ApplyButtonProps) {
  const baseClass = `flex items-center justify-center w-full gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl ${glowEffect ? 'animated-border-glow' : ''} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
        {t('submit_cv', locale)}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {t('submit_cv', locale)}
    </button>
  )
}
