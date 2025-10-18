import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { createTask, getOrganizationMembers } from '@/lib/supabase/queries';
import { useOrganization } from '@/contexts/OrganizationContext';
import type { TaskStatus, TaskPriority } from '@/types';

interface CreateTaskDialogProps {
  projectId: string;
  trigger?: React.ReactNode;
  onTaskCreated?: () => void;
}

export function CreateTaskDialog({ projectId, trigger, onTaskCreated }: CreateTaskDialogProps) {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && currentOrganization) {
      loadMembers();
    }
  }, [isOpen, currentOrganization]);

  const loadMembers = async () => {
    if (!currentOrganization) return;

    try {
      const orgMembers = await getOrganizationMembers(currentOrganization.id);
      setMembers(orgMembers);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (!title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Task title is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);

    try {
      await createTask({
        project_id: projectId,
        title: title.trim(),
        description: description.trim() || null,
        status,
        priority,
        assignee_id: assigneeId || null,
        created_by: user.id,
        due_date: dueDate || null,
        position: 0, // Will be updated by backend to be last
      });

      toast({
        title: 'Task Created',
        description: `${title} has been created successfully.`,
        variant: 'success',
      });

      // Reset form
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setAssigneeId('');
      setDueDate('');
      setIsOpen(false);

      // Callback to refresh task list
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error: any) {
      console.error('Failed to create task:', error);

      toast({
        title: 'Failed to Create Task',
        description: error.message || 'Could not create task. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const defaultTrigger = (
    <Button size="sm">
      <Plus className="mr-2 h-4 w-4" />
      New Task
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to this project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate}>
          <div className="grid gap-4 py-4">
            {/* Task Title */}
            <div className="grid gap-2">
              <Label htmlFor="task-title">Task Title *</Label>
              <Input
                id="task-title"
                placeholder="Implement user authentication"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                disabled={isCreating}
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                placeholder="Describe the task in detail..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                disabled={isCreating}
                rows={3}
              />
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as TaskStatus)}
                  disabled={isCreating}
                >
                  <SelectTrigger id="task-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as TaskPriority)}
                  disabled={isCreating}
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Assignee and Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-assignee">Assignee</Label>
                <Select
                  value={assigneeId}
                  onValueChange={setAssigneeId}
                  disabled={isCreating}
                >
                  <SelectTrigger id="task-assignee">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {members.map((member: any) => (
                      <SelectItem key={member.user_id} value={member.user_id}>
                        {member.profile?.full_name || member.profile?.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="task-due-date">Due Date</Label>
                <Input
                  id="task-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                  disabled={isCreating}
                />
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
              {isCreating ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
