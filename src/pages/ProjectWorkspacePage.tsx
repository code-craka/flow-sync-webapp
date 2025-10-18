import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { List, ChevronLeft, Loader2, FolderOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { CreateTaskDialog } from '@/components/tasks/CreateTaskDialog';
import { TaskListView } from '@/components/tasks/TaskListView';
import { getProject } from '@/lib/supabase/queries';
import type { Project } from '@/types';

const ProjectWorkspacePage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const { canCreateTasks } = usePermissions();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      const projectData = await getProject(projectId);
      setProject(projectData as unknown as Project);
    } catch (error) {
      console.error('Failed to load project:', error);
      toast({
        title: 'Failed to Load Project',
        description: 'Could not load project details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FolderOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The project you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link to="/app/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/app/dashboard">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <FolderOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{project.name}</h1>
              {project.description && (
                <p className="text-sm text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canCreateTasks && (
            <CreateTaskDialog
              projectId={project.id}
              onTaskCreated={handleTaskCreated}
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background p-4 space-y-4 overflow-y-auto">
          <p className="text-sm font-semibold text-muted-foreground">Task Views</p>
          <Button variant="secondary" className="w-full justify-start gap-2">
            <List className="h-4 w-4" />
            List View
          </Button>

          {/* Future views */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 opacity-50"
            disabled
          >
            <div className="h-4 w-4" /> Board View
            <span className="ml-auto text-xs">Soon</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 opacity-50"
            disabled
          >
            <div className="h-4 w-4" /> Calendar
            <span className="ml-auto text-xs">Soon</span>
          </Button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <TaskListView projectId={project.id} refreshTrigger={refreshTrigger} />
        </main>
      </div>
    </div>
  );
};

export default ProjectWorkspacePage;
