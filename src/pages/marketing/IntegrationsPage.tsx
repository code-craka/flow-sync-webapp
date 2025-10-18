/**
 * Integrations Page
 *
 * Showcase all integrations with search and categories
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IntegrationGrid, defaultIntegrations, type Integration } from '@/components/marketing/IntegrationGrid';
import * as Tabs from '@radix-ui/react-tabs';

// Extended integrations list
const allIntegrations: Integration[] = [
  ...defaultIntegrations,
  {
    name: 'Linear',
    description: 'Issue tracking for modern teams',
    logo: 'L',
    category: 'Project Management',
    comingSoon: true,
  },
  {
    name: 'Asana',
    description: 'Work management platform',
    logo: 'A',
    category: 'Project Management',
    comingSoon: true,
  },
  {
    name: 'Trello',
    description: 'Visual collaboration tool',
    logo: 'T',
    category: 'Project Management',
    comingSoon: true,
  },
  {
    name: 'Dropbox',
    description: 'Cloud file storage',
    logo: 'D',
    category: 'Storage',
    comingSoon: true,
  },
  {
    name: 'Microsoft Teams',
    description: 'Team collaboration suite',
    logo: 'M',
    category: 'Communication',
    comingSoon: true,
  },
  {
    name: 'Discord',
    description: 'Voice and text chat',
    logo: 'D',
    category: 'Communication',
    comingSoon: true,
  },
];

export function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allIntegrations.map((i) => i.category)))];

  // Filter integrations
  const filteredIntegrations = allIntegrations.filter((integration) => {
    const matchesSearch = integration.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || integration.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
            <Badge variant="secondary">Integrations</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Connect with{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                100+ tools
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              FlowSync AI works seamlessly with the tools you already use every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-muted/30 sticky top-20 z-40 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Tabs */}
            <Tabs.Root
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <Tabs.List className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Tabs.Trigger
                    key={category}
                    value={category}
                    className="px-4 py-2 rounded-lg border border-border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors capitalize"
                  >
                    {category}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredIntegrations.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredIntegrations.length}{' '}
                  {filteredIntegrations.length === 1 ? 'integration' : 'integrations'}
                </p>
              </div>

              <IntegrationGrid integrations={filteredIntegrations} columns={6} />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No integrations found. Try a different search term or category.
              </p>
            </div>
          )}
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
              Don't see your tool?
            </h2>
            <p className="text-lg text-muted-foreground">
              Request a new integration and we'll prioritize it on our roadmap.
            </p>
            <Button size="lg" variant="outline">
              Request Integration
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
