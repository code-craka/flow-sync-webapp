/**
 * Press Page
 */

import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const pressReleases = [
  {
    date: 'January 18, 2025',
    title: 'FlowSync AI Launches Advanced Real-Time Collaboration Features',
    excerpt: 'New features enable teams to collaborate seamlessly with live presence indicators and instant updates.',
  },
  {
    date: 'December 15, 2024',
    title: 'FlowSync AI Raises $10M Series A to Accelerate AI-Powered Productivity',
    excerpt: 'Funding will fuel product development and global expansion of the AI productivity platform.',
  },
  {
    date: 'November 1, 2024',
    title: 'FlowSync AI Reaches 10,000 Active Teams Milestone',
    excerpt: 'Platform continues rapid growth with teams across 50+ countries using FlowSync AI daily.',
  },
];

const mediaKit = [
  {
    title: 'Company Logos',
    description: 'High-resolution logos in various formats (PNG, SVG)',
    size: '2.4 MB',
  },
  {
    title: 'Product Screenshots',
    description: 'Latest product screenshots and UI examples',
    size: '8.1 MB',
  },
  {
    title: 'Brand Guidelines',
    description: 'Complete brand guidelines including colors, typography, and usage',
    size: '1.2 MB',
  },
  {
    title: 'Executive Photos',
    description: 'High-resolution photos of our leadership team',
    size: '5.7 MB',
  },
];

const coverage = [
  {
    outlet: 'TechCrunch',
    title: 'How FlowSync AI is Revolutionizing Team Productivity',
    url: '#',
  },
  {
    outlet: 'VentureBeat',
    title: 'FlowSync AI\'s AI-Powered Approach to Project Management',
    url: '#',
  },
  {
    outlet: 'The Verge',
    title: 'The Future of Work: Inside FlowSync AI',
    url: '#',
  },
];

export function PressPage() {
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
            <Badge variant="secondary">Press & Media</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              FlowSync AI in the{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                news
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Latest news, press releases, and media resources for journalists and content creators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Press Inquiries</h3>
                  <p className="text-muted-foreground">
                    For media inquiries, interviews, or press kit requests
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <a href="mailto:press@flowsync.ai">
                    Contact Press Team
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Press Releases
            </h2>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2">
                        {release.date}
                      </Badge>
                      <CardTitle className="text-xl">{release.title}</CardTitle>
                      <CardDescription className="text-base">
                        {release.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="gap-2">
                        Read Full Release
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Media Kit
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
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
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{item.size}</Badge>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                Download Complete Press Kit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              In the News
            </h2>

            <div className="space-y-4">
              {coverage.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">
                            {article.outlet}
                          </Badge>
                          <h3 className="font-semibold text-lg">{article.title}</h3>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Company Facts
            </h2>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Quick Facts</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span><strong>Founded:</strong> 2024</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span><strong>Headquarters:</strong> San Francisco, CA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span><strong>Employees:</strong> 50+</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span><strong>Active Teams:</strong> 10,000+</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Press:</strong>{' '}
                        <a href="mailto:press@flowsync.ai" className="text-primary hover:underline">
                          press@flowsync.ai
                        </a>
                      </li>
                      <li>
                        <strong>General:</strong>{' '}
                        <a href="mailto:hello@flowsync.ai" className="text-primary hover:underline">
                          hello@flowsync.ai
                        </a>
                      </li>
                      <li>
                        <strong>Twitter:</strong>{' '}
                        <a href="https://twitter.com/flowsync" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          @flowsync
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
