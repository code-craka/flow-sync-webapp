import React, { useState } from 'react';
import { Building2, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useNavigate } from 'react-router-dom';

export function OrganizationSettings() {
  const { currentOrganization, updateOrganization, deleteOrganization, hasPermission } = useOrganization();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [orgName, setOrgName] = useState(currentOrganization?.name || '');
  const [orgSlug, setOrgSlug] = useState(currentOrganization?.slug || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Check if user has permission to edit organization settings
  const canEdit = hasPermission('admin');
  const canDelete = hasPermission('owner');

  const handleUpdateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentOrganization || !canEdit) return;

    if (!orgName.trim() || !orgSlug.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Organization name and slug are required.',
        variant: 'destructive',
      });
      return;
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(orgSlug)) {
      toast({
        title: 'Invalid Slug',
        description: 'Slug can only contain lowercase letters, numbers, and hyphens.',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdating(true);

    try {
      await updateOrganization(currentOrganization.id, {
        name: orgName.trim(),
        slug: orgSlug.trim(),
      });

      toast({
        title: 'Organization Updated',
        description: 'Your organization details have been updated successfully.',
        variant: 'success',
      });
    } catch (error: any) {
      console.error('Failed to update organization:', error);

      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update organization details.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!currentOrganization || !canDelete) return;

    if (deleteConfirmation !== currentOrganization.name) {
      toast({
        title: 'Confirmation Required',
        description: 'Please type the organization name exactly to confirm deletion.',
        variant: 'destructive',
      });
      return;
    }

    setIsDeleting(true);

    try {
      await deleteOrganization(currentOrganization.id);

      toast({
        title: 'Organization Deleted',
        description: 'Your organization has been permanently deleted.',
      });

      // Navigate to dashboard after deletion
      navigate('/app/dashboard');
    } catch (error: any) {
      console.error('Failed to delete organization:', error);

      toast({
        title: 'Deletion Failed',
        description: error.message || 'Failed to delete organization.',
        variant: 'destructive',
      });

      setIsDeleting(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentOrganization || !canEdit) return;

    // TODO: Implement Supabase Storage upload
    toast({
      title: 'Coming Soon',
      description: 'Logo upload will be available soon with Supabase Storage integration.',
    });
  };

  if (!currentOrganization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Organization Selected</CardTitle>
          <CardDescription>
            Please select an organization from the switcher in the header.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Update your organization name, logo, and other basic information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={currentOrganization.logo_url || undefined}
                alt={currentOrganization.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                <Building2 className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Label
                htmlFor="logo-upload"
                className={canEdit ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              >
                <Button
                  variant="outline"
                  disabled={!canEdit}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  type="button"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Change Logo
                </Button>
              </Label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={!canEdit}
              />
              {!canEdit && (
                <p className="text-xs text-muted-foreground mt-2">
                  Only admins and owners can change the logo.
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleUpdateOrganization}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={orgName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrgName(e.target.value)}
                  placeholder="Acme Inc."
                  disabled={!canEdit || isUpdating}
                />
              </div>

              {/* Organization Slug */}
              <div className="space-y-2">
                <Label htmlFor="org-slug">
                  URL Slug
                  <span className="ml-1 text-xs text-muted-foreground">
                    (used in URLs)
                  </span>
                </Label>
                <Input
                  id="org-slug"
                  value={orgSlug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrgSlug(e.target.value)}
                  placeholder="acme-inc"
                  disabled={!canEdit || isUpdating}
                  pattern="^[a-z0-9-]+$"
                  title="Only lowercase letters, numbers, and hyphens"
                />
                <p className="text-xs text-muted-foreground">
                  Only lowercase letters, numbers, and hyphens allowed.
                </p>
              </div>
            </div>

            {/* Organization ID (Read-only) */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="org-id">Organization ID</Label>
              <Input
                id="org-id"
                value={currentOrganization.id}
                disabled
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">
                Use this ID for API integrations and webhooks.
              </p>
            </div>

            {canEdit && (
              <Button
                type="submit"
                className="mt-6"
                disabled={isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            )}

            {!canEdit && (
              <p className="text-sm text-muted-foreground mt-6">
                You need admin or owner permissions to edit organization settings.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      {canDelete && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible actions that will permanently delete your organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/5">
              <h4 className="font-semibold mb-2">Delete Organization</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete an organization, there is no going back. This will permanently delete:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mb-4">
                <li>All projects and tasks</li>
                <li>All team members and invitations</li>
                <li>All comments and activity history</li>
                <li>Subscription and billing information</li>
              </ul>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full md:w-auto">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Organization
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4">
                      <p>
                        This action cannot be undone. This will permanently delete the{' '}
                        <span className="font-semibold text-foreground">
                          {currentOrganization.name}
                        </span>{' '}
                        organization and remove all associated data from our servers.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="delete-confirmation">
                          Type <span className="font-mono font-semibold">{currentOrganization.name}</span> to confirm:
                        </Label>
                        <Input
                          id="delete-confirmation"
                          value={deleteConfirmation}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeleteConfirmation(e.target.value)}
                          placeholder={currentOrganization.name}
                          autoComplete="off"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteConfirmation('')}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteOrganization}
                      disabled={deleteConfirmation !== currentOrganization.name || isDeleting}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete Organization'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
