import { useOrganization } from '@/contexts/OrganizationContext';
import type { MemberRole } from '@/types';

/**
 * Hook to check user permissions within the current organization
 *
 * @example
 * const { hasPermission, userRole, canEdit, canDelete } = usePermissions();
 *
 * if (canEdit) {
 *   // Show edit button
 * }
 */
export function usePermissions() {
  const { getUserRole, hasPermission } = useOrganization();

  const userRole = getUserRole();

  // Convenience flags for common permission checks
  const isOwner = userRole === 'owner';
  const isAdmin = hasPermission('admin'); // owner or admin
  const canEdit = hasPermission('editor'); // owner, admin, or editor
  const canView = hasPermission('viewer'); // any role

  // Permission level checks
  const canManageMembers = isAdmin; // Only admins and owners
  const canManageProjects = isAdmin; // Only admins and owners
  const canDeleteOrganization = isOwner; // Only owners
  const canEditOrganization = isAdmin; // Only admins and owners
  const canInviteMembers = isAdmin; // Only admins and owners
  const canRemoveMembers = isAdmin; // Only admins and owners
  const canChangeRoles = isAdmin; // Only admins and owners

  // Task/Project permissions
  const canCreateTasks = canEdit; // Editors can create tasks
  const canEditTasks = canEdit; // Editors can edit tasks
  const canDeleteTasks = isAdmin; // Only admins can delete tasks
  const canAssignTasks = canEdit; // Editors can assign tasks

  return {
    // Role info
    userRole,
    isOwner,
    isAdmin,
    canEdit,
    canView,

    // Organization permissions
    canDeleteOrganization,
    canEditOrganization,

    // Member management permissions
    canManageMembers,
    canInviteMembers,
    canRemoveMembers,
    canChangeRoles,

    // Project permissions
    canManageProjects,

    // Task permissions
    canCreateTasks,
    canEditTasks,
    canDeleteTasks,
    canAssignTasks,

    // Generic permission check
    hasPermission,
  };
}
