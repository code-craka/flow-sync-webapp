import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Circle, Clock, AlertCircle, Trash2, Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription';
import { TaskDetailModal } from './TaskDetailModal';
import { getProjectTasks, deleteTask, updateTask } from '@/lib/supabase/queries';
import type { Task, TaskStatus, TaskPriority } from '@/types';

interface TaskListViewProps {
  projectId: string;
  refreshTrigger?: number;
}

export function TaskListView({ projectId, refreshTrigger }: TaskListViewProps) {
  const { toast } = useToast();
  const { canEditTasks, canDeleteTasks } = usePermissions();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [projectId, refreshTrigger]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const projectTasks = await getProjectTasks(projectId);
      setTasks(projectTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      toast({
        title: 'Failed to Load Tasks',
        description: 'Could not load tasks for this project.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription for task changes
  useRealtimeSubscription<Task>({
    table: 'tasks',
    filter: `project_id=eq.${projectId}`,
    onInsert: (newTask) => {
      setTasks((prev) => [...prev, newTask]);
      toast({
        title: 'New Task Added',
        description: `${newTask.title} has been created.`,
      });
    },
    onUpdate: (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    },
    onDelete: (deletedTask) => {
      setTasks((prev) => prev.filter((task) => task.id !== deletedTask.id));
    },
  });

  const handleDeleteTask = async (taskId: string, taskTitle: string) => {
    if (!canDeleteTasks) return;

    setDeletingTaskId(taskId);

    try {
      await deleteTask(taskId);

      toast({
        title: 'Task Deleted',
        description: `${taskTitle} has been deleted.`,
      });

      // Reload tasks
      await loadTasks();
    } catch (error: any) {
      console.error('Failed to delete task:', error);

      toast({
        title: 'Failed to Delete Task',
        description: error.message || 'Could not delete task.',
        variant: 'destructive',
      });
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleStatusToggle = async (task: Task) => {
    if (!canEditTasks) return;

    const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';

    try {
      await updateTask(task.id, { status: newStatus });
      await loadTasks();
    } catch (error: any) {
      console.error('Failed to update task status:', error);

      toast({
        title: 'Failed to Update Task',
        description: error.message || 'Could not update task status.',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'review':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    const variants: Record<TaskPriority, string> = {
      low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${variants[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const now = new Date();
    const isOverdue = date < now;

    return (
      <span className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`}>
        <Calendar className="h-3 w-3" />
        {date.toLocaleDateString()}
      </span>
    );
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedTaskId(null);
  };

  const handleTaskUpdated = async () => {
    await loadTasks();
  };

  const handleTaskDeleted = async () => {
    await loadTasks();
  };

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const statusOrder: TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];
  const statusLabels: Record<TaskStatus, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'Review',
    done: 'Done',
    cancelled: 'Cancelled',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Circle className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Tasks Yet</h3>
        <p className="text-muted-foreground text-center">
          Get started by creating your first task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {statusOrder.map((status) => {
        const statusTasks = groupedTasks[status] || [];
        if (statusTasks.length === 0) return null;

        return (
          <div key={status} className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              {getStatusIcon(status)}
              {statusLabels[status]} ({statusTasks.length})
            </h3>

            <div className="space-y-2">
              {statusTasks.map((task) => (
                <Card
                  key={task.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      {canEditTasks && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={task.status === 'done'}
                            onCheckedChange={() => handleStatusToggle(task)}
                            className="mt-1"
                          />
                        </div>
                      )}

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-medium ${
                            task.status === 'done' ? 'line-through text-muted-foreground' : ''
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                          {/* Priority */}
                          {getPriorityBadge(task.priority)}

                          {/* Assignee */}
                          {task.assignee_id && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>Assigned</span>
                            </div>
                          )}

                          {/* Due Date */}
                          {formatDueDate(task.due_date)}
                        </div>
                      </div>

                      {/* Actions */}
                      {canDeleteTasks && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 flex-shrink-0"
                                disabled={deletingTaskId === task.id}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete{' '}
                                <span className="font-semibold">{task.title}</span>? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTask(task.id, task.title)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete Task
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Task Detail Modal */}
      <TaskDetailModal
        taskId={selectedTaskId}
        isOpen={isDetailModalOpen}
        onClose={handleModalClose}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
}
