import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, CalendarDays, UserCircle, Tag } from 'lucide-react';

const blogPostsData = {
  'announcing-flowsync-ai': {
    title: 'Announcing FlowSyncAI: The Future of Intelligent Productivity',
    author: 'Jane Doe',
    authorAvatar: 'https://i.pravatar.cc/150?u=jane',
    publishDate: '2025-05-28',
    tags: ['Announcement', 'AI', 'Productivity'],
    image: 'modern-office-collaboration',
    content: `
      <p class="lead text-lg text-muted-foreground mb-6">We are incredibly excited to pull back the curtain on FlowSyncAI, a project we've been passionately building to redefine productivity for individuals and teams. In a world saturated with tools, we felt something was missing: a truly intelligent, adaptive, and delightful platform that works with you, not against you.</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">What is FlowSyncAI?</h2>
      <p>FlowSyncAI is more than just another task manager. It's an AI-powered productivity hub designed to help you achieve clarity, focus, and speed. We combine intuitive design with cutting-edge artificial intelligence to automate mundane work, provide insightful suggestions, and foster seamless collaboration.</p>
      
      <img  alt="FlowSyncAI Dashboard Preview" class="my-6 rounded-lg shadow-md w-full" src="https://images.unsplash.com/photo-1608403810239-ac22e2c3bac7" />
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Key Features at Launch:</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li><strong>AI-Powered Task Management:</strong> Smart suggestions for task breakdown, prioritization, and scheduling.</li>
        <li><strong>Real-Time Collaboration:</strong> Work together with your team seamlessly, with instant updates and shared context.</li>
        <li><strong>Customizable Views:</strong> From Kanban boards to calendars and mind maps, visualize your work your way. Our AI can even help you build the perfect view.</li>
        <li><strong>Seamless Integrations:</strong> Connect FlowSyncAI with your favorite tools like Slack, Google Calendar, and Supabase.</li>
        <li><strong>Intuitive Design:</strong> A clean, beautiful, and responsive interface that's a joy to use.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
      <p>We believe that the future of work is intelligent and collaborative. Our goal is to empower users to spend less time managing work and more time doing meaningful work. FlowSyncAI is built on the principles of simplicity, transparency, and user empathy.</p>
      
      <blockquote class="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
        "FlowSyncAI is not just about getting more done; it's about getting the right things done, with less friction and more joy." - Jane Doe, CEO
      </blockquote>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Get Started Today!</h2>
      <p>We invite you to <Link to="/auth/signup" class="text-primary hover:underline">sign up for early access</Link> and experience the future of productivity. We're eager to hear your feedback as we continue to build and refine FlowSyncAI.</p>
      <p>Join our community and let's build something amazing together!</p>
    `,
  },
  // Add other blog posts here following the same structure
   'mastering-task-management': {
    title: 'Mastering Task Management with AI-Powered Insights',
    author: 'John Smith',
    authorAvatar: 'https://i.pravatar.cc/150?u=john',
    publishDate: '2025-05-20',
    tags: ['Productivity', 'AI', 'Tips'],
    image: 'task-management-board',
    content: `
      <p class="lead text-lg text-muted-foreground mb-6">Task management can often feel overwhelming. With FlowSyncAI, we're leveraging AI to make it smarter, faster, and more intuitive. Here's how you can master your tasks.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Smart Task Creation & Breakdown</h2>
      <p>Instead of just listing tasks, use our AI assistant to break down larger goals into manageable sub-tasks. Simply type a complex objective, and let the AI suggest a structured list.</p>
      <img  alt="AI Task Breakdown Feature" class="my-6 rounded-lg shadow-md w-full" src="https://images.unsplash.com/photo-1684369176170-463e84248b70" />
      <h2 class="text-2xl font-semibold mt-8 mb-4">2. AI-Driven Prioritization</h2>
      <p>Not sure what to work on next? FlowSyncAI analyzes due dates, dependencies, and your work patterns to suggest priority tasks, helping you focus on what truly matters.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Contextual Reminders & Follow-ups</h2>
      <p>Our AI understands context. It can remind you about upcoming deadlines, follow-ups based on recent communications, or tasks that seem to be stalled.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Automated Progress Summaries</h2>
      <p>Get quick AI-generated summaries of project progress or your personal task completion rates, helping you stay informed and motivated.</p>
      <p class="mt-6">By integrating these AI-powered features, FlowSyncAI transforms task management from a chore into a strategic advantage.</p>
    `,
  },
  'changelog-v1-2': {
    title: 'Changelog: Version 1.2 - Enhanced Collaboration Features',
    author: 'The FlowSyncAI Team',
    authorAvatar: '/logo-mark.svg',
    publishDate: '2025-05-15',
    tags: ['Changelog', 'Updates'],
    image: 'software-update-screen',
    content: `
      <p class="lead text-lg text-muted-foreground mb-6">We're excited to announce FlowSyncAI version 1.2! This update is packed with features focused on making team collaboration even more seamless and powerful.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">What's New in v1.2:</h2>
      <ul class="list-disc list-inside space-y-3 mb-6">
        <li><strong>Real-time Co-editing in Notes:</strong> Multiple users can now edit project notes and task descriptions simultaneously, seeing changes live.</li>
        <li><strong>Improved @Mentions & Notifications:</strong> Get more specific notifications when mentioned, and manage your notification preferences with greater control.</li>
        <li><strong>New Integration: Google Drive:</strong> Easily link and preview Google Drive files directly within tasks and projects.</li>
        <li><strong>Performance Boosts:</strong> We've optimized data loading and synchronization, making the app faster and more responsive, especially for large projects.</li>
        <li><strong>Calendar View Enhancements:</strong> Drag-and-drop rescheduling and a new "unscheduled tasks" panel in the Calendar view.</li>
        <li><strong>Bug Fixes & UI Polish:</strong> Numerous small improvements and fixes based on your valuable feedback.</li>
      </ul>
      <img  alt="New Google Drive Integration UI" class="my-6 rounded-lg shadow-md w-full" src="https://images.unsplash.com/photo-1649180549324-3e03951391aa" />
      <p>Thank you for your continued support and feedback! Head over to the app to check out these new features.</p>
    `,
  },
   'ai-trends-in-2025': {
    title: 'Top AI Trends Shaping Productivity in 2025',
    author: 'Dr. AI Expert',
    authorAvatar: 'https://i.pravatar.cc/150?u=expert',
    publishDate: '2025-05-10',
    tags: ['AI', 'Trends', 'Future'],
    image: 'futuristic-ai-interface',
    content: `
      <p class="lead text-lg text-muted-foreground mb-6">The field of Artificial Intelligence is evolving at an unprecedented pace. As we move further into 2025, several key AI trends are set to revolutionize productivity tools and workflows.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Hyper-Personalization</h2>
      <p>AI will move beyond generic suggestions to offer deeply personalized experiences. Productivity tools will learn individual work styles, preferences, and even cognitive patterns to tailor interfaces, workflows, and recommendations.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Generative AI for Content & Code</h2>
      <p>While already prominent, generative AI will become more integrated into daily tasks. Expect tools that can draft emails, generate reports, write code snippets, and even create initial designs based on simple prompts, directly within your productivity suite.</p>
      <img  alt="Generative AI creating content" class="my-6 rounded-lg shadow-md w-full" src="https://images.unsplash.com/photo-1692607431225-5f4564c8f132" />
      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Proactive & Autonomous Agents</h2>
      <p>AI assistants will become more proactive, anticipating needs and performing tasks autonomously. Imagine an AI that schedules meetings based on your availability and project priorities, or automatically archives completed projects.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Ethical AI & Explainability</h2>
      <p>As AI takes on more critical roles, the demand for ethical considerations and transparency will grow. Users will want to understand why AI makes certain recommendations (explainability) and be assured of data privacy and fairness.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">5. AI in Collaborative Environments</h2>
      <p>AI will play a crucial role in facilitating team collaboration by summarizing discussions, identifying action items from meetings, resolving scheduling conflicts, and even mediating disagreements by highlighting common ground.</p>
      <p class="mt-6">At FlowSyncAI, we are closely monitoring these trends and actively working to incorporate the best of AI to empower our users.</p>
    `,
  }
};


const BlogPostPage = () => {
  const { postSlug } = useParams();
  const post = blogPostsData[postSlug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/resources/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
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
              <Link to="/resources/blog">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Posts
              </Link>
            </Button>
          </div>

          <Card className="rounded-2xl shadow-xl soft-shadow border-border overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b bg-muted/20">
              <img  alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight gradient-text mb-4">
                {post.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <UserCircle className="mr-2 h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="mr-1 h-5 w-5" />
                  {post.tags.map(tag => (
                    <Link key={tag} to={`/resources/blog?tag=${encodeURIComponent(tag)}`} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors">{tag}</Link>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div 
                className="prose dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-primary"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </CardContent>
             <CardFooter className="p-6 md:p-8 border-t">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">Written by</p>
                        <p className="text-lg font-semibold">{post.author}</p>
                    </div>
                </div>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostPage;