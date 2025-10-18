/**
 * Roadmap Page
 *
 * Product roadmap with timeline and voting
 */

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles, Vote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Tabs from '@radix-ui/react-tabs';
import toast from 'react-hot-toast';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'shipped' | 'in-progress' | 'planned';
  quarter: string;
  votes: number;
  category: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    id: '1',
    title: 'Advanced AI Insights',
    description: 'Get personalized productivity recommendations powered by GPT-4',
    status: 'in-progress',
    quarter: 'Q1 2025',
    votes: 234,
    category: 'AI Features',
  },
  {
    id: '2',
    title: 'Mobile Apps (iOS & Android)',
    description: 'Native mobile apps for productivity on the go',
    status: 'in-progress',
    quarter: 'Q1 2025',
    votes: 512,
    category: 'Mobile',
  },
  {
    id: '3',
    title: 'Gantt Chart View',
    description: 'Visualize project timelines with interactive Gantt charts',
    status: 'planned',
    quarter: 'Q2 2025',
    votes: 189,
    category: 'Project Management',
  },
  {
    id: '4',
    title: 'Time Tracking',
    description: 'Built-in time tracking with automated timesheets',
    status: 'planned',
    quarter: 'Q2 2025',
    votes: 421,
    category: 'Productivity',
  },
  {
    id: '5',
    title: 'Custom Workflows',
    description: 'Create custom automation workflows with no-code builder',
    status: 'planned',
    quarter: 'Q3 2025',
    votes: 356,
    category: 'Automation',
  },
  {
    id: '6',
    title: 'Real-Time Collaboration',
    description: 'Live presence indicators and collaborative editing',
    status: 'shipped',
    quarter: 'Q4 2024',
    votes: 678,
    category: 'Collaboration',
  },
  {
    id: '7',
    title: 'Advanced Analytics',
    description: 'Comprehensive insights into team performance and productivity',
    status: 'shipped',
    quarter: 'Q4 2024',
    votes: 445,
    category: 'Analytics',
  },
];

const statusConfig = {
  shipped: {
    label: 'Shipped',
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Clock,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  planned: {
    label: 'Planned',
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
};

export function RoadmapPage() {
  const [selectedTab, setSelectedTab] = React.useState<'all' | 'shipped' | 'in-progress' | 'planned'>('all');

  const handleVote = (itemId: string, itemTitle: string) => {
    // INTEGRATION POINT: Voting System
    // TODO: Implement voting API
    /*
    await fetch('/api/roadmap/vote', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
    });
    */

    toast.success(`Voted for "${itemTitle}"!`, {
      icon: '👍',
    });
  };

  const filteredItems = selectedTab === 'all'
    ? roadmapItems
    : roadmapItems.filter((item) => item.status === selectedTab);

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
            <Badge variant="secondary">Roadmap</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              What we're{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                building next
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              See what we're working on and vote for the features you want most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-muted/30 sticky top-20 z-40 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <Tabs.Root value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
            <Tabs.List className="flex flex-wrap gap-2 justify-center">
              {['all', 'in-progress', 'planned', 'shipped'].map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className="px-6 py-2 rounded-lg border border-border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors capitalize"
                >
                  {tab === 'all' ? 'All' : tab.replace('-', ' ')}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>
      </section>

      {/* Roadmap Items */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredItems.map((item, index) => {
              const statusInfo = statusConfig[item.status];
              const Icon = statusInfo.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className={`${statusInfo.bg} ${statusInfo.color}`}>
                              <Icon className="h-3 w-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                            <Badge variant="outline">{item.quarter}</Badge>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </div>

                        {/* Vote Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(item.id, item.title)}
                          className="flex flex-col items-center gap-1 h-auto px-4 py-2"
                        >
                          <Vote className="h-4 w-4" />
                          <span className="text-xs font-semibold">{item.votes}</span>
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
              Have a feature request?
            </h2>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you! Submit your ideas and help shape the future of FlowSync AI.
            </p>
            <Button size="lg" variant="outline">
              Submit Feature Request
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
