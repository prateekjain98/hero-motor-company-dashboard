'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { delayedProjectsData } from '@/constants/mock-api';
import Image from 'next/image';

export function DelayedProjects() {
  const totalDelayedValue = delayedProjectsData.reduce(
    (sum, project) => sum + project.value,
    0
  );

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base'>Top Delayed Projects</CardTitle>
        <CardDescription className='text-xs'>
          {delayedProjectsData.length} projects • ₹
          {totalDelayedValue.toFixed(0)} Cr at risk
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='space-y-4'>
          {delayedProjectsData.slice(0, 5).map((project) => (
            <div key={project.id} className='flex items-center gap-3'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-gray-200 bg-gray-50'>
                <Image
                  src={project.companyLogo}
                  alt={project.company}
                  width={20}
                  height={20}
                  className='h-5 w-5 object-contain'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>{project.name}</p>
                <p className='text-muted-foreground truncate text-xs'>
                  {project.department} • {project.delayedDays}d late
                </p>
              </div>
              <div className='text-destructive text-sm font-medium'>
                ₹{project.value} Cr
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
