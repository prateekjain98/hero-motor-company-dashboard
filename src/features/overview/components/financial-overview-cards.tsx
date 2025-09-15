'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { financialOverviewData } from '@/constants/mock-api';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export function FinancialOverviewCards() {
  const data = financialOverviewData;

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4'>
      {/* Card 1: Overall Target */}
      <Card className='@container/card transition-all duration-200 hover:shadow-md'>
        <CardHeader className='pb-4'>
          <CardDescription className='text-sm font-medium'>
            Overall FY Target
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₹{data.overallTarget.toLocaleString()} Cr
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              {data.targetPercentageOfRevenue}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-2 pt-0 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Target allocated to all companies{' '}
            <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            {data.targetPercentageOfRevenue}% of total group revenue
          </div>
        </CardFooter>
      </Card>

      {/* Card 2: Achievement Till Now */}
      <Card className='@container/card transition-all duration-200 hover:shadow-md'>
        <CardHeader className='pb-4'>
          <CardDescription className='text-sm font-medium'>
            Achievement Till Now
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₹{data.achievedAmount.toLocaleString()} Cr
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              {data.achievementPercentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-2 pt-0 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {parseFloat(data.achievementPercentage) >= 75
              ? 'Strong progress'
              : 'Needs attention'}{' '}
            <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            {data.achievementPercentage}% of allocated target achieved
          </div>
        </CardFooter>
      </Card>

      {/* Card 3: Delayed Projects */}
      <Card className='@container/card transition-all duration-200 hover:shadow-md'>
        <CardHeader className='pb-4'>
          <CardDescription className='text-sm font-medium'>
            Delayed Projects Value
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₹{data.delayedProjects.totalValue.toLocaleString()} Cr
          </CardTitle>
          <CardAction>
            <Badge variant='destructive'>
              <IconAlertTriangle />
              {data.delayedProjects.projectCount}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-2 pt-0 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Projects running behind schedule{' '}
            <IconAlertTriangle className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            {data.delayedProjects.projectCount} projects across all companies
          </div>
        </CardFooter>
      </Card>

      {/* Card 4: Idea Bank */}
      <Card
        className={cn(
          '@container/card transition-all duration-200 hover:shadow-md',
          data.isIdeaBankCritical && 'border-destructive bg-destructive/5',
          data.isIdeaBankGood &&
            'border-green-500 bg-green-50/50 dark:bg-green-950/10'
        )}
      >
        <CardHeader className='pb-4'>
          <CardDescription className='text-sm font-medium'>
            Idea Bank
          </CardDescription>
          <CardTitle
            className={cn(
              'text-2xl font-semibold tabular-nums @[250px]/card:text-3xl',
              data.isIdeaBankCritical && 'text-destructive',
              data.isIdeaBankGood && 'text-green-600 dark:text-green-500'
            )}
          >
            ₹{data.remainingToAchieve.toLocaleString()} Cr
          </CardTitle>
          <CardAction>
            <Badge
              variant={
                data.isIdeaBankCritical
                  ? 'destructive'
                  : data.isIdeaBankGood
                    ? 'outline'
                    : 'secondary'
              }
              className={cn(
                data.isIdeaBankGood && 'border-green-500 text-green-600'
              )}
            >
              {data.isIdeaBankCritical ? (
                <IconAlertTriangle />
              ) : data.isIdeaBankGood ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {data.ideaBankPercentage.toFixed(0)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-2 pt-0 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {data.isIdeaBankCritical
              ? 'Critical range - Action needed'
              : data.isIdeaBankGood
                ? 'Healthy pipeline'
                : 'Above critical range'}
            {data.isIdeaBankCritical ? (
              <IconAlertTriangle className='size-4' />
            ) : data.isIdeaBankGood ? (
              <IconTrendingUp className='size-4' />
            ) : (
              <IconTrendingDown className='size-4' />
            )}
          </div>
          <div
            className={cn(
              'text-muted-foreground',
              data.isIdeaBankCritical && 'text-destructive/70',
              data.isIdeaBankGood && 'text-green-600/70'
            )}
          >
            {data.isIdeaBankCritical
              ? '150-200% of budget - requires attention'
              : data.isIdeaBankGood
                ? 'Below 150% of budget - optimal range'
                : 'Above 200% of budget'}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
