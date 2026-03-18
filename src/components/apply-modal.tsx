'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { Locale, SiteSlug } from '../types'
import { t } from '../utils/i18n'

interface ApplyModalProps {
  crmVacancyId: string
  jobTitle: string
  locale: Locale
  source: SiteSlug
  crmApiUrl: string
  privacyPolicyUrl: string
  glowEffect?: boolean
  externalLink?: string
  onApplicationSubmitted?: (applicationId: string) => void
}

interface FormState {
  success: boolean
  error: string | null
  applicationId: string | null
}

export function ApplyModal({
  crmVacancyId,
  jobTitle,
  locale,
  source,
  crmApiUrl,
  privacyPolicyUrl,
  glowEffect = false,
  externalLink,
  onApplicationSubmitted,
}: ApplyModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [formState, setFormState] = useState<FormState>({ success: false, error: null, applicationId: null })
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusableElements.length === 0) return
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (isOpen && modalRef.current) modalRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && triggerRef.current) triggerRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset()
      setCvFile(null)
      setPrivacyConsent(false)
      if (formState.applicationId && onApplicationSubmitted) {
        onApplicationSubmitted(formState.applicationId)
      }
      const timer = setTimeout(() => setIsOpen(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [formState.success, formState.applicationId, onApplicationSubmitted])

  const sourceMap: Record<SiteSlug, string> = {
    cseconnect: 'website_cseconnect',
    medicosirlanda: 'website_medicosirlanda',
    doctorstoireland: 'website_doctorstoireland',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setFormState({ success: false, error: null, applicationId: null })

    try {
      const formData = new FormData(e.currentTarget)
      formData.set('source', sourceMap[source])
      if (cvFile) formData.set('cv_file', cvFile)

      const res = await fetch(
        `${crmApiUrl}/api/consultant-offers/${crmVacancyId}/apply`,
        { method: 'POST', body: formData }
      )

      const data = await res.json()

      if (!res.ok) {
        setFormState({ success: false, error: data.error || `Error: ${res.status}`, applicationId: null })
        return
      }

      setFormState({ success: true, error: null, applicationId: data.application_id })
    } catch {
      setFormState({ success: false, error: locale === 'es' ? 'Error de conexión. Inténtalo de nuevo.' : 'Connection error. Please try again.', applicationId: null })
    } finally {
      setIsPending(false)
    }
  }

  // If no CRM vacancy ID, render external link
  if (!crmVacancyId && externalLink) {
    return (
      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center w-full gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl ${glowEffect ? 'animated-border-glow' : ''}`}
      >
        {t('submit_cv', locale)}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )
  }

  const inputClassName =
    'w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-gray-900 placeholder:text-gray-400'

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center w-full gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl ${glowEffect ? 'animated-border-glow' : ''}`}
      >
        {t('submit_cv', locale)}
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-8 sm:pt-4 overflow-y-auto overscroll-contain"
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false) }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative w-full max-w-lg max-h-[calc(100vh-4rem)] sm:max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 id="apply-modal-title" className="text-lg font-bold text-gray-900">
                  {t('apply_to_offer', locale)}
                </h2>
                <p className="text-sm text-gray-500 truncate max-w-[350px]">{jobTitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100"
                aria-label={t('close', locale)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {formState.success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('application_sent', locale)}</h3>
                  <p className="text-gray-600 mb-4">{t('application_sent_message', locale)}</p>
                  <button onClick={() => setIsOpen(false)} className="text-primary font-semibold hover:underline">
                    {t('close', locale)}
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="apply-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t('name', locale)} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="apply-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={t('name_placeholder', locale)}
                      className={inputClassName}
                      disabled={isPending}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="apply-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t('email', locale)} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="apply-email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder={t('email_placeholder', locale)}
                      className={inputClassName}
                      disabled={isPending}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="apply-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t('phone', locale)} <span className="text-gray-400 font-normal">({t('optional', locale)})</span>
                    </label>
                    <input
                      type="tel"
                      id="apply-phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder={t('phone_placeholder', locale)}
                      className={inputClassName}
                      disabled={isPending}
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label htmlFor="apply-cv" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t('cv_upload', locale)} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="apply-cv"
                      name="cv_file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      disabled={isPending}
                    />
                    <p className="mt-1 text-xs text-gray-500">{t('cv_formats', locale)}</p>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label htmlFor="apply-cover" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t('cover_letter', locale)} <span className="text-gray-400 font-normal">({t('optional', locale)})</span>
                    </label>
                    <textarea
                      id="apply-cover"
                      name="cover_letter"
                      rows={3}
                      placeholder={t('cover_letter_placeholder', locale)}
                      className={`${inputClassName} resize-none`}
                      disabled={isPending}
                    />
                  </div>

                  {/* Privacy Consent */}
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="apply-privacy"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      disabled={isPending}
                    />
                    <label htmlFor="apply-privacy" className="text-sm text-gray-600">
                      {t('privacy_consent', locale)}{' '}
                      <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        {t('privacy_policy', locale)}
                      </a>{' '}
                      {t('privacy_consent_suffix', locale)}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                  </div>

                  {/* Error */}
                  {formState.error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl" role="alert">
                      <p className="text-sm text-red-700">{formState.error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending || !cvFile || !privacyConsent}
                    className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <svg className="motion-safe:animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('submitting', locale)}
                      </>
                    ) : (
                      t('submit_application', locale)
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer */}
            {!formState.success && (
              <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">{t('cv_stored_securely', locale)}</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
