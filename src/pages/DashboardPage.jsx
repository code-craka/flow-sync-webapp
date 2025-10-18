import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit3, Trash2, Star, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const projects = [
  { id: 'p1', name: 'Ad Copy Review', lastModified: '2 hours ago', thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', workspace: 'Marketing Q3 Campaign', isStarred: false },
  { id: 'p2', name: 'Social Media Blitz', lastModified: '1 day ago', thumbnail: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', workspace: 'Marketing Q3 Campaign', isStarred: true },
  { id: 'p3', name: 'New Feature Alpha', lastModified: '3 days ago', thumbnail: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', workspace: 'Product Dev Cycle', isStarred: false },
  { id: 'p4', name: 'Website Redesign Mockups', lastModified: '5 hours ago', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', workspace: 'Marketing Q3 Campaign', isStarred: true },
  { id: 'p5', name: 'Q4 Budget Planning', lastModified: 'Yesterday', thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', workspace: 'Product Dev Cycle', isStarred: false },
];

const ProjectCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="p-0 relative">
        <img  src={project.thumbnail} alt={project.name} className="w-full h-40 object-cover" />
        <Button variant="ghost" size="icon" className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 ${project.isStarred ? 'text-yellow-400' : 'text-muted-foreground'}`}>
          <Star className={`h-4 w-4 ${project.isStarred ? 'fill-current' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{project.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{project.workspace}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <span>Last modified: {project.lastModified}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
            <DropdownMenuItem><Star className="mr-2 h-4 w-4" /> {project.isStarred ? 'Unstar' : 'Star'}</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  </motion.div>
);

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight gradient-text">My Dashboard</h1>
        <Button>
          <PlusCircle className="mr-2 h-5 w-5" /> Create New Project
        </Button>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Starred Projects</h2>
        {projects.filter(p => p.isStarred).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.filter(p => p.isStarred).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No starred projects yet. Star a project to see it here!</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Projects</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;