import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Palette, Shield, CreditCard, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';


const ProfileSettings = () => {
  const { user } = useAuth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal details and avatar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
             <AvatarImage src={user?.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user?.email || 'user'}.png`} alt={user?.user_metadata?.full_name || user?.email} />
            <AvatarFallback>{user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <Button variant="outline">Change Avatar</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue={user?.user_metadata?.full_name || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
          </div>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications from FlowSync AI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates and alerts via email.</p>
          </div>
          <Switch id="emailNotifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
          </div>
          <Switch id="pushNotifications" />
        </div>
         <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="aiSuggestions" className="font-medium">AI Suggestions</Label>
            <p className="text-sm text-muted-foreground">Allow AI to send proactive suggestions.</p>
          </div>
          <Switch id="aiSuggestions" defaultChecked />
        </div>
        <Button>Save Preferences</Button>
      </CardContent>
    </Card>
  );
}

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the look and feel of the application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="font-medium">Theme</Label>
          <p className="text-sm text-muted-foreground mb-2">Choose between light and dark mode.</p>
          <div className="flex gap-4">
            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Light</Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Dark</Button>
            <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}>System</Button>
          </div>
        </div>
        {/* Add more appearance settings here if needed, e.g. font size, density */}
      </CardContent>
    </Card>
  );
}


const SettingsPage = () => {
  const settingTabs = [
    { value: "profile", label: "Profile", icon: User, component: <ProfileSettings /> },
    { value: "notifications", label: "Notifications", icon: Bell, component: <NotificationSettings /> },
    { value: "appearance", label: "Appearance", icon: Palette, component: <AppearanceSettings /> },
    { value: "security", label: "Security", icon: Shield, component: <Card><CardHeader><CardTitle>Security (Placeholder)</CardTitle></CardHeader><CardContent><p>Password change, 2FA settings would go here.</p></CardContent></Card> },
    { value: "billing", label: "Billing", icon: CreditCard, component: <Card><CardHeader><CardTitle>Billing (Placeholder)</CardTitle></CardHeader><CardContent><p>Subscription details, payment methods would go here.</p></CardContent></Card> },
    { value: "integrations", label: "Integrations", icon: Zap, component: <Card><CardHeader><CardTitle>Integrations (Placeholder)</CardTitle></CardHeader><CardContent><p>Connect third-party apps here.</p></CardContent></Card> },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Settings</h1>
        <p className="text-muted-foreground mt-1 text-lg">Manage your account, preferences, and integrations.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
          <TabsList className="flex md:flex-col h-auto md:w-1/4 bg-transparent p-0 items-start gap-1">
            {settingTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="w-full justify-start px-4 py-3 text-base data-[state=active]:bg-muted data-[state=active]:shadow-sm rounded-lg">
                <tab.icon className="mr-3 h-5 w-5" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="md:w-3/4">
            {settingTabs.map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SettingsPage;