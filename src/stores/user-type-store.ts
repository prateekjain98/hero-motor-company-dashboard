import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserType {
  SUPER_ADMIN = 'super-admin',
  GROUP_CFO = 'group-cfo',
  BUSINESS_HEAD = 'business-head',
  PROJECT_MANAGER = 'project-manager'
}

export const USER_TYPE_LABELS = {
  [UserType.SUPER_ADMIN]: 'Super Admin',
  [UserType.GROUP_CFO]: 'Group CFO',
  [UserType.BUSINESS_HEAD]: 'Business Head',
  [UserType.PROJECT_MANAGER]: 'Project Manager'
} as const;

export type UserTypeState = {
  currentUserType: UserType;
  _hasHydrated: boolean;
};

export type UserTypeActions = {
  setUserType: (userType: UserType) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useUserTypeStore = create<UserTypeState & UserTypeActions>()(
  persist(
    (set) => ({
      currentUserType: UserType.SUPER_ADMIN,
      _hasHydrated: false,
      setUserType: (userType: UserType) => set({ currentUserType: userType }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state })
    }),
    {
      name: 'user-type-store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
