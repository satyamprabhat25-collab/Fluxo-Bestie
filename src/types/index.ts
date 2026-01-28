// Link/Content types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  link_count?: number;
}

export interface ContentLink {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url?: string;
  category_id: string;
  is_premium: boolean;
  is_featured: boolean;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  created_at: string;
}

export interface SavedLink {
  id: string;
  user_id: string;
  link_id: string;
  collection_id?: string;
  created_at: string;
}

// User types
export interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  is_verified: boolean;
  is_premium?: boolean;
  created_at: string;
  updated_at: string;
}

export type AppRole = 'admin' | 'moderator' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

// Legacy types for compatibility (can be removed later)
export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  repost_of: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  likes_count?: number;
  comments_count?: number;
  reposts_count?: number;
  is_liked?: boolean;
  is_reposted?: boolean;
  original_post?: Post;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  actor_id: string;
  type: 'like' | 'comment' | 'repost' | 'follow';
  post_id: string | null;
  is_read: boolean;
  created_at: string;
  actor?: Profile;
  post?: Post;
}

export interface Block {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string | null;
  reported_post_id: string | null;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at: string;
}
