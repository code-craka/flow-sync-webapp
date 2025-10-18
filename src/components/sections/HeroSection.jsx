import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ onEarlyAccess, onDemoRequest }) => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">AI-Powered Productivity</span> for Modern Teams
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Streamline collaboration, customize your workflow, and integrate with your favorite tools—all in one intelligent workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={onEarlyAccess}>
              Get Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={onDemoRequest}>
              Schedule a Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-20 bottom-0"></div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
            <img  alt="FlowSync AI dashboard showing task management interface with real-time collaboration features" className="w-full" src="https://images.unsplash.com/photo-1702047063975-0841a0621b5a" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;