import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Flag, Clock, Edit2, Save, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/components/ui/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { useOrganization } from '@/contexts/OrganizationContext';
import { TaskComments } from './TaskComments';
import { getTask, updateTask, deleteTask, getOrganizationMembers } from '@/lib/supabase/queries';
import type { Task, TaskStatus, TaskPriority } from '@/types';

interface TaskDetailModalProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated?: () => void;
  onTaskDeleted?: () => void;
}

export function TaskDetailModal({
  taskId,
  isOpen,
  onClose,
  onTaskUpdated,
  onTaskDeleted,
}: TaskDetailModalProps) {
  const { toast } = useToast();
  const { canEditTasks, canDeleteTasks } = usePermissions();
  const { currentOrganization } = useOrganization();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  // Editable fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (isOpen && taskId) {
      loadTask();
      loadMembers();
    }
  }, [isOpen, taskId]);

  const loadTask = async () => {
    if (!taskId) return;

    try {
      setLoading(true);
      const taskData = await getTask(taskId);
      setTask(taskData);

      // Initialize editable fields
      setTitle(taskData.title);
      setDescription(taskData.description || '');
      setStatus(taskData.status);
      setPriority(taskData.priority);
      setAssigneeId(taskData.assignee_id || '');
      setDueDate(taskData.due_date || '');
    } catch (error) {
      console.error('Failed to load task:', error);
      toast({
        title: 'Failed to Load Task',
        description: 'Could not load task details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    if (!currentOrganization) return;

    try {
      const orgMembers = await getOrganizationMembers(currentOrganization.id);
      setMembers(orgMembers);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  };

  const handleSave = async () => {
    if (!task || !canEditTasks) return;

    if (!title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Task title cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || null,
        status,
        priority,
        assignee_id: assigneeId || null,
        due_date: dueDate || null,
      });

      toast({
        title: 'Task Updated',
        description: 'Task has been updated successfully.',
        variant: 'success',
      });

      setIsEditing(false);
      await loadTask();

      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error: any) {
      console.error('Failed to update task:', error);

      toast({
        title: 'Failed to Update Task',
        description: error.message || 'Could not update task.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !canDeleteTasks) return;

    try {
      await deleteTask(task.id);

      toast({
        title: 'Task Deleted',
        description: 'Task has been deleted successfully.',
      });

      onClose();

      if (onTaskDeleted) {
        onTaskDeleted();
      }
    } catch (error: any) {
      console.error('Failed to delete task:', error);

      toast({
        title: 'Failed to Delete Task',
        description: error.message || 'Could not delete task.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    if (!task) return;

    // Reset to original values
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status);
    setPriority(task.priority);
    setAssigneeId(task.assignee_id || '');
    setDueDate(task.due_date || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: TaskPriority) => {
    const colors: Record<TaskPriority, string> = {
      low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[priority];
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors: Record<TaskStatus, string> = {
      todo: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      review: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status];
  };

  if (!task && !loading) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="flex-1 pr-8">
              {isEditing ? (
                <Input
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  className="text-xl font-semibold"
                  placeholder="Task title"
                />
              ) : (
                <h2 className="text-xl font-semibold">{task?.title}</h2>
              )}
            </DialogTitle>

            <div className="flex items-center gap-2">
              {canEditTasks && !isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}

              {isEditing && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </>
              )}

              {canDeleteTasks && !isEditing && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this task? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete Task
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Status */}
            {isEditing ? (
              <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge className={getPriorityColor(task?.status || 'todo')}>
                <Clock className="h-3 w-3 mr-1" />
                {task?.status.replace('_', ' ').charAt(0).toUpperCase() +
                  task?.status.slice(1).replace('_', ' ')}
              </Badge>
            )}

            {/* Priority */}
            {isEditing ? (
              <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge className={getPriorityColor(task?.priority || 'medium')}>
                <Flag className="h-3 w-3 mr-1" />
                {task?.priority.charAt(0).toUpperCase() + task?.priority.slice(1)}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                placeholder="Add a description..."
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {task?.description || 'No description provided.'}
              </p>
            )}
          </div>

          <Separator />

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4">
            {/* Assignee */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Assignee
              </Label>
              {isEditing ? (
                <Select value={assigneeId} onValueChange={setAssigneeId}>
                  <SelectTrigger>
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
              ) : (
                <p className="text-sm">
                  {task?.assignee_id
                    ? members.find((m: any) => m.user_id === task.assignee_id)?.profile
                        ?.full_name ||
                      members.find((m: any) => m.user_id === task.assignee_id)?.profile?.email ||
                      'Unknown'
                    : 'Unassigned'}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Due Date
              </Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                />
              ) : (
                <p className="text-sm">
                  {task?.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : 'No due date'}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Comments Section */}
          {task && <TaskComments taskId={task.id} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
