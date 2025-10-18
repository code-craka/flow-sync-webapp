import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Clock, Send, Building } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! We'll get back to you within 24-48 hours.",
      variant: "success",
    });
    setFormData({ fullName: '', email: '', subject: '', message: '' });
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 gradient-text"
          >
            Let's Talk!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            We'd love to hear from you. Whether you have a question, feedback, or a partnership proposal, feel free to reach out.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="rounded-2xl shadow-xl soft-shadow border-border">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl font-semibold text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <Input type="text" name="fullName" id="fullName" placeholder="Your Full Name" value={formData.fullName} onChange={handleInputChange} required className="rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                    <Input type="email" name="email" id="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required className="rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                    <Select name="subject" onValueChange={handleSubjectChange} value={formData.subject} required>
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Select a subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="support">Support Request</SelectItem>
                        <SelectItem value="partnerships">Partnership Proposal</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                    <Textarea name="message" id="message" rows={6} placeholder="Your message here..." value={formData.message} onChange={handleInputChange} required className="rounded-lg" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full rounded-lg gradient-bg text-white group" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <Card className="rounded-2xl shadow-xl soft-shadow border-border">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl font-semibold text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a href="mailto:support@flowsync.ai" className="text-primary hover:underline">support@flowsync.ai</a>
                    <p className="text-sm text-muted-foreground">For general support and inquiries.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Headquarters</h4>
                    <p className="text-muted-foreground">Dhaka, Bangladesh</p>
                    <p className="text-sm text-muted-foreground">Our team is globally distributed (Remote-first).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Operating Hours</h4>
                    <p className="text-muted-foreground">Support available Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM (GMT+6)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-xl soft-shadow border-border overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-2xl font-semibold text-foreground">Our Location</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="aspect-video">
                        <iframe 
                            src="https://www.openstreetmap.org/export/embed.html?bbox=90.3486%2C23.7000%2C90.4486%2C23.8000&layer=mapnik&marker=23.7500%2C90.3986" 
                            style={{border:0, width: '100%', height: '100%'}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="FlowSyncAI Location Map"
                        ></iframe>
                    </div>
                     <p className="p-4 text-sm text-muted-foreground text-center">
                        While our main office is in Dhaka, our team collaborates remotely from around the world.
                    </p>
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;