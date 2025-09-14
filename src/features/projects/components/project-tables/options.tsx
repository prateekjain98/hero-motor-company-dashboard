import {
  Building2,
  Users,
  DollarSign,
  Lightbulb,
  Factory,
  Shield,
  TrendingUp,
  Monitor,
  ShoppingCart,
  Settings
} from 'lucide-react';

export const DEPARTMENT_OPTIONS = [
  { value: 'supply-chain', label: 'Supply Chain', icon: ShoppingCart },
  { value: 'hr', label: 'Human Resources', icon: Users },
  { value: 'finance', label: 'Finance', icon: DollarSign },
  { value: 'rd', label: 'R&D', icon: Lightbulb },
  { value: 'manufacturing', label: 'Manufacturing', icon: Factory },
  { value: 'quality-assurance', label: 'Quality Assurance', icon: Shield },
  { value: 'sales-marketing', label: 'Sales & Marketing', icon: TrendingUp },
  { value: 'it', label: 'Information Technology', icon: Monitor },
  { value: 'procurement', label: 'Procurement', icon: Building2 },
  { value: 'operations', label: 'Operations', icon: Settings }
];

// Keep for backward compatibility if needed elsewhere
export const CATEGORY_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' }
];
