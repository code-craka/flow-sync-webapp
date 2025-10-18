import React, { useState } from 'react';
import { Check, ChevronsUpDown, Plus, Building2 } from 'lucide-react';
import { useOrganization } from '@/contexts/OrganizationContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export function OrganizationSwitcher() {
  const { currentOrganization, organizations, switchOrganization, createOrganization, loading } = useOrganization();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setNewOrgName(name);
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setNewOrgSlug(slug);
  };

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newOrgName.trim() || !newOrgSlug.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please provide both organization name and slug.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);

    try {
      await createOrganization(newOrgName.trim(), newOrgSlug.trim());

      toast({
        title: 'Organization Created',
        description: `${newOrgName} has been created successfully.`,
        variant: 'success',
      });

      // Reset form and close dialog
      setNewOrgName('');
      setNewOrgSlug('');
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      console.error('Failed to create organization:', error);

      toast({
        title: 'Failed to Create Organization',
        description: error.message || 'An error occurred while creating the organization.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSwitchOrganization = async (orgId: string) => {
    try {
      await switchOrganization(orgId);

      toast({
        title: 'Organization Switched',
        description: 'You are now working in a different organization.',
      });
    } catch (error: any) {
      console.error('Failed to switch organization:', error);

      toast({
        title: 'Failed to Switch Organization',
        description: error.message || 'An error occurred while switching organizations.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Button variant="outline" size="sm" disabled className="w-[200px]">
        <Building2 className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  if (!currentOrganization && organizations.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsCreateDialogOpen(true)}
        className="w-[200px]"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Organization
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-[200px] justify-between">
            <div className="flex items-center truncate">
              <Building2 className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">{currentOrganization?.name || 'Select Organization'}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {organizations.map((org) => (
            <DropdownMenuItem
              key={org.id}
              onClick={() => handleSwitchOrganization(org.id)}
              className="cursor-pointer"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  currentOrganization?.id === org.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <span className="truncate">{org.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsCreateDialogOpen(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Organization Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Create a new organization to manage projects and collaborate with your team.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateOrganization}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  placeholder="Acme Inc."
                  value={newOrgName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
                  disabled={isCreating}
                  autoFocus
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="org-slug">
                  URL Slug
                  <span className="ml-1 text-xs text-muted-foreground">
                    (auto-generated)
                  </span>
                </Label>
                <Input
                  id="org-slug"
                  placeholder="acme-inc"
                  value={newOrgSlug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOrgSlug(e.target.value)}
                  disabled={isCreating}
                  pattern="^[a-z0-9-]+$"
                  title="Only lowercase letters, numbers, and hyphens"
                />
                <p className="text-xs text-muted-foreground">
                  Used in URLs. Only lowercase letters, numbers, and hyphens.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Organization'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
