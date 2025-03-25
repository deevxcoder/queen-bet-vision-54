
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardGame from "@/components/ui/CardGame";

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
  {
    id: 7,
    title: "Rajdhani Day",
    type: "Number Game",
    slug: "rajdhani-day",
    status: "open" as const,
    timeRemaining: "Closes in 3h 15m",
    imageUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    title: "Supreme Night",
    type: "Jodi Game",
    slug: "supreme-night",
    status: "upcoming" as const,
    timeRemaining: "Opens in 5h",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3bdb4df691d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 9,
    title: "Bollywood Bets",
    type: "Option Game",
    slug: "bollywood-bets",
    status: "open" as const,
    timeRemaining: "Closes in 1h",
    imageUrl: "https://images.unsplash.com/photo-1533077162801-86490c593afb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

const GameListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "open") return matchesSearch && game.status === "open";
    if (activeTab === "upcoming") return matchesSearch && game.status === "upcoming";
    if (activeTab === "closed") return matchesSearch && game.status === "closed";
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">All Games</h1>
            <p className="text-queen-text-secondary">Discover and play our wide range of games</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Link to="/" className="text-queen-text-secondary hover:text-white transition-colors">
              Home
            </Link>
            <ArrowRight className="h-4 w-4 text-queen-text-secondary" />
            <span className="text-white">Games</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
            <Input 
              type="text" 
              placeholder="Search games..." 
              className="pl-10 bg-white/5 border-white/10 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">All Games</TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Open</TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Upcoming</TabsTrigger>
            <TabsTrigger value="closed" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Closed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <CardGame
                  key={game.id}
                  title={game.title}
                  type={game.type}
                  slug={game.slug}
                  status={game.status}
                  timeRemaining={game.timeRemaining}
                  imageUrl={game.imageUrl}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-10">
                <p className="text-queen-text-secondary">No games found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="open" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <CardGame
                  key={game.id}
                  title={game.title}
                  type={game.type}
                  slug={game.slug}
                  status={game.status}
                  timeRemaining={game.timeRemaining}
                  imageUrl={game.imageUrl}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-10">
                <p className="text-queen-text-secondary">No open games found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <CardGame
                  key={game.id}
                  title={game.title}
                  type={game.type}
                  slug={game.slug}
                  status={game.status}
                  timeRemaining={game.timeRemaining}
                  imageUrl={game.imageUrl}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-10">
                <p className="text-queen-text-secondary">No upcoming games found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="closed" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <CardGame
                  key={game.id}
                  title={game.title}
                  type={game.type}
                  slug={game.slug}
                  status={game.status}
                  timeRemaining={game.timeRemaining}
                  imageUrl={game.imageUrl}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-10">
                <p className="text-queen-text-secondary">No closed games found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameListing;
