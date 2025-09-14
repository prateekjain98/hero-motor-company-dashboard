'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Project } from '@/constants/data';
import { ProjectTimeline } from './project-timeline';
import { fakeProjects } from '@/constants/mock-api';
import { useUserTypeStore } from '@/stores/user-type-store';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  XCircle,
  Zap,
  TrendingUp
} from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { currentUserType } = useUserTypeStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);

  // Check if current user can approve the pending request
  const canApprove = () => {
    if (!project.pending_approval) return false;

    const { approver_type } = project.pending_approval;

    return (
      (approver_type === 'business-head' &&
        (currentUserType === 'business-head' ||
          currentUserType === 'super-admin')) ||
      (approver_type === 'group-cfo' &&
        (currentUserType === 'group-cfo' || currentUserType === 'super-admin'))
    );
  };

  // Handle approval action
  const handleApproval = async () => {
    if (!project.pending_approval || isProcessing) return;

    setIsProcessing(true);
    try {
      const result = await fakeProjects.approveStageProgression(
        project.id,
        currentUserType
      );

      if (result.success) {
        toast.success(result.message);
        // Refresh the page to show updated data
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to approve project');
      }
    } catch (error) {
      // TODO: Implement proper error logging
      toast.error('An error occurred while approving the project');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle rejection action with comments
  const handleRejection = async () => {
    if (!project.pending_approval || isProcessing || !rejectionComment.trim()) {
      if (!rejectionComment.trim()) {
        toast.error('Please provide feedback about what changes are required');
      }
      return;
    }

    setIsProcessing(true);
    try {
      const result = await fakeProjects.rejectStageProgression(
        project.id,
        currentUserType,
        rejectionComment.trim()
      );

      if (result.success) {
        toast.success(result.message);
        setIsRejectionDialogOpen(false);
        setRejectionComment('');
        // Refresh the page to show updated data
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to reject project');
      }
    } catch (error) {
      // TODO: Implement proper error logging
      toast.error('An error occurred while rejecting the project');
    } finally {
      setIsProcessing(false);
    }
  };

  // Open rejection dialog
  const openRejectionDialog = () => {
    setRejectionComment('');
    setIsRejectionDialogOpen(true);
  };

  // Helper function to get department display name
  const getDepartmentName = (department: string) => {
    const departmentMap: Record<string, string> = {
      'supply-chain': 'Supply Chain',
      hr: 'Human Resources',
      finance: 'Finance',
      rd: 'Research & Development',
      manufacturing: 'Manufacturing',
      'quality-assurance': 'Quality Assurance',
      'sales-marketing': 'Sales & Marketing',
      it: 'Information Technology',
      procurement: 'Procurement',
      operations: 'Operations'
    };
    return departmentMap[department] || department;
  };

  // Helper function to get company group name
  const getCompanyGroupName = (companyGroup: string) => {
    const companyMap: Record<string, string> = {
      'hero-cycles': 'Hero Cycles',
      'hero-motors': 'Hero Motors',
      'hmc-hive': 'HMC Hive',
      munjal: 'Munjal'
    };
    return companyMap[companyGroup] || companyGroup;
  };

  // Mock manufacturing-specific data (in real app, this would come from API)
  const manufacturingData = {
    subsidiary: getCompanyGroupName(project.company_group),
    plant: 'Gurgaon Manufacturing Plant',
    projectManager: 'Rajesh Kumar',
    department: getDepartmentName(project.department),
    priority: 'High',
    phase: 'Design & Prototyping',
    targetMarket: 'Domestic & Export',
    expectedLaunch: 'Q2 2024',
    resourcesAllocated: 45,
    teamSize: 12,
    compliance: ['ISO 9001', 'BS VI Emission', 'AIS Standards']
  };

  const getStatusInfo = () => {
    // Determine status based on stage (not pending approval)
    switch (project.stage) {
      case 'L0':
      case 'L1':
        return {
          icon: Clock,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          text: 'In Planning'
        };
      case 'L2':
      case 'L3':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bg: 'bg-green-50',
          text: 'In Progress'
        };
      case 'L4':
        return {
          icon: TrendingUp,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          text: 'Near Completion'
        };
      case 'L5':
        return {
          icon: CheckCircle2,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          text: 'Completed'
        };
      default:
        return {
          icon: XCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          text: 'Unknown'
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

      {/* Approval Actions Section */}
      {project.pending_approval && canApprove() && (
        <Card className='border-amber-200 bg-amber-50/50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-amber-800'>
              <Clock className='h-5 w-5' />
              Approval Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-amber-800'>
                  Stage Progression: {project.pending_approval.from_stage} →{' '}
                  {project.pending_approval.to_stage}
                </p>
                <p className='text-xs text-amber-700'>
                  Requested by {project.pending_approval.requested_by} on{' '}
                  {new Date(
                    project.pending_approval.requested_at
                  ).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className='flex gap-3'>
                <Dialog
                  open={isRejectionDialogOpen}
                  onOpenChange={setIsRejectionDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={openRejectionDialog}
                      disabled={isProcessing}
                      className='border-red-200 text-red-700 hover:bg-red-50'
                    >
                      <XCircle className='mr-2 h-4 w-4' />
                      Request Changes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>Request Changes</DialogTitle>
                      <DialogDescription>
                        Please provide specific feedback about what changes are
                        required for this project to proceed to stage{' '}
                        {project.pending_approval.to_stage}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div>
                        <Label htmlFor='rejection-comment'>
                          Required Changes
                        </Label>
                        <Textarea
                          id='rejection-comment'
                          placeholder='Describe what changes are needed...'
                          value={rejectionComment}
                          onChange={(e) => setRejectionComment(e.target.value)}
                          className='mt-2'
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant='outline'
                        onClick={() => setIsRejectionDialogOpen(false)}
                        disabled={isProcessing}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRejection}
                        disabled={isProcessing || !rejectionComment.trim()}
                        className='bg-red-600 text-white hover:bg-red-700'
                      >
                        {isProcessing
                          ? 'Processing...'
                          : 'Submit Changes Request'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  size='sm'
                  onClick={handleApproval}
                  disabled={isProcessing}
                  className='bg-green-600 text-white hover:bg-green-700'
                >
                  <CheckCircle2 className='mr-2 h-4 w-4' />
                  {isProcessing ? 'Processing...' : 'Approve'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Approval Info Section (for users who cannot approve) */}
      {project.pending_approval && !canApprove() && (
        <Card className='border-blue-200 bg-blue-50/50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-blue-800'>
              <Clock className='h-5 w-5' />
              Awaiting Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-blue-800'>
                Stage Progression: {project.pending_approval.from_stage} →{' '}
                {project.pending_approval.to_stage}
              </p>
              <p className='text-xs text-blue-700'>
                Requested by {project.pending_approval.requested_by} on{' '}
                {new Date(
                  project.pending_approval.requested_at
                ).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className='text-xs text-blue-600'>
                Waiting for approval from{' '}
                {project.pending_approval.approver_type === 'business-head'
                  ? 'Business Head'
                  : 'Group CFO'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
