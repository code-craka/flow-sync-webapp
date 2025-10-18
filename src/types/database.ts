// FlowSync Database Types
// Auto-generated types matching our Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enums
export type MemberRole = 'owner' | 'admin' | 'editor' | 'viewer'
export type ProjectStatus = 'active' | 'archived' | 'completed'
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'expired'
export type ActivityType =
  | 'project_created'
  | 'project_updated'
  | 'project_archived'
  | 'task_created'
  | 'task_updated'
  | 'task_assigned'
  | 'task_completed'
  | 'comment_added'
  | 'member_added'
  | 'member_removed'
export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise'
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'cancelled' | 'unpaid'

// Table Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          logo_url?: string | null
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: MemberRole
          invited_by: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role?: MemberRole
          invited_by?: string | null
          joined_at?: string
        }
        Update: {
          role?: MemberRole
        }
      }
      projects: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          color: string
          icon: string
          status: ProjectStatus
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          color?: string
          icon?: string
          status?: ProjectStatus
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          color?: string
          icon?: string
          status?: ProjectStatus
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          status: TaskStatus
          priority: TaskPriority
          assignee_id: string | null
          created_by: string
          due_date: string | null
          position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          status?: TaskStatus
          priority?: TaskPriority
          assignee_id?: string | null
          created_by: string
          due_date?: string | null
          position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          status?: TaskStatus
          priority?: TaskPriority
          assignee_id?: string | null
          due_date?: string | null
          position?: number
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          task_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          content?: string
          updated_at?: string
        }
      }
      invitations: {
        Row: {
          id: string
          organization_id: string
          email: string
          role: MemberRole
          invited_by: string
          status: InvitationStatus
          token: string
          expires_at: string
          created_at: string
          responded_at: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          email: string
          role?: MemberRole
          invited_by: string
          status?: InvitationStatus
          token: string
          expires_at: string
          created_at?: string
          responded_at?: string | null
        }
        Update: {
          status?: InvitationStatus
          responded_at?: string | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          activity_type: ActivityType
          entity_type: string
          entity_id: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          activity_type: ActivityType
          entity_type: string
          entity_id: string
          metadata?: Json
          created_at?: string
        }
        Update: never
      }
      subscriptions: {
        Row: {
          id: string
          organization_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan: SubscriptionPlan
          status: SubscriptionStatus
          trial_ends_at: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: SubscriptionPlan
          status?: SubscriptionStatus
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: SubscriptionPlan
          status?: SubscriptionStatus
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_organization_member: {
        Args: {
          org_id: string
          user_id: string
        }
        Returns: boolean
      }
      get_user_role: {
        Args: {
          org_id: string
          user_id: string
        }
        Returns: MemberRole
      }
      has_role_level: {
        Args: {
          org_id: string
          user_id: string
          required_role: MemberRole
        }
        Returns: boolean
      }
    }
    Enums: {
      member_role: MemberRole
      project_status: ProjectStatus
      task_status: TaskStatus
      task_priority: TaskPriority
      invitation_status: InvitationStatus
      activity_type: ActivityType
      subscription_plan: SubscriptionPlan
      subscription_status: SubscriptionStatus
    }
  }
}

// Helper types for common use cases
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Organization = Database['public']['Tables']['organizations']['Row']
export type OrganizationMember = Database['public']['Tables']['organization_members']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
export type Invitation = Database['public']['Tables']['invitations']['Row']
export type ActivityLog = Database['public']['Tables']['activity_logs']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']

// Insert types
export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertOrganization = Database['public']['Tables']['organizations']['Insert']
export type InsertOrganizationMember = Database['public']['Tables']['organization_members']['Insert']
export type InsertProject = Database['public']['Tables']['projects']['Insert']
export type InsertTask = Database['public']['Tables']['tasks']['Insert']
export type InsertComment = Database['public']['Tables']['comments']['Insert']
export type InsertInvitation = Database['public']['Tables']['invitations']['Insert']

// Update types
export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateOrganization = Database['public']['Tables']['organizations']['Update']
export type UpdateProject = Database['public']['Tables']['projects']['Update']
export type UpdateTask = Database['public']['Tables']['tasks']['Update']
export type UpdateComment = Database['public']['Tables']['comments']['Update']
export type UpdateSubscription = Database['public']['Tables']['subscriptions']['Update']

// Extended types with relations
export interface ProjectWithDetails extends Project {
  created_by_profile?: Profile
  tasks_count?: number
  members_count?: number
}

export interface TaskWithDetails extends Task {
  assignee?: Profile
  created_by_profile?: Profile
  comments_count?: number
  project?: Project
}

export interface OrganizationWithDetails extends Organization {
  owner?: Profile
  members_count?: number
  projects_count?: number
  subscription?: Subscription
}

export interface OrganizationMemberWithProfile extends OrganizationMember {
  profile?: Profile
}

export interface ActivityLogWithProfile extends ActivityLog {
  profile?: Profile
}

export interface CommentWithProfile extends Comment {
  profile?: Profile
}
