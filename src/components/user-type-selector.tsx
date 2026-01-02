'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useUserTypeStore,
  USER_TYPE_LABELS,
  UserType
} from '@/stores/user-type-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function UserTypeSelector() {
  const { currentUserType, setUserType, _hasHydrated } = useUserTypeStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to Treasury Executive portal when Treasury Executive is selected
  useEffect(() => {
    if (
      isMounted &&
      _hasHydrated &&
      currentUserType === UserType.TREASURY_EXECUTIVE
    ) {
      router.push('/dashboard/treasury-executive');
    }
  }, [currentUserType, isMounted, _hasHydrated, router]);

  // Don't render until the component is mounted and the store has hydrated
  if (!isMounted || !_hasHydrated) {
    return (
      <Select disabled>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Loading...' />
        </SelectTrigger>
      </Select>
    );
  }

  const handleUserTypeChange = (value: string) => {
    setUserType(value as UserType);
    // Immediately redirect if Treasury Executive is selected
    if (value === UserType.TREASURY_EXECUTIVE) {
      router.push('/dashboard/treasury-executive');
    } else {
      // Navigate to overview for other user types
      router.push('/dashboard/overview');
    }
  };

  return (
    <Select value={currentUserType} onValueChange={handleUserTypeChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select user type' />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(USER_TYPE_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
