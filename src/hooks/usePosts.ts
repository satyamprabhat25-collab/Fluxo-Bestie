import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Post, Profile } from '@/types';

export function usePosts(type: 'home' | 'explore' | 'profile' = 'home', userId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchPosts = async (): Promise<Post[]> => {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (type === 'profile' && userId) {
      query = query.eq('user_id', userId);
    } else if (type === 'home' && user) {
      const { data: follows } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id);
      
      const followingIds = follows?.map(f => f.following_id) || [];
      followingIds.push(user.id);
      
      if (followingIds.length > 0) {
        query = query.in('user_id', followingIds);
      }
    }

    const { data: posts, error } = await query;
    if (error) throw error;

    // Fetch profiles separately
    const userIds = [...new Set(posts?.map(p => p.user_id) || [])];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .in('user_id', userIds);

    const profileMap = new Map(profiles?.map(p => [p.user_id, p as Profile]));

    const postsWithCounts = await Promise.all(
      (posts || []).map(async (post) => {
        const [likesResult, commentsResult, repostsResult, userLikeResult] = await Promise.all([
          supabase.from('likes').select('id', { count: 'exact', head: true }).eq('post_id', post.id),
          supabase.from('comments').select('id', { count: 'exact', head: true }).eq('post_id', post.id),
          supabase.from('posts').select('id', { count: 'exact', head: true }).eq('repost_of', post.id),
          user ? supabase.from('likes').select('id').eq('post_id', post.id).eq('user_id', user.id).maybeSingle() : null,
        ]);

        return {
          ...post,
          profiles: profileMap.get(post.user_id),
          likes_count: likesResult.count || 0,
          comments_count: commentsResult.count || 0,
          reposts_count: repostsResult.count || 0,
          is_liked: !!userLikeResult?.data,
        } as Post;
      })
    );

    return postsWithCounts;
  };

  const query = useQuery({
    queryKey: ['posts', type, userId || user?.id],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  return { ...query, refresh };
}
