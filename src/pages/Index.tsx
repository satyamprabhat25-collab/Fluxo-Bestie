import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, Trophy, Film, Newspaper, Rocket, Heart, Star, TrendingUp, Crown, ArrowRight, Search, Sparkles, Globe, Zap, ChevronRight, Lock, Music, Briefcase, Code, Palette, Wand2, Play, Users, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/hooks/usePremium';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Categories with real links - More categories added
const categories = [{
  id: '1',
  name: 'Space & Universe',
  slug: 'space',
  icon: Rocket,
  color: 'from-indigo-500 to-purple-600',
  description: 'Explore the cosmos',
  count: 20,
  premium: true,
  url: 'https://www.solarsystemscope.com/'
}, {
  id: '2',
  name: 'AI & Technology',
  slug: 'ai',
  icon: Cpu,
  color: 'from-violet-500 to-purple-600',
  description: 'AI tools & generators',
  count: 35,
  premium: true,
  url: 'https://notegpt.io/ai-chat'
}, {
  id: '3',
  name: 'Games',
  slug: 'games',
  icon: Trophy,
  color: 'from-emerald-500 to-green-600',
  description: 'Online games & MMORPGs',
  count: 40,
  premium: true,
  url: 'https://armorgames.com/'
}, {
  id: '4',
  name: 'Entertainment',
  slug: 'entertainment',
  icon: Film,
  color: 'from-pink-500 to-rose-600',
  description: 'Anime, movies & shows',
  count: 50,
  url: 'https://www.anime-planet.com/'
}, {
  id: '5',
  name: 'Music & Audio',
  slug: 'music',
  icon: Music,
  color: 'from-green-500 to-emerald-600',
  description: 'Stream & discover music',
  count: 25,
  url: 'https://open.spotify.com/'
}, {
  id: '6',
  name: 'Productivity',
  slug: 'productivity',
  icon: Briefcase,
  color: 'from-blue-500 to-cyan-600',
  description: 'Work smarter',
  count: 30,
  premium: true,
  url: 'https://www.notion.so/'
}, {
  id: '7',
  name: 'Development',
  slug: 'development',
  icon: Code,
  color: 'from-gray-600 to-gray-800',
  description: 'Code & deploy',
  count: 28,
  premium: true,
  url: 'https://github.com/'
}, {
  id: '8',
  name: 'Design Tools',
  slug: 'design',
  icon: Palette,
  color: 'from-fuchsia-500 to-pink-600',
  description: 'Create stunning visuals',
  count: 22,
  premium: true,
  url: 'https://www.figma.com/'
}, {
  id: '9',
  name: 'Health & Wellness',
  slug: 'health',
  icon: Heart,
  color: 'from-red-500 to-pink-600',
  description: 'Health & tips',
  count: 18,
  url: 'https://www.mayoclinic.org/'
}, {
  id: '10',
  name: 'Knowledge',
  slug: 'knowledge',
  icon: BookOpen,
  color: 'from-cyan-500 to-blue-600',
  description: 'Learn anything',
  count: 24,
  url: 'https://www.khanacademy.org/'
}];

// Featured links with more premium content
const featuredLinks = [{
  id: '1',
  title: 'Solar System Scope',
  description: 'Interactive 3D encyclopedia of planets and space exploration - Experience the universe like never before',
  image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600',
  category: 'Space',
  premium: true,
  url: 'https://www.solarsystemscope.com/',
  clicks: 145000
}, {
  id: '2',
  title: 'ChatGPT - OpenAI',
  description: 'Advanced AI chatbot for conversation, coding help, and creative assistance',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  category: 'AI',
  premium: true,
  url: 'https://chat.openai.com/',
  clicks: 890000
}, {
  id: '3',
  title: 'TinyWow',
  description: 'Free online tools for PDF, image, video editing and AI writing - All in one place',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  category: 'Tools',
  premium: true,
  url: 'https://tinywow.com/',
  clicks: 567000
}, {
  id: '4',
  title: 'Summarize.tech',
  description: 'AI-powered video summarization - Get key insights from any YouTube video instantly',
  image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
  category: 'AI',
  premium: true,
  url: 'https://www.summarize.tech/',
  clicks: 234000
}, {
  id: '5',
  title: 'NASA Eyes on the Solar System',
  description: 'Explore the universe with NASA\'s powerful 3D visualization and simulation tools',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
  category: 'Space',
  premium: true,
  url: 'https://eyes.nasa.gov/',
  clicks: 189000
}, {
  id: '6',
  title: 'Discord Communities',
  description: 'Connect with millions of communities, gamers, and creators worldwide',
  image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600',
  category: 'Social',
  premium: true,
  url: 'https://discord.com/',
  clicks: 967000
}, {
  id: '7',
  title: 'Midjourney AI Art',
  description: 'Create stunning AI-generated artwork and illustrations with text prompts',
  image: 'https://images.unsplash.com/photo-1686191128892-3b37add4ad8b?w=600',
  category: 'AI',
  premium: true,
  url: 'https://www.midjourney.com/',
  clicks: 456000
}, {
  id: '8',
  title: 'Spotify Web Player',
  description: 'Stream millions of songs, podcasts, and audiobooks from anywhere',
  image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600',
  category: 'Music',
  url: 'https://open.spotify.com/',
  clicks: 870000
}];

// More premium trending links
const trendingLinks = [{
  id: '1',
  title: 'Figma - Professional Design Tool',
  url: 'https://www.figma.com/',
  clicks: 589000,
  premium: true
}, {
  id: '2',
  title: 'Notion - All-in-One Workspace',
  url: 'https://www.notion.so/',
  clicks: 632000,
  premium: true
}, {
  id: '3',
  title: 'GitHub - Code Repository',
  url: 'https://github.com/',
  clicks: 845000,
  premium: true
}, {
  id: '4',
  title: 'Claude AI - Advanced Assistant',
  url: 'https://claude.ai/',
  clicks: 234000,
  premium: true
}, {
  id: '5',
  title: 'TinyWow - All-in-One Tools',
  url: 'https://tinywow.com/',
  clicks: 567000,
  premium: true
}, {
  id: '6',
  title: 'RuneScape - Epic MMORPG',
  url: 'https://www.runescape.com/',
  clicks: 445000,
  premium: true
}, {
  id: '7',
  title: 'Steam - Game Platform',
  url: 'https://store.steampowered.com/',
  clicks: 789000,
  premium: true
}, {
  id: '8',
  title: 'Vercel - Deploy Apps',
  url: 'https://vercel.com/',
  clicks: 423000,
  premium: true
}, {
  id: '9',
  title: 'Linear - Project Management',
  url: 'https://linear.app/',
  clicks: 312000,
  premium: true
}, {
  id: '10',
  title: 'Summarize.tech - Video AI',
  url: 'https://www.summarize.tech/',
  clicks: 234000,
  premium: true
}, {
  id: '11',
  title: 'Khan Academy - Free Education',
  url: 'https://www.khanacademy.org/',
  clicks: 545000
}, {
  id: '12',
  title: 'Crunchyroll - Anime Streaming',
  url: 'https://www.crunchyroll.com/',
  clicks: 678000
}];

// Premium exclusive section - Advanced tools
const premiumExclusiveLinks = [{
  id: '1',
  title: 'DALL-E 3 - Image Generation',
  description: 'OpenAI\'s most advanced image generation AI',
  url: 'https://openai.com/dall-e-3',
  icon: '🎨',
  category: 'AI'
}, {
  id: '2',
  title: 'Runway ML - AI Video',
  description: 'Create and edit videos with AI',
  url: 'https://runwayml.com/',
  icon: '🎬',
  category: 'AI'
}, {
  id: '3',
  title: 'Stable Diffusion',
  description: 'Open source AI image generation',
  url: 'https://stability.ai/',
  icon: '🖼️',
  category: 'AI'
}, {
  id: '4',
  title: 'TinyWow Suite',
  description: 'PDF, Image, Video & AI tools combined',
  url: 'https://tinywow.com/',
  icon: '🛠️',
  category: 'Tools'
}, {
  id: '5',
  title: 'Unity Game Engine',
  description: 'Professional game development platform',
  url: 'https://unity.com/',
  icon: '🕹️',
  category: 'Games'
}, {
  id: '6',
  title: 'Unreal Engine 5',
  description: 'Next-gen game development tools',
  url: 'https://www.unrealengine.com/',
  icon: '🎯',
  category: 'Games'
}, {
  id: '7',
  title: 'Linear Project Management',
  description: 'Streamline software development',
  url: 'https://linear.app/',
  icon: '📊',
  category: 'Productivity'
}, {
  id: '8',
  title: 'Vercel Deploy',
  description: 'Deploy web apps instantly',
  url: 'https://vercel.com/',
  icon: '🚀',
  category: 'Development'
}];

// Music & Entertainment Premium
const musicLinks = [{
  id: '1',
  title: 'Spotify Premium Features',
  description: 'Ad-free music streaming with offline downloads',
  url: 'https://open.spotify.com/',
  icon: '🎵',
  clicks: 870000
}, {
  id: '2',
  title: 'SoundCloud Pro',
  description: 'Discover underground artists and remixes',
  url: 'https://soundcloud.com/',
  icon: '🎧',
  clicks: 456000,
  premium: true
}, {
  id: '3',
  title: 'Bandcamp',
  description: 'Support independent artists directly',
  url: 'https://bandcamp.com/',
  icon: '🎸',
  clicks: 234000
}, {
  id: '4',
  title: 'YouTube Music',
  description: 'Music videos and live performances',
  url: 'https://music.youtube.com/',
  icon: '📺',
  clicks: 789000
}];

// Development Tools
const devLinks = [{
  id: '1',
  title: 'GitHub',
  description: 'The world\'s largest code hosting platform',
  url: 'https://github.com/',
  icon: '💻',
  premium: true
}, {
  id: '2',
  title: 'Vercel',
  description: 'Deploy frontend apps with zero config',
  url: 'https://vercel.com/',
  icon: '▲',
  premium: true
}, {
  id: '3',
  title: 'Supabase',
  description: 'Open source Firebase alternative',
  url: 'https://supabase.com/',
  icon: '⚡',
  premium: true
}, {
  id: '4',
  title: 'Railway',
  description: 'Deploy anything in seconds',
  url: 'https://railway.app/',
  icon: '🚂',
  premium: true
}, {
  id: '5',
  title: 'VS Code Web',
  description: 'Code editor in your browser',
  url: 'https://vscode.dev/',
  icon: '📝',
  premium: true
}, {
  id: '6',
  title: 'CodePen',
  description: 'Front-end playground and community',
  url: 'https://codepen.io/',
  icon: '✏️'
}];

// Productivity Premium
const productivityLinks = [{
  id: '1',
  title: 'Notion',
  description: 'All-in-one workspace for notes & docs',
  url: 'https://www.notion.so/',
  icon: '📓',
  premium: true
}, {
  id: '2',
  title: 'Linear',
  description: 'Modern issue tracking',
  url: 'https://linear.app/',
  icon: '📊',
  premium: true
}, {
  id: '3',
  title: 'Slack',
  description: 'Team communication hub',
  url: 'https://slack.com/',
  icon: '💬',
  premium: true
}, {
  id: '4',
  title: 'Calendly',
  description: 'Scheduling made simple',
  url: 'https://calendly.com/',
  icon: '📅',
  premium: true
}, {
  id: '5',
  title: 'Loom',
  description: 'Async video messaging',
  url: 'https://www.loom.com/',
  icon: '🎥',
  premium: true
}, {
  id: '6',
  title: 'Miro',
  description: 'Online whiteboard collaboration',
  url: 'https://miro.com/',
  icon: '🎨',
  premium: true
}];

export default function Index() {
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const [searchQuery, setSearchQuery] = useState('');
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [selectedPremiumTitle, setSelectedPremiumTitle] = useState('');

  const handleLinkClick = (e: React.MouseEvent, isPremiumContent: boolean, url: string, title: string) => {
    if (isPremiumContent && !isPremium) {
      e.preventDefault();
      setSelectedPremiumTitle(title);
      setPremiumModalOpen(true);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/30 animate-pulse">
              <Globe className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-black text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Fluxo</span>
              <p className="text-xs text-muted-foreground -mt-1">Your Web Portal</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-lg hover:scale-105 duration-200">Explore</Link>
            <Link to="/premium" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2 text-lg hover:scale-105 duration-200">
              <Crown className="h-5 w-5 text-amber-500 animate-bounce" />
              Premium
            </Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-lg hover:scale-105 duration-200">Dashboard</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="gap-2 rounded-xl">
                    <Crown className="h-5 w-5" />
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="lg">Sign in</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="gap-2 px-8 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
                    <Sparkles className="h-5 w-5" />
                    Join Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - MASSIVE AND STUNNING */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,hsl(var(--primary)/0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,hsl(var(--accent)/0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl animate-bounce" style={{ animationDelay: '0.5s' }} />
        
        <div className="container max-w-7xl mx-auto px-4 py-24 relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="px-5 py-2.5 text-sm font-medium animate-fade-in bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                100+ Premium Websites
              </Badge>
              <Badge variant="secondary" className="px-5 py-2.5 text-sm font-medium animate-fade-in bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20" style={{ animationDelay: '0.2s' }}>
                <Users className="h-4 w-4 mr-2 text-primary" />
                50K+ Active Users
              </Badge>
              <Badge variant="secondary" className="px-5 py-2.5 text-sm font-medium animate-fade-in bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20" style={{ animationDelay: '0.4s' }}>
                <Star className="h-4 w-4 mr-2 text-emerald-500" />
                10 Categories
              </Badge>
            </div>
            
            <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 animate-slide-up">
              Discover the
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mt-3 pb-2">
                Best of the Web
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Your gateway to curated AI tools, games, NASA content, music platforms, dev tools & more.
              <span className="block text-foreground font-semibold mt-2"> One subscription. Unlimited possibilities.</span>
            </p>

            {/* Search Bar - HUGE */}
            <div className="relative max-w-3xl mx-auto mb-14 animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-lg opacity-30" />
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" />
                <Input 
                  placeholder="Search AI tools, games, music, dev resources..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="pl-16 pr-36 h-20 text-xl rounded-2xl border-2 border-border focus:border-primary shadow-2xl bg-card" 
                />
                <Button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl h-14 px-10 text-lg font-semibold" size="lg">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats - LARGER */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { value: '100+', label: 'Premium Sites', color: 'text-amber-500' },
                { value: '50K+', label: 'Happy Users', color: 'text-primary' },
                { value: '10', label: 'Categories', color: 'text-emerald-500' },
                { value: '24/7', label: 'Access', color: 'text-accent' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center px-6 animate-fade-in" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                  <div className={`text-4xl md:text-5xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Grid - LARGER AND ANIMATED */}
      <section className="container max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            Browse by Interest
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">Explore Categories</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Premium content organized by your passions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={(e) => handleLinkClick(e, !!category.premium, category.url, category.name)}
              className="group relative bg-card border border-border rounded-3xl p-6 hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {category.premium && (
                <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
                  <Lock className="h-3 w-3 mr-1" />
                  PRO
                </Badge>
              )}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
              <span className="text-xs font-medium text-primary">{category.count} links →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Links - STUNNING CARDS */}
      <section className="bg-gradient-to-br from-secondary/50 via-background to-secondary/30 py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                <Star className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl">Featured Links</h2>
                <p className="text-muted-foreground text-lg">Hand-picked premium content</p>
              </div>
            </div>
            <Button variant="outline" size="lg" className="gap-2 rounded-xl">
              View All <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredLinks.map((link, index) => (
              <div
                key={link.id}
                onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
                className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={link.image} alt={link.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {link.premium && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Visit Site
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3 text-xs">{link.category}</Badge>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{link.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{link.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {(link.clicks / 1000).toFixed(0)}k clicks
                    </span>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1">
                      {link.premium && !isPremium ? <Lock className="h-3 w-3" /> : null}
                      Open <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Tools Section - NEW */}
      <section className="container max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Dev Tools */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl">Developer Tools</h2>
                <p className="text-muted-foreground">Code, deploy & collaborate</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {devLinks.map((link) => (
                <div
                  key={link.id}
                  onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
                  className="group bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{link.icon}</span>
                    {link.premium && <Lock className="h-4 w-4 text-amber-500" />}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Tools */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl">Productivity Suite</h2>
                <p className="text-muted-foreground">Work smarter, not harder</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {productivityLinks.map((link) => (
                <div
                  key={link.id}
                  onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
                  className="group bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{link.icon}</span>
                    {link.premium && <Lock className="h-4 w-4 text-amber-500" />}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending + Premium CTA */}
      <section className="bg-secondary/30 py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Trending Links */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl">Trending Now</h2>
                  <p className="text-muted-foreground">Most popular this week</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                {trendingLinks.map((link, index) => (
                  <div
                    key={link.id}
                    onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
                    className="flex items-center gap-5 p-5 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <span className="text-3xl font-black text-muted-foreground/50 w-10">{index + 1}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2 group-hover:text-primary transition-colors">
                        {link.title}
                        {link.premium && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs">PRO</Badge>}
                      </h3>
                      <span className="text-sm text-muted-foreground">{(link.clicks / 1000).toFixed(0)}k clicks</span>
                    </div>
                    {link.premium && !isPremium ? (
                      <Lock className="h-5 w-5 text-amber-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium CTA - STUNNING */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 via-orange-500 to-primary rounded-3xl blur-lg opacity-50" />
                <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-primary/10 border border-amber-500/30 rounded-3xl p-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-xl">
                    <Crown className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="font-display font-black text-2xl mb-3">Go Premium</h3>
                  <p className="text-muted-foreground mb-6">
                    Unlock all 100+ premium tools, AI generators, games & more.
                  </p>
                  
                  {/* Pricing */}
                  <div className="space-y-3 mb-8 p-5 bg-background/80 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monthly</span>
                      <span className="font-bold text-xl text-primary">$5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Quarterly</span>
                      <span className="font-bold text-xl text-primary">$10</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="font-semibold flex items-center gap-2">
                        Yearly 
                        <Badge className="bg-emerald-500 text-white border-0 text-xs">SAVE 67%</Badge>
                      </span>
                      <span className="font-black text-2xl text-primary">$20</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'All Premium AI Tools',
                      'NASA & Space Content',
                      'Dev & Productivity Apps',
                      'Games & Entertainment',
                      'Priority Support'
                    ].map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/premium">
                    <Button className="w-full gap-2 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/30" size="lg">
                      <Crown className="h-5 w-5" />
                      Get Premium Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Exclusive Section */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent blur-3xl rounded-full" />
        
        <div className="container max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-6 py-2.5 text-sm">
              <Crown className="h-4 w-4 mr-2" />
              Premium Exclusive
            </Badge>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-5">Advanced Tools & Software</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Professional-grade AI, game engines, and design software
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumExclusiveLinks.map((link, index) => (
              <div
                key={link.id}
                onClick={(e) => handleLinkClick(e, true, link.url, link.title)}
                className="group bg-card/80 backdrop-blur border border-border rounded-3xl p-7 hover:shadow-2xl hover:border-amber-500/40 transition-all duration-500 cursor-pointer relative overflow-hidden animate-fade-in hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
                <div className="text-5xl mb-5">{link.icon}</div>
                <Badge variant="outline" className="mb-4 text-xs border-amber-500/30 text-amber-600">{link.category}</Badge>
                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{link.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{link.description}</p>
                <div className="flex items-center gap-2 text-amber-500 font-semibold">
                  <Lock className="h-4 w-4" />
                  Premium Only
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/premium">
              <Button size="lg" className="gap-3 px-10 h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/30">
                <Crown className="h-6 w-6" />
                Unlock All Premium Content
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Music Section - NEW */}
      <section className="container max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Music className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl">Music & Audio</h2>
            <p className="text-muted-foreground text-lg">Stream, discover & create</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {musicLinks.map((link) => (
            <div
              key={link.id}
              onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{link.icon}</span>
                {link.premium && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">PRO</Badge>}
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {(link.clicks / 1000).toFixed(0)}k users
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - ENHANCED */}
      <footer className="border-t border-border bg-gradient-to-br from-secondary/50 to-background">
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <span className="font-display font-black text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fluxo</span>
              </div>
              <p className="text-muted-foreground text-lg mb-6 max-w-sm">
                Your gateway to the best curated links on the web. Discover, save, and unlock premium content.
              </p>
              <div className="flex gap-3">
                <Badge variant="secondary" className="px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  50K+ Users
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  4.9 Rating
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-5">Categories</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/category/ai" className="hover:text-foreground transition-colors">AI & Technology</Link></li>
                <li><Link to="/category/games" className="hover:text-foreground transition-colors">Games</Link></li>
                <li><Link to="/category/space" className="hover:text-foreground transition-colors">Space & Universe</Link></li>
                <li><Link to="/category/music" className="hover:text-foreground transition-colors">Music & Audio</Link></li>
                <li><Link to="/category/dev" className="hover:text-foreground transition-colors">Development</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-5">Account</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/premium" className="hover:text-foreground transition-colors">Premium</Link></li>
                <li><Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-5">Legal</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">© 2025 Fluxo. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="text-sm text-muted-foreground">for the web</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Premium Modal */}
      <Dialog open={premiumModalOpen} onOpenChange={setPremiumModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl">
                <Lock className="h-10 w-10 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-display">
              Premium Content
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              <span className="font-semibold text-foreground">{selectedPremiumTitle}</span> is only available for premium members.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="bg-secondary/50 rounded-2xl p-5 space-y-3">
              {['Access to all 100+ premium links', 'AI tools & image generators', 'Games, NASA, Discord & more', 'Dev & Productivity tools'].map(feature => (
                <div key={feature} className="flex items-center gap-3 text-sm">
                  <Crown className="h-5 w-5 text-amber-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {!user ? (
                <>
                  <Link to="/auth" onClick={() => setPremiumModalOpen(false)}>
                    <Button className="w-full h-12" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setPremiumModalOpen(false)}>
                    <Button className="w-full h-12 gap-2">
                      <Sparkles className="h-5 w-5" />
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/premium" onClick={() => setPremiumModalOpen(false)}>
                  <Button className="w-full h-14 gap-2 text-lg font-bold">
                    <Crown className="h-5 w-5" />
                    Get Premium - Starting at $5/month
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
