import React from 'react';
import { motion } from 'framer-motion';
import { Users, Layout, Puzzle, Zap, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, items, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="feature-card"
  >
    <Icon className="h-12 w-12 text-primary mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
    <ul className="mt-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const featuresData = [
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Work together seamlessly with your team in real-time. See changes as they happen, share feedback instantly, and keep everyone in sync.",
    items: ["Live document editing", "Instant messaging", "Presence indicators"],
    delay: 0.1
  },
  {
    icon: Layout,
    title: "Customizable Task Views",
    description: "Personalize your workflow with flexible task views. Switch between Kanban boards, lists, calendars, or create your own custom views.",
    items: ["Kanban boards", "List and calendar views", "Custom view builder"],
    delay: 0.2
  },
  {
    icon: Puzzle,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools and services. FlowSync AI works with the apps you already use, creating a unified workspace.",
    items: ["50+ app integrations", "API access", "Custom webhooks"],
    delay: 0.3
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Let AI analyze your workflow and suggest improvements. Get personalized recommendations to boost productivity and efficiency.",
    items: ["Smart task prioritization", "Workflow optimization", "Performance analytics"],
    delay: 0.4
  },
  {
    icon: MessageSquare,
    title: "Contextual Communication",
    description: "Keep conversations in context. Discuss tasks, projects, and documents right where the work happens, eliminating confusion.",
    items: ["In-line comments", "Task-specific discussions", "@mentions and notifications"],
    delay: 0.5
  },
  {
    icon: Clock,
    title: "Automated Workflows",
    description: "Automate repetitive tasks and processes. Create custom workflows that trigger actions based on events, saving time and reducing errors.",
    items: ["No-code automation builder", "Scheduled actions", "Conditional logic"],
    delay: 0.6
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="gradient-text">Seamless Productivity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how FlowSync AI transforms the way your team works together.
          </p>
        </motion.div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;