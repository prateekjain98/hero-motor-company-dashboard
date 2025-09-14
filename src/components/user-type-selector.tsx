'use client';

import { useEffect, useState } from 'react';
import { useUserTypeStore, USER_TYPE_LABELS } from '@/stores/user-type-store';
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  return (
    <Select value={currentUserType} onValueChange={setUserType}>
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
