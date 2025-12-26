import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, MoreHorizontal, Trash2, Flag, Ban } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Post } from '@/types';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
  onLike?: () => void;
}

export function PostCard({ post, onDelete, onLike }: PostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isLiking, setIsLiking] = useState(false);

  const isOwner = user?.id === post.user_id;
  const profile = post.profiles;

  const handleLike = async () => {
    if (!user || isLiking) return;
    
    setIsLiking(true);
    
    try {
      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', post.id);
        
        setIsLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: post.id });
        
        // Create notification
        if (post.user_id !== user.id) {
          await supabase.from('notifications').insert({
            user_id: post.user_id,
            actor_id: user.id,
            type: 'like',
            post_id: post.id,
          });
        }
        
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
      
      onLike?.();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !isOwner) return;
    
    try {
      await supabase.from('posts').delete().eq('id', post.id);
      toast.success('Post deleted');
      onDelete?.();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleReport = async () => {
    if (!user) return;
    
    try {
      await supabase.from('reports').insert({
        reporter_id: user.id,
        reported_post_id: post.id,
        reason: 'Reported by user',
      });
      toast.success('Post reported');
    } catch (error) {
      toast.error('Failed to report post');
    }
  };

  return (
    <article className="p-4 border-b border-border hover:bg-secondary/30 transition-colors animate-fade-in">
      <div className="flex gap-3">
        <Link to={`/profile/${profile?.username}`}>
          <Avatar size="md">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback>
              {profile?.display_name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                to={`/profile/${profile?.username}`}
                className="font-semibold hover:underline truncate"
              >
                {profile?.display_name}
              </Link>
              <Link
                to={`/profile/${profile?.username}`}
                className="text-muted-foreground text-sm truncate"
              >
                @{profile?.username}
              </Link>
              <span className="text-muted-foreground text-sm">·</span>
              <time className="text-muted-foreground text-sm whitespace-nowrap">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </time>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwner ? (
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleReport}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Ban className="mr-2 h-4 w-4" />
                      Block @{profile?.username}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <Link to={`/post/${post.id}`}>
            <p className="mt-1 text-foreground whitespace-pre-wrap break-words">
              {post.content}
            </p>
          </Link>

          {/* Image */}
          {post.image_url && (
            <Link to={`/post/${post.id}`}>
              <img
                src={post.image_url}
                alt=""
                className="mt-3 rounded-xl max-h-96 w-full object-cover border border-border"
              />
            </Link>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 mt-3 -ml-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 text-muted-foreground hover:text-primary",
                isLiked && "text-primary"
              )}
              onClick={handleLike}
              disabled={isLiking}
            >
              <Heart
                className={cn("h-4 w-4", isLiked && "fill-current animate-bounce-gentle")}
              />
              <span className="text-sm">{likesCount > 0 ? likesCount : ''}</span>
            </Button>

            <Link to={`/post/${post.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-accent"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.comments_count || ''}</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-success"
            >
              <Repeat2 className="h-4 w-4" />
              <span className="text-sm">{post.reposts_count || ''}</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
