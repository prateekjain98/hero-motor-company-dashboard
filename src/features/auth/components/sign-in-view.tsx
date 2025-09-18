import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import AuthLeftSection from './auth-left-section';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='elegant-bg relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0'>
      <AuthLeftSection />
      <div className='relative flex h-full items-center justify-center bg-white/80 p-4 lg:col-span-2 lg:p-8'>
        <div className='animate-fade-in animate-delay-600 relative z-10 flex w-full max-w-md flex-col items-center justify-center'>
          <div className='w-full'>
            <ClerkSignInForm
              initialValues={{
                emailAddress: 'your_mail+clerk_test@example.com'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
