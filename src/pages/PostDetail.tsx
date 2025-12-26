import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostCard } from '@/components/post/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Post, Comment, Profile } from '@/types';
import { toast } from 'sonner';

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: post, isLoading: postLoading, refetch: refetchPost } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).maybeSingle();
      if (error) throw error;
      if (!data) return null;

      const { data: postProfile } = await supabase.from('profiles').select('*').eq('user_id', data.user_id).maybeSingle();
      const [likesResult, commentsResult, userLikeResult] = await Promise.all([
        supabase.from('likes').select('id', { count: 'exact', head: true }).eq('post_id', data.id),
        supabase.from('comments').select('id', { count: 'exact', head: true }).eq('post_id', data.id),
        user ? supabase.from('likes').select('id').eq('post_id', data.id).eq('user_id', user.id).maybeSingle() : null,
      ]);
      return { ...data, profiles: postProfile as Profile, likes_count: likesResult.count || 0, comments_count: commentsResult.count || 0, is_liked: !!userLikeResult?.data } as Post;
    },
    enabled: !!postId,
  });

  const { data: comments, isLoading: commentsLoading, refetch: refetchComments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true });
      if (error) throw error;
      const userIds = [...new Set(data?.map(c => c.user_id) || [])];
      const { data: profiles } = await supabase.from('profiles').select('*').in('user_id', userIds);
      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));
      return data?.map(c => ({ ...c, profiles: profileMap.get(c.user_id) })) as (Comment & { profiles: Profile })[];
    },
    enabled: !!postId,
  });

  const handleComment = async () => {
    if (!user || !commentText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await supabase.from('comments').insert({ user_id: user.id, post_id: postId, content: commentText.trim() });
      if (post && post.user_id !== user.id) await supabase.from('notifications').insert({ user_id: post.user_id, actor_id: user.id, type: 'comment', post_id: postId });
      setCommentText('');
      refetchComments();
      refetchPost();
      toast.success('Comment posted!');
    } catch { toast.error('Failed to post comment'); }
    finally { setIsSubmitting(false); }
  };

  if (postLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (!post) return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur"><div className="container max-w-2xl mx-auto flex items-center gap-4 h-16 px-4"><Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button><h1 className="font-display font-bold text-lg">Post</h1></div></header>
      <main className="container max-w-2xl mx-auto py-8 px-4"><div className="bg-card border border-border rounded-2xl p-8 text-center"><h2 className="font-display font-bold text-xl mb-2">Post not found</h2><p className="text-muted-foreground mb-4">This post may have been deleted.</p><Link to="/"><Button variant="secondary">Go home</Button></Link></div></main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur"><div className="container max-w-2xl mx-auto flex items-center gap-4 h-16 px-4"><Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button><h1 className="font-display font-bold text-lg">Post</h1></div></header>
      <main className="container max-w-2xl mx-auto">
        <div className="bg-card border-x border-border">
          <PostCard post={post} onDelete={() => navigate('/')} onLike={() => refetchPost()} />
          {user && (
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Avatar size="sm"><AvatarImage src={profile?.avatar_url || undefined} /><AvatarFallback>{profile?.display_name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <Textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Post your reply..." className="min-h-[60px] border-0 resize-none p-0 focus-visible:ring-0" />
                  <div className="flex justify-end mt-2"><Button size="sm" onClick={handleComment} disabled={!commentText.trim() || isSubmitting}>{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}<span className="ml-2">Reply</span></Button></div>
                </div>
              </div>
            </div>
          )}
          <div className="border-t border-border">
            {commentsLoading ? <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : comments && comments.length > 0 ? (
              <div>{comments.map((comment) => (
                <div key={comment.id} className="p-4 border-b border-border last:border-b-0">
                  <div className="flex gap-3">
                    <Link to={`/profile/${comment.profiles?.username}`}><Avatar size="sm"><AvatarImage src={comment.profiles?.avatar_url || undefined} /><AvatarFallback>{comment.profiles?.display_name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback></Avatar></Link>
                    <div className="flex-1"><div className="flex items-center gap-2 mb-1"><Link to={`/profile/${comment.profiles?.username}`} className="font-semibold hover:underline">{comment.profiles?.display_name}</Link><span className="text-muted-foreground text-sm">@{comment.profiles?.username}</span><span className="text-muted-foreground text-sm">·</span><time className="text-muted-foreground text-sm">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</time></div><p className="text-foreground">{comment.content}</p></div>
                  </div>
                </div>
              ))}</div>
            ) : <div className="py-8 text-center"><p className="text-muted-foreground">No comments yet. Be the first!</p></div>}
          </div>
        </div>
      </main>
    </div>
  );
}
