// Centralized Supabase Query Functions
// This file contains all database queries with proper TypeScript typing

import { supabase } from '@/lib/supabaseClient';
import type {
  Organization,
  Project,
  Task,
  Comment,
  Profile,
  OrganizationMember,
  Invitation,
  ActivityLog,
  Subscription,
  InsertOrganization,
  InsertProject,
  InsertTask,
  InsertComment,
  InsertInvitation,
  UpdateProject,
  UpdateTask,
  MemberRole,
  TaskStatus,
  ProjectStatus,
} from '@/types/database';

// =====================================================
// PROFILES
// =====================================================

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

// =====================================================
// ORGANIZATIONS
// =====================================================

export async function getUserOrganizations(userId: string) {
  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      organization_id,
      role,
      organizations (*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data.map((item) => ({
    ...item.organizations,
    user_role: item.role,
  })) as (Organization & { user_role: MemberRole })[];
}

export async function getOrganization(organizationId: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      *,
      owner:profiles!organizations_owner_id_fkey(*),
      subscription:subscriptions(*)
    `)
    .eq('id', organizationId)
    .single();

  if (error) throw error;
  return data;
}

export async function createOrganization(org: InsertOrganization) {
  const { data, error } = await supabase
    .from('organizations')
    .insert(org)
    .select()
    .single();

  if (error) throw error;
  return data as Organization;
}

export async function updateOrganization(
  organizationId: string,
  updates: Partial<Organization>
) {
  const { data, error } = await supabase
    .from('organizations')
    .update(updates)
    .eq('id', organizationId)
    .select()
    .single();

  if (error) throw error;
  return data as Organization;
}

export async function deleteOrganization(organizationId: string) {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', organizationId);

  if (error) throw error;
}

// =====================================================
// ORGANIZATION MEMBERS
// =====================================================

export async function getOrganizationMembers(organizationId: string) {
  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq('organization_id', organizationId)
    .order('joined_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserRole(organizationId: string, userId: string) {
  const { data, error } = await supabase
    .from('organization_members')
    .select('role')
    .eq('organization_id', organizationId)
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data.role as MemberRole;
}

export async function updateMemberRole(
  organizationId: string,
  userId: string,
  role: MemberRole
) {
  const { data, error } = await supabase
    .from('organization_members')
    .update({ role })
    .eq('organization_id', organizationId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as OrganizationMember;
}

export async function removeMember(organizationId: string, userId: string) {
  const { error } = await supabase
    .from('organization_members')
    .delete()
    .eq('organization_id', organizationId)
    .eq('user_id', userId);

  if (error) throw error;
}

// =====================================================
// PROJECTS
// =====================================================

export async function getOrganizationProjects(
  organizationId: string,
  status?: ProjectStatus
) {
  let query = supabase
    .from('projects')
    .select(`
      *,
      created_by_profile:profiles!projects_created_by_fkey(*)
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      created_by_profile:profiles!projects_created_by_fkey(*),
      organization:organizations(*)
    `)
    .eq('id', projectId)
    .single();

  if (error) throw error;
  return data;
}

export async function createProject(project: InsertProject) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function updateProject(projectId: string, updates: UpdateProject) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase.from('projects').delete().eq('id', projectId);

  if (error) throw error;
}

// =====================================================
// TASKS
// =====================================================

export async function getProjectTasks(projectId: string, status?: TaskStatus[]) {
  let query = supabase
    .from('tasks')
    .select(`
      *,
      assignee:profiles!tasks_assignee_id_fkey(*),
      created_by_profile:profiles!tasks_created_by_fkey(*)
    `)
    .eq('project_id', projectId)
    .order('position', { ascending: true });

  if (status && status.length > 0) {
    query = query.in('status', status);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getTask(taskId: string) {
  const { data, error} = await supabase
    .from('tasks')
    .select(`
      *,
      assignee:profiles!tasks_assignee_id_fkey(*),
      created_by_profile:profiles!tasks_created_by_fkey(*),
      project:projects(*)
    `)
    .eq('id', taskId)
    .single();

  if (error) throw error;
  return data;
}

export async function createTask(task: InsertTask) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function updateTask(taskId: string, updates: UpdateTask) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) throw error;
}

// =====================================================
// COMMENTS
// =====================================================

export async function getTaskComments(taskId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createComment(comment: InsertComment) {
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select(`
      *,
      profile:profiles(*)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateComment(commentId: string, content: string) {
  const { data, error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId)
    .select()
    .single();

  if (error) throw error;
  return data as Comment;
}

export async function deleteComment(commentId: string) {
  const { error } = await supabase.from('comments').delete().eq('id', commentId);

  if (error) throw error;
}

// =====================================================
// INVITATIONS
// =====================================================

export async function getOrganizationInvitations(organizationId: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select(`
      *,
      invited_by_profile:profiles!invitations_invited_by_fkey(*)
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createInvitation(invitation: InsertInvitation) {
  const { data, error } = await supabase
    .from('invitations')
    .insert(invitation)
    .select()
    .single();

  if (error) throw error;
  return data as Invitation;
}

export async function getInvitationByToken(token: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select(`
      *,
      organization:organizations(*)
    `)
    .eq('token', token)
    .single();

  if (error) throw error;
  return data;
}

export async function acceptInvitation(invitationId: string, userId: string) {
  // Update invitation status
  const { data: invitation, error: invError } = await supabase
    .from('invitations')
    .update({
      status: 'accepted',
      responded_at: new Date().toISOString(),
    })
    .eq('id', invitationId)
    .select()
    .single();

  if (invError) throw invError;

  // Add user to organization
  const { error: memberError } = await supabase
    .from('organization_members')
    .insert({
      organization_id: invitation.organization_id,
      user_id: userId,
      role: invitation.role,
      invited_by: invitation.invited_by,
    });

  if (memberError) throw memberError;

  return invitation as Invitation;
}

export async function declineInvitation(invitationId: string) {
  const { data, error } = await supabase
    .from('invitations')
    .update({
      status: 'declined',
      responded_at: new Date().toISOString(),
    })
    .eq('id', invitationId)
    .select()
    .single();

  if (error) throw error;
  return data as Invitation;
}

export async function deleteInvitation(invitationId: string) {
  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', invitationId);

  if (error) throw error;
}

// =====================================================
// ACTIVITY LOGS
// =====================================================

export async function getOrganizationActivity(
  organizationId: string,
  limit: number = 50
) {
  const { data, error } = await supabase
    .from('activity_logs')
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// =====================================================
// SUBSCRIPTIONS
// =====================================================

export async function getOrganizationSubscription(organizationId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('organization_id', organizationId)
    .single();

  if (error) throw error;
  return data as Subscription;
}

export async function updateSubscription(
  organizationId: string,
  updates: Partial<Subscription>
) {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('organization_id', organizationId)
    .select()
    .single();

  if (error) throw error;
  return data as Subscription;
}
