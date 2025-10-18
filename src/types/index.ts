// FlowSync Application Types

export * from './database'

// Auth types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

export interface Session {
  user: User
  access_token: string
  refresh_token?: string
  expires_at?: number
}

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>
  signOut: () => Promise<void>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<void>
  signInWithOTP: (email: string) => Promise<void>
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<void>
}

// Organization context types
export interface OrganizationContextType {
  currentOrganization: Organization | null
  organizations: Organization[]
  loading: boolean
  switchOrganization: (organizationId: string) => Promise<void>
  createOrganization: (name: string, slug: string) => Promise<Organization>
  updateOrganization: (id: string, data: Partial<Organization>) => Promise<void>
  deleteOrganization: (id: string) => Promise<void>
  getUserRole: () => MemberRole | null
  hasPermission: (requiredRole: MemberRole) => boolean
}

// Theme types
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  resolvedTheme: 'light' | 'dark'
}

// API Response types
export interface APIResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  count: number
  page: number
  per_page: number
  total_pages: number
}

// UI State types
export interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export interface Dialog {
  isOpen: boolean
  title?: string
  description?: string
  onConfirm?: () => void
  onCancel?: () => void
}

// Form types
export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  email: string
  password: string
  full_name: string
  terms_accepted: boolean
}

export interface ProjectFormData {
  name: string
  description?: string
  color?: string
  icon?: string
}

export interface TaskFormData {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  assignee_id?: string
  due_date?: string
}

export interface InviteMemberFormData {
  email: string
  role: MemberRole
}

// Filter and sort types
export interface ProjectFilters {
  status?: ProjectStatus
  search?: string
  created_by?: string
}

export interface TaskFilters {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  assignee_id?: string[]
  search?: string
  due_date_from?: string
  due_date_to?: string
}

export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  key: string
  direction: SortDirection
}

// View types for project workspace
export type WorkspaceView = 'list' | 'kanban' | 'calendar' | 'mindmap' | 'timeline'

// Notification types
export interface Notification {
  id: string
  type: 'task_assigned' | 'comment_added' | 'project_update' | 'member_joined'
  title: string
  message: string
  read: boolean
  created_at: string
  link?: string
  actor?: User
}

// Activity feed types
export interface ActivityItem {
  id: string
  user: User
  action: string
  entity_type: string
  entity_name: string
  created_at: string
  metadata?: Record<string, any>
}

// Subscription/billing types
export interface UsageLimits {
  projects: { used: number; limit: number }
  members: { used: number; limit: number }
  storage: { used: number; limit: number } // in MB
}

export interface PlanFeatures {
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    projects: number
    members: number
    storage: number
  }
}

// Onboarding types
export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// Re-export database types for convenience
export type {
  Organization,
  Project,
  Task,
  Profile,
  Comment,
  Invitation,
  ActivityLog,
  Subscription,
  MemberRole,
  ProjectStatus,
  TaskStatus,
  TaskPriority,
  SubscriptionPlan,
  SubscriptionStatus,
} from './database'
