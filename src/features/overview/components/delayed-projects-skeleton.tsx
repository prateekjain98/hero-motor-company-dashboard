import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DelayedProjectsSkeleton() {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base'>Top Delayed Projects</CardTitle>
        <CardDescription className='text-xs'>
          <Skeleton className='h-3 w-32' />
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='space-y-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='flex items-center gap-3'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-gray-200 bg-gray-50'>
                <Skeleton className='h-5 w-5' />
              </div>
              <div className='min-w-0 flex-1'>
                <Skeleton className='mb-1 h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
              <Skeleton className='h-4 w-16' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
