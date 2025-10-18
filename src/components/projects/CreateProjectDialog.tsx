import React, { useState } from 'react';
import { PlusCircle, Folder } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { createProject } from '@/lib/supabase/queries';
import type { ProjectStatus } from '@/types';

interface CreateProjectDialogProps {
  trigger?: React.ReactNode;
  onProjectCreated?: () => void;
}

const PROJECT_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#10B981' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Gray', value: '#6B7280' },
];

const PROJECT_ICONS = ['folder', 'briefcase', 'target', 'zap', 'heart', 'star', 'rocket', 'flag'];

export function CreateProjectDialog({ trigger, onProjectCreated }: CreateProjectDialogProps) {
  const { currentOrganization } = useOrganization();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(PROJECT_COLORS[0].value);
  const [icon, setIcon] = useState(PROJECT_ICONS[0]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentOrganization || !user) return;

    if (!name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Project name is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);

    try {
      await createProject({
        organization_id: currentOrganization.id,
        name: name.trim(),
        description: description.trim() || null,
        color,
        icon,
        status: 'active' as ProjectStatus,
        created_by: user.id,
      });

      toast({
        title: 'Project Created',
        description: `${name} has been created successfully.`,
        variant: 'success',
      });

      // Reset form
      setName('');
      setDescription('');
      setColor(PROJECT_COLORS[0].value);
      setIcon(PROJECT_ICONS[0]);
      setIsOpen(false);

      // Callback to refresh project list
      if (onProjectCreated) {
        onProjectCreated();
      }
    } catch (error: any) {
      console.error('Failed to create project:', error);

      toast({
        title: 'Failed to Create Project',
        description: error.message || 'Could not create project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const defaultTrigger = (
    <Button>
      <PlusCircle className="mr-2 h-5 w-5" />
      Create New Project
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to{' '}
            <span className="font-semibold">{currentOrganization?.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate}>
          <div className="grid gap-4 py-4">
            {/* Project Name */}
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="Website Redesign"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                disabled={isCreating}
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                disabled={isCreating}
                rows={3}
              />
            </div>

            {/* Color Picker */}
            <div className="grid gap-2">
              <Label>Color</Label>
              <div className="flex gap-2 flex-wrap">
                {PROJECT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      color === c.value
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                    disabled={isCreating}
                  />
                ))}
              </div>
            </div>

            {/* Icon Picker */}
            <div className="grid gap-2">
              <Label>Icon</Label>
              <div className="flex gap-2 flex-wrap">
                {PROJECT_ICONS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIcon(i)}
                    aria-label={`Select ${i} icon`}
                    title={`Select ${i} icon`}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
                      icon === i
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-muted-foreground/50'
                    }`}
                    disabled={isCreating}
                  >
                    <Folder className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
