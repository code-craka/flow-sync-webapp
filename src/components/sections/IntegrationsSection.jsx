import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const IntegrationsSection = () => {
  return (
    <section id="integrations" className="container mx-auto px-4 py-20 relative">
      <div className="absolute -z-10 w-full h-full max-w-5xl mx-auto inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Seamlessly Integrate</span> With Your Favorite Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            FlowSync AI connects with the tools you already use, creating a unified workspace for your team.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-center h-20 bg-background/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <img  alt={`Integration partner logo ${index + 1}`} className="h-10 w-10 opacity-80 hover:opacity-100 transition-opacity" src="https://images.unsplash.com/photo-1664098295863-62a394edad97" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="group">
          View All Integrations
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default IntegrationsSection;