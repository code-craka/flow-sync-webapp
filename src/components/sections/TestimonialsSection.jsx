import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ imageSrc, altText, name, title, quote, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border"
  >
    <div className="flex items-center mb-4">
      <div className="mr-4 rounded-full overflow-hidden w-12 h-12 border border-border">
        <img  alt={altText} className="w-full h-full object-cover" src={imageSrc} />
      </div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
    <p className="italic text-muted-foreground">{quote}</p>
  </motion.div>
);

const testimonialsData = [
  {
    imageSrc: "https://images.unsplash.com/photo-1575383596664-30f4489f9786",
    altText: "Sarah Johnson, Product Manager at TechCorp",
    name: "Sarah Johnson",
    title: "Product Manager, TechCorp",
    quote: "\"FlowSync AI has revolutionized how our product team collaborates. The customizable views mean everyone can work their way, while still maintaining perfect alignment. The AI suggestions have helped us optimize our sprint planning process.\"",
    delay: 0.1
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1575709091723-d92b0f14a631",
    altText: "Marcus Chen, CTO at InnovateCo",
    name: "Marcus Chen",
    title: "CTO, InnovateCo",
    quote: "\"The integration capabilities of FlowSync AI are unmatched. We've connected all our development tools, and now everything flows through one central hub. Real-time collaboration has cut our meeting time in half.\"",
    delay: 0.2
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1608875848903-06eec0bd71e2",
    altText: "Aisha Patel, Marketing Director at GrowthLabs",
    name: "Aisha Patel",
    title: "Marketing Director, GrowthLabs",
    quote: "\"Our marketing campaigns are now seamlessly coordinated across channels thanks to FlowSync AI. The automated workflows save us hours each week, and the contextual communication keeps everyone on the same page.\"",
    delay: 0.3
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Innovative Teams</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how teams are transforming their workflow with FlowSync AI.
          </p>
        </motion.div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;