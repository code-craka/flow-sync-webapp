import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LifeBuoy, MessageSquare, Users, FileText, Bug, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const faqItems = [
  {
    value: "item-1",
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password?' link on the sign-in page. Follow the instructions sent to your email address.",
  },
  {
    value: "item-2",
    question: "How do I invite team members to my workspace?",
    answer: "Navigate to your workspace settings, then go to the 'Members' tab. You can invite new members by entering their email addresses.",
  },
  {
    value: "item-3",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards via Stripe. For enterprise plans, we may support invoicing. Please contact sales for more details.",
  },
  {
    value: "item-4",
    question: "How does the AI Assistant work?",
    answer: "Our AI Assistant uses advanced language models to help you summarize projects, break down tasks, suggest deadlines, and more. You can interact with it via the chat interface within your projects.",
  },
];

const SupportPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', category: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Support form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you within 24-48 hours.",
      variant: "success",
    });
    setFormData({ name: '', email: '', category: '', message: '' });
    setIsSubmitting(false);
  };

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
            FlowSyncAI Support Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            We're here to help! Find answers to common questions or get in touch with our support team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl shadow-xl soft-shadow border-border">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-semibold">Frequently Asked Questions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem value={item.value} key={item.value}>
                      <AccordionTrigger className="text-left hover:no-underline text-base font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pt-1 pb-3">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mt-8 md:mt-12 rounded-2xl shadow-xl soft-shadow border-border">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center space-x-3">
                  <Send className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-semibold">Contact Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                      <Input type="text" name="name" id="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required className="rounded-lg" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                      <Input type="email" name="email" id="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required className="rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">Category</label>
                    <Select name="category" onValueChange={handleCategoryChange} value={formData.category} required>
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical-issue">Technical Issue</SelectItem>
                        <SelectItem value="billing-question">Billing Question</SelectItem>
                        <SelectItem value="feature-request">Feature Request</SelectItem>
                        <SelectItem value="general-feedback">General Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                    <Textarea name="message" id="message" rows={5} placeholder="Describe your issue or question..." value={formData.message} onChange={handleInputChange} required className="rounded-lg" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full rounded-lg gradient-bg text-white" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Or email us directly at <a href="mailto:support@flowsync.ai" className="text-primary hover:underline">support@flowsync.ai</a>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1 space-y-8"
          >
            <Card className="rounded-2xl shadow-xl soft-shadow border-border">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center space-x-3">
                  <LifeBuoy className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl font-semibold">Quick Links</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button variant="outline" asChild className="w-full justify-start text-left group rounded-lg">
                  <a href="/resources/documentation" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary" /> Documentation
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start text-left group rounded-lg">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Users className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary" /> Community Forum
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start text-left group rounded-lg">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary" /> Roadmap
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start text-left group rounded-lg">
                  <a href="/resources/blog?tag=Changelog" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary" /> Changelog
                  </a>
                </Button>
                <Button variant="destructiveOutline" asChild className="w-full justify-start text-left group rounded-lg">
                  <a href="mailto:bugs@flowsync.ai?subject=Bug Report">
                    <Bug className="mr-3 h-5 w-5 text-destructive/80 group-hover:text-destructive" /> Submit a Bug
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportPage;