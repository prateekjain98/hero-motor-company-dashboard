'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/constants/data';
import { ProjectTimeline } from './project-timeline';
import {
  Calendar,
  Hash,
  IndianRupee,
  Clock,
  Factory,
  Users,
  Target,
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Zap,
  TrendingUp,
  Play,
  Pause
} from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  // Mock manufacturing-specific data (in real app, this would come from API)
  const manufacturingData = {
    subsidiary: 'Hero MotoCorp Ltd.',
    plant: 'Gurgaon Manufacturing Plant',
    projectManager: 'Rajesh Kumar',
    department: 'R&D - Product Development',
    priority: 'High',
    phase: 'Design & Prototyping',
    targetMarket: 'Domestic & Export',
    expectedLaunch: 'Q2 2024',
    resourcesAllocated: 45,
    teamSize: 12,
    compliance: ['ISO 9001', 'BS VI Emission', 'AIS Standards']
  };

  const getStatusInfo = () => {
    const status = project.category.toLowerCase();
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bg: 'bg-green-50',
          text: 'Active'
        };
      case 'pending':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          text: 'Pending'
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          text: 'Completed'
        };
      default:
        return {
          icon: XCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          text: 'Inactive'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'L0':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'L1':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'L2':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'L3':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'L4':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'L5':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Format budget display
  let budgetDisplay = '';
  if (project.price >= 10000000) {
    budgetDisplay = `₹${(project.price / 10000000).toFixed(2)} Cr`;
  } else if (project.price >= 100000) {
    budgetDisplay = `₹${(project.price / 100000).toFixed(2)} L`;
  } else {
    budgetDisplay = `₹${project.price.toLocaleString()}`;
  }

  // Format dates
  const createdDate = new Date(project.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const updatedDate = new Date(project.updated_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <div className='mb-2 flex items-center gap-3'>
            <Hash className='text-muted-foreground h-5 w-5' />
            <span className='text-muted-foreground font-mono text-lg font-semibold'>
              HMC-{String(project.id).padStart(4, '0')}
            </span>
            <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
              <StatusIcon className='mr-1 h-3 w-3' />
              {statusInfo.text}
            </Badge>
            <Badge className={`${getStageColor(project.stage)} font-medium`}>
              <TrendingUp className='mr-1 h-3 w-3' />
              Stage {project.stage}
            </Badge>
            {project.pending_approval && (
              <Badge
                variant='outline'
                className='border-amber-200 bg-amber-50 text-amber-700'
              >
                <Clock className='mr-1 h-3 w-3' />
                Pending Approval
              </Badge>
            )}
          </div>
          <h1 className='mb-1 text-3xl font-bold text-gray-900'>
            {project.name}
          </h1>
          <p className='text-muted-foreground'>
            {manufacturingData.department}
          </p>
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Content - 2 columns */}
        <div className='space-y-6 lg:col-span-2'>
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Briefcase className='h-5 w-5' />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase'>
                  Description
                </h3>
                <p className='text-sm leading-relaxed text-gray-700'>
                  {project.description}
                </p>
              </div>

              <Separator />

              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-3'>
                  <div>
                    <h4 className='text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase'>
                      Project Phase
                    </h4>
                    <p className='text-sm font-medium'>
                      {manufacturingData.phase}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase'>
                      Priority Level
                    </h4>
                    <Badge
                      variant={
                        manufacturingData.priority === 'High'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {manufacturingData.priority}
                    </Badge>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div>
                    <h4 className='text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase'>
                      Target Market
                    </h4>
                    <p className='text-sm font-medium'>
                      {manufacturingData.targetMarket}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase'>
                      Expected Launch
                    </h4>
                    <p className='text-sm font-medium'>
                      {manufacturingData.expectedLaunch}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manufacturing Details */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Factory className='h-5 w-5' />
                Manufacturing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Building2 className='text-muted-foreground h-4 w-4' />
                    <div>
                      <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                        Subsidiary
                      </p>
                      <p className='text-sm font-medium'>
                        {manufacturingData.subsidiary}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <MapPin className='text-muted-foreground h-4 w-4' />
                    <div>
                      <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                        Manufacturing Plant
                      </p>
                      <p className='text-sm font-medium'>
                        {manufacturingData.plant}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Users className='text-muted-foreground h-4 w-4' />
                    <div>
                      <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                        Project Manager
                      </p>
                      <p className='text-sm font-medium'>
                        {manufacturingData.projectManager}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <Target className='text-muted-foreground h-4 w-4' />
                    <div>
                      <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                        Team Size
                      </p>
                      <p className='text-sm font-medium'>
                        {manufacturingData.teamSize} members
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <ProjectTimeline timeline={project.timeline} />

          {/* Compliance & Standards */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Zap className='h-5 w-5' />
                Compliance & Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {manufacturingData.compliance.map((standard, index) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {standard}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Budget Card */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <IndianRupee className='h-5 w-5' />
                Project Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-primary mb-2 text-3xl font-bold'>
                {budgetDisplay}
              </div>
              <p className='text-muted-foreground text-xs'>
                Total allocated budget
              </p>
            </CardContent>
          </Card>

          {/* Resource Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Factory className='h-5 w-5' />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>
                  Allocated Resources
                </span>
                <span className='font-semibold'>
                  {manufacturingData.resourcesAllocated}%
                </span>
              </div>
              <div className='h-2 w-full rounded-full bg-gray-200'>
                <div
                  className='bg-primary h-2 rounded-full'
                  style={{ width: `${manufacturingData.resourcesAllocated}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='h-5 w-5' />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <div className='mb-1 flex items-center gap-2'>
                  <Calendar className='text-muted-foreground h-4 w-4' />
                  <span className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                    Project Started
                  </span>
                </div>
                <p className='pl-6 text-sm font-medium'>{createdDate}</p>
              </div>

              <Separator />

              <div>
                <div className='mb-1 flex items-center gap-2'>
                  <Clock className='text-muted-foreground h-4 w-4' />
                  <span className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                    Last Updated
                  </span>
                </div>
                <p className='pl-6 text-sm font-medium'>{updatedDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
