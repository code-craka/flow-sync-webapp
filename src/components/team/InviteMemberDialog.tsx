import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useToast } from '@/components/ui/use-toast';
import { createInvitation } from '@/lib/supabase/queries';
import { useAuth } from '@/contexts/AuthContext';
import type { MemberRole } from '@/types';

interface InviteMemberDialogProps {
  /** Optional trigger element, defaults to a button */
  trigger?: React.ReactNode;
}

export function InviteMemberDialog({ trigger }: InviteMemberDialogProps) {
  const { currentOrganization } = useOrganization();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<MemberRole>('viewer');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentOrganization || !user) return;

    // Validate email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsInviting(true);

    try {
      await createInvitation({
        organization_id: currentOrganization.id,
        email: email.trim().toLowerCase(),
        role,
        invited_by: user.id,
      });

      toast({
        title: 'Invitation Sent',
        description: `An invitation has been sent to ${email}`,
        variant: 'success',
      });

      // Reset form and close dialog
      setEmail('');
      setRole('viewer');
      setIsOpen(false);
    } catch (error: any) {
      console.error('Failed to send invitation:', error);

      toast({
        title: 'Invitation Failed',
        description: error.message || 'Failed to send invitation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsInviting(false);
    }
  };

  const defaultTrigger = (
    <Button>
      <UserPlus className="mr-2 h-4 w-4" />
      Invite Member
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join{' '}
            <span className="font-semibold">{currentOrganization?.name}</span>.
            They'll receive an email with instructions to accept the invitation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleInvite}>
          <div className="grid gap-4 py-4">
            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={isInviting}
                autoComplete="email"
                autoFocus
              />
            </div>

            {/* Role Select */}
            <div className="grid gap-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as MemberRole)}
                disabled={isInviting}
              >
                <SelectTrigger id="invite-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Owner</span>
                      <span className="text-xs text-muted-foreground">
                        Full access including billing and deletion
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Admin</span>
                      <span className="text-xs text-muted-foreground">
                        Manage projects, tasks, and members
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="editor">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Editor</span>
                      <span className="text-xs text-muted-foreground">
                        Create and edit projects and tasks
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Viewer</span>
                      <span className="text-xs text-muted-foreground">
                        View-only access to projects and tasks
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                You can change the role later from team settings.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isInviting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isInviting}>
              {isInviting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
