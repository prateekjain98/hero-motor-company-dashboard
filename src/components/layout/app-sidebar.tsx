'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import * as NavData from '@/constants/data';
import { NavItem } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useUser } from '@clerk/nextjs';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle
} from '@tabler/icons-react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';
import { Icons } from '../icons';
export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise'
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { user } = useUser();
  const router = useRouter();

  // Determine which dashboard is active based on the URL
  // Default to Treasury Management
  let currentDashboard = 'Treasury Management';
  let currentNavItems = NavData.treasuryManagementNavItems;
  let currentBottomNavItems: NavItem[] =
    NavData.treasuryManagementBottomNavItems;

  if (pathname.includes('/dashboard/international-compliances')) {
    currentDashboard = 'International Compliances';
    currentNavItems = NavData.internationalCompliancesNavItems;
    currentBottomNavItems = [];
  } else if (
    pathname.includes('/dashboard/overview') ||
    pathname.includes('/dashboard/projects') ||
    pathname.includes('/dashboard/resources')
  ) {
    currentDashboard = 'Business Excellence';
    currentNavItems = NavData.businessExcellenceNavItems;
    currentBottomNavItems = [];
  }

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  const handleDashboardChange = (dashboard: string) => {
    switch (dashboard) {
      case 'International Compliances':
        router.push('/dashboard/international-compliances');
        break;
      case 'Treasury Management':
        router.push('/dashboard/treasury-management');
        break;
      case 'Business Excellence':
      default:
        router.push('/dashboard/overview');
        break;
    }
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        {/* Header content removed/empty as per original design */}
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <div className='mb-4 flex items-center px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'>
            <div className='mr-2 group-data-[collapsible=icon]:mr-0'>
              <div className='relative h-10 w-20'>
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
            </div>
            <span className='bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-sm font-semibold text-transparent group-data-[collapsible=icon]:hidden'>
              Hero Motors Company
            </span>
          </div>

          <div className='mb-4 flex px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='hover:bg-sidebar-accent border-sidebar-border flex w-full cursor-pointer items-center gap-2 rounded-md border px-2 py-2 transition-colors group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2'>
                  <div className='flex h-5 w-5 items-center justify-center'>
                    <IconChevronsDown className='size-4' />
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                    <span className='truncate font-medium'>
                      {currentDashboard}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[200px] rounded-lg'
                align='start'
                side='bottom'
                sideOffset={4}
              >
                <DropdownMenuLabel className='text-muted-foreground text-xs'>
                  Switch Dashboard
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleDashboardChange('Business Excellence')}
                  className='gap-2 p-2'
                >
                  <div className='flex h-6 w-6 items-center justify-center rounded-sm border'>
                    <Icons.dashboard className='h-4 w-4' />
                  </div>
                  Business Excellence
                  {currentDashboard === 'Business Excellence' && (
                    <IconChevronRight className='ml-auto h-4 w-4' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleDashboardChange('International Compliances')
                  }
                  className='gap-2 p-2'
                >
                  <div className='flex h-6 w-6 items-center justify-center rounded-sm border'>
                    <Icons.post className='h-4 w-4' />
                  </div>
                  Intl. Compliances
                  {currentDashboard === 'International Compliances' && (
                    <IconChevronRight className='ml-auto h-4 w-4' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDashboardChange('Treasury Management')}
                  className='gap-2 p-2'
                >
                  <div className='flex h-6 w-6 items-center justify-center rounded-sm border'>
                    <Icons.billing className='h-4 w-4' />
                  </div>
                  Treasury Management
                  {currentDashboard === 'Treasury Management' && (
                    <IconChevronRight className='ml-auto h-4 w-4' />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <SidebarMenu>
            {currentNavItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Bottom Nav Items (e.g., Settings) */}
        {currentBottomNavItems.length > 0 && (
          <SidebarGroup className='mt-auto'>
            <SidebarMenu>
              {currentBottomNavItems.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5'>
                    {user && (
                      <UserAvatarProfile
                        className='h-8 w-8 rounded-lg'
                        showInfo
                        user={user}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard/profile')}
                  >
                    <IconUserCircle className='mr-2 h-4 w-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconBell className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconLogout className='mr-2 h-4 w-4' />
                  <SignOutButton redirectUrl='/auth/sign-in' />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
