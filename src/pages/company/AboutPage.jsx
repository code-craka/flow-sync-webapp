import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Users, Lightbulb, Target, Heart, Eye, Rocket, Milestone, UserCircle } from 'lucide-react';

const coreValues = [
  { icon: <Lightbulb className="h-8 w-8 text-primary" />, title: "Innovation", description: "Constantly exploring new ways to enhance productivity through AI." },
  { icon: <Eye className="h-8 w-8 text-primary" />, title: "Transparency", description: "Open communication and clear processes in everything we do." },
  { icon: <Heart className="h-8 w-8 text-primary" />, title: "User Empathy", description: "Building with a deep understanding of our users' needs and challenges." },
  { icon: <Rocket className="h-8 w-8 text-primary" />, title: "Velocity", description: "Moving quickly to deliver value and adapt to the evolving landscape." },
  { icon: <Zap className="h-8 w-8 text-primary" />, title: "Simplicity", description: "Crafting intuitive and elegant solutions that are easy to use." },
];

const storyMilestones = [
  { year: "2025", event: "FlowSyncAI Founded", description: "A team of engineers and productivity enthusiasts, tired of chaotic workflows, set out to build a smarter solution." },
  { year: "2025 Q2", event: "AI Core Developed", description: "The foundational AI engine for task understanding and suggestions was created." },
  { year: "2025 Q3", event: "Early Access Launch", description: "FlowSyncAI opened its doors to a select group of users for initial feedback and testing." },
  { year: "Future", event: "Global Productivity Standard", description: "Aspiring to become the go-to platform for intelligent productivity worldwide." },
];

const Section = ({ title, children, icon, className = "" }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className={`py-10 md:py-12 ${className}`}
  >
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-6">
        {icon && React.cloneElement(icon, { className: "h-10 w-10 text-primary mr-4" })}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">{title}</h2>
      </div>
      <div className="text-lg text-muted-foreground space-y-4 max-w-3xl">
        {children}
      </div>
    </div>
  </motion.section>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 md:py-16 lg:py-20"
      >
        <div className="text-center mb-12 md:mb-16 container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 gradient-text"
          >
            About FlowSyncAI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          >
            We're on a mission to build the future of intelligent productivity, empowering teams to achieve more with clarity and speed.
          </motion.p>
        </div>

        <Section title="Our Mission" icon={<Target />}>
          <p>At FlowSyncAI, we’re building the future of intelligent productivity. Our mission is to empower individuals and remote teams by transforming chaotic workflows into streamlined, AI-enhanced processes. We strive to bring clarity, speed, and joy to everyday work, enabling users to focus on what truly matters.</p>
        </Section>

        <Section title="Our Vision" icon={<Eye />} className="bg-muted/30 dark:bg-muted/10">
          <p>We envision a world where collaboration is seamless, powered by context-aware automation and human-friendly design. FlowSyncAI aims to be the central nervous system for productive teams, intelligently connecting people, tasks, and information to unlock collective potential and drive innovation.</p>
        </Section>

        <Section title="Our Story" icon={<Milestone />}>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-primary/30 hidden md:block"></div>
            {storyMilestones.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                <div className="md:w-1/2">
                  <Card className={`rounded-xl shadow-lg soft-shadow border-border ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary">{item.year} - {item.event}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:flex md:w-1/2 justify-center">
                  <div className="bg-primary h-4 w-4 rounded-full z-10"></div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center">Founded in 2025, FlowSyncAI was born from the desire of experienced engineers and productivity nerds to escape the chaos of fragmented tools and inefficient workflows. We are a bootstrapped company, focused on sustainable growth and delivering genuine value to our users.</p>
        </Section>

        <Section title="Core Values" icon={<Users />} className="bg-muted/30 dark:bg-muted/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center p-6 rounded-xl shadow-lg soft-shadow border-border h-full">
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
        
        <Section title="Meet the (Placeholder) Team" icon={<Users />}>
          <p>While we're a dynamic and growing team, here's a placeholder for where team photos or founder bios would go. We're a passionate group of innovators dedicated to making FlowSyncAI the best productivity platform.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <UserCircle className="w-16 h-16 text-white/70" />
                </div>
                <p className="font-semibold text-foreground">Team Member {i}</p>
                <p className="text-sm text-primary">Role {i}</p>
              </div>
            ))}
          </div>
        </Section>

      </motion.div>
    </div>
  );
};

export default AboutPage;