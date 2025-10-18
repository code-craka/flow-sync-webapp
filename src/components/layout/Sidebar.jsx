import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, LayoutDashboard, Folder, Star, PlusCircle, ChevronDown, ChevronRight, Settings, Users, X, Menu } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const workspaces = [
    { id: 'ws1', name: 'Marketing Q3 Campaign', projects: [{ id: 'p1', name: 'Ad Copy Review' }, { id: 'p2', name: 'Social Media Blitz' }] },
    { id: 'ws2', name: 'Product Dev Cycle', projects: [{ id: 'p3', name: 'New Feature Alpha' }] },
  ];
  const starredProjects = [{ id: 'p2', name: 'Social Media Blitz' }];

  const sidebarVariants = {
    open: { x: 0, width: '280px' },
    closed: { x: '-100%', width: 0 },
  };
  
  const contentVariants = {
    open: { opacity: 1, transition: { delay: 0.2 } },
    closed: { opacity: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex-col border-r bg-background md:static md:flex"
          >
            <ScrollArea className="flex-1">
              <motion.div variants={contentVariants} className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Link to="/app/dashboard" className="flex items-center gap-2">
                    <Zap className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold">FlowSync<span className="text-primary">AI</span></span>
                  </Link>
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <NavLink
                  to="/app/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`
                  }
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </NavLink>

                <div>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground tracking-wider">Workspaces</p>
                  {workspaces.map(ws => (
                    <Collapsible key={ws.id} className="mt-1">
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted [&[data-state=open]>svg]:rotate-90">
                        <div className="flex items-center gap-3">
                          <Folder className="h-4 w-4" />
                          <span>{ws.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 pl-8 py-1">
                        {ws.projects.map(project => (
                          <NavLink
                            key={project.id}
                            to={`/app/project/${project.id}`}
                            className={({ isActive }) =>
                              `block rounded-md px-3 py-2 text-sm hover:bg-muted ${
                                isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
                              }`
                            }
                          >
                            {project.name}
                          </NavLink>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>

                <div>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground tracking-wider">Starred</p>
                  {starredProjects.map(project => (
                     <NavLink
                        key={project.id}
                        to={`/app/project/${project.id}`}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted ${
                            isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
                          }`
                        }
                      >
                      <Star className="h-4 w-4" />
                      {project.name}
                    </NavLink>
                  ))}
                </div>

                <Button variant="outline" className="w-full justify-start gap-3">
                  <PlusCircle className="h-4 w-4" />
                  New Project
                </Button>

                <NavLink
                  to="/app/team"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`
                  }
                >
                  <Users className="h-4 w-4" />
                  Team Management
                </NavLink>

                <NavLink
                  to="/app/settings" 
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`
                  }
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </NavLink>
              </motion.div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
         <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
         </Button>
      )}
    </>
  );
};

export default Sidebar;