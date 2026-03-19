import type { ReactNode } from 'react'

type PillSize = 'xs' | 'sm' | 'md'

interface JobPillProps {
  icon?: ReactNode
  children: ReactNode
  size?: PillSize
}

const SIZE_CLASSES: Record<PillSize, string> = {
  xs: 'px-2 py-0.5 text-[10px] gap-1 rounded-md',
  sm: 'px-3 py-1.5 text-[11px] gap-1.5 rounded-lg',
  md: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-xl',
}

export function JobPill({ icon, children, size = 'sm' }: JobPillProps) {
  return (
    <span className={`job-pill inline-flex items-center font-semibold tracking-wide ${SIZE_CLASSES[size]}`}>
      {icon && <span className="shrink-0 job-pill-icon">{icon}</span>}
      {children}
    </span>
  )
}

export function LocationIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export function CalendarIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
