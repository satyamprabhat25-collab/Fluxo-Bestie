import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, TrendingUp, BookOpen, Cpu, Trophy, Film, 
  Music, Newspaper, Crown, ArrowRight, Filter, Grid, List,
  ChevronRight, Star, Heart, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data - will be replaced with database
const allLinks = [
  { id: '1', title: 'Best Books of 2024', description: 'Curated list of must-read books this year', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', category: 'Books', slug: 'books', premium: false, clicks: 12500, featured: true },
  { id: '2', title: 'ChatGPT Mastery Guide', description: 'Complete guide to mastering AI prompts', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', category: 'AI', slug: 'ai', premium: true, clicks: 8900, featured: true },
  { id: '3', title: 'IPL 2024 Schedule', description: 'Complete cricket schedule and stats', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', category: 'Sports', slug: 'sports', clicks: 45000, featured: true },
  { id: '4', title: 'Top Netflix Shows', description: 'Trending shows you must watch', image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400', category: 'Entertainment', slug: 'entertainment', clicks: 23000 },
  { id: '5', title: 'Free Kindle Books', description: 'Download free ebooks legally', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', category: 'Books', slug: 'books', clicks: 15600 },
  { id: '6', title: 'AI Image Generator', description: 'Create stunning AI art for free', image: 'https://images.unsplash.com/photo-1686191128892-3b37add4b8cd?w=400', category: 'AI', slug: 'ai', premium: true, clicks: 9200 },
  { id: '7', title: 'Live Cricket Scores', description: 'Real-time scores and commentary', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400', category: 'Sports', slug: 'sports', clicks: 67000 },
  { id: '8', title: 'Spotify Playlists 2024', description: 'Best curated music playlists', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', category: 'Music', slug: 'music', clicks: 18000 },
];

const categories = [
  { name: 'All', slug: 'all', icon: Grid },
  { name: 'Books', slug: 'books', icon: BookOpen },
  { name: 'AI', slug: 'ai', icon: Cpu },
  { name: 'Sports', slug: 'sports', icon: Trophy },
  { name: 'Entertainment', slug: 'entertainment', icon: Film },
  { name: 'Music', slug: 'music', icon: Music },
  { name: 'News', slug: 'news', icon: Newspaper },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredLinks = allLinks.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || link.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Lapi</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm">Join Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Explore Links</h1>
          <p className="text-muted-foreground">Discover curated content across all categories</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={selectedCategory === cat.slug ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.slug)}
              className="gap-2 whitespace-nowrap rounded-full"
            >
              <cat.icon className="h-4 w-4" />
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Links Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLinks.map((link) => (
              <article
                key={link.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={link.image}
                    alt={link.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {link.premium && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  {link.featured && (
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{link.category}</Badge>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{link.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {(link.clicks / 1000).toFixed(1)}k
                    </span>
                    <Button size="sm" variant="soft" className="gap-1">
                      Visit <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLinks.map((link) => (
              <article
                key={link.id}
                className="group flex gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={link.image}
                    alt={link.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">{link.category}</Badge>
                    {link.premium && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{link.description}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="text-xs text-muted-foreground">{(link.clicks / 1000).toFixed(1)}k clicks</span>
                  <Button size="sm" variant="soft" className="gap-1">
                    Visit <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No links found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
