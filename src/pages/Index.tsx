
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/ui/HeroSection";
import FeaturedGames from "../components/ui/FeaturedGames";
import CallToAction from "../components/ui/CallToAction";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-queen-dark overflow-hidden">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedGames />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
