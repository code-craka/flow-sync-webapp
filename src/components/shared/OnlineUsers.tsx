import React from 'react';
import { Users, Circle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePresence } from '@/hooks/usePresence';

interface OnlineUsersProps {
  channelName?: string;
  maxDisplay?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function OnlineUsers({
  channelName,
  maxDisplay = 5,
  showCount = true,
  size = 'md',
}: OnlineUsersProps) {
  const { otherOnlineUsers, onlineCount } = usePresence({ channelName });

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const displayUsers = otherOnlineUsers.slice(0, maxDisplay);
  const remainingCount = otherOnlineUsers.length - maxDisplay;

  if (onlineCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <div className="flex items-center -space-x-2">
          {displayUsers.map((user, index) => (
            <Tooltip key={user.user_id}>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Avatar className={`${sizeClasses[size]} border-2 border-background`}>
                    <AvatarImage src={user.avatar_url} alt={user.full_name || user.email} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {(user.full_name || user.email || 'U')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Circle className="absolute bottom-0 right-0 h-2.5 w-2.5 fill-green-500 text-green-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{user.full_name || user.email}</p>
                <p className="text-xs text-muted-foreground">Online now</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {remainingCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`${sizeClasses[size]} rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground font-medium`}
                >
                  +{remainingCount}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{remainingCount} more online</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {showCount && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{onlineCount}</span>
          </div>
        )}
      </TooltipProvider>
    </div>
  );
}
