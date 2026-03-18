import type { Job, Locale } from '../types'
import { formatSalary } from '../utils/format'

interface JobPostingSchemaOptions {
  siteUrl: string
  jobUrl: string
  organizationName: string
  organizationUrl: string
  organizationLogo?: string
  locale: Locale
}

export function generateJobPostingSchema(job: Job, options: JobPostingSchemaOptions) {
  const { siteUrl, jobUrl, organizationName, organizationUrl, organizationLogo, locale } = options

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.descriptionHtml || job.descriptionSummary || '',
    datePosted: job.publishedAt || new Date().toISOString(),
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.county,
        addressCountry: 'IE',
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: organizationName,
      sameAs: organizationUrl,
      ...(organizationLogo ? { logo: organizationLogo } : {}),
    },
    url: jobUrl,
    employmentType: mapEmploymentType(job.contractType),
  }

  if (job.closingDate) {
    schema.validThrough = job.closingDate
  }

  if (job.salary?.min || job.salary?.max) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: {
        '@type': 'QuantitativeValue',
        ...(job.salary.min ? { minValue: job.salary.min } : {}),
        ...(job.salary.max ? { maxValue: job.salary.max } : {}),
        unitText: job.salary.type === 'annual' ? 'YEAR' : job.salary.type === 'hourly' ? 'HOUR' : 'MONTH',
      },
    }
  }

  return schema
}

function mapEmploymentType(contractType?: string | null): string {
  switch (contractType) {
    case 'permanent': return 'FULL_TIME'
    case 'fixed-term': return 'CONTRACT'
    case 'locum': return 'TEMPORARY'
    case 'maternity': return 'TEMPORARY'
    default: return 'FULL_TIME'
  }
}

export function generateItemListSchema(jobs: { title: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: job.title,
      url: job.url,
    })),
  }
}
