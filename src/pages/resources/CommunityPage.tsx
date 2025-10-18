/**
 * Community Page
 */

import { motion } from 'framer-motion';
import { MessageSquare, Users, Heart, Award, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const communityLinks = [
  {
    title: 'Discord Community',
    description: 'Join 5,000+ members in our Discord server for real-time discussions and support.',
    icon: MessageSquare,
    members: '5.2K',
    url: 'https://discord.gg/flowsync',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'GitHub Discussions',
    description: 'Share ideas, ask questions, and contribute to the FlowSync AI open-source community.',
    icon: Users,
    members: '2.1K',
    url: 'https://github.com/flowsync/discussions',
    color: 'from-gray-700 to-gray-900',
  },
  {
    title: 'Twitter Community',
    description: 'Follow us for product updates, tips, and behind-the-scenes content.',
    icon: Heart,
    members: '12K',
    url: 'https://twitter.com/flowsync',
    color: 'from-blue-400 to-blue-600',
  },
];

const programs = [
  {
    title: 'Ambassador Program',
    description: 'Become a FlowSync AI ambassador and get exclusive perks, early access, and swag.',
    icon: Award,
    benefits: ['Early access to features', 'Exclusive swag', 'Direct line to the team'],
  },
  {
    title: 'User Groups',
    description: 'Connect with other FlowSync AI users in your city or industry.',
    icon: Users,
    benefits: ['Local meetups', 'Knowledge sharing', 'Networking opportunities'],
  },
];

export function CommunityPage() {
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
            <Badge variant="secondary">Community</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Join our{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                community
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Connect with thousands of users, share knowledge, and help shape the future of FlowSync AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Community Links */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {communityLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${link.color}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{link.title}</CardTitle>
                            <CardDescription className="text-base">{link.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-4">
                              <Badge variant="secondary">
                                <Users className="h-3 w-3 mr-1" />
                                {link.members} members
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            Join
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Community Programs
              </h2>
              <p className="text-lg text-muted-foreground">
                Get more involved with special programs and initiatives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                            <CardDescription>{program.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {program.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" className="w-full mt-6">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Community Guidelines</CardTitle>
                <CardDescription>Help us maintain a welcoming and productive community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">1</Badge>
                    <p className="flex-1">
                      <strong>Be respectful:</strong> Treat everyone with kindness and respect, regardless of their experience level.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">2</Badge>
                    <p className="flex-1">
                      <strong>Stay on topic:</strong> Keep discussions relevant and helpful to the community.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">3</Badge>
                    <p className="flex-1">
                      <strong>No spam:</strong> Avoid promotional content, self-promotion, or repeated posts.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">4</Badge>
                    <p className="flex-1">
                      <strong>Help others:</strong> Share your knowledge and experience to help fellow community members.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to join?
            </h2>
            <p className="text-lg text-muted-foreground">
              Pick your favorite platform and start connecting with the FlowSync AI community today.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
