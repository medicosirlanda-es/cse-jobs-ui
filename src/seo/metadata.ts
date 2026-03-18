import type { Job, JobCategory, Locale } from '../types'
import { getCategoryLabel } from '../constants/categories'

interface MetadataOptions {
  siteUrl: string
  siteName: string
  locale: Locale
}

export function generateJobMetadata(job: Job, options: MetadataOptions) {
  const { siteUrl, siteName, locale } = options
  const description = job.descriptionSummary || job.title
  const titleSuffix = locale === 'es' ? 'Ofertas de empleo' : 'Healthcare Jobs'

  return {
    title: `${job.title} | ${titleSuffix} | ${siteName}`,
    description: description.substring(0, 160),
    openGraph: {
      title: job.title,
      description: description.substring(0, 200),
      type: 'website',
      siteName,
    },
    alternates: {
      canonical: `${siteUrl}/jobs/${job.slug}`,
    },
  }
}

export function generateListMetadata(options: MetadataOptions & { category?: JobCategory }) {
  const { siteUrl, siteName, locale, category } = options

  const title = category
    ? `${getCategoryLabel(category, locale)} | ${siteName}`
    : locale === 'es'
      ? `Ofertas de empleo médico en Irlanda | ${siteName}`
      : `Healthcare Jobs in Ireland | ${siteName}`

  const description = locale === 'es'
    ? `Encuentra ofertas de empleo médico en Irlanda. GP, Consultant, Registrar y más posiciones disponibles.`
    : `Find healthcare jobs in Ireland. GP, Consultant, Registrar and more positions available.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName,
    },
  }
}
