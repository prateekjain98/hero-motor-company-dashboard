'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  healthyProjectsData,
  delayedProjectsData,
  companyProjectStats
} from '@/constants/mock-api';
import Image from 'next/image';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthyProject {
  id: number;
  name: string;
  company: string;
  companyLogo: string;
  department: string;
  value: number;
  status: string;
  completionPercentage: number;
  projectManager: string;
  timeline: string;
  healthScore: number;
}

interface DelayedProject {
  id: number;
  name: string;
  company: string;
  companyLogo: string;
  department: string;
  value: number;
  delayedDays: number;
  projectManager: string;
}

export function TopProjectsOverview() {
  // Get company stats and organize projects
  const projectsOverview = companyProjectStats.map((stats) => {
    // Get top healthy project for this company
    const topHealthy = healthyProjectsData
      .filter((project: HealthyProject) => project.company === stats.company)
      .sort(
        (a: HealthyProject, b: HealthyProject) => b.healthScore - a.healthScore
      )[0];

    // Get top delayed project for this company
    const topDelayed = delayedProjectsData
      .filter(
        (project: DelayedProject) =>
          project.company === stats.company ||
          (stats.company === 'Munjal' && project.company === 'Munjal Kiru')
      )
      .sort((a: DelayedProject, b: DelayedProject) => b.value - a.value)[0];

    return {
      ...stats,
      topHealthy,
      topDelayed
    };
  });

  const totalProjects = companyProjectStats.reduce(
    (sum, company) => sum + company.totalProjects,
    0
  );
  const totalHealthy = companyProjectStats.reduce(
    (sum, company) => sum + company.healthyProjects,
    0
  );
  const totalDelayed = companyProjectStats.reduce(
    (sum, company) => sum + company.delayedProjects,
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead':
        return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400';
      case 'on-track':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDelayColor = (days: number) => {
    if (days <= 15) return 'text-yellow-600 dark:text-yellow-400';
    if (days <= 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-base'>
              <ChevronRight className='h-4 w-4 text-gray-600' />
              Top Projects Overview
            </CardTitle>
            <CardDescription className='mt-1 text-xs'>
              {totalProjects} total projects • {totalHealthy} healthy •{' '}
              {totalDelayed} delayed
            </CardDescription>
          </div>
          <div className='flex gap-2'>
            <Badge
              variant='outline'
              className='bg-green-50 dark:bg-green-950/20'
            >
              <CheckCircle2 className='mr-1 h-3 w-3 text-green-600' />
              Top Healthy
            </Badge>
            <Badge variant='outline' className='bg-red-50 dark:bg-red-950/20'>
              <AlertTriangle className='mr-1 h-3 w-3 text-red-600' />
              Top Delayed
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 px-0 pt-0'>
        <div className='divide-y divide-gray-100 dark:divide-gray-800'>
          {projectsOverview.map((company, index) => (
            <div key={company.company} className='px-4 py-3'>
              {/* Company Header */}
              <div className='mb-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'>
                    <Image
                      src={company.logo}
                      alt={company.company}
                      width={16}
                      height={16}
                      className='h-4 w-4 object-contain'
                    />
                  </div>
                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    {company.company}
                  </span>
                </div>
                <div className='text-muted-foreground flex items-center gap-3 text-xs'>
                  <span>{company.totalProjects} total projects</span>
                  <span>•</span>
                  <span className='text-green-600'>
                    {company.healthyProjects} healthy
                  </span>
                  <span>•</span>
                  <span className='text-red-600'>
                    {company.delayedProjects} delayed
                  </span>
                </div>
              </div>

              {/* Projects Grid */}
              <div className='ml-9 grid grid-cols-1 gap-2 lg:grid-cols-2'>
                {/* Top Healthy Project */}
                {company.topHealthy && (
                  <div className='rounded-lg border border-green-100 bg-green-50/30 p-3 dark:border-green-900/20 dark:bg-green-950/10'>
                    <div className='mb-2 flex items-start justify-between'>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium'>
                          {company.topHealthy.name}
                        </p>
                        <div className='text-muted-foreground mt-1 flex items-center gap-2 text-xs'>
                          <span>{company.topHealthy.department}</span>
                          <span>•</span>
                          <span className='flex items-center gap-1'>
                            <Clock className='h-3 w-3' />
                            {company.topHealthy.timeline}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant='secondary'
                        className={cn(
                          'shrink-0 text-xs',
                          getStatusColor(company.topHealthy.status)
                        )}
                      >
                        {company.topHealthy.status === 'ahead'
                          ? 'Ahead'
                          : 'On Track'}
                      </Badge>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-muted-foreground'>Value</span>
                        <span className='font-medium'>
                          ₹{company.topHealthy.value} Cr
                        </span>
                      </div>

                      <div>
                        <div className='mb-1 flex items-center justify-between text-xs'>
                          <span className='text-muted-foreground'>
                            Progress
                          </span>
                          <span className='font-medium'>
                            {company.topHealthy.completionPercentage}%
                          </span>
                        </div>
                        <Progress
                          value={company.topHealthy.completionPercentage}
                          className='h-1.5'
                        />
                      </div>

                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-muted-foreground'>
                          Health Score
                        </span>
                        <span
                          className={cn(
                            'font-bold',
                            getHealthColor(company.topHealthy.healthScore)
                          )}
                        >
                          {company.topHealthy.healthScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Delayed Project */}
                {company.topDelayed && (
                  <div className='rounded-lg border border-red-100 bg-red-50/30 p-3 dark:border-red-900/20 dark:bg-red-950/10'>
                    <div className='mb-2 flex items-start justify-between'>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium'>
                          {company.topDelayed.name}
                        </p>
                        <div className='text-muted-foreground mt-1 flex items-center gap-2 text-xs'>
                          <span>{company.topDelayed.department}</span>
                          <span>•</span>
                          <span>{company.topDelayed.projectManager}</span>
                        </div>
                      </div>
                      <Badge variant='destructive' className='shrink-0 text-xs'>
                        Delayed
                      </Badge>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-muted-foreground'>
                          Value at Risk
                        </span>
                        <span className='font-medium text-red-600'>
                          ₹{company.topDelayed.value} Cr
                        </span>
                      </div>

                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-muted-foreground'>Delay</span>
                        <span
                          className={cn(
                            'font-bold',
                            getDelayColor(company.topDelayed.delayedDays)
                          )}
                        >
                          {company.topDelayed.delayedDays} days late
                        </span>
                      </div>

                      <div className='mt-2 rounded bg-red-100 px-2 py-1 dark:bg-red-950/30'>
                        <p className='text-xs text-red-700 dark:text-red-400'>
                          ⚠️ Requires immediate attention
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
