import React, { useEffect, useState } from 'react';
import { Mail, Trash2, Clock, Copy, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { useToast } from '@/components/ui/use-toast';
import { getOrganizationInvitations, deleteInvitation } from '@/lib/supabase/queries';
import type { Invitation } from '@/types';

// Helper function to format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

const formatDistanceToNow = (date: Date, options?: { addSuffix?: boolean }): string => {
  const result = formatTimeAgo(date);
  if (options?.addSuffix && !result.includes('ago')) {
    return `in ${result}`;
  }
  return result;
};

export function PendingInvitations() {
  const { currentOrganization } = useOrganization();
  const { toast } = useToast();

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (currentOrganization) {
      loadInvitations();
    }
  }, [currentOrganization]);

  const loadInvitations = async () => {
    if (!currentOrganization) return;

    try {
      setLoading(true);
      const invites = await getOrganizationInvitations(currentOrganization.id);

      // Filter only pending invitations
      const pending = invites.filter(inv => inv.status === 'pending');
      setInvitations(pending);
    } catch (error) {
      console.error('Failed to load invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = (token: string) => {
    const inviteUrl = `${window.location.origin}/accept-invitation?token=${token}`;
    navigator.clipboard.writeText(inviteUrl);

    toast({
      title: 'Link Copied',
      description: 'Invitation link copied to clipboard.',
      variant: 'success',
    });
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    setDeletingId(invitationId);

    try {
      await deleteInvitation(invitationId);

      toast({
        title: 'Invitation Revoked',
        description: 'The invitation has been revoked.',
      });

      // Reload invitations
      await loadInvitations();
    } catch (error: any) {
      console.error('Failed to revoke invitation:', error);

      toast({
        title: 'Failed to Revoke',
        description: error.message || 'Failed to revoke invitation.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'admin':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'editor':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400';
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const expirationDate = new Date(expiresAt);
    const now = new Date();

    if (expirationDate < now) {
      return 'Expired';
    }

    return `Expires ${formatDistanceToNow(expirationDate, { addSuffix: true })}`;
  };

  if (!currentOrganization) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>Loading invitations...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (invitations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>No pending invitations at the moment.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Mail className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              When you invite team members, they'll appear here until they accept or decline.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Invitations</CardTitle>
        <CardDescription>
          {invitations.length} pending invitation{invitations.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell className="font-medium font-mono text-sm">
                    {invitation.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                        invitation.role
                      )}`}
                    >
                      {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(invitation.created_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {getTimeRemaining(invitation.expires_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyLink(invitation.token)}
                        title="Copy invitation link"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deletingId === invitation.id}
                            title="Revoke invitation"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Revoke Invitation?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to revoke the invitation for{' '}
                              <span className="font-semibold font-mono">{invitation.email}</span>?
                              They will no longer be able to use this link to join the organization.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRevokeInvitation(invitation.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Revoke Invitation
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
