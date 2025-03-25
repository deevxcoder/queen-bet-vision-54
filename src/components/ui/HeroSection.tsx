
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-queen-dark opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-queen-dark via-queen-dark/70 to-transparent z-10" />

      {/* Hero Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="text-sm text-queen-gold font-medium">The Next Generation Gaming Experience</span>
            </div>
            
            <h1 className="hero-text text-4xl md:text-5xl lg:text-7xl leading-tight">
              <span className="block text-white">Elevate Your</span>
              <span className="text-queen-gold">Gaming Experience</span>
            </h1>
            
            <p className="text-lg md:text-xl text-queen-text-secondary max-w-xl">
              Experience the best in modern betting with our sleek platform. Join thousands of players and start winning today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center px-6 py-3 bg-queen-gold text-queen-dark rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-queen-gold/20"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Playing
              </Link>
              <Link
                to="/how-to-play"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium border border-white/10 transition-all"
              >
                Learn How to Play
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className={`flex justify-center ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-queen-gold/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-queen-gold/10 rounded-full filter blur-3xl" />
              
              {/* Phone mockup */}
              <div className="relative z-10 bg-queen-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="relative w-64 md:w-80 h-[520px] md:h-[580px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Queen Games App"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-queen-dark/80 to-transparent" />
                  
                  {/* App UI Elements */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="space-y-4">
                      <div className="w-24 h-2 bg-white/20 rounded-full mx-auto mb-8" />
                      
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <h3 className="text-white text-lg font-medium mb-2">Jodi Special</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-queen-gold">9.5x Payout</span>
                          <button className="px-3 py-1 bg-queen-gold text-queen-dark rounded-lg text-sm font-medium">
                            Play Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-[pulse_2s_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
