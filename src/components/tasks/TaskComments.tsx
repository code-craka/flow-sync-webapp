import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription';
import { getTaskComments, createComment, deleteComment } from '@/lib/supabase/queries';
import type { Comment } from '@/types';

interface TaskCommentsProps {
  taskId: string;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const taskComments = await getTaskComments(taskId);
      setComments(taskComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription for comment changes
  useRealtimeSubscription<Comment>({
    table: 'comments',
    filter: `task_id=eq.${taskId}`,
    onInsert: (newComment) => {
      setComments((prev) => [...prev, newComment]);
    },
    onUpdate: (updatedComment) => {
      setComments((prev) =>
        prev.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
      );
    },
    onDelete: (deletedComment) => {
      setComments((prev) => prev.filter((comment) => comment.id !== deletedComment.id));
    },
  });

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);

    try {
      await createComment({
        task_id: taskId,
        user_id: user.id,
        content: newComment.trim(),
      });

      toast({
        title: 'Comment Added',
        description: 'Your comment has been posted.',
        variant: 'success',
      });

      setNewComment('');
      await loadComments();
    } catch (error: any) {
      console.error('Failed to create comment:', error);

      toast({
        title: 'Failed to Post Comment',
        description: error.message || 'Could not post comment.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment(commentId);

      toast({
        title: 'Comment Deleted',
        description: 'Comment has been removed.',
      });

      await loadComments();
    } catch (error: any) {
      console.error('Failed to delete comment:', error);

      toast({
        title: 'Failed to Delete Comment',
        description: error.message || 'Could not delete comment.',
        variant: 'destructive',
      });
    } finally {
      setDeletingCommentId(null);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={isSubmitting || !newComment.trim()}>
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const isOwner = comment.user_id === user?.id;

            return (
              <div key={comment.id} className="flex gap-3 group">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.user_id}.png?size=32`}
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {/* TODO: Get user name from profile */}
                      User
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                    {comment.created_at !== comment.updated_at && (
                      <span className="text-xs text-muted-foreground italic">(edited)</span>
                    )}
                  </div>

                  <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
                </div>

                {/* Delete button for comment owner */}
                {isOwner && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={deletingCommentId === comment.id}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this comment? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteComment(comment.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete Comment
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
