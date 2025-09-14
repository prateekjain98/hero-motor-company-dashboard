'use client';
import { cn } from '@/lib/utils';

interface AuthBackgroundAnimationProps {
  className?: string;
  children?: React.ReactNode;
}

export const AuthBackgroundAnimation = ({
  className,
  children
}: AuthBackgroundAnimationProps) => {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100' />

      {/* Animated gradient orbs */}
      <div className='absolute inset-0'>
        {/* First orb - dark red */}
        <div
          className='animate-first absolute h-96 w-96 rounded-full opacity-30 blur-3xl'
          style={{
            background:
              'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(220, 38, 38, 0) 70%)',
            top: '10%',
            left: '10%'
          }}
        />

        {/* Second orb - medium red */}
        <div
          className='animate-second absolute h-80 w-80 rounded-full opacity-25 blur-2xl'
          style={{
            background:
              'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0) 70%)',
            top: '60%',
            left: '60%'
          }}
        />

        {/* Third orb - light red */}
        <div
          className='animate-third absolute h-64 w-64 rounded-full opacity-20 blur-2xl'
          style={{
            background:
              'radial-gradient(circle, rgba(248, 113, 113, 0.3) 0%, rgba(248, 113, 113, 0) 70%)',
            top: '30%',
            left: '70%'
          }}
        />

        {/* Fourth orb - lighter red */}
        <div
          className='animate-fourth absolute h-72 w-72 rounded-full opacity-15 blur-xl'
          style={{
            background:
              'radial-gradient(circle, rgba(252, 165, 165, 0.4) 0%, rgba(252, 165, 165, 0) 70%)',
            top: '70%',
            left: '20%'
          }}
        />

        {/* Fifth orb - lightest red */}
        <div
          className='animate-fifth absolute h-56 w-56 rounded-full opacity-10 blur-xl'
          style={{
            background:
              'radial-gradient(circle, rgba(254, 202, 202, 0.5) 0%, rgba(254, 202, 202, 0) 70%)',
            top: '40%',
            left: '40%'
          }}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 h-full w-full'>{children}</div>
    </div>
  );
};
