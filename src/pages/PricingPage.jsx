import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Zap, ShieldCheck, Users, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header'; 
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const plans = {
  monthly: [
    { name: 'Free', price: '$0', features: ['Up to 5 projects', 'Basic task management', 'Community support', '1 workspace'], cta: 'Get Started Free', popular: false },
    { name: 'Pro', price: '$12', features: ['Unlimited projects', 'Advanced task management', 'AI assistant (beta)', 'Priority support', '5 workspaces', 'Real-time collaboration'], cta: 'Choose Pro', popular: true },
    { name: 'Business', price: '$25', features: ['All Pro features', 'Team analytics', 'Custom integrations', 'Dedicated account manager', 'Unlimited workspaces', 'Advanced security'], cta: 'Contact Sales', popular: false },
  ],
  yearly: [
    { name: 'Free', price: '$0', features: ['Up to 5 projects', 'Basic task management', 'Community support', '1 workspace'], cta: 'Get Started Free', popular: false },
    { name: 'Pro', price: '$10', features: ['Unlimited projects', 'Advanced task management', 'AI assistant (beta)', 'Priority support', '5 workspaces', 'Real-time collaboration'], cta: 'Choose Pro', popular: true },
    { name: 'Business', price: '$20', features: ['All Pro features', 'Team analytics', 'Custom integrations', 'Dedicated account manager', 'Unlimited workspaces', 'Advanced security'], cta: 'Contact Sales', popular: false },
  ],
};

const faqData = [
  { question: 'Can I change my plan later?', answer: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be prorated.' },
  { question: 'Is there a discount for non-profits?', answer: 'We offer special discounts for eligible non-profit organizations and educational institutions. Please contact our support team for more information.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. For Business plans, we can also arrange invoicing.' },
  { question: 'How does the AI assistant work?', answer: 'Our AI assistant helps you with task summarization, idea generation, and workflow optimization. It learns from your project context to provide relevant suggestions. It is currently in beta for Pro and Business plans.' },
];

const testimonials = [
  { quote: "FlowSyncAI has transformed our team's productivity. The AI features are a game-changer!", name: "Alex R.", company: "Innovate Solutions" , image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100"},
  { quote: "The best collaboration tool we've ever used. Intuitive, powerful, and beautiful.", name: "Maria S.", company: "Creative Minds Co." , image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100"},
  { quote: "Seamless integration with our existing tools and a joy to use daily.", name: "David K.", company: "Tech Forward Inc." , image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100"},
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const currentPlans = isYearly ? plans.yearly : plans.monthly;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Find the <span className="gradient-text">Perfect Plan</span> for Your Team
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock powerful AI-driven collaboration and task management. Choose a plan that scales with your needs.
          </p>
          <div className="flex items-center justify-center space-x-3 mt-8">
            <Label htmlFor="billing-cycle" className={!isYearly ? 'text-primary font-medium' : 'text-muted-foreground'}>Monthly</Label>
            <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle billing cycle" />
            <Label htmlFor="billing-cycle" className={isYearly ? 'text-primary font-medium' : 'text-muted-foreground'}>
              Yearly <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-1">Save 20%</span>
            </Label>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {currentPlans.map((plan, index) => (
            <Card key={plan.name} className={`flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${plan.popular ? 'border-2 border-primary ring-4 ring-primary/20' : 'border'}`}>
              {plan.popular && <div className="bg-primary text-primary-foreground text-sm font-semibold py-1 px-4 rounded-t-xl -mb-px text-center">Most Popular</div>}
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-4xl font-extrabold mb-1">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month{isYearly && plan.name !== 'Free' ? ' (billed annually)' : ''}</span></CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 mt-auto">
                <Button asChild size="lg" className={`w-full text-lg ${plan.popular ? '' : 'variant="outline"'}`}>
                  <Link to={plan.cta === 'Contact Sales' ? '/contact' : '/auth/signup'}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.section>

        <motion.section 
          id="feature-comparison" 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Feature Comparison</h2>
          <div className="overflow-x-auto bg-card p-6 rounded-2xl shadow-lg border">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-3 text-left font-semibold text-lg">Feature</th>
                  {currentPlans.map(plan => <th key={plan.name} className="py-4 px-3 text-center font-semibold text-lg">{plan.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Projects', values: ['5', 'Unlimited', 'Unlimited'], icon: Zap },
                  { name: 'Task Management', values: ['Basic', 'Advanced', 'Advanced'], icon: CheckCircle },
                  { name: 'AI Assistant', values: ['-', 'Beta', 'Full Access'], icon: Sparkles },
                  { name: 'Workspaces', values: ['1', '5', 'Unlimited'], icon: Users },
                  { name: 'Real-time Collaboration', values: ['-', <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />, <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />], icon: MessageSquare },
                  { name: 'Advanced Security', values: ['-', '-', <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />], icon: ShieldCheck },
                ].map(feature => (
                  <tr key={feature.name} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-3 text-left flex items-center"><feature.icon className="h-5 w-5 mr-2 text-primary" /> {feature.name}</td>
                    {feature.values.map((value, i) => <td key={i} className="py-4 px-3 text-center text-muted-foreground">{typeof value === 'string' ? value : value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
        
        <motion.section 
          id="testimonials-carousel" 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Loved by Teams Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card p-6 rounded-2xl shadow-lg border flex flex-col items-center text-center">
                <img-replace src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-primary" />
                <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.company}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="faq" 
          className="max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-2xl shadow-md px-2">
                <AccordionTrigger className="text-left font-semibold text-lg p-6 hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        <motion.section 
          className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-10 md:p-16 rounded-2xl shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Productivity?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of teams building their best work with FlowSync AI.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7">
            <Link to="/auth/signup">
              Sign Up For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;