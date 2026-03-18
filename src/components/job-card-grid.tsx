import type { ReactNode } from 'react'
import type { JobListItem, Locale } from '../types'
import { JobCard, type JobCardProps } from './job-card'

interface JobCardGridProps {
  jobs: JobListItem[]
  locale: Locale
  getHref: (job: JobListItem) => string
  variant?: JobCardProps['variant']
  renderWrapper?: JobCardProps['renderWrapper']
  columns?: 2 | 3
}

export function JobCardGrid({
  jobs,
  locale,
  getHref,
  variant = 'default',
  renderWrapper,
  columns = 3,
}: JobCardGridProps) {
  const gridClass = columns === 2
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <div className={gridClass}>
      {jobs.map((job, index) => (
        <JobCard
          key={job.id}
          job={job}
          locale={locale}
          href={getHref(job)}
          index={index}
          variant={variant}
          renderWrapper={renderWrapper}
        />
      ))}
    </div>
  )
}
