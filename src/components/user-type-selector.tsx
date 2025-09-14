'use client';

import { useUserTypeStore, USER_TYPE_LABELS } from '@/stores/user-type-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function UserTypeSelector() {
  const { currentUserType, setUserType } = useUserTypeStore();

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
