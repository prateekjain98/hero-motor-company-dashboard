import { NavItem } from '@/types';

export type ProjectStage = 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export type TimelineEventType =
  | 'project_created'
  | 'stage_moved'
  | 'approval_requested'
  | 'approval_granted'
  | 'approval_rejected'
  | 'project_updated';

export type TimelineEvent = {
  id: string;
  type: TimelineEventType;
  timestamp: string;
  title: string;
  description: string;
  user: string;
  user_role: string;
  stage?: ProjectStage;
  from_stage?: ProjectStage;
  to_stage?: ProjectStage;
  metadata?: Record<string, any>;
};

export type CompanyGroup =
  | 'hero-cycles'
  | 'hero-motors'
  | 'hmc-hive'
  | 'munjal';

export type Department =
  | 'supply-chain'
  | 'hr'
  | 'finance'
  | 'rd'
  | 'manufacturing'
  | 'quality-assurance'
  | 'sales-marketing'
  | 'it'
  | 'procurement'
  | 'operations';

export type Project = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  department: Department;
  company_group: CompanyGroup;
  updated_at: string;
  stage: ProjectStage;
  pending_approval?: {
    from_stage: ProjectStage;
    to_stage: ProjectStage;
    requested_by: string;
    requested_at: string;
    approver_type: 'function-head' | 'bu-cfo';
    // For L4 transitions that need both approvers
    required_approvers?: Array<'function-head' | 'bu-cfo'>;
    completed_approvers?: Array<'function-head' | 'bu-cfo'>;
  };
  timeline: TimelineEvent[];
};

export type ResourceUsageEntry = {
  id: number;
  plant_name: string;
  plant_location: string;
  entry_month: string; // YYYY-MM format
  paint_consumption: number; // liters
  energy_consumption: number; // kWh
  raw_material_usage: number; // kg
  water_consumption: number; // liters
  gas_consumption: number; // cubic meters
  chemical_usage: number; // kg
  waste_generated: number; // kg
  production_output: number; // units produced
  efficiency_rating: number; // percentage
  cost_total: number;
  entered_by: string;
  entry_date: string;
  notes: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const businessExcellenceNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Projects',
    url: '/dashboard/projects',
    icon: 'folder',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Resources',
    url: '/dashboard/resources',
    icon: 'box',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] // No child items
  }
];

export const internationalCompliancesNavItems: NavItem[] = [
  {
    title: 'Overview',
    url: '/dashboard/international-compliances',
    icon: 'dashboard',
    isActive: false,
    items: []
  },
  {
    title: 'Audit Reports',
    url: '/dashboard/international-compliances/audit-reports',
    icon: 'post',
    isActive: false,
    items: []
  },
  {
    title: 'Global Standards',
    url: '/dashboard/international-compliances/global-standards',
    icon: 'settings',
    isActive: false,
    items: []
  }
];

export const treasuryManagementNavItems: NavItem[] = [
  {
    title: 'Overview',
    url: '/dashboard/treasury-management',
    icon: 'dashboard',
    isActive: false,
    items: []
  },
  {
    title: 'Transactions',
    url: '/dashboard/treasury-management/transactions',
    icon: 'billing',
    isActive: false,
    items: []
  },
  {
    title: 'Digital Library',
    url: '/dashboard/treasury-management/digital-library',
    icon: 'folder',
    isActive: false,
    items: []
  },
  {
    title: 'Analytics',
    url: '/dashboard/treasury-management/analytics',
    icon: 'analytics',
    isActive: false,
    items: []
  }
];

export const treasuryManagementBottomNavItems: NavItem[] = [
  {
    title: 'Settings',
    url: '/dashboard/treasury-management/settings',
    icon: 'settings',
    isActive: false,
    items: []
  }
];

// Default export for backward compatibility if needed, though we should update consumers
export const navItems = businessExcellenceNavItems;

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
