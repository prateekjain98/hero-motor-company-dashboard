'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Project } from '@/constants/data';
import { fakeProjects } from '@/constants/mock-api';
import { useUserTypeStore } from '@/stores/user-type-store';
import {
  IconEdit,
  IconDotsVertical,
  IconTrash,
  IconTrendingUp,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CellActionProps {
  data: Project;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { currentUserType } = useUserTypeStore();

  const onConfirm = async () => {};

  const handleStageProgression = async () => {
    setLoading(true);
    try {
      const result = await fakeProjects.moveToNextStage(
        data.id,
        currentUserType
      );
      if (result.success) {
        toast.success(result.message);
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to move to next stage');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async () => {
    setLoading(true);
    try {
      const result = await fakeProjects.approveStageProgression(
        data.id,
        currentUserType
      );
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to approve');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRejection = async () => {
    setLoading(true);
    try {
      const result = await fakeProjects.rejectStageProgression(
        data.id,
        currentUserType
      );
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to reject');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const canMoveToNextStage = () => {
    const stages = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];
    const currentIndex = stages.indexOf(data.stage);
    return currentIndex < stages.length - 1 && !data.pending_approval;
  };

  const canApprove = () => {
    if (!data.pending_approval) return false;

    const { approver_type, required_approvers, completed_approvers } =
      data.pending_approval;

    // Group can always approve
    if (currentUserType === 'group') return true;

    // For multi-approval scenarios
    if (required_approvers && required_approvers.length > 1) {
      // Check if user is in required approvers and hasn't already approved
      const userRole = currentUserType as 'function-head' | 'bu-cfo';
      return (
        required_approvers.includes(userRole) &&
        !(completed_approvers || []).includes(userRole)
      );
    }

    // Single approval scenario
    return (
      (approver_type === 'function-head' &&
        currentUserType === 'function-head') ||
      (approver_type === 'bu-cfo' && currentUserType === 'bu-cfo')
    );
  };

  const getNextStage = () => {
    const stages = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];
    const currentIndex = stages.indexOf(data.stage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/projects/${data.id}`)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> View Details
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Stage Management */}
          {canMoveToNextStage() && (
            <DropdownMenuItem
              onClick={handleStageProgression}
              disabled={loading}
            >
              <IconTrendingUp className='mr-2 h-4 w-4' />
              Move to {getNextStage()}
            </DropdownMenuItem>
          )}

          {data.pending_approval && canApprove() && (
            <>
              <DropdownMenuItem
                onClick={handleApproval}
                disabled={loading}
                className='text-green-600'
              >
                <IconCheck className='mr-2 h-4 w-4' />
                Approve ({data.pending_approval.to_stage})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRejection}
                disabled={loading}
                className='text-red-600'
              >
                <IconX className='mr-2 h-4 w-4' />
                Reject Request
              </DropdownMenuItem>
            </>
          )}

          {data.pending_approval && !canApprove() && (
            <DropdownMenuItem disabled>
              <IconTrendingUp className='mr-2 h-4 w-4' />
              Awaiting Approval
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
