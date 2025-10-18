import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Users, Zap } from 'lucide-react';

const guidesData = {
  'build-kanban-workflow': {
    title: 'How to Build a Kanban Workflow with FlowSyncAI',
    icon: <Zap className="h-8 w-8 text-primary" />,
    content: `
      <p>Kanban is a popular agile methodology for managing work. FlowSyncAI makes it easy to implement a Kanban workflow for your projects.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Step 1: Create a New Project</h3>
      <p>Navigate to your dashboard and click the "+ New Project" button. Give your project a name, e.g., "Marketing Campaign".</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Step 2: Switch to Board View</h3>
      <p>Once your project is created, open it. By default, you might be in List View. Click on the view toggle menu (usually near the project name) and select "Board".</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Step 3: Define Your Columns</h3>
      <p>A typical Kanban board has columns like "To Do", "In Progress", "Review", and "Done". FlowSyncAI provides these by default, but you can customize them. Click "Add New Column" if needed.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Step 4: Add Tasks (Cards)</h3>
      <p>Click the "+" icon at the bottom of the "To Do" column to add new tasks. Fill in the task title, description, assignees, due dates, and tags.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Step 5: Move Tasks Across Columns</h3>
      <p>As work progresses, drag and drop tasks from one column to the next. This visual flow is the core of Kanban.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Step 6: Collaborate and Iterate</h3>
      <p>Use comments on tasks for discussions. Regularly review the board with your team to identify bottlenecks and improve your workflow.</p>
      <p class="mt-4">That's it! You've successfully set up a Kanban workflow in FlowSyncAI.</p>
    `,
  },
  'real-time-collaboration': {
    title: 'Collaborate in Real-Time with Your Team',
    icon: <Users className="h-8 w-8 text-primary" />,
    content: `
      <p>FlowSyncAI is built for teamwork. Real-time collaboration ensures everyone is on the same page, instantly.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Inviting Team Members</h3>
      <p>Go to your Workspace settings or Project settings and find the "Share" or "Members" option. Invite your colleagues by email and assign them roles (e.g., Editor, Viewer).</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Simultaneous Editing</h3>
      <p>Multiple team members can edit tasks, descriptions, and comments at the same time. Changes are reflected instantly for all collaborators.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Project Chat</h3>
      <p>Use the integrated Project Chat panel for discussions related to the project. Mention team members using "@" to notify them.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Activity Log</h3>
      <p>The Activity Log shows a history of all changes made within the project, providing transparency and context.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Presence Indicators</h3>
      <p>See who else is currently active in the project or viewing the same task with presence indicators (avatars).</p>
    `,
  },
  'custom-views-ai': {
    title: 'Creating Custom Views with AI Suggestions',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    content: `
      <p>FlowSyncAI's AI Assistant can help you create powerful custom views to filter and sort your tasks exactly how you need them.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Accessing the AI Assistant</h3>
      <p>Look for the AI Assistant icon (usually a sparkle or chat bubble) within your project workspace.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Prompting for Custom Views</h3>
      <p>You can ask the AI Assistant to create views based on natural language. For example:</p>
      <ul>
        <li>"Show me all tasks assigned to me due this week."</li>
        <li>"Create a view of high-priority tasks in the 'Backend Development' project."</li>
        <li>"Filter tasks tagged 'Bug' and not yet started."</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-3">Refining AI Suggestions</h3>
      <p>The AI will propose a view configuration. You can then manually adjust filters, sorting options, and displayed fields before saving the view.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Saving and Sharing Custom Views</h3>
      <p>Once you're happy with a custom view, save it with a descriptive name. You can choose to make it private or share it with your team.</p>
    `,
  },
   'integrating-supabase': {
    title: 'Integrating FlowSyncAI with Supabase',
    icon: <Zap className="h-8 w-8 text-primary" />,
    content: `
      <p>FlowSyncAI leverages Supabase for its robust backend. While much of this is seamless, advanced users or developers might want to understand or interact with this integration.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Understanding the Data Model</h3>
      <p>FlowSyncAI uses Supabase tables for Workspaces, Projects, Tasks, Users, etc. Familiarize yourself with our <Link to="/resources/documentation#database-schema" class="text-primary hover:underline">database schema documentation</Link>.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Using Supabase Client (for developers)</h3>
      <p>If you are building custom integrations or scripts, you can interact with your FlowSyncAI data using the Supabase JavaScript client, respecting Row Level Security policies.</p>
      <pre class="bg-slate-800 text-slate-200 p-4 rounded-md my-2 text-sm overflow-x-auto"><code>import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getMyTasks() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    // RLS policies will ensure only accessible tasks are returned
  if (error) console.error(error)
  return data
}</code></pre>
      <h3 class="text-xl font-semibold mt-6 mb-3">Realtime Updates</h3>
      <p>FlowSyncAI uses Supabase Realtime for instant updates across devices and users. Changes to tasks, comments, and project status are broadcasted efficiently.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3">Security with RLS</h3>
      <p>All data access is governed by Supabase's Row Level Security (RLS). This ensures users can only access data they are permitted to see, based on their workspace membership and roles.</p>
    `,
  }
};


const GuideDetailPage = () => {
  const { guideSlug } = useParams();
  const guide = guidesData[guideSlug];

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-8">The guide you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/resources/guides">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" className="group">
              <Link to="/resources/guides">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Guides
              </Link>
            </Button>
          </div>

          <Card className="rounded-2xl shadow-xl soft-shadow border-border overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b bg-muted/20">
              <div className="flex items-start gap-4 mb-2">
                {guide.icon}
                <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
                  {guide.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div 
                className="prose dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: guide.content }} 
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default GuideDetailPage;