import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, Trophy, Film, Music, Newspaper, Rocket, Heart, Star, TrendingUp, Crown, ArrowRight, Search, Sparkles, Globe, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

// Categories with real links
const categories = [{
  id: '1',
  name: 'Space & Universe',
  slug: 'space',
  icon: Rocket,
  color: 'from-indigo-500 to-purple-600',
  description: 'Explore the cosmos and solar system',
  count: 12,
  url: 'https://www.solarsystemscope.com/'
}, {
  id: '2',
  name: 'AI & Technology',
  slug: 'ai',
  icon: Cpu,
  color: 'from-violet-500 to-purple-600',
  description: 'AI tools and image generators',
  count: 15,
  premium: true,
  url: 'https://notegpt.io/ai-chat'
}, {
  id: '3',
  name: 'Games',
  slug: 'games',
  icon: Trophy,
  color: 'from-emerald-500 to-green-600',
  description: 'Free online games and MMORPGs',
  count: 25,
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

// Featured links with real URLs
const featuredLinks = [{
  id: '1',
  title: 'Solar System Scope',
  description: 'Interactive 3D encyclopedia of planets and space exploration',
  image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
  category: 'Space',
  url: 'https://www.solarsystemscope.com/',
  clicks: 45000
}, {
  id: '2',
  title: 'ChatGPT - OpenAI',
  description: 'Advanced AI chatbot for conversation and assistance',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
  category: 'AI',
  premium: true,
  url: 'https://chat.openai.com/',
  clicks: 890000
}, {
  id: '3',
  title: 'Crunchyroll',
  description: 'Stream the latest anime series and movies',
  image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
  category: 'Entertainment',
  url: 'https://www.crunchyroll.com/',
  clicks: 125000
}, {
  id: '4',
  title: 'Canva Design',
  description: 'Create stunning graphics, presentations and social media posts',
  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  category: 'Design',
  url: 'https://www.canva.com/',
  clicks: 234000
}, {
  id: '5',
  title: 'Duolingo',
  description: 'Learn languages for free with gamified lessons',
  image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
  category: 'Education',
  url: 'https://www.duolingo.com/',
  clicks: 456000
}, {
  id: '6',
  title: 'Spotify Web Player',
  description: 'Stream millions of songs and podcasts',
  image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
  category: 'Music',
  url: 'https://open.spotify.com/',
  clicks: 670000
}, {
  id: '7',
  title: 'NASA Eyes',
  description: 'Explore the universe with NASA\'s 3D visualization tools',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
  category: 'Space',
  premium: true,
  url: 'https://eyes.nasa.gov/',
  clicks: 89000
}, {
  id: '8',
  title: 'Khan Academy',
  description: 'Free world-class education for anyone, anywhere',
  image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
  category: 'Education',
  url: 'https://www.khanacademy.org/',
  clicks: 345000
}];

const trendingLinks = [{
  id: '1',
  title: 'WolframAlpha - Computational Knowledge',
  url: 'https://www.wolframalpha.com/',
  clicks: 89000
}, {
  id: '2',
  title: 'Midjourney AI Art',
  url: 'https://www.midjourney.com/',
  clicks: 234000,
  premium: true
}, {
  id: '3',
  title: 'AllRecipes - Best Food Recipes',
  url: 'https://www.allrecipes.com/',
  clicks: 156000
}, {
  id: '4',
  title: 'Pinterest - Visual Discovery',
  url: 'https://www.pinterest.com/',
  clicks: 278000
}, {
  id: '5',
  title: 'GitHub - Code Repository',
  url: 'https://github.com/',
  clicks: 445000
}, {
  id: '6',
  title: 'Notion - All-in-One Workspace',
  url: 'https://www.notion.so/',
  clicks: 332000
}, {
  id: '7',
  title: 'RuneScape - Free MMORPG',
  url: 'https://www.runescape.com/',
  clicks: 145000
}, {
  id: '8',
  title: 'Figma - Design Tool',
  url: 'https://www.figma.com/',
  clicks: 289000,
  premium: true
}, {
  id: '9',
  title: 'Discord - Chat & Communities',
  url: 'https://discord.com/',
  clicks: 567000
}, {
  id: '10',
  title: 'Unsplash - Free Photos',
  url: 'https://unsplash.com/',
  clicks: 234000
}];
export default function Index() {
  const {
    user
  } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  return <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">​Fluxo</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Explore</Link>
            <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Categories</Link>
            <Link to="/premium" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
              <Crown className="h-4 w-4 text-amber-500" />
              Premium
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? <Link to="/profile">
                <Button variant="soft" size="sm">My Account</Button>
              </Link> : <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="gap-1">
                    <Sparkles className="h-4 w-4" />
                    Join Free
                  </Button>
                </Link>
              </>}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Qzk2QkEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
              <Zap className="h-3.5 w-3.5 mr-1 text-amber-500" />
              Discover Amazing Content
            </Badge>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Your Gateway to the
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> Best Links </span>
              on the Web
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore curated collections of books, AI tools, sports, entertainment, and more. 
              Save your favorites and unlock premium content.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for books, AI tools, sports, and more..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-12 pr-4 h-14 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-lg" />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl" size="sm">
                Search
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>Popular:</span>
              <Link to="/category/books" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Books</Link>
              <Link to="/category/ai" className="hover:text-primary transition-colors underline-offset-4 hover:underline">AI Tools</Link>
              <Link to="/category/sports" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Cricket</Link>
              <Link to="/category/entertainment" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Movies</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Browse Categories</h2>
            <p className="text-muted-foreground">Explore content organized by your interests</p>
          </div>
          <Button variant="ghost" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map(category => <a key={category.id} href={category.url} target="_blank" rel="noopener noreferrer" className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              {category.premium && <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.count} links</p>
            </a>)}
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
            {featuredLinks.map(link => <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 block">
                <div className="relative aspect-video overflow-hidden">
                  <img src={link.image} alt={link.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {link.premium && <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>}
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
                      Visit <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </a>)}
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
              {trendingLinks.map((link, index) => <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <span className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-medium flex items-center gap-2">
                      {link.title}
                      {link.premium && <Crown className="h-4 w-4 text-amber-500" />}
                    </h3>
                    <span className="text-sm text-muted-foreground">{(link.clicks / 1000).toFixed(1)}k clicks</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </a>)}
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

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl">Lapi</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your gateway to the best curated links on the web. Discover, save, and explore.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/category/books" className="hover:text-foreground transition-colors">Books & Reading</Link></li>
                <li><Link to="/category/ai" className="hover:text-foreground transition-colors">AI & Technology</Link></li>
                <li><Link to="/category/sports" className="hover:text-foreground transition-colors">Sports</Link></li>
                <li><Link to="/category/entertainment" className="hover:text-foreground transition-colors">Entertainment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/premium" className="hover:text-foreground transition-colors">Premium</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Lapi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
}