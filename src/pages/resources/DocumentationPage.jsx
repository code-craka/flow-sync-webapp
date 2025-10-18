import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, Search, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const CodeBlock = ({ children, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);
  const textToCopy = React.Children.toArray(children).join('');

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg bg-slate-800 dark:bg-slate-900 text-sm">
      <div className="absolute top-2 right-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className={`language-${language} p-4 overflow-x-auto rounded-lg`}>
        <code className="text-slate-200">{children}</code>
      </pre>
    </div>
  );
};

const docSections = [
  {
    title: 'Getting Started',
    id: 'getting-started',
    subsections: [
      { title: 'Introduction', id: 'introduction' },
      { title: 'Installation', id: 'installation' },
      { title: 'Account Setup', id: 'account-setup' },
    ],
  },
  {
    title: 'Authentication',
    id: 'authentication',
    subsections: [
      { title: 'Email & Password', id: 'auth-email-password' },
      { title: 'OAuth (Google, GitHub)', id: 'auth-oauth' },
      { title: 'Magic Links', id: 'auth-magic-links' },
    ],
  },
  {
    title: 'Projects',
    id: 'projects',
    subsections: [
      { title: 'Creating Projects', id: 'projects-creating' },
      { title: 'Managing Projects', id: 'projects-managing' },
      { title: 'Project Views', id: 'projects-views' },
    ],
  },
  {
    title: 'Tasks',
    id: 'tasks',
    subsections: [
      { title: 'Creating Tasks', id: 'tasks-creating' },
      { title: 'Task Properties', id: 'tasks-properties' },
      { title: 'Subtasks', id: 'tasks-subtasks' },
    ],
  },
  {
    title: 'AI Assistant',
    id: 'ai-assistant',
    subsections: [
      { title: 'Overview', id: 'ai-overview' },
      { title: 'Using Prompts', id: 'ai-prompts' },
      { title: 'Contextual Suggestions', id: 'ai-suggestions' },
    ],
  },
  {
    title: 'Integrations',
    id: 'integrations',
    subsections: [
      { title: 'Supabase', id: 'integrations-supabase' },
      { title: 'Slack', id: 'integrations-slack' },
      { title: 'Google Calendar', id: 'integrations-gcal' },
    ],
  },
  {
    title: 'Settings',
    id: 'settings',
    subsections: [
      { title: 'Profile Settings', id: 'settings-profile' },
      { title: 'Workspace Settings', id: 'settings-workspace' },
      { title: 'Notifications', id: 'settings-notifications' },
    ],
  },
];

const SidebarLink = ({ section, subsection, currentHash }) => {
  const isActive = currentHash === `#${subsection.id}`;
  return (
    <Link
      to={`#${subsection.id}`}
      className={cn(
        "block py-1.5 px-3 text-sm rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {subsection.title}
    </Link>
  );
};

const SidebarSection = ({ section, currentHash }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-3 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
      >
        {section.title}
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="pl-3 mt-1 space-y-1 border-l border-border ml-1.5">
          {section.subsections.map((subsection) => (
            <SidebarLink key={subsection.id} section={section} subsection={subsection} currentHash={currentHash} />
          ))}
        </div>
      )}
    </div>
  );
};

const DocumentationPage = () => {
  const location = useLocation();
  const currentHash = location.hash || `#${docSections[0].subsections[0].id}`;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = docSections.map(section => ({
    ...section,
    subsections: section.subsections.filter(subsection => 
      subsection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.subsections.length > 0);

  const renderContent = (sectionId, subsectionId) => {
    const section = docSections.find(s => s.id === sectionId);
    const subsection = section?.subsections.find(sub => sub.id === subsectionId);

    if (!subsection) {
      return (
        <div id={docSections[0].subsections[0].id} className="prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-4 gradient-text">{docSections[0].subsections[0].title}</h2>
          <p>Welcome to the FlowSyncAI documentation. Use the sidebar to navigate through topics.</p>
        </div>
      );
    }
    
    return (
      <div id={subsection.id} className="prose dark:prose-invert max-w-none scroll-mt-20">
        <h2 className="text-3xl font-bold mb-4 gradient-text">{subsection.title}</h2>
        <p>Content for {subsection.title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        {subsection.id === 'installation' && (
          <>
            <p>To install FlowSyncAI, follow these steps:</p>
            <CodeBlock language="bash">
              {`npm install -g flowsync-cli
flowsync init my-project
cd my-project
flowsync start`}
            </CodeBlock>
          </>
        )}
         {subsection.id === 'auth-email-password' && (
          <>
            <p>Implementing email and password authentication:</p>
            <CodeBlock language="javascript">
              {`import { supabase } from './supabaseClient';

async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) console.error('Error signing up:', error);
  return data;
}`}
            </CodeBlock>
          </>
        )}
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 md:py-12"
      >
        <Card className="rounded-2xl shadow-xl soft-shadow border-border overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">
              FlowSyncAI Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <aside className="w-full md:w-72 border-r border-border p-6 sticky top-0 h-screen-minus-header">
                <div className="relative mb-4">
                  <Input 
                    type="search" 
                    placeholder="Search docs..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <ScrollArea className="h-[calc(100%-4rem)] pr-2">
                  <nav className="space-y-4">
                    {filteredSections.map((section) => (
                      <SidebarSection key={section.id} section={section} currentHash={currentHash} />
                    ))}
                  </nav>
                </ScrollArea>
              </aside>
              <main className="flex-1 p-6 md:p-10">
                <ScrollArea className="h-screen-minus-header-plus-padding pr-2">
                  {docSections.map(section => 
                    section.subsections.map(subsection => renderContent(section.id, subsection.id))
                  )}
                </ScrollArea>
              </main>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DocumentationPage;