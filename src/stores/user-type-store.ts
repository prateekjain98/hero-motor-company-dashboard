import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserType {
  GROUP = 'group',
  BU_CFO = 'bu-cfo',
  FUNCTION_HEAD = 'function-head',
  PROJECT_MANAGER = 'project-manager',
  TREASURY_EXECUTIVE = 'treasury-executive'
}

export const USER_TYPE_LABELS = {
  [UserType.GROUP]: 'Group',
  [UserType.BU_CFO]: 'CFO',
  [UserType.FUNCTION_HEAD]: 'Function Head',
  [UserType.PROJECT_MANAGER]: 'Project Manager',
  [UserType.TREASURY_EXECUTIVE]: 'Treasury Executive'
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
      currentUserType: UserType.GROUP,
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
