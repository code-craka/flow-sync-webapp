import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight, Zap, Users, Code, Palette, Brain } from 'lucide-react';

const jobListings = [
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer (Remote)',
    department: 'Engineering',
    location: 'Remote',
    summary: 'Build beautiful, responsive, and high-performance user interfaces for FlowSyncAI using React, TailwindCSS, and Framer Motion.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer (Remote)',
    department: 'Design',
    location: 'Remote',
    summary: 'Shape the user experience of FlowSyncAI, creating intuitive and elegant designs that solve complex user problems.',
  },
  {
    id: 'ai-prompt-engineer',
    title: 'AI Prompt Engineer (Remote)',
    department: 'AI & Research',
    location: 'Remote',
    summary: 'Craft and optimize prompts for our AI models (GPT-4 and others) to deliver magical experiences within FlowSyncAI.',
  },
];

const whyWorkHere = [
  { icon: <Zap className="h-6 w-6 text-primary" />, title: "Cutting-Edge Tech", description: "Work with GPT-4, Supabase, Vite, React, and other modern technologies." },
  { icon: <Users className="h-6 w-6 text-primary" />, title: "100% Remote Team", description: "Collaborate with a talented global team from the comfort of your home." },
  { icon: <Code className="h-6 w-6 text-primary" />, title: "Async-First Culture", description: "We value deep work and flexible schedules, prioritizing asynchronous communication." },
  { icon: <Brain className="h-6 w-6 text-primary" />, title: "Autonomy & Ownership", description: "Take ownership of your projects and make a real impact on our product." },
  { icon: <Palette className="h-6 w-6 text-primary" />, title: "Growth Opportunities", description: "Learn and grow in a fast-paced environment with a supportive team." },
];

const JobCard = ({ job }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card className="h-full flex flex-col rounded-2xl shadow-lg soft-shadow hover:shadow-xl soft-shadow-hover transition-shadow duration-300 border-border overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold mb-1 text-primary">{job.title}</CardTitle>
        <div className="text-sm text-muted-foreground flex items-center gap-4">
          <span>{job.department}</span>
          <span>&bull;</span>
          <span>{job.location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow">
        <CardDescription className="text-muted-foreground line-clamp-3">{job.summary}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild variant="outline" className="w-full group">
          <Link to={`/company/careers/${job.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const CareersPage = () => {
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 gradient-text"
          >
            Join Our Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          >
            Help us build the next generation of AI productivity tools and shape the future of work.
          </motion.p>
        </div>

        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 gradient-text">Why Work at FlowSyncAI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyWorkHere.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="text-center p-6 rounded-xl shadow-lg soft-shadow border-border h-full">
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 gradient-text">Open Positions</h2>
          {jobListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobListings.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">We don't have any open positions at the moment, but we're always looking for talented individuals. Feel free to reach out!</p>
          )}
        </section>

        <section className="text-center py-12 px-6 md:px-10 bg-muted/50 dark:bg-muted/20 rounded-2xl shadow-lg soft-shadow border-border">
          <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">Don't See Your Role?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We’re always on the lookout for passionate and talented individuals. If you believe you can contribute to our mission, we'd love to hear from you.
          </p>
          <Button size="lg" className="rounded-lg gradient-bg text-white" asChild>
            <a href="mailto:jobs@flowsync.ai?subject=General Application">Get In Touch</a>
          </Button>
        </section>
        
        <section className="mt-16 md:mt-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Life at FlowSyncAI (Placeholder)</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Imagine a vibrant, collaborative, and innovative environment. That's what we're building. (Testimonials and gallery coming soon!)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-lg flex items-center justify-center text-muted-foreground">Placeholder Image 1</div>
                <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-lg flex items-center justify-center text-muted-foreground">Placeholder Image 2</div>
                <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-lg flex items-center justify-center text-muted-foreground">Placeholder Image 3</div>
                <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-lg flex items-center justify-center text-muted-foreground">Placeholder Image 4</div>
            </div>
        </section>

      </motion.div>
    </div>
  );
};

export default CareersPage;