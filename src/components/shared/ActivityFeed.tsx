import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  MessageSquare,
  UserPlus,
  Trash2,
  Edit,
  Folder,
  FileText,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useOrganization } from '@/contexts/OrganizationContext';
import { getOrganizationActivity } from '@/lib/supabase/queries';
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription';
import type { ActivityLog } from '@/types';

interface ActivityFeedProps {
  limit?: number;
  showHeader?: boolean;
  maxHeight?: string;
}

export function ActivityFeed({ limit = 20, showHeader = true, maxHeight = '400px' }: ActivityFeedProps) {
  const { currentOrganization } = useOrganization();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, [currentOrganization?.id]);

  const loadActivities = async () => {
    if (!currentOrganization) return;

    try {
      setLoading(true);
      const logs = await getOrganizationActivity(currentOrganization.id, limit);
      setActivities(logs);
    } catch (error) {
      console.error('Failed to load activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription for new activity
  useRealtimeSubscription<ActivityLog>({
    table: 'activity_logs',
    filter: currentOrganization ? `organization_id=eq.${currentOrganization.id}` : undefined,
    enabled: !!currentOrganization,
    onInsert: (newActivity) => {
      setActivities((prev) => [newActivity, ...prev].slice(0, limit));
    },
  });

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'created':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'updated':
        return <Edit className="h-4 w-4 text-blue-500" />;
      case 'deleted':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'commented':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'invited':
      case 'joined':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'project_created':
        return <Folder className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const formatActivityDescription = (activity: ActivityLog) => {
    const { action, entity_type, entity_name, metadata } = activity;

    switch (action) {
      case 'created':
        return (
          <>
            created <span className="font-semibold">{entity_name}</span>
          </>
        );
      case 'updated':
        return (
          <>
            updated <span className="font-semibold">{entity_name}</span>
          </>
        );
      case 'deleted':
        return (
          <>
            deleted <span className="font-semibold">{entity_name}</span>
          </>
        );
      case 'completed':
        return (
          <>
            completed <span className="font-semibold">{entity_name}</span>
          </>
        );
      case 'commented':
        return (
          <>
            commented on <span className="font-semibold">{entity_name}</span>
          </>
        );
      case 'invited':
        return (
          <>
            invited <span className="font-semibold">{metadata?.email}</span>
          </>
        );
      case 'joined':
        return <>joined the organization</>;
      default:
        return (
          <>
            {action} {entity_name}
          </>
        );
    }
  };

  if (!currentOrganization) {
    return null;
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ScrollArea style={{ maxHeight }}>
          <div className="space-y-1 p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                Loading activity...
              </div>
            ) : activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mb-2 opacity-50" />
                <p>No activity yet</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="mt-0.5">{getActivityIcon(activity.action)}</div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.profile?.full_name || activity.profile?.email}</span>{' '}
                        {formatActivityDescription(activity)}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.created_at)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
