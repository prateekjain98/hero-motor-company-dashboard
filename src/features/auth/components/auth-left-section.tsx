import Image from 'next/image';
import { AuthBackgroundAnimation } from '@/components/ui/auth-background-animation';

export default function AuthLeftSection() {
  return (
    <div className='relative hidden h-full flex-col overflow-hidden lg:col-span-3 lg:flex'>
      <AuthBackgroundAnimation className='absolute inset-0'>
        <div className='relative z-20 flex h-full flex-col p-10 text-gray-800'>
          <div className='animate-fade-in-up relative z-20 mb-12 flex items-center text-xl font-bold'>
            <div className='relative z-30 mr-3 h-12 w-20'>
              <Image
                src='/assets/logos/hmc.png'
                alt='Hero Motors Company'
                fill
                className='object-contain'
                priority
                quality={100}
                unoptimized
                style={{ filter: 'none', isolation: 'isolate' }}
              />
            </div>
            <span className='bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent'>
              Hero Motors Company
            </span>
          </div>

          {/* Group Companies Grid */}
          <div className='animate-fade-in-up animate-delay-200 relative z-20 -mt-8 flex flex-1 flex-col justify-center'>
            <div className='mb-8 text-center'>
              <h2 className='mb-2 text-2xl font-bold text-gray-800'>
                Our Group Companies
              </h2>
              <p className='text-gray-600'>
                Building excellence across industries
              </p>
            </div>
            <div className='relative z-30 mx-auto grid max-w-md grid-cols-2 gap-6'>
              <div className='logo-grid-item flex items-center justify-center rounded-2xl p-6 transition-all duration-300'>
                <div className='relative h-16 w-24'>
                  <Image
                    src='/assets/logos/hero-cycles.png'
                    alt='Hero Cycles'
                    fill
                    className='object-contain'
                    quality={100}
                    unoptimized
                    style={{ filter: 'none', isolation: 'isolate' }}
                  />
                </div>
              </div>
              <div className='logo-grid-item flex items-center justify-center rounded-2xl p-6 transition-all duration-300'>
                <div className='relative h-16 w-24'>
                  <Image
                    src='/assets/logos/hero-motors.png'
                    alt='Hero Motors'
                    fill
                    className='object-contain'
                    quality={100}
                    unoptimized
                    style={{ filter: 'none', isolation: 'isolate' }}
                  />
                </div>
              </div>
              <div className='logo-grid-item flex items-center justify-center rounded-2xl p-6 transition-all duration-300'>
                <div className='relative h-16 w-24'>
                  <Image
                    src='/assets/logos/hmc-hive.png'
                    alt='HMC Hive'
                    fill
                    className='object-contain'
                    quality={100}
                    unoptimized
                    style={{ filter: 'none', isolation: 'isolate' }}
                  />
                </div>
              </div>
              <div className='logo-grid-item flex items-center justify-center rounded-2xl p-6 transition-all duration-300'>
                <div className='relative h-16 w-24'>
                  <Image
                    src='/assets/logos/munjal.png'
                    alt='Munjal'
                    fill
                    className='object-contain'
                    quality={100}
                    unoptimized
                    style={{ filter: 'none', isolation: 'isolate' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className='animate-fade-in-up animate-delay-400 relative z-20'>
            <blockquote className='space-y-4 text-center'>
              <p className='text-lg leading-relaxed text-gray-600 italic'>
                &ldquo;Our goal is to become a world-renowned manufacturer that
                sets the bar for excellence in terms of efficiency, innovation,
                and quality.&rdquo;
              </p>
              <footer className='text-sm font-medium text-red-600'>
                Hero Motors Company Vision
              </footer>
            </blockquote>
          </div>
        </div>
      </AuthBackgroundAnimation>
    </div>
  );
}
