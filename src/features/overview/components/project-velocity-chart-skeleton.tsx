import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectVelocityChartSkeleton() {
  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Skeleton className='h-4 w-4' />
              Project Pipeline Analytics
            </CardTitle>
            <CardDescription className='mt-1 text-xs'>
              <Skeleton className='h-3 w-64' />
            </CardDescription>
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-20 rounded-full' />
            <Skeleton className='h-6 w-24 rounded-full' />
            <Skeleton className='h-6 w-20 rounded-full' />
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col px-0 pt-0'>
        {/* Chart Area - Increased height */}
        <div className='flex-1 px-4'>
          <Skeleton className='h-full min-h-[280px] w-full' />
        </div>

        {/* Performance Summary */}
        <div className='mt-4 space-y-3 border-t px-4 pt-4'>
          {/* Overall Metrics Row */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='text-center'>
                  <Skeleton className='mb-1 h-6 w-8' />
                  <Skeleton className='h-3 w-12' />
                </div>
              ))}
            </div>

            <div className='text-right'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-6 w-12' />
              </div>
              <Skeleton className='mt-1 h-3 w-16' />
            </div>
          </div>

          {/* Stage Performance */}
          <div>
            <Skeleton className='mb-2 h-4 w-32' />
            <div className='space-y-2'>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className='flex items-center gap-3'>
                  <div className='flex w-16 items-center gap-1'>
                    <Skeleton className='h-3 w-6' />
                    <Skeleton className='h-3 w-8' />
                  </div>

                  <div className='flex-1'>
                    <div className='mb-1 flex justify-between'>
                      <Skeleton className='h-3 w-16' />
                      <Skeleton className='h-3 w-8' />
                    </div>
                    <Skeleton className='h-2 w-full rounded-full' />
                  </div>

                  <Skeleton className='h-2 w-2 rounded-full' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
