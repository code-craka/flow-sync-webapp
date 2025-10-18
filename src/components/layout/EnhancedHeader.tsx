/**
 * Enhanced Marketing Header
 *
 * Beautiful header with glassmorphism and animations
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Sparkles,
  BookOpen,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function EnhancedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productLinks = [
    { name: 'Features', href: '/features', icon: Sparkles },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Pricing', href: '/pricing', icon: ShoppingCart },
    { name: 'Roadmap', href: '/roadmap', icon: BookOpen },
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Guides', href: '/guides' },
    { name: 'Blog', href: '/blog' },
    { name: 'Support', href: '/support' },
  ];

  const companyLinks = [
    { name: 'About', href: '/company/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-lg bg-gradient-to-br from-primary to-purple-600"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FlowSync AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Product Dropdown */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Product <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[220px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-xl p-2 z-[60]"
                    sideOffset={5}
                  >
                    {productLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <DropdownMenu.Item
                          key={link.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent outline-none"
                          onSelect={() => navigate(link.href)}
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          <span>{link.name}</span>
                        </DropdownMenu.Item>
                      );
                    })}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* Resources Dropdown */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Resources <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-xl p-2 z-[60]"
                    sideOffset={5}
                  >
                    {resourceLinks.map((link) => (
                      <DropdownMenu.Item
                        key={link.href}
                        className="px-3 py-2 rounded-md cursor-pointer hover:bg-accent outline-none"
                        onSelect={() => navigate(link.href)}
                      >
                        {link.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* Company Dropdown */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Company <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[180px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-xl p-2 z-[60]"
                    sideOffset={5}
                  >
                    {companyLinks.map((link) => (
                      <DropdownMenu.Item
                        key={link.href}
                        className="px-3 py-2 rounded-md cursor-pointer hover:bg-accent outline-none"
                        onSelect={() => navigate(link.href)}
                      >
                        {link.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              <Button variant="outline" className="hidden md:inline-flex" asChild>
                <Link to="/auth/signin">Sign In</Link>
              </Button>

              <Button
                className="hidden md:inline-flex bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                asChild
              >
                <Link to="/auth/signup">Get Started</Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 md:top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl z-40 lg:hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Product Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Product
                </p>
                {productLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Resource Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Resources
                </p>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md hover:bg-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Company Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Company
                </p>
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md hover:bg-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="outline" asChild>
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-primary to-purple-600"
                  asChild
                >
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
