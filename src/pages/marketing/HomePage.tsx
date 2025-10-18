/**
 * Million-Dollar Homepage
 *
 * Stunning landing page with all the bells and whistles
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Users,
  Brain,
  BarChart,
  Shield,
  Rocket,
  Heart,
  ArrowRight,
  Check,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeatureGrid } from '@/components/marketing/FeatureCard';
import { TestimonialSlider, defaultTestimonials } from '@/components/marketing/TestimonialSlider';
import { IntegrationGrid, defaultIntegrations } from '@/components/marketing/IntegrationGrid';
import { PricingPlans } from '@/components/billing/PricingPlans';
import { celebrateSuccess } from '@/lib/confetti';
import toast from 'react-hot-toast';

export function HomePage() {
  const handleCTAClick = () => {
    celebrateSuccess();
    toast.success('Ready to transform your workflow?', {
      icon: '🚀',
      duration: 3000,
    });
  };

  const features = [
    {
      title: 'AI-Powered Insights',
      description:
        'Get intelligent suggestions, automate repetitive tasks, and unlock productivity insights powered by advanced AI.',
      icon: Brain,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Real-Time Collaboration',
      description:
        'See who\'s online, collaborate in real-time, and stay synchronized with your team across the globe.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Lightning Fast',
      description:
        'Built for speed with cutting-edge technology. Experience instant updates and blazing-fast performance.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Advanced Analytics',
      description:
        'Track progress, measure performance, and make data-driven decisions with beautiful visualizations.',
      icon: BarChart,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Enterprise Security',
      description:
        'Bank-level encryption, SSO, SAML, and compliance with SOC 2, GDPR, and HIPAA standards.',
      icon: Shield,
      gradient: 'from-red-500 to-rose-500',
    },
    {
      title: 'Unlimited Integrations',
      description:
        'Connect with 100+ tools you already use. Slack, GitHub, Figma, and more work seamlessly together.',
      icon: Rocket,
      gradient: 'from-indigo-500 to-violet-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Trusted by 10,000+ teams worldwide
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Work smarter with{' '}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-powered
              </span>{' '}
              team productivity
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              FlowSync AI combines the power of artificial intelligence with intuitive
              project management. Ship faster, collaborate better, and achieve more
              together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="text-lg px-8 h-14 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group"
                onClick={handleCTAClick}
                asChild
              >
                <Link to="/auth/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14"
                asChild
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 md:mt-24"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl" />
              <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 shadow-2xl">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center">
                  <p className="text-muted-foreground text-lg">
                    🎥 Product Demo Video / Screenshot
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="secondary" className="mb-2">Features</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to help your team collaborate, automate, and
              achieve more.
            </p>
          </div>

          <FeatureGrid features={features} />
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="secondary" className="mb-2">Integrations</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Works with your favorite tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Connect FlowSync AI with 100+ apps you already use every day.
            </p>
          </div>

          <IntegrationGrid integrations={defaultIntegrations} />

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/integrations">
                View All Integrations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="secondary" className="mb-2">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Loved by teams everywhere
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say about FlowSync AI.
            </p>
          </div>

          <TestimonialSlider testimonials={defaultTestimonials} />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { value: '10,000+', label: 'Active Teams' },
              { value: '500K+', label: 'Tasks Completed' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '4.9/5', label: 'Customer Rating' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="secondary" className="mb-2">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you're ready. No hidden fees, no surprises.
            </p>
          </div>

          <PricingPlans showCurrentPlan={false} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Ready to transform your team's productivity?
              </h2>
              <p className="text-lg text-muted-foreground mt-6">
                Join thousands of teams already using FlowSync AI to work smarter and
                achieve more.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="text-lg px-8 h-14 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                onClick={handleCTAClick}
                asChild
              >
                <Link to="/auth/signup">
                  Start Free Trial
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14"
                asChild
              >
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground"
            >
              No credit card required • 14-day free trial • Cancel anytime
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
