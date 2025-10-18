import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Search, Menu, Settings as SettingsIcon, LogOut, LayoutDashboard, FileText, CalendarDays, Sparkles, Zap, Moon, Sun, Monitor, MessageSquare, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/hooks/useCart';
import ShoppingCartSidebar from '@/components/ShoppingCart';

const AppHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Signed out successfully." });
      navigate('/');
    } catch (error) {
      toast({ title: "Sign out failed", description: error.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/store", label: "Store", icon: ShoppingCart },
    { to: "/app/templates", label: "Templates", icon: FileText },
    { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  ];
  
  const placeholderNotifications = [
    { id: 1, text: "New task 'Design Landing Page' assigned to you.", time: "5m ago", icon: FileText, unread: true },
    { id: 2, text: "AI suggested breaking down 'Develop API' into 3 subtasks.", time: "1h ago", icon: Sparkles },
    { id: 3, text: "@john commented on 'Marketing Campaign Q3'.", time: "3h ago", icon: MessageSquare, unread: true },
    { id: 4, text: "Project 'Alpha Release' is due tomorrow.", time: "1d ago", icon: CalendarDays },
  ];


  return (
    <>
    <header 
      className={`sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 md:px-6 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-background/80'
      }`}
    >
      <div className="flex items-center gap-2">
        {setSidebarOpen && !sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        )}
        <Link to="/app/dashboard" className="flex items-center gap-2 mr-4">
          <Zap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold hidden sm:inline">FlowSync<span className="text-primary">AI</span></span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="flex-1"></div>

      <div className="flex items-center gap-1 md:gap-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-muted pl-9 md:w-[150px] lg:w-[230px] h-9 text-sm"
          />
        </div>
        
        <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
          <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          <span className="sr-only">Shopping Cart</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {theme === 'light' && <Sun className="h-5 w-5" />}
              {theme === 'dark' && <Moon className="h-5 w-5" />}
              {theme === 'system' && <Monitor className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl shadow-xl border mt-2">
            <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
              <Sun className="mr-2 h-4 w-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
              <Monitor className="mr-2 h-4 w-4" /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              {placeholderNotifications.some(n => n.unread) && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 md:w-96 rounded-xl shadow-xl border mt-2 p-0">
            <DropdownMenuLabel className="p-3 font-semibold flex justify-between items-center border-b">
              Notifications
              <Button variant="ghost" size="sm" className="text-xs h-auto py-1">Mark all as read</Button>
            </DropdownMenuLabel>
            <ScrollArea className="h-[300px]">
              {placeholderNotifications.length > 0 ? placeholderNotifications.map(notif => (
                <DropdownMenuItem key={notif.id} className={`p-3 border-b last:border-b-0 items-start cursor-pointer hover:bg-muted/50 ${notif.unread ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-start w-full">
                    <div className={`p-2 rounded-full mr-3 mt-1 ${notif.unread ? 'bg-primary/20' : 'bg-muted'}`}>
                      <notif.icon className={`h-4 w-4 ${notif.unread ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notif.unread ? 'font-medium' : ''}`}>{notif.text}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                    {notif.unread && <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 self-start"></div>}
                  </div>
                </DropdownMenuItem>
              )) : (
                <div className="p-6 text-center text-muted-foreground">
                  No new notifications.
                </div>
              )}
            </ScrollArea>
            <DropdownMenuSeparator className="my-0"/>
            <DropdownMenuItem className="p-3 justify-center text-sm text-primary cursor-pointer hover:bg-muted/50 rounded-b-xl">
                View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user?.email || 'user'}.png?size=32`} alt={user?.user_metadata?.full_name || user?.email} />
                <AvatarFallback>{user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-xl shadow-xl border mt-2">
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/app/settings" className="flex items-center w-full px-3 py-2">
                <SettingsIcon className="mr-2 h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer flex items-center px-3 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <ShoppingCartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>
  );
};

export default AppHeader;