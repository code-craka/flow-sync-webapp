/**
 * Integration Grid Component
 *
 * Showcase integrations with logos and hover effects
 */

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface Integration {
  name: string;
  description: string;
  logo: string;
  category: string;
  comingSoon?: boolean;
  url?: string;
}

interface IntegrationGridProps {
  integrations: Integration[];
  columns?: number;
}

export function IntegrationGrid({ integrations, columns = 4 }: IntegrationGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4`}>
      {integrations.map((integration, index) => (
        <IntegrationCard key={integration.name} integration={integration} index={index} />
      ))}
    </div>
  );
}

interface IntegrationCardProps {
  integration: Integration;
  index: number;
}

function IntegrationCard({ integration, index }: IntegrationCardProps) {
  const handleClick = () => {
    if (integration.url && !integration.comingSoon) {
      window.open(integration.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={handleClick}
      className={`relative group ${
        integration.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="relative rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col items-center justify-center gap-3">
        {/* Coming Soon Badge */}
        {integration.comingSoon && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-xs"
          >
            Soon
          </Badge>
        )}

        {/* Logo */}
        <div className="relative h-12 w-12 flex items-center justify-center">
          {integration.logo.startsWith('http') ? (
            <img
              src={integration.logo}
              alt={integration.name}
              className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {integration.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-center">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
            {integration.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {integration.description}
          </p>
        </div>

        {/* External Link Icon */}
        {integration.url && !integration.comingSoon && (
          <ExternalLink className="absolute top-2 right-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      </div>
    </motion.div>
  );
}

// Default integrations for demo
export const defaultIntegrations: Integration[] = [
  {
    name: 'Slack',
    description: 'Team communication and notifications',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
    category: 'Communication',
    url: 'https://slack.com',
  },
  {
    name: 'GitHub',
    description: 'Code repository and version control',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    category: 'Development',
    url: 'https://github.com',
  },
  {
    name: 'Figma',
    description: 'Design collaboration platform',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'Design',
    url: 'https://figma.com',
  },
  {
    name: 'Google Drive',
    description: 'Cloud storage and file sharing',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    category: 'Storage',
    url: 'https://drive.google.com',
  },
  {
    name: 'Jira',
    description: 'Issue tracking and project management',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    category: 'Project Management',
    url: 'https://jira.com',
  },
  {
    name: 'Notion',
    description: 'Notes and knowledge base',
    logo: 'N',
    category: 'Documentation',
    comingSoon: true,
  },
  {
    name: 'Zoom',
    description: 'Video conferencing',
    logo: 'Z',
    category: 'Communication',
    comingSoon: true,
  },
  {
    name: 'Stripe',
    description: 'Payment processing',
    logo: 'S',
    category: 'Finance',
    comingSoon: true,
  },
];
