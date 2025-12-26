import { useState, useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PostComposerProps {
  onSuccess?: () => void;
  placeholder?: string;
  compact?: boolean;
}

export function PostComposer({ onSuccess, placeholder = "What's happening?", compact = false }: PostComposerProps) {
  const { user, profile } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const charLimit = 500;
  const charsRemaining = charLimit - content.length;
  const isOverLimit = charsRemaining < 0;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!user || !content.trim() || isOverLimit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      let imageUrl: string | null = null;

      if (image) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error } = await supabase.from('posts').insert({
        user_id: user.id,
        content: content.trim(),
        image_url: imageUrl,
      });

      if (error) throw error;

      setContent('');
      removeImage();
      toast.success('Post created!');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className={cn("p-4 border-b border-border", compact && "p-3")}>
      <div className="flex gap-3">
        <Avatar size={compact ? "sm" : "md"}>
          <AvatarImage src={profile?.avatar_url || undefined} />
          <AvatarFallback>
            {profile?.display_name?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "min-h-[80px] border-0 resize-none p-0 focus-visible:ring-0 text-base",
              compact && "min-h-[60px]"
            )}
          />

          {imagePreview && (
            <div className="relative mt-3 inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 rounded-xl object-cover"
              />
              <Button
                variant="secondary"
                size="icon-sm"
                className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-5 w-5 text-primary" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-sm",
                  charsRemaining <= 50 && "text-primary",
                  isOverLimit && "text-destructive font-semibold"
                )}
              >
                {charsRemaining}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isOverLimit || isSubmitting}
                size="sm"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
