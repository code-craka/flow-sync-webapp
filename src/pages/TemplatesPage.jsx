import React from 'react';
import { motion } from 'framer-motion';
import { FileText, LayoutGrid, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const templates = [
  { id: 't1', name: 'Project Proposal', category: 'Business', description: 'A comprehensive template for project proposals.', icon: FileText, color: 'bg-blue-500' },
  { id: 't2', name: 'Marketing Campaign Plan', category: 'Marketing', description: 'Plan your next marketing blitz with this detailed template.', icon: FileText, color: 'bg-green-500' },
  { id: 't3', name: 'Software Development Roadmap', category: 'Development', description: 'Outline your software development lifecycle.', icon: FileText, color: 'bg-purple-500' },
  { id: 't4', name: 'Content Calendar', category: 'Content', description: 'Organize your content creation and publishing schedule.', icon: FileText, color: 'bg-yellow-500' },
  { id: 't5', name: 'Meeting Agenda', category: 'General', description: 'Structure your meetings for maximum productivity.', icon: FileText, color: 'bg-red-500' },
  { id: 't6', name: 'Onboarding Checklist', category: 'HR', description: 'Ensure a smooth onboarding process for new hires.', icon: FileText, color: 'bg-indigo-500' },
];

const TemplateCard = ({ template }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
  >
    <Card className="overflow-hidden h-full flex flex-col rounded-xl border shadow-sm hover:shadow-lg transition-all">
      <CardHeader className={`p-4 ${template.color} text-primary-foreground flex flex-row items-center justify-between`}>
        <template.icon className="h-8 w-8" />
        <span className="text-xs bg-black/20 px-2 py-1 rounded-full">{template.category}</span>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2">{template.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{template.description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0">
        <Button variant="outline" className="w-full">Use Template</Button>
      </div>
    </Card>
  </motion.div>
);

const TemplatesPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Project Templates</h1>
          <p className="text-muted-foreground mt-1 text-lg">Start your next project with a pre-built template.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button><LayoutGrid className="mr-2 h-4 w-4" /> My Templates</Button>
        </div>
      </motion.div>

      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search templates..." className="pl-10 py-3 h-12 text-base w-full md:w-1/2 lg:w-1/3" />
      </motion.div>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </motion.section>
    </div>
  );
};

export default TemplatesPage;