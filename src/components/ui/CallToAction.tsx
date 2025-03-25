
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Shield, Clock, TrendingUp } from "lucide-react";

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("cta-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-queen-gold" />,
      title: "Safe & Secure",
      description: "End-to-end encryption and secure payment methods for your peace of mind.",
    },
    {
      icon: <Clock className="h-10 w-10 text-queen-gold" />,
      title: "Instant Payouts",
      description: "Receive your winnings instantly into your wallet with no delays.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-queen-gold" />,
      title: "High Return Rates",
      description: "Enjoy some of the highest return rates in the industry on all our games.",
    },
    {
      icon: <Award className="h-10 w-10 text-queen-gold" />,
      title: "Premium Experience",
      description: "A sleek, modern platform designed for serious players who demand the best.",
    },
  ];

  return (
    <section
      id="cta-section"
      className="py-20 relative overflow-hidden"
    >
      {/* Background pattern and gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-queen-card" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FFCC00_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-queen-gold/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-queen-gold/20 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm mb-3">
              <span className="text-sm text-queen-gold font-medium">Start Winning Today</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Thousands of Winners on Our Platform
            </h2>
            
            <p className="text-queen-text-secondary mb-8">
              Queen Games offers a premium betting experience with high payouts, instant transactions, and a beautiful interface designed for serious players.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col h-full p-5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-queen-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link
              to="/sign-up"
              className="inline-flex items-center justify-center px-6 py-3 bg-queen-gold text-queen-dark rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-queen-gold/20"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className={`flex justify-center ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-16 -right-12 w-64 h-64 bg-queen-gold/10 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-8 -left-16 w-64 h-64 bg-queen-gold/5 rounded-full filter blur-3xl" />
              
              {/* Stats Card */}
              <div className="relative z-10 bg-queen-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-8 max-w-lg">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-queen-gold to-transparent" />
                
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Platform Statistics
                </h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <StatCard
                    value="50,000+"
                    label="Active Players"
                    isVisible={isVisible}
                    delay={300}
                  />
                  <StatCard
                    value="₹10 Cr+"
                    label="Monthly Payouts"
                    isVisible={isVisible}
                    delay={400}
                  />
                  <StatCard
                    value="99.9%"
                    label="Uptime"
                    isVisible={isVisible}
                    delay={500}
                  />
                  <StatCard
                    value="< 5 mins"
                    label="Avg. Payout Time"
                    isVisible={isVisible}
                    delay={600}
                  />
                </div>
                
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-lg font-medium text-white mb-3">
                    Recent Big Winners
                  </h4>
                  <div className="space-y-3">
                    <WinnerCard name="Rahul S." amount="₹52,000" game="Mumbai Matka" isVisible={isVisible} delay={700} />
                    <WinnerCard name="Priya K." amount="₹28,500" game="Delhi King" isVisible={isVisible} delay={800} />
                    <WinnerCard name="Amit J." amount="₹16,700" game="Kalyan Special" isVisible={isVisible} delay={900} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label, isVisible, delay }: { value: string; label: string; isVisible: boolean; delay: number }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg border border-white/10 bg-white/5 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-2xl font-bold text-queen-gold mb-1">{value}</span>
      <span className="text-sm text-queen-text-secondary text-center">{label}</span>
    </div>
  );
};

const WinnerCard = ({ name, amount, game, isVisible, delay }: { name: string; amount: string; game: string; isVisible: boolean; delay: number }) => {
  return (
    <div
      className={`flex items-center justify-between py-2 border-b border-white/5 last:border-0 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-queen-text-secondary">{game}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-queen-gold">{amount}</p>
      </div>
    </div>
  );
};

export default CallToAction;
