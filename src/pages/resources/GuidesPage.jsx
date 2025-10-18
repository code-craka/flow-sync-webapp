import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react';

const guides = [
  {
    slug: 'build-kanban-workflow',
    title: 'How to Build a Kanban Workflow with FlowSyncAI',
    description: 'Learn to set up and manage your projects using a powerful Kanban board for ultimate task visibility.',
    icon: <Zap className="h-8 w-8 text-primary" />,
    tags: ['Workflow', 'Kanban', 'Productivity'],
  },
  {
    slug: 'real-time-collaboration',
    title: 'Collaborate in Real-Time with Your Team',
    description: 'Discover how FlowSyncAI enables seamless real-time collaboration, keeping everyone in sync.',
    icon: <Users className="h-8 w-8 text-primary" />,
    tags: ['Collaboration', 'Teamwork', 'Real-Time'],
  },
  {
    slug: 'custom-views-ai',
    title: 'Creating Custom Views with AI Suggestions',
    description: 'Unlock the power of AI to generate custom task views tailored to your specific needs and focus.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    tags: ['AI', 'Customization', 'Productivity'],
  },
  {
    slug: 'integrating-supabase',
    title: 'Integrating FlowSyncAI with Supabase',
    description: 'A step-by-step guide to connect your Supabase backend with FlowSyncAI for enhanced data management.',
    icon: <Zap className="h-8 w-8 text-primary" />,
    tags: ['Integration', 'Supabase', 'Developer'],
  },
];

const GuideCard = ({ guide }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card className="h-full flex flex-col rounded-2xl shadow-lg soft-shadow hover:shadow-xl soft-shadow-hover transition-shadow duration-300 border-border overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6 bg-muted/20">
        <div className="flex-shrink-0">{guide.icon}</div>
        <div className="flex-grow">
          <CardTitle className="text-xl font-semibold mb-1">{guide.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardDescription className="text-muted-foreground mb-4">{guide.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {guide.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium">{tag}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild variant="outline" className="w-full group">
          <Link to={`/resources/guides/${guide.slug}`}>
            Read Guide <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          >
            FlowSyncAI Guides
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Unlock advanced productivity workflows with our curated tutorials and how-to guides.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GuidesPage;