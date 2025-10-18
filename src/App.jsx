
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
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
import TermsPage from "@/pages/legal/TermsPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import DocumentationPage from "@/pages/resources/DocumentationPage";
import GuidesPage from "@/pages/resources/GuidesPage";
import GuideDetailPage from "@/pages/resources/GuideDetailPage";
import SupportPage from "@/pages/resources/SupportPage";
import BlogPage from "@/pages/resources/BlogPage";
import BlogPostPage from "@/pages/resources/BlogPostPage";

import AboutPage from "@/pages/company/AboutPage";
import CareersPage from "@/pages/company/CareersPage";
import JobDetailPage from "@/pages/company/JobDetailPage";
import ContactPage from "@/pages/company/ContactPage";

import StorePage from "@/pages/StorePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import SuccessPage from "@/pages/SuccessPage";
import PolarStorePage from "@/pages/PolarStorePage";


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


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PublicPageLayout><PricingPage /></PublicPageLayout>} />
      
      <Route path="/legal/terms" element={<PublicPageLayout><TermsPage /></PublicPageLayout>} />
      <Route path="/legal/privacy" element={<PublicPageLayout><PrivacyPolicyPage /></PublicPageLayout>} />

      <Route path="/resources/documentation" element={<PublicPageLayout><DocumentationPage /></PublicPageLayout>} />
      <Route path="/resources/guides" element={<PublicPageLayout><GuidesPage /></PublicPageLayout>} />
      <Route path="/resources/guides/:guideSlug" element={<PublicPageLayout><GuideDetailPage /></PublicPageLayout>} />
      <Route path="/resources/support" element={<PublicPageLayout><SupportPage /></PublicPageLayout>} />
      <Route path="/resources/blog" element={<PublicPageLayout><BlogPage /></PublicPageLayout>} />
      <Route path="/resources/blog/:postSlug" element={<PublicPageLayout><BlogPostPage /></PublicPageLayout>} />
      
      <Route path="/company/about" element={<PublicPageLayout><AboutPage /></PublicPageLayout>} />
      <Route path="/company/careers" element={<PublicPageLayout><CareersPage /></PublicPageLayout>} />
      <Route path="/company/careers/:jobId" element={<PublicPageLayout><JobDetailPage /></PublicPageLayout>} />
      <Route path="/company/contact" element={<PublicPageLayout><ContactPage /></PublicPageLayout>} />

      <Route path="/store" element={<PublicPageLayout><StorePage /></PublicPageLayout>} />
      <Route path="/product/:id" element={<PublicPageLayout><ProductDetailPage /></PublicPageLayout>} />
      <Route path="/success" element={<PublicPageLayout><SuccessPage /></PublicPageLayout>} />
      <Route path="/polar-store" element={<PublicPageLayout><PolarStorePage /></PublicPageLayout>} />

      <Route 
        path="/app" 
        element={
          session ? <AppLayout /> : <Navigate to="/auth/signin" replace />
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="project/:projectId" element={<ProjectWorkspacePage />} />
        <Route path="team" element={<TeamManagementPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="settings" element={<SettingsPage />} />
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
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
