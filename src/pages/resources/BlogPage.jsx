import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Tag, Search, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const blogPosts = [
  {
    slug: 'announcing-flowsync-ai',
    title: 'Announcing FlowSyncAI: The Future of Intelligent Productivity',
    summary: 'We are thrilled to introduce FlowSyncAI, a revolutionary platform designed to streamline your workflows with the power of AI.',
    author: 'Jane Doe',
    authorAvatar: 'https://i.pravatar.cc/150?u=jane',
    publishDate: '2025-05-28',
    tags: ['Announcement', 'AI', 'Productivity'],
    image: 'modern-office-collaboration',
  },
  {
    slug: 'mastering-task-management',
    title: 'Mastering Task Management with AI-Powered Insights',
    summary: 'Discover how FlowSyncAI helps you prioritize, organize, and conquer your tasks like never before.',
    author: 'John Smith',
    authorAvatar: 'https://i.pravatar.cc/150?u=john',
    publishDate: '2025-05-20',
    tags: ['Productivity', 'AI', 'Tips'],
    image: 'task-management-board',
  },
  {
    slug: 'changelog-v1-2',
    title: 'Changelog: Version 1.2 - Enhanced Collaboration Features',
    summary: 'Our latest update brings improved real-time collaboration, new integrations, and performance boosts.',
    author: 'The FlowSyncAI Team',
    authorAvatar: '/logo-mark.svg', 
    publishDate: '2025-05-15',
    tags: ['Changelog', 'Updates'],
    image: 'software-update-screen',
  },
  {
    slug: 'ai-trends-in-2025',
    title: 'Top AI Trends Shaping Productivity in 2025',
    summary: 'Explore the cutting-edge AI technologies that are transforming how we work and what it means for you.',
    author: 'Dr. AI Expert',
    authorAvatar: 'https://i.pravatar.cc/150?u=expert',
    publishDate: '2025-05-10',
    tags: ['AI', 'Trends', 'Future'],
    image: 'futuristic-ai-interface',
  },
];

const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const BlogPostCard = ({ post }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="flex flex-col"
  >
    <Card className="h-full flex flex-col rounded-2xl shadow-lg soft-shadow hover:shadow-xl soft-shadow-hover transition-shadow duration-300 border-border overflow-hidden">
      <Link to={`/resources/blog/${post.slug}`} className="block">
        <img  alt={post.title} className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
      </Link>
      <CardHeader className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map(tag => (
            <Link key={tag} to={`/resources/blog?tag=${encodeURIComponent(tag)}`} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors">{tag}</Link>
          ))}
        </div>
        <CardTitle className="text-xl font-semibold mb-1">
          <Link to={`/resources/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow">
        <CardDescription className="text-muted-foreground line-clamp-3">{post.summary}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 border-t flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.authorAvatar} alt={post.author} />
            <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author}</p>
            <p className="text-xs text-muted-foreground">{new Date(post.publishDate).toLocaleDateString()}</p>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm" className="group text-primary">
          <Link to={`/resources/blog/${post.slug}`}>
            Read <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const BlogPage = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const activeTag = searchParams.get('tag');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
      const matchesSearch = searchTerm 
        ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return matchesTag && matchesSearch;
    });
  }, [activeTag, searchTerm]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribedEmail) return;
    console.log("Subscribing email:", subscribedEmail);
    toast({
      title: "Subscribed!",
      description: `Thanks for subscribing, ${subscribedEmail}! You'll get the latest updates.`,
      variant: "success",
    });
    setSubscribedEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          >
            FlowSyncAI Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Updates, product thinking, AI trends, and productivity tips from the FlowSyncAI team.
          </motion.p>
        </div>

        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full sm:w-auto">
            <Input 
              type="search" 
              placeholder="Search articles..." 
              className="pl-10 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={!activeTag ? "default" : "outline"} 
              onClick={() => setSearchParams({})}
              className="rounded-lg"
            >
              All Posts
            </Button>
            {allTags.map(tag => (
              <Button 
                key={tag} 
                variant={activeTag === tag ? "default" : "outline"} 
                onClick={() => setSearchParams({ tag })}
                className="rounded-lg"
              >
                <Tag className="mr-2 h-4 w-4" /> {tag}
              </Button>
            ))}
          </div>
        </div>
        
        {activeTag && (
          <h2 className="text-2xl font-semibold mb-6">
            Posts tagged with: <span className="text-primary">{activeTag}</span>
          </h2>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No posts found matching your criteria.</p>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 md:mt-24 py-12 px-6 md:px-10 bg-muted/50 dark:bg-muted/20 rounded-2xl shadow-lg soft-shadow border-border text-center"
        >
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Subscribe to our newsletter for the latest FlowSyncAI news, tips, and feature releases.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={subscribedEmail}
              onChange={(e) => setSubscribedEmail(e.target.value)}
              required 
              className="flex-grow rounded-lg"
            />
            <Button type="submit" className="rounded-lg gradient-bg text-white">Subscribe</Button>
          </form>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default BlogPage;