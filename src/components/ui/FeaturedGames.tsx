
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CardGame from "./CardGame";

const games = [
  {
    id: 1,
    title: "Mumbai Matka",
    type: "Number Game",
    slug: "mumbai-matka",
    status: "open" as const,
    timeRemaining: "Closes in 2h 30m",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3bdb4df691d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Delhi King",
    type: "Jodi Game",
    slug: "delhi-king",
    status: "open" as const,
    timeRemaining: "Closes in 1h 15m",
    imageUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Kalyan Special",
    type: "Harf Game",
    slug: "kalyan-special",
    status: "upcoming" as const,
    timeRemaining: "Opens in 30m",
    imageUrl: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "IPL T20 Toss",
    type: "Option Game",
    slug: "ipl-toss",
    status: "closed" as const,
    timeRemaining: "Next round in 4h",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Friday Bonanza",
    type: "Crossing Game",
    slug: "friday-bonanza",
    status: "upcoming" as const,
    timeRemaining: "Opens tomorrow",
    imageUrl: "https://images.unsplash.com/photo-1564144006388-615432892b3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Golden Jackpot",
    type: "Number Game",
    slug: "golden-jackpot",
    status: "open" as const,
    timeRemaining: "Closes in 4h 45m",
    imageUrl: "https://images.unsplash.com/photo-1533077162801-86490c593afb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

const FeaturedGames = () => {
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

    const element = document.getElementById("featured-games");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="featured-games"
      className="py-20 bg-gradient-to-b from-queen-dark to-queen-dark/95"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`mb-12 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm mb-3">
                <span className="text-sm text-queen-gold font-medium">Popular Games</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Featured Games
              </h2>
            </div>
            <Link
              to="/games/all"
              className="mt-4 md:mt-0 flex items-center text-queen-gold hover:text-queen-gold/80 transition-colors"
            >
              <span className="font-medium">View All Games</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <p className="text-queen-text-secondary max-w-2xl">
            Discover our most popular games with the highest payouts and most active players. New games are added regularly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardGame
                title={game.title}
                type={game.type}
                slug={game.slug}
                status={game.status}
                timeRemaining={game.timeRemaining}
                imageUrl={game.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;
