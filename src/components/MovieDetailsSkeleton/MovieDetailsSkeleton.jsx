import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Header Skeleton */}
      <section className="relative min-h-[60vh] overflow-hidden bg-card">
        <Skeleton className="absolute inset-0" />

        {/* Back Button Skeleton */}
        <div className="absolute top-6 left-6 z-20">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="relative z-10 container mx-auto px-4 h-full min-h-[60vh] flex items-end pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
            {/* Poster Skeleton */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <Skeleton className="w-64 h-96 lg:w-80 lg:h-[480px] rounded-2xl" />
            </div>

            {/* Info Skeleton */}
            <div className="lg:col-span-9 space-y-6 text-center lg:text-left">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-12 lg:h-16 w-3/4 mx-auto lg:mx-0" />
                <Skeleton className="h-6 w-1/2 mx-auto lg:mx-0" />
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-20 rounded-full" />
                <Skeleton className="h-10 w-28 rounded-full" />
                <Skeleton className="h-8 w-12 rounded-md" />
              </div>

              {/* Genres */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-md" />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Skeleton className="h-12 w-48 rounded-md" />
                <Skeleton className="h-12 w-56 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section Skeleton */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </div>
            </div>

            {/* Cast */}
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Movie Info */}
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>

            {/* Production Companies */}
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
