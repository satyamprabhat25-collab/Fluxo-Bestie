import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, Trophy, Film, Newspaper, Rocket, Heart, Star, TrendingUp, Crown, ArrowRight, Search, Sparkles, Globe, Zap, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/hooks/usePremium';
import { PremiumGate } from '@/components/PremiumGate';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Categories with real links - Premium categories
const categories = [{
  id: '1',
  name: 'Space & Universe',
  slug: 'space',
  icon: Rocket,
  color: 'from-indigo-500 to-purple-600',
  description: 'Explore the cosmos and solar system',
  count: 15,
  premium: true,
  url: 'https://www.solarsystemscope.com/'
}, {
  id: '2',
  name: 'AI & Technology',
  slug: 'ai',
  icon: Cpu,
  color: 'from-violet-500 to-purple-600',
  description: 'AI tools and image generators',
  count: 25,
  premium: true,
  url: 'https://notegpt.io/ai-chat'
}, {
  id: '3',
  name: 'Games',
  slug: 'games',
  icon: Trophy,
  color: 'from-emerald-500 to-green-600',
  description: 'Free online games and MMORPGs',
  count: 30,
  premium: true,
  url: 'https://armorgames.com/'
}, {
  id: '4',
  name: 'Entertainment',
  slug: 'entertainment',
  icon: Film,
  color: 'from-pink-500 to-rose-600',
  description: 'Anime, movies, and shows',
  count: 45,
  url: 'https://www.anime-planet.com/'
}, {
  id: '5',
  name: 'Health & Wellness',
  slug: 'health',
  icon: Heart,
  color: 'from-red-500 to-pink-600',
  description: 'Health information and tips',
  count: 18,
  url: 'https://www.mayoclinic.org/'
}, {
  id: '6',
  name: 'Food & Recipes',
  slug: 'food',
  icon: BookOpen,
  color: 'from-orange-500 to-amber-600',
  description: 'Delicious recipes from around the world',
  count: 30,
  url: 'https://www.allrecipes.com/'
}, {
  id: '7',
  name: 'Knowledge & Studies',
  slug: 'knowledge',
  icon: Newspaper,
  color: 'from-cyan-500 to-blue-600',
  description: 'Learn anything with powerful tools',
  count: 22,
  url: 'https://www.wolframalpha.com/'
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
  title: 'Crunchyroll',
  description: 'Stream the latest anime series, movies, and Asian drama shows',
  image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600',
  category: 'Entertainment',
  url: 'https://www.crunchyroll.com/',
  clicks: 325000
}, {
  id: '4',
  title: 'Canva Design Studio',
  description: 'Create stunning graphics, presentations, social media posts, and videos',
  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
  category: 'Design',
  url: 'https://www.canva.com/',
  clicks: 534000
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
  title: 'Spotify Web Player',
  description: 'Stream millions of songs, podcasts, and audiobooks from anywhere',
  image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600',
  category: 'Music',
  url: 'https://open.spotify.com/',
  clicks: 870000
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
  title: 'Discord Communities',
  description: 'Connect with millions of communities, gamers, and creators worldwide',
  image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600',
  category: 'Social',
  premium: true,
  url: 'https://discord.com/',
  clicks: 967000
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
  clicks: 845000
}, {
  id: '4',
  title: 'Claude AI - Advanced Assistant',
  url: 'https://claude.ai/',
  clicks: 234000,
  premium: true
}, {
  id: '5',
  title: 'Blender - 3D Creation Suite',
  url: 'https://www.blender.org/',
  clicks: 312000,
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
  title: 'Khan Academy - Free Education',
  url: 'https://www.khanacademy.org/',
  clicks: 545000
}, {
  id: '9',
  title: 'Duolingo - Learn Languages',
  url: 'https://www.duolingo.com/',
  clicks: 678000
}, {
  id: '10',
  title: 'Pinterest - Visual Discovery',
  url: 'https://www.pinterest.com/',
  clicks: 534000
}, {
  id: '11',
  title: 'Adobe Creative Cloud',
  url: 'https://www.adobe.com/creativecloud.html',
  clicks: 423000,
  premium: true
}, {
  id: '12',
  title: 'Unsplash - Free Photos',
  url: 'https://unsplash.com/',
  clicks: 334000
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
  title: 'Roblox Studio',
  description: 'Create and play millions of games',
  url: 'https://www.roblox.com/',
  icon: '🎮',
  category: 'Games'
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
  title: 'Linear - Project Management',
  description: 'Streamline your software development',
  url: 'https://linear.app/',
  icon: '📊',
  category: 'Productivity'
}, {
  id: '8',
  title: 'Vercel - Deploy Apps',
  description: 'Deploy web applications instantly',
  url: 'https://vercel.com/',
  icon: '🚀',
  category: 'Development'
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
  return <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-18 items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Globe className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fluxo</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-lg">Explore</Link>
            <Link to="/premium" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2 text-lg">
              <Crown className="h-5 w-5 text-amber-500" />
              Premium
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="default" className="gap-2">
                    <Crown className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to={`/profile/${user}`}>
                  <Button variant="soft" size="default">My Account</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="default">Sign in</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="default" className="gap-2 px-6">
                    <Sparkles className="h-4 w-4" />
                    Join Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - LARGER AND MORE ATTRACTIVE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--accent)/0.1),transparent_50%)]" />
        
        <div className="container max-w-7xl mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-base font-medium animate-fade-in">
              <Zap className="h-4 w-4 mr-2 text-amber-500" />
              🎉 Over 50+ Premium Websites Available
            </Badge>
            
            <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 animate-slide-up">
              Your Gateway to the
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mt-2"> Best Links on the Web</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover curated collections of AI tools, games, NASA content, professional software, and so much more. 
              <span className="text-foreground font-medium"> Unlock premium content with one subscription.</span>
            </p>

            {/* Search Bar - LARGER */}
            <div className="relative max-w-2xl mx-auto mb-10">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input 
                placeholder="Search for AI tools, games, NASA, and more..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="pl-14 pr-32 h-16 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-xl bg-card" 
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl h-12 px-8 text-base" size="lg">
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="px-6">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Premium Sites</div>
              </div>
              <div className="px-6 border-l border-border">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="px-6 border-l border-border">
                <div className="text-3xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - LARGER CARDS */}
      <section className="container max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Browse Categories</h2>
            <p className="text-muted-foreground text-lg">Explore premium content organized by your interests</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={(e) => handleLinkClick(e, !!category.premium, category.url, category.name)}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-2xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {category.premium && (
                <Badge className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <category.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} links</p>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Links */}
      <section className="bg-secondary/30 py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl">Featured Links</h2>
                <p className="text-muted-foreground text-sm">Hand-picked content just for you</p>
              </div>
            </div>
            <Button variant="outline" className="gap-1">
              See More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLinks.map(link => (
              <div
                key={link.id}
                onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 block cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={link.image} alt={link.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {link.premium && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{link.category}</Badge>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">{link.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{link.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {(link.clicks / 1000).toFixed(1)}k clicks
                    </span>
                    <span className="text-sm font-medium text-primary flex items-center gap-1">
                      {link.premium && !isPremium ? <Lock className="h-3 w-3" /> : null}
                      Visit <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Layout: Trending + Premium CTA */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trending Links */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl">Trending Now</h2>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {trendingLinks.map((link, index) => (
                <div
                  key={link.id}
                  onClick={(e) => handleLinkClick(e, !!link.premium, link.url, link.title)}
                  className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <span className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-medium flex items-center gap-2">
                      {link.title}
                      {link.premium && <Lock className="h-4 w-4 text-amber-500" />}
                    </h3>
                    <span className="text-sm text-muted-foreground">{(link.clicks / 1000).toFixed(1)}k clicks</span>
                  </div>
                  {link.premium && !isPremium ? (
                    <Lock className="h-5 w-5 text-amber-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Premium CTA */}
          <div>
            <div className="bg-gradient-to-br from-primary via-accent to-primary p-[2px] rounded-2xl">
              <div className="bg-card rounded-2xl p-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                  <Crown className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">Unlock Premium</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get access to exclusive AI tools, image generators, and premium content.
                </p>
                
                {/* Pricing */}
                <div className="space-y-2 mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly</span>
                    <span className="font-bold text-primary">$5/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quarterly</span>
                    <span className="font-bold text-primary">$10/3 months</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-border pt-2">
                    <span className="text-sm font-medium">Yearly <Badge variant="secondary" className="ml-1 text-xs">Best Value</Badge></span>
                    <span className="font-bold text-primary">$20/year</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {['AI Image Generator Access', 'Space & Universe Premium', 'Exclusive AI Tools', 'Ad-free experience'].map(feature => <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-3 w-3 text-primary" />
                      </div>
                      {feature}
                    </li>)}
                </ul>
                <Link to="/premium">
                  <Button className="w-full gap-2" size="lg">
                    <Sparkles className="h-4 w-4" />
                    Get Premium Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Exclusive Section - NEW */}
      <section className="bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-background py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-6 py-2">
              <Crown className="h-4 w-4 mr-2" />
              Premium Exclusive
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Advanced Tools & Software</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlock access to professional-grade AI tools, game engines, and design software
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumExclusiveLinks.map(link => (
              <div
                key={link.id}
                onClick={(e) => handleLinkClick(e, true, link.url, link.title)}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full" />
                <div className="text-4xl mb-4">{link.icon}</div>
                <Badge variant="outline" className="mb-3 text-xs">{link.category}</Badge>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <div className="flex items-center gap-2 text-amber-500 font-medium text-sm">
                  <Lock className="h-4 w-4" />
                  Premium Only
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/premium">
              <Button size="lg" className="gap-2 px-8">
                <Crown className="h-5 w-5" />
                Unlock All Premium Content
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="font-display font-bold text-2xl">Fluxo</span>
              </div>
              <p className="text-muted-foreground">
                Your gateway to the best curated links on the web. Discover, save, and unlock premium content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Categories</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/category/ai" className="hover:text-foreground transition-colors">AI & Technology</Link></li>
                <li><Link to="/category/games" className="hover:text-foreground transition-colors">Games</Link></li>
                <li><Link to="/category/space" className="hover:text-foreground transition-colors">Space & Universe</Link></li>
                <li><Link to="/category/entertainment" className="hover:text-foreground transition-colors">Entertainment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Account</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/premium" className="hover:text-foreground transition-colors">Premium</Link></li>
                <li><Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2025 Fluxo. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Premium Modal */}
      <Dialog open={premiumModalOpen} onOpenChange={setPremiumModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Premium Content
            </DialogTitle>
            <DialogDescription className="text-center">
              <span className="font-medium text-foreground">{selectedPremiumTitle}</span> is only available for premium members.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>Access to all premium links</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>AI tools & image generators</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>Games, NASA, Discord & more</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {!user ? (
                <>
                  <Link to="/auth" onClick={() => setPremiumModalOpen(false)}>
                    <Button className="w-full" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setPremiumModalOpen(false)}>
                    <Button className="w-full gap-2">
                      <Sparkles className="h-4 w-4" />
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/premium" onClick={() => setPremiumModalOpen(false)}>
                  <Button className="w-full gap-2">
                    <Crown className="h-4 w-4" />
                    Get Premium - Starting at $5/month
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}