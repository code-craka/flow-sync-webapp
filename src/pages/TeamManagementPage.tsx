import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Trash2, Shield, Crown, Edit3, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionGuard } from '@/components/shared/PermissionGuard';
import { InviteMemberDialog } from '@/components/team/InviteMemberDialog';
import { PendingInvitations } from '@/components/team/PendingInvitations';
import { getOrganizationMembers, updateMemberRole, removeMember } from '@/lib/supabase/queries';
import type { MemberRole } from '@/types';

interface OrganizationMember {
  id: string;
  user_id: string;
  organization_id: string;
  role: MemberRole;
  joined_at: string;
  profile?: {
    email: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

const TeamManagementPage = () => {
  const { currentOrganization } = useOrganization();
  const { user } = useAuth();
  const { toast } = useToast();
  const { canManageMembers, canChangeRoles, canRemoveMembers, userRole } = usePermissions();

  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);

  useEffect(() => {
    if (currentOrganization) {
      loadMembers();
    }
  }, [currentOrganization]);

  const loadMembers = async () => {
    if (!currentOrganization) return;

    try {
      setLoading(true);
      const orgMembers = await getOrganizationMembers(currentOrganization.id);
      setMembers(orgMembers as OrganizationMember[]);
    } catch (error) {
      console.error('Failed to load members:', error);
      toast({
        title: 'Failed to Load Members',
        description: 'Could not load organization members.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: MemberRole) => {
    if (!currentOrganization || !canChangeRoles) return;

    try {
      await updateMemberRole(memberId, newRole);

      toast({
        title: 'Role Updated',
        description: 'Member role has been updated successfully.',
        variant: 'success',
      });

      // Reload members
      await loadMembers();
    } catch (error: any) {
      console.error('Failed to update role:', error);

      toast({
        title: 'Failed to Update Role',
        description: error.message || 'Could not update member role.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveMember = async (memberId: string, memberEmail: string) => {
    if (!currentOrganization || !canRemoveMembers) return;

    setRemovingMemberId(memberId);

    try {
      await removeMember(memberId);

      toast({
        title: 'Member Removed',
        description: `${memberEmail} has been removed from the organization.`,
      });

      // Reload members
      await loadMembers();
    } catch (error: any) {
      console.error('Failed to remove member:', error);

      toast({
        title: 'Failed to Remove Member',
        description: error.message || 'Could not remove member from organization.',
        variant: 'destructive',
      });
    } finally {
      setRemovingMemberId(null);
    }
  };

  const getRoleBadgeColor = (role: MemberRole) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'admin':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'editor':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'viewer':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400';
    }
  };

  const getRoleIcon = (role: MemberRole) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-3 w-3 mr-1" />;
      case 'admin':
        return <Shield className="h-3 w-3 mr-1" />;
      case 'editor':
        return <Edit3 className="h-3 w-3 mr-1" />;
      case 'viewer':
        return <Eye className="h-3 w-3 mr-1" />;
    }
  };

  const canModifyMember = (member: OrganizationMember): boolean => {
    // Can't modify yourself
    if (member.user_id === user?.id) return false;

    // Only owners can modify other owners
    if (member.role === 'owner' && userRole !== 'owner') return false;

    // Admins can modify editors and viewers
    if (userRole === 'admin' && (member.role === 'editor' || member.role === 'viewer')) return true;

    // Owners can modify everyone
    return userRole === 'owner';
  };

  if (!currentOrganization) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Team Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Organization Selected</CardTitle>
            <CardDescription>
              Please select an organization from the switcher in the header.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Team Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage members and invitations for {currentOrganization.name}
            </p>
          </div>

          <PermissionGuard requiredRole="admin">
            <InviteMemberDialog />
          </PermissionGuard>
        </div>
      </motion.div>

      {/* Pending Invitations */}
      <PermissionGuard requiredRole="admin">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PendingInvitations />
        </motion.div>
      </PermissionGuard>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {members.length} member{members.length !== 1 ? 's' : ''} in this organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No members found in this organization.
              </div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Member</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[150px]">Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => {
                      const isCurrentUser = member.user_id === user?.id;
                      const canModify = canModifyMember(member);

                      return (
                        <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={
                                    member.profile?.avatar_url ||
                                    `https://avatar.vercel.sh/${member.profile?.email}.png?size=32`
                                  }
                                  alt={member.profile?.full_name || member.profile?.email}
                                />
                                <AvatarFallback>
                                  {member.profile?.full_name?.[0]?.toUpperCase() ||
                                    member.profile?.email?.[0]?.toUpperCase() ||
                                    'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {member.profile?.full_name || 'No Name'}
                                  {isCurrentUser && (
                                    <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-muted-foreground font-mono text-sm">
                            {member.profile?.email}
                          </TableCell>

                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                                member.role
                              )}`}
                            >
                              {getRoleIcon(member.role)}
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </span>
                          </TableCell>

                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(member.joined_at).toLocaleDateString()}
                          </TableCell>

                          <TableCell className="text-right">
                            {canModify ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {canChangeRoles && (
                                    <>
                                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                        Change Role
                                      </div>
                                      {(['owner', 'admin', 'editor', 'viewer'] as MemberRole[]).map(
                                        (role) => (
                                          <DropdownMenuItem
                                            key={role}
                                            onClick={() => handleRoleChange(member.id, role)}
                                            disabled={member.role === role}
                                            className="cursor-pointer"
                                          >
                                            <div className="flex items-center">
                                              {getRoleIcon(role)}
                                              <span className="capitalize">{role}</span>
                                            </div>
                                          </DropdownMenuItem>
                                        )
                                      )}
                                      <DropdownMenuSeparator />
                                    </>
                                  )}

                                  {canRemoveMembers && (
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                          onSelect={(e) => e.preventDefault()}
                                          className="cursor-pointer text-destructive focus:text-destructive"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Remove Member
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to remove{' '}
                                            <span className="font-semibold">
                                              {member.profile?.full_name || member.profile?.email}
                                            </span>{' '}
                                            from the organization? They will lose access to all
                                            projects and tasks.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleRemoveMember(
                                                member.id,
                                                member.profile?.email || 'member'
                                              )
                                            }
                                            disabled={removingMemberId === member.id}
                                            className="bg-destructive hover:bg-destructive/90"
                                          >
                                            {removingMemberId === member.id
                                              ? 'Removing...'
                                              : 'Remove Member'}
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : isCurrentUser ? (
                              <span className="text-xs text-muted-foreground">—</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">No access</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Permission Notice */}
      {!canManageMembers && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                You have <span className="font-semibold capitalize">{userRole}</span> permissions.
                Only Admins and Owners can manage team members.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TeamManagementPage;
