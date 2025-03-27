
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardMarket from "@/components/ui/CardMarket";
import { useGame } from "@/contexts/GameContext";
import { GameStatus } from "@/types/gameTypes";

const Markets = () => {
  const { markets } = useGame();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "all">("all");
  
  // Filter markets based on search term and status
  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || market.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-queen-text-secondary hover:text-white transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Number Game Markets</h1>
          <p className="text-queen-text-secondary">Browse and participate in various number games and markets</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-queen-text-secondary" />
              <Input 
                placeholder="Search markets..." 
                className="pl-10 bg-white/5 border-white/10 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button 
              variant="outline" 
              className="w-full border-white/10 text-white hover:bg-white/10 hover:text-white flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Markets
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setStatusFilter(value as GameStatus | "all")}>
          <TabsList className="bg-white/5 border border-white/10 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
              All Markets
            </TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
              Open
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="closed" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
              Closed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market) => (
                <CardMarket
                  key={market.id}
                  title={market.name}
                  type={`${market.games.length} Game${market.games.length !== 1 ? 's' : ''}`}
                  slug={market.slug}
                  status={market.status}
                  timeRemaining={market.timeRemaining}
                  imageUrl={market.imageUrl}
                  gameCount={market.games.length}
                />
              ))}
              
              {filteredMarkets.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-queen-text-secondary text-lg">No markets found.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="open" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.length > 0 ? 
                filteredMarkets.map((market) => (
                  <CardMarket
                    key={market.id}
                    title={market.name}
                    type={`${market.games.length} Game${market.games.length !== 1 ? 's' : ''}`}
                    slug={market.slug}
                    status={market.status}
                    timeRemaining={market.timeRemaining}
                    imageUrl={market.imageUrl}
                    gameCount={market.games.length}
                  />
                )) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-queen-text-secondary text-lg">No open markets found.</p>
                  </div>
                )
              }
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.length > 0 ? 
                filteredMarkets.map((market) => (
                  <CardMarket
                    key={market.id}
                    title={market.name}
                    type={`${market.games.length} Game${market.games.length !== 1 ? 's' : ''}`}
                    slug={market.slug}
                    status={market.status}
                    timeRemaining={market.timeRemaining}
                    imageUrl={market.imageUrl}
                    gameCount={market.games.length}
                  />
                )) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-queen-text-secondary text-lg">No upcoming markets found.</p>
                  </div>
                )
              }
            </div>
          </TabsContent>
          
          <TabsContent value="closed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.length > 0 ? 
                filteredMarkets.map((market) => (
                  <CardMarket
                    key={market.id}
                    title={market.name}
                    type={`${market.games.length} Game${market.games.length !== 1 ? 's' : ''}`}
                    slug={market.slug}
                    status={market.status}
                    timeRemaining={market.timeRemaining}
                    imageUrl={market.imageUrl}
                    gameCount={market.games.length}
                  />
                )) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-queen-text-secondary text-lg">No closed markets found.</p>
                  </div>
                )
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Markets;
