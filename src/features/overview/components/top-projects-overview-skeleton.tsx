import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TopProjectsOverviewSkeleton() {
  const companies = ['Hero Motors', 'Hero Cycles', 'HMC Hive', 'Munjal'];

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Skeleton className='h-4 w-4' />
              Top Projects Overview
            </CardTitle>
            <CardDescription className='mt-1 text-xs'>
              <Skeleton className='h-3 w-64' />
            </CardDescription>
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-24 rounded-full' />
            <Skeleton className='h-6 w-24 rounded-full' />
          </div>
        </div>
      </CardHeader>

      <CardContent className='px-0 pt-0'>
        <div className='divide-y divide-gray-100 dark:divide-gray-800'>
          {companies.map((company) => (
            <div key={company} className='px-4 py-3'>
              {/* Company Header Skeleton */}
              <div className='mb-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-7 w-7 rounded-lg' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-3 w-48' />
                </div>
              </div>

              {/* Projects Grid Skeleton */}
              <div className='ml-9 grid grid-cols-1 gap-2 lg:grid-cols-2'>
                {/* Healthy Project Skeleton */}
                <div className='rounded-lg border border-gray-100 p-3 dark:border-gray-800'>
                  <div className='mb-2 flex items-start justify-between'>
                    <div className='flex-1'>
                      <Skeleton className='mb-1 h-4 w-48' />
                      <Skeleton className='h-3 w-32' />
                    </div>
                    <Skeleton className='h-5 w-16 rounded-full' />
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-3 w-16' />
                    </div>
                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <Skeleton className='h-3 w-12' />
                        <Skeleton className='h-3 w-8' />
                      </div>
                      <Skeleton className='h-1.5 w-full rounded-full' />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-3 w-16' />
                      <Skeleton className='h-3 w-8' />
                    </div>
                  </div>
                </div>

                {/* Delayed Project Skeleton */}
                <div className='rounded-lg border border-gray-100 p-3 dark:border-gray-800'>
                  <div className='mb-2 flex items-start justify-between'>
                    <div className='flex-1'>
                      <Skeleton className='mb-1 h-4 w-48' />
                      <Skeleton className='h-3 w-32' />
                    </div>
                    <Skeleton className='h-5 w-16 rounded-full' />
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-3 w-16' />
                      <Skeleton className='h-3 w-16' />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-3 w-20' />
                    </div>
                    <Skeleton className='h-6 w-full rounded' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
