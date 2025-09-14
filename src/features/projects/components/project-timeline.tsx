'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime
} from '@/components/ui/timeline';
import { TimelineEvent, TimelineEventType } from '@/constants/data';
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
  User,
  XCircle,
  GitBranch
} from 'lucide-react';

interface ProjectTimelineProps {
  timeline: TimelineEvent[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
      case 'project_created':
        return Calendar;
      case 'stage_moved':
        return TrendingUp;
      case 'approval_requested':
        return Clock;
      case 'approval_granted':
        return CheckCircle2;
      case 'approval_rejected':
        return XCircle;
      case 'project_updated':
        return FileText;
      default:
        return GitBranch;
    }
  };

  const getEventVariant = (
    type: TimelineEventType
  ): 'default' | 'success' | 'warning' | 'destructive' | 'secondary' => {
    switch (type) {
      case 'project_created':
        return 'default';
      case 'stage_moved':
        return 'success';
      case 'approval_requested':
        return 'warning';
      case 'approval_granted':
        return 'success'; // Green for approved
      case 'approval_rejected':
        return 'destructive'; // Red for rejected
      case 'project_updated':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getEventBadgeVariant = (type: TimelineEventType) => {
    switch (type) {
      case 'project_created':
        return 'default';
      case 'stage_moved':
        return 'default';
      case 'approval_requested':
        return 'secondary';
      case 'approval_granted':
        return 'default'; // Keep consistent with success theme
      case 'approval_rejected':
        return 'destructive'; // Red badge for rejected
      case 'project_updated':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatEventType = (type: TimelineEventType) => {
    switch (type) {
      case 'project_created':
        return 'Project Created';
      case 'stage_moved':
        return 'Stage Progression';
      case 'approval_requested':
        return 'Approval Requested';
      case 'approval_granted':
        return 'Approved';
      case 'approval_rejected':
        return 'Rejected';
      case 'project_updated':
        return 'Project Updated';
      default:
        return 'Event';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  // Sort timeline by timestamp (most recent first)
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Clock className='h-5 w-5' />
          Project Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline>
          {sortedTimeline.map((event, index) => {
            const Icon = getEventIcon(event.type);
            const variant = getEventVariant(event.type);
            const badgeVariant = getEventBadgeVariant(event.type);

            return (
              <TimelineItem key={event.id}>
                <TimelineIcon variant={variant}>
                  <Icon className='h-5 w-5' />
                </TimelineIcon>
                <TimelineContent>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center justify-between'>
                        <TimelineTitle className='text-base'>
                          {event.title}
                        </TimelineTitle>
                        <TimelineTime
                          dateTime={event.timestamp}
                          className='text-muted-foreground text-xs font-medium'
                        >
                          {formatTimestamp(event.timestamp)}
                        </TimelineTime>
                      </div>

                      <TimelineDescription className='text-sm leading-relaxed text-gray-600'>
                        {event.description}
                      </TimelineDescription>

                      {/* Event metadata */}
                      <div className='flex items-center gap-2 pt-1'>
                        <Badge
                          variant={badgeVariant}
                          className={`text-xs font-medium ${
                            event.type === 'approval_granted'
                              ? 'border-green-200 bg-green-100 text-green-800'
                              : event.type === 'approval_rejected'
                                ? 'border-red-200 bg-red-100 text-red-800'
                                : ''
                          }`}
                        >
                          {formatEventType(event.type)}
                        </Badge>

                        {event.stage && (
                          <Badge variant='outline' className='text-xs'>
                            Stage {event.stage}
                          </Badge>
                        )}

                        {event.from_stage && event.to_stage && (
                          <Badge
                            variant='outline'
                            className='font-mono text-xs'
                          >
                            {event.from_stage} → {event.to_stage}
                          </Badge>
                        )}
                      </div>

                      {/* User information */}
                      <div className='flex items-center gap-2 pt-1'>
                        <User className='text-muted-foreground h-3 w-3' />
                        <span className='text-muted-foreground text-xs font-medium'>
                          {event.user}
                        </span>
                        <span className='text-muted-foreground text-xs'>•</span>
                        <span className='text-muted-foreground text-xs capitalize'>
                          {event.user_role.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </TimelineContent>
                {index < sortedTimeline.length - 1 && <TimelineConnector />}
              </TimelineItem>
            );
          })}
        </Timeline>

        {timeline.length === 0 && (
          <div className='text-muted-foreground flex items-center justify-center py-8'>
            <div className='text-center'>
              <Clock className='mx-auto mb-2 h-8 w-8 opacity-50' />
              <p className='text-sm'>No timeline events yet</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
