import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { List, KanbanSquare, Milestone, CalendarDays, MessageSquare, Settings, Activity, ChevronLeft, Share2, Users, Link2, Copy, Plus } from 'lucide-react';

// Placeholder views
const ListView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">List View Content</p></div>;
const BoardView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">Kanban Board View Content</p></div>;
const MindMapView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">Mind Map View Content</p></div>;
const CalendarView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">Calendar View Content</p></div>;
const ChatView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">Project Chat View Content</p></div>;
const ActivityLogView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">Activity Log Content</p></div>;
const ProjectSettingsView = () => <div className="p-4 bg-muted/20 rounded-lg min-h-[400px] flex items-center justify-center"><p className="text-2xl text-muted-foreground">Project Settings Content</p></div>;


const ProjectWorkspacePage = () => {
  const { projectId } = useParams();
  const [activeView, setActiveView] = useState('list');

  const project = { id: projectId, name: `Project ${projectId.toUpperCase()}` }; // Fetch actual project data

  const viewComponents = {
    list: <ListView />,
    board: <BoardView />,
    mindmap: <MindMapView />,
    calendar: <CalendarView />,
    chat: <ChatView />,
    activity: <ActivityLogView />,
    settings: <ProjectSettingsView />,
  };

  const viewOptions = [
    { value: 'list', label: 'List', icon: List },
    { value: 'board', label: 'Board', icon: KanbanSquare },
    { value: 'mindmap', label: 'Mind Map', icon: Milestone },
    { value: 'calendar', label: 'Calendar', icon: CalendarDays },
    { value: 'chat', label: 'Chat', icon: MessageSquare },
  ];
  
  const panelOptions = [
    { value: 'activity', label: 'Activity Log', icon: Activity },
    { value: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
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
          <h1 className="text-xl font-semibold">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Share <Share2 className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" /> Invite Team Members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link2 className="mr-2 h-4 w-4" /> Copy Sharable Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Sharing Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-background p-4 space-y-4 overflow-y-auto">
          <p className="text-sm font-semibold text-muted-foreground">Task Views</p>
          {viewOptions.map(opt => (
            <Button
              key={opt.value}
              variant={activeView === opt.value ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2"
              onClick={() => setActiveView(opt.value)}
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </Button>
          ))}
          <p className="text-sm font-semibold text-muted-foreground pt-4">Project Tools</p>
           {panelOptions.map(opt => (
            <Button
              key={opt.value}
              variant={activeView === opt.value ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2"
              onClick={() => setActiveView(opt.value)}
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </Button>
          ))}
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {viewComponents[activeView]}
        </main>
      </div>
    </div>
  );
};

export default ProjectWorkspacePage;