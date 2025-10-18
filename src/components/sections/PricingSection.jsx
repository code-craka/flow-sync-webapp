import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PricingCard = ({ title, description, price, priceSuffix, features, popular, ctaText, ctaVariant, onCtaClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-background/50 backdrop-blur-sm rounded-xl p-8 border ${popular ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'} transition-all hover:shadow-lg relative`}
  >
    {popular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-6">{description}</p>
    <div className="mb-6">
      <span className="text-4xl font-bold">{price}</span>
      {priceSuffix && <span className="text-muted-foreground">{priceSuffix}</span>}
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button variant={ctaVariant} className="w-full" onClick={onCtaClick}>{ctaText}</Button>
  </motion.div>
);

const pricingData = [
  {
    title: "Starter",
    description: "Perfect for small teams getting started",
    price: "$12",
    priceSuffix: "/user/month",
    features: ["Up to 10 team members", "Basic task management", "5 integrations", "Standard support"],
    ctaText: "Get Started",
    delay: 0.1
  },
  {
    title: "Pro",
    description: "Ideal for growing teams and organizations",
    price: "$24",
    priceSuffix: "/user/month",
    features: ["Unlimited team members", "Advanced task management", "20 integrations", "Priority support", "AI-powered insights"],
    popular: true,
    ctaText: "Get Started",
    delay: 0.2
  },
  {
    title: "Enterprise",
    description: "For large organizations with complex needs",
    price: "Custom",
    features: ["Unlimited everything", "Advanced security & compliance", "Unlimited integrations", "Dedicated account manager", "Custom AI training"],
    ctaText: "Contact Sales",
    ctaVariant: "outline",
    delay: 0.3
  }
];

const PricingSection = ({ onDemoRequest }) => {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your team. All plans include core features.
          </p>
        </motion.div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingData.map((plan, index) => (
          <PricingCard 
            key={index} 
            {...plan} 
            onCtaClick={plan.ctaText === "Contact Sales" ? onDemoRequest : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;