/**
 * Changelog Page
 */

import { motion } from 'framer-motion';
import { Sparkles, Bug, Zap, Plus, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Change {
  type: 'feature' | 'improvement' | 'bug' | 'breaking';
  text: string;
}

interface Release {
  version: string;
  date: string;
  changes: Change[];
}

const releases: Release[] = [
  {
    version: 'v0.5.0',
    date: 'January 18, 2025',
    changes: [
      { type: 'feature', text: 'Real-time collaboration with live presence indicators' },
      { type: 'feature', text: 'Billing & subscriptions with Polar integration' },
      { type: 'feature', text: 'Usage limits enforcement and upgrade prompts' },
      { type: 'improvement', text: 'Enhanced error boundaries for better error handling' },
      { type: 'improvement', text: 'Performance optimizations across the app' },
      { type: 'bug', text: 'Fixed task assignment notifications' },
    ],
  },
  {
    version: 'v0.4.0',
    date: 'January 10, 2025',
    changes: [
      { type: 'feature', text: 'Task comments with real-time updates' },
      { type: 'feature', text: 'Activity feed with live notifications' },
      { type: 'feature', text: 'Online presence tracking' },
      { type: 'improvement', text: 'Improved mobile responsiveness' },
      { type: 'bug', text: 'Fixed project deletion cascade' },
    ],
  },
  {
    version: 'v0.3.0',
    date: 'January 5, 2025',
    changes: [
      { type: 'feature', text: 'Project and task management' },
      { type: 'feature', text: 'Team invitation system' },
      { type: 'feature', text: 'Role-based access control' },
      { type: 'improvement', text: 'Enhanced UI/UX with glassmorphism' },
    ],
  },
  {
    version: 'v0.2.0',
    date: 'December 28, 2024',
    changes: [
      { type: 'feature', text: 'Multi-tenancy with organizations' },
      { type: 'feature', text: 'Team collaboration features' },
      { type: 'improvement', text: 'TypeScript migration complete' },
    ],
  },
  {
    version: 'v0.1.0',
    date: 'December 20, 2024',
    changes: [
      { type: 'feature', text: 'Initial release with authentication' },
      { type: 'feature', text: 'Database schema with RLS policies' },
      { type: 'feature', text: 'Theme system (light/dark mode)' },
    ],
  },
];

const changeTypeConfig = {
  feature: {
    icon: Sparkles,
    color: 'text-primary',
    label: 'New',
  },
  improvement: {
    icon: Zap,
    color: 'text-yellow-500',
    label: 'Improved',
  },
  bug: {
    icon: Bug,
    color: 'text-green-500',
    label: 'Fixed',
  },
  breaking: {
    icon: Wrench,
    color: 'text-red-500',
    label: 'Breaking',
  },
};

export function ChangelogPage() {
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
            <Badge variant="secondary">Changelog</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              What's{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                new
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Stay up to date with the latest features, improvements, and bug fixes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {releases.map((release, index) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-2xl">{release.version}</CardTitle>
                      <Badge variant="outline">{release.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {release.changes.map((change, i) => {
                        const config = changeTypeConfig[change.type];
                        const Icon = config.icon;
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`flex items-center gap-2 ${config.color} flex-shrink-0`}>
                              <Icon className="h-4 w-4 mt-0.5" />
                              <Badge variant="secondary" className="text-xs">
                                {config.label}
                              </Badge>
                            </div>
                            <span className="flex-1">{change.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Stay in the loop
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter to get notified about new features and updates.
            </p>
            <Badge variant="outline" className="text-sm">
              🔔 Coming soon: RSS feed
            </Badge>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
