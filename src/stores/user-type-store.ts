import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserType {
  PMO = 'pmo',
  BU_CFO = 'bu-cfo',
  FUNCTION_HEAD = 'function-head',
  PROJECT_MANAGER = 'project-manager'
}

export const USER_TYPE_LABELS = {
  [UserType.PMO]: 'PMO',
  [UserType.BU_CFO]: 'BU CFO',
  [UserType.FUNCTION_HEAD]: 'Function Head',
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
      currentUserType: UserType.PMO,
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
