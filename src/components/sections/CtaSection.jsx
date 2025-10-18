import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CtaSection = ({ onEarlyAccess, onDemoRequest }) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden relative"
      >
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="relative z-10 p-12 md:p-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Team's Productivity?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using FlowSync AI to collaborate better, work smarter, and achieve more together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg" onClick={onEarlyAccess}>
              Get Early Access
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg" onClick={onDemoRequest}>
              Schedule a Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;