/**
 * Cookies Policy Page
 */

import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
              <Cookie className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 18, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are most and least popular and see how visitors move around the site.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You can learn more about cookies and how to manage them by visiting{' '}
                  <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    www.aboutcookies.org
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set cookies on your device, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Authentication providers for secure login</li>
                  <li>Content delivery networks for performance</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-12 p-6 rounded-lg bg-muted/50 text-sm">
            <p className="text-muted-foreground">
              Questions about our Cookie Policy? Contact us at{' '}
              <a href="mailto:privacy@flowsync.ai" className="text-primary hover:underline">
                privacy@flowsync.ai
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
