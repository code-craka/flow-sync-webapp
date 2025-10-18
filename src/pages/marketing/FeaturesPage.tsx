/**
 * Features Page
 *
 * Comprehensive features showcase
 */

import { motion } from 'framer-motion';
import {
  Brain,
  Users,
  Zap,
  BarChart,
  Shield,
  Rocket,
  MessageSquare,
  Calendar,
  FileText,
  Search,
  Globe,
  Smartphone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FeatureGrid } from '@/components/marketing/FeatureCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function FeaturesPage() {
  const coreFeatures = [
    {
      title: 'AI-Powered Insights',
      description:
        'Machine learning algorithms analyze your workflow patterns and provide intelligent suggestions to boost productivity.',
      icon: Brain,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Real-Time Collaboration',
      description:
        'See team members online, collaborate simultaneously, and stay in sync across all devices and locations.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Lightning Performance',
      description:
        'Built with modern web technologies for instant load times and seamless interactions.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Advanced Analytics',
      description:
        'Visualize team performance, track progress, and make data-driven decisions with beautiful dashboards.',
      icon: BarChart,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Enterprise Security',
      description:
        'Bank-level encryption, SSO, 2FA, and compliance with SOC 2, GDPR, HIPAA, and more.',
      icon: Shield,
      gradient: 'from-red-500 to-rose-500',
    },
    {
      title: 'Powerful Integrations',
      description:
        'Connect with 100+ tools including Slack, GitHub, Figma, Google Workspace, and more.',
      icon: Rocket,
      gradient: 'from-indigo-500 to-violet-500',
    },
  ];

  const additionalFeatures = [
    {
      title: 'Unified Communication',
      description: 'Built-in chat, comments, and @mentions keep conversations organized.',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Smart Scheduling',
      description: 'AI-powered calendar that automatically finds the best meeting times.',
      icon: Calendar,
      gradient: 'from-purple-500 to-fuchsia-500',
    },
    {
      title: 'Document Management',
      description: 'Store, version, and collaborate on documents with your team.',
      icon: FileText,
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'Powerful Search',
      description: 'Find anything instantly with AI-powered search across all content.',
      icon: Search,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Multi-Language Support',
      description: 'Work in 20+ languages with automatic translation features.',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Mobile Apps',
      description: 'Native iOS and Android apps for productivity on the go.',
      icon: Smartphone,
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Badge variant="secondary" className="mb-2">Features</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Everything you need in{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                one platform
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Powerful features designed to help teams collaborate better, automate workflows,
              and achieve extraordinary results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Core Capabilities
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              The foundation of productivity
            </p>
          </div>

          <FeatureGrid features={coreFeatures} />
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              And So Much More
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Additional features to supercharge your workflow
            </p>
          </div>

          <FeatureGrid features={additionalFeatures} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Try FlowSync AI free for 14 days. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600" asChild>
                <Link to="/auth/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
