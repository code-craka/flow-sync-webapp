import React from 'react';
import { Folder, Users, CheckSquare, HardDrive, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUsageLimits } from '@/hooks/useUsageLimits';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

interface UsageMetricsProps {
  showUpgradeButton?: boolean;
  compact?: boolean;
}

export function UsageMetrics({ showUpgradeButton = true, compact = false }: UsageMetricsProps) {
  const navigate = useNavigate();
  const { usage, percentUsed, isAtLimit, isApproachingLimit, loading } = useUsageLimits();
  const { subscription } = useSubscription();

  const metrics = [
    {
      key: 'projects' as const,
      label: 'Projects',
      icon: Folder,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      key: 'members' as const,
      label: 'Team Members',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      key: 'tasks' as const,
      label: 'Tasks',
      icon: CheckSquare,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      key: 'storage' as const,
      label: 'Storage',
      icon: HardDrive,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const formatLimit = (limit: number) => {
    if (limit === -1) return '∞';
    return limit.toLocaleString();
  };

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  const getProgressColor = (percent: number, atLimit: boolean) => {
    if (atLimit) return 'bg-destructive';
    if (percent >= 80) return 'bg-orange-500';
    if (percent >= 60) return 'bg-yellow-500';
    return 'bg-primary';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading usage...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => {
          const { used, limit } = usage[metric.key];
          const percent = percentUsed(metric.key);
          const atLimit = isAtLimit(metric.key);
          const Icon = metric.icon;

          return (
            <Card key={metric.key} className={atLimit ? 'border-destructive' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  {atLimit && <Badge variant="destructive" className="text-xs">Limit</Badge>}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">
                    {metric.key === 'storage' ? formatStorage(used) : used}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    of {metric.key === 'storage' ? formatStorage(limit) : formatLimit(limit)} {metric.label.toLowerCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Usage & Limits
            </CardTitle>
            <CardDescription>
              Current plan: <span className="font-medium capitalize">{subscription?.plan || 'Free'}</span>
            </CardDescription>
          </div>
          {showUpgradeButton && subscription?.plan === 'free' && (
            <Button size="sm" onClick={() => navigate('/pricing')}>
              Upgrade Plan
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {metrics.map((metric) => {
          const { used, limit } = usage[metric.key];
          const percent = percentUsed(metric.key);
          const atLimit = isAtLimit(metric.key);
          const approaching = isApproachingLimit(metric.key);
          const Icon = metric.icon;

          return (
            <div key={metric.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <span className="font-medium text-sm">{metric.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {atLimit && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      At Limit
                    </Badge>
                  )}
                  {approaching && !atLimit && (
                    <Badge variant="secondary" className="text-xs bg-orange-500/10 text-orange-500">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      {percent}%
                    </Badge>
                  )}
                  <span className="text-sm font-medium">
                    {metric.key === 'storage' ? formatStorage(used) : used} / {metric.key === 'storage' ? formatStorage(limit) : formatLimit(limit)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <Progress
                  value={limit === -1 ? 0 : percent}
                  className="h-2"
                  indicatorClassName={getProgressColor(percent, atLimit)}
                />
                {limit !== -1 && (
                  <p className="text-xs text-muted-foreground">
                    {atLimit
                      ? `You've reached your ${metric.label.toLowerCase()} limit`
                      : approaching
                      ? `${100 - percent}% remaining`
                      : `${limit - used} remaining`}
                  </p>
                )}
                {limit === -1 && (
                  <p className="text-xs text-muted-foreground">
                    ∞ Unlimited {metric.label.toLowerCase()}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Upgrade CTA */}
        {(subscription?.plan === 'free' && showUpgradeButton) && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Need more resources?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Upgrade to Pro for unlimited projects and tasks, 25 team members, and 50GB storage.
                </p>
                <Button size="sm" onClick={() => navigate('/pricing')}>
                  View Plans
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
