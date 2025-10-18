/**
 * Status Page
 */

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
}

const systems: SystemStatus[] = [
  { name: 'API Server', status: 'operational', uptime: 99.98 },
  { name: 'Database', status: 'operational', uptime: 99.99 },
  { name: 'Authentication', status: 'operational', uptime: 100 },
  { name: 'Real-time Services', status: 'operational', uptime: 99.95 },
  { name: 'File Storage', status: 'operational', uptime: 99.97 },
  { name: 'Email Delivery', status: 'operational', uptime: 99.92 },
];

const incidents = [
  {
    id: '1',
    date: 'January 15, 2025',
    title: 'Database Performance Degradation',
    status: 'resolved',
    duration: '23 minutes',
    description: 'Brief performance issues resolved by scaling database resources.',
  },
  {
    id: '2',
    date: 'January 8, 2025',
    title: 'Scheduled Maintenance',
    status: 'completed',
    duration: '15 minutes',
    description: 'Routine infrastructure updates completed successfully.',
  },
];

const statusConfig = {
  operational: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    label: 'Operational',
  },
  degraded: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    label: 'Degraded Performance',
  },
  down: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    label: 'Outage',
  },
};

export function StatusPage() {
  const allOperational = systems.every((s) => s.status === 'operational');

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
            <Badge variant="secondary">System Status</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              All Systems{' '}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Operational
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Real-time status updates for all FlowSync AI services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${allOperational ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                    <CheckCircle className={`h-8 w-8 ${allOperational ? 'text-green-500' : 'text-yellow-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {allOperational ? 'All Systems Operational' : 'Some Systems Degraded'}
                    </h2>
                    <p className="text-muted-foreground">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant={allOperational ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                    99.97% Uptime
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold mb-8">System Components</h2>

            {systems.map((system, index) => {
              const config = statusConfig[system.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <Icon className={`h-5 w-5 ${config.color}`} />
                          <span className="font-semibold">{system.name}</span>
                        </div>
                        <Badge variant="outline" className={`${config.bg} ${config.color}`}>
                          {config.label}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Uptime (30 days)</span>
                          <span className="font-medium">{system.uptime}%</span>
                        </div>
                        <Progress value={system.uptime} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Recent Incidents</h2>

            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline">{incident.date}</Badge>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                              {incident.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{incident.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{incident.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{incident.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {incidents.length === 0 && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold">No incidents reported</p>
                  <p className="text-muted-foreground">All systems running smoothly</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Get status updates
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to receive notifications about incidents and maintenance.
            </p>
            <Badge variant="outline" className="text-sm">
              🔔 Coming soon: Email & SMS notifications
            </Badge>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
