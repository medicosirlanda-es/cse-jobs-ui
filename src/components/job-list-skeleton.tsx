interface JobListSkeletonProps {
  count?: number
  columns?: 2 | 3
}

export function JobListSkeleton({ count = 6, columns = 3 }: JobListSkeletonProps) {
  const gridClass = columns === 2
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[260px] rounded-xl border border-gray-200 bg-white p-5 animate-pulse"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
            <div className="h-4 w-14 bg-gray-100 rounded-full ml-auto" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-100 rounded mb-3" />
          <div className="space-y-2 mb-4">
            <div className="h-3 w-full bg-gray-100 rounded" />
            <div className="h-3 w-5/6 bg-gray-100 rounded" />
            <div className="h-3 w-2/3 bg-gray-100 rounded" />
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-7 w-20 bg-gray-100 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
