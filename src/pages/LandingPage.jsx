import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import CtaSection from "@/components/sections/CtaSection";


const LandingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDemoRequest = () => {
    toast({
      title: "Demo request received!",
      description: "Our team will contact you shortly to schedule your personalized demo.",
      duration: 5000,
      className: "bg-card text-card-foreground rounded-xl shadow-lg",
    });
  };

  const handleEarlyAccess = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-200/20 dark:bg-blue-900/30 blur-3xl blob-animation"></div>
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-200/20 dark:bg-purple-900/30 blur-3xl blob-animation"></div>
      </div>

      <Header onDemoRequest={handleDemoRequest} />
      <main>
        <HeroSection onEarlyAccess={handleEarlyAccess} onDemoRequest={handleDemoRequest} />
        <FeaturesSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <PricingSection onDemoRequest={handleDemoRequest} />
        <CtaSection onEarlyAccess={handleEarlyAccess} onDemoRequest={handleDemoRequest} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;