/**
 * Partners Page
 */

import { motion } from 'framer-motion';
import { Users, Star, Zap, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const partnerTiers = [
  {
    name: 'Technology Partner',
    icon: Zap,
    description: 'Integrate your product with FlowSync AI and reach thousands of teams.',
    benefits: [
      'API access and documentation',
      'Co-marketing opportunities',
      'Featured in integrations marketplace',
      'Technical support',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Solution Partner',
    icon: Building,
    description: 'Resell FlowSync AI or build custom solutions for your clients.',
    benefits: [
      'Partner pricing and margins',
      'Sales enablement resources',
      'Dedicated partner manager',
      'Priority support',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Strategic Partner',
    icon: Star,
    description: 'Deep collaboration for joint solutions and go-to-market strategies.',
    benefits: [
      'Custom integration development',
      'Joint product roadmap input',
      'Executive sponsorship',
      'Enterprise support SLA',
    ],
    color: 'from-orange-500 to-red-500',
  },
];

const currentPartners = [
  { name: 'TechCorp', logo: 'TC', industry: 'Enterprise Software' },
  { name: 'DataFlow', logo: 'DF', industry: 'Analytics' },
  { name: 'CloudSync', logo: 'CS', industry: 'Cloud Services' },
  { name: 'TeamConnect', logo: 'TC', industry: 'Collaboration' },
];

export function PartnersPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Badge variant="secondary">Partners</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Partner with{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FlowSync AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join our partner ecosystem and grow your business with the leading AI productivity platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partnership Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership level that fits your business goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {partnerTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${tier.color} w-fit mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Partners
              </h2>
              <p className="text-lg text-muted-foreground">
                Trusted by leading companies worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 text-center">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                        {partner.logo}
                      </div>
                      <h3 className="font-semibold mb-1">{partner.name}</h3>
                      <p className="text-xs text-muted-foreground">{partner.industry}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Why Partner With Us?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Grow Your Revenue',
                  description: 'Access new revenue streams and expand your market reach with our partner programs.',
                },
                {
                  title: 'Technical Excellence',
                  description: 'Leverage our robust APIs, SDKs, and comprehensive developer documentation.',
                },
                {
                  title: 'Marketing Support',
                  description: 'Get featured in our marketplace, co-marketing materials, and partner events.',
                },
                {
                  title: 'Dedicated Support',
                  description: 'Work with dedicated partner managers and technical support teams.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <Users className="h-16 w-16 mx-auto text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to partner with us?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss how we can grow together. Fill out our partnership application or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                Apply to Partner Program
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
