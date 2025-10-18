import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit3, Trash2, Star, MoreVertical, Folder, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
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
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { getOrganizationProjects, deleteProject } from '@/lib/supabase/queries';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
  onNavigate: (projectId: string) => void;
}

const ProjectCard = ({ project, onDelete, onNavigate }: ProjectCardProps) => {
  const { canManageProjects } = usePermissions();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer"
        onClick={() => onNavigate(project.id)}
      >
        <CardHeader
          className="p-0 relative h-40 flex items-center justify-center"
          style={{ backgroundColor: project.color }}
        >
          <Folder className="h-16 w-16 text-white/80" />
          {/* Star button - future feature */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              // Toggle star
            }}
          >
            <Star className="h-4 w-4 text-white" />
          </Button> */}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-1">{project.name}</CardTitle>
          {project.description && (
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
          <span>Updated {formatTimeAgo(project.updated_at)}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={() => onNavigate(project.id)}>
                <Edit3 className="mr-2 h-4 w-4" /> Open Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {canManageProjects && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">{project.name}</span>? This will
                        permanently delete the project and all its tasks. This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeleting(true);
                          onDelete();
                        }}
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete Project'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const DashboardPage = () => {
  const { currentOrganization } = useOrganization();
  const { user } = useAuth();
  const { toast } = useToast();
  const { canManageProjects } = usePermissions();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrganization) {
      loadProjects();
    }
  }, [currentOrganization]);

  const loadProjects = async () => {
    if (!currentOrganization) return;

    try {
      setLoading(true);
      const orgProjects = await getOrganizationProjects(currentOrganization.id);
      setProjects(orgProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast({
        title: 'Failed to Load Projects',
        description: 'Could not load projects for this organization.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);

      toast({
        title: 'Project Deleted',
        description: 'The project has been permanently deleted.',
      });

      // Reload projects
      await loadProjects();
    } catch (error: any) {
      console.error('Failed to delete project:', error);

      toast({
        title: 'Failed to Delete Project',
        description: error.message || 'Could not delete project.',
        variant: 'destructive',
      });
    }
  };

  const handleNavigateToProject = (projectId: string) => {
    navigate(`/app/project/${projectId}`);
  };

  if (!currentOrganization) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight gradient-text">My Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Organization Selected</CardTitle>
            <CardDescription>
              Please select an organization from the switcher in the header to view your projects.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">My Dashboard</h1>
          <p className="text-muted-foreground mt-1">{currentOrganization.name}</p>
        </div>
        {canManageProjects && <CreateProjectDialog onProjectCreated={loadProjects} />}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Folder className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first project.
            </p>
            {canManageProjects && <CreateProjectDialog onProjectCreated={loadProjects} />}
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">All Projects ({projects.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={() => handleDeleteProject(project.id)}
                onNavigate={handleNavigateToProject}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardPage;
