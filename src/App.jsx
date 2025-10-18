
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import toast, { Toaster as HotToaster } from "react-hot-toast";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectWorkspacePage from "@/pages/ProjectWorkspacePage";
import TeamManagementPage from "@/pages/TeamManagementPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import TemplatesPage from "@/pages/TemplatesPage";
import CalendarPage from "@/pages/CalendarPage";
import SettingsPage from "@/pages/SettingsPage";
import AuthLayout from "@/components/layout/AuthLayout";
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { RealtimeProvider } from "@/contexts/RealtimeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import TermsPage from "@/pages/legal/TermsPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import CookiesPage from "@/pages/legal/CookiesPage";
import SecurityPage from "@/pages/legal/SecurityPage";
import GDPRPage from "@/pages/legal/GDPRPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { ErrorFallback } from "@/components/error/ErrorFallback";
import RouteErrorWrapper from "@/components/error/RouteErrorWrapper";
import { WelcomeWizard, OnboardingChecklist } from "@/components/onboarding";
import { OnboardingTestHelper } from "@/components/onboarding/OnboardingTestHelper";
import { logError } from "@/lib/errorLogger";

// Enhanced Marketing Components
import { EnhancedHeader } from "@/components/layout/EnhancedHeader";
import { EnhancedFooter } from "@/components/layout/EnhancedFooter";
import { CartSlideout } from "@/components/shared/CartSlideout";

// Marketing Pages
import { HomePage } from "@/pages/marketing/HomePage";
import { FeaturesPage } from "@/pages/marketing/FeaturesPage";
import { IntegrationsPage } from "@/pages/marketing/IntegrationsPage";
import { RoadmapPage } from "@/pages/marketing/RoadmapPage";
import { ChangelogPage } from "@/pages/marketing/ChangelogPage";
import { StatusPage } from "@/pages/marketing/StatusPage";
import CheckoutDemoPage from "@/pages/CheckoutDemoPage";

import DocumentationPage from "@/pages/resources/DocumentationPage";
import GuidesPage from "@/pages/resources/GuidesPage";
import GuideDetailPage from "@/pages/resources/GuideDetailPage";
import SupportPage from "@/pages/resources/SupportPage";
import BlogPage from "@/pages/resources/BlogPage";
import BlogPostPage from "@/pages/resources/BlogPostPage";
import { CommunityPage } from "@/pages/resources/CommunityPage";

import AboutPage from "@/pages/company/AboutPage";
import CareersPage from "@/pages/company/CareersPage";
import JobDetailPage from "@/pages/company/JobDetailPage";
import ContactPage from "@/pages/company/ContactPage";
import { PartnersPage } from "@/pages/company/PartnersPage";
import { PressPage } from "@/pages/company/PressPage";

import AcceptInvitationPage from "@/pages/AcceptInvitationPage";
import CheckoutSuccessPage from "@/pages/CheckoutSuccessPage";


const AppRoutes = () => {
  const { session, loading } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const PublicPageLayout = ({ children }) => (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );

  // Enhanced Marketing Layout with new components
  const MarketingLayout = ({ children }) => (
    <>
      <EnhancedHeader />
      <main className="min-h-screen">{children}</main>
      <EnhancedFooter />
      <CartSlideout />
    </>
  );


  return (
    <Routes>
      {/* Enhanced Marketing Routes */}
      <Route path="/" element={<MarketingLayout><HomePage /></MarketingLayout>} />
      <Route path="/features" element={<MarketingLayout><FeaturesPage /></MarketingLayout>} />
      <Route path="/integrations" element={<MarketingLayout><IntegrationsPage /></MarketingLayout>} />
      <Route path="/pricing" element={<MarketingLayout><PricingPage /></MarketingLayout>} />
      <Route path="/roadmap" element={<MarketingLayout><RoadmapPage /></MarketingLayout>} />
      <Route path="/changelog" element={<MarketingLayout><ChangelogPage /></MarketingLayout>} />
      <Route path="/status" element={<MarketingLayout><StatusPage /></MarketingLayout>} />

      {/* Checkout Demo */}
      <Route path="/checkout/demo" element={<CheckoutDemoPage />} />

      {/* Legacy Landing Page (if needed) */}
      <Route path="/legacy" element={<LandingPage />} />

      {/* Legal Pages */}
      <Route path="/legal/terms" element={<MarketingLayout><TermsPage /></MarketingLayout>} />
      <Route path="/legal/privacy" element={<MarketingLayout><PrivacyPolicyPage /></MarketingLayout>} />
      <Route path="/legal/cookies" element={<MarketingLayout><CookiesPage /></MarketingLayout>} />
      <Route path="/legal/security" element={<MarketingLayout><SecurityPage /></MarketingLayout>} />
      <Route path="/legal/gdpr" element={<MarketingLayout><GDPRPage /></MarketingLayout>} />

      {/* Resource Routes - Use Marketing Layout for consistency */}
      <Route path="/docs" element={<MarketingLayout><DocumentationPage /></MarketingLayout>} />
      <Route path="/guides" element={<MarketingLayout><GuidesPage /></MarketingLayout>} />
      <Route path="/guides/:guideSlug" element={<MarketingLayout><GuideDetailPage /></MarketingLayout>} />
      <Route path="/support" element={<MarketingLayout><SupportPage /></MarketingLayout>} />
      <Route path="/blog" element={<MarketingLayout><BlogPage /></MarketingLayout>} />
      <Route path="/blog/:postSlug" element={<MarketingLayout><BlogPostPage /></MarketingLayout>} />
      <Route path="/community" element={<MarketingLayout><CommunityPage /></MarketingLayout>} />

      {/* Legacy resource routes for backwards compatibility */}
      <Route path="/resources/documentation" element={<PublicPageLayout><DocumentationPage /></PublicPageLayout>} />
      <Route path="/resources/guides" element={<PublicPageLayout><GuidesPage /></PublicPageLayout>} />
      <Route path="/resources/guides/:guideSlug" element={<PublicPageLayout><GuideDetailPage /></PublicPageLayout>} />
      <Route path="/resources/support" element={<PublicPageLayout><SupportPage /></PublicPageLayout>} />
      <Route path="/resources/blog" element={<PublicPageLayout><BlogPage /></PublicPageLayout>} />
      <Route path="/resources/blog/:postSlug" element={<PublicPageLayout><BlogPostPage /></PublicPageLayout>} />
      
      {/* Company Routes - Use Marketing Layout */}
      <Route path="/company/about" element={<MarketingLayout><AboutPage /></MarketingLayout>} />
      <Route path="/careers" element={<MarketingLayout><CareersPage /></MarketingLayout>} />
      <Route path="/careers/:jobId" element={<MarketingLayout><JobDetailPage /></MarketingLayout>} />
      <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />
      <Route path="/partners" element={<MarketingLayout><PartnersPage /></MarketingLayout>} />
      <Route path="/press" element={<MarketingLayout><PressPage /></MarketingLayout>} />

      {/* Legacy company routes */}
      <Route path="/company/careers" element={<PublicPageLayout><CareersPage /></PublicPageLayout>} />
      <Route path="/company/careers/:jobId" element={<PublicPageLayout><JobDetailPage /></PublicPageLayout>} />
      <Route path="/company/contact" element={<PublicPageLayout><ContactPage /></PublicPageLayout>} />

      <Route path="/accept-invitation" element={<AcceptInvitationPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

      <Route
        path="/app" 
        element={
          session ? <AppLayout /> : <Navigate to="/auth/signin" replace />
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={
          <RouteErrorWrapper routeName="Dashboard">
            <DashboardPage />
          </RouteErrorWrapper>
        } />
        <Route path="project/:projectId" element={
          <RouteErrorWrapper routeName="Project Workspace">
            <ProjectWorkspacePage />
          </RouteErrorWrapper>
        } />
        <Route path="team" element={
          <RouteErrorWrapper routeName="Team Management">
            <TeamManagementPage />
          </RouteErrorWrapper>
        } />
        <Route path="templates" element={
          <RouteErrorWrapper routeName="Templates">
            <TemplatesPage />
          </RouteErrorWrapper>
        } />
        <Route path="calendar" element={
          <RouteErrorWrapper routeName="Calendar">
            <CalendarPage />
          </RouteErrorWrapper>
        } />
        <Route path="settings" element={
          <RouteErrorWrapper routeName="Settings">
            <SettingsPage />
          </RouteErrorWrapper>
        } />
      </Route>
      <Route 
        path="/auth" 
        element={
          !session ? <AuthLayout /> : <Navigate to="/app/dashboard" replace />
        }
      >
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<Navigate to={session ? "/app/dashboard" : "/"} replace />} />
    </Routes>
  );
};

const App = () => {
  const handleError = (error, errorInfo) => {
    // Log error to our error tracking system
    logError(error, errorInfo);
  };

  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={handleError}
    >
      <Router>
        <ThemeProvider>
          <ErrorBoundary
            fallback={<ErrorFallback title="Authentication Error" description="There was a problem with authentication. Please try refreshing the page." />}
            onError={handleError}
          >
            <AuthProvider>
              <ErrorBoundary
                fallback={<ErrorFallback title="Organization Error" description="There was a problem loading your organization data." />}
                onError={handleError}
              >
                <OrganizationProvider>
                  <SubscriptionProvider>
                    <RealtimeProvider>
                      <NotificationProvider>
                        <OnboardingProvider>
                          <AppRoutes />
                          <Toaster />
                          {/* React Hot Toast for marketing pages */}
                          <HotToaster
                            position="top-right"
                            toastOptions={{
                              duration: 4000,
                              style: {
                                background: 'hsl(var(--background))',
                                color: 'hsl(var(--foreground))',
                                border: '1px solid hsl(var(--border))',
                              },
                            }}
                          />
                          <WelcomeWizard />
                          <OnboardingChecklist />
                          <OnboardingTestHelper />
                        </OnboardingProvider>
                      </NotificationProvider>
                    </RealtimeProvider>
                  </SubscriptionProvider>
                </OrganizationProvider>
              </ErrorBoundary>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
