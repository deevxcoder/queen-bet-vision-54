import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardTossGame from "@/components/ui/CardTossGame";
import { TossGame, GameStatus } from "@/types/gameTypes";

interface TossGameListingProps {
  tossGames: TossGame[];
}

const TossGameListing: React.FC<TossGameListingProps> = ({ tossGames }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "all">("all");
  
  // Filter games based on search term and status
  const filteredGames = tossGames.filter(game => {
    const matchesSearch = 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.teamA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.teamB.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || game.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mb-12">
      <div className="mb-8">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-queen-text-secondary" />
          <Input 
            placeholder="Search games..." 
            className="pl-10 bg-white/5 border-white/10 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setStatusFilter(value as GameStatus | "all")}>
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
            All Games
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
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <CardTossGame key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-queen-text-secondary text-lg">No toss games found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Repeat similar content for other tabs */}
        <TabsContent value="open" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <CardTossGame key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-queen-text-secondary text-lg">No open toss games found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <CardTossGame key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-queen-text-secondary text-lg">No upcoming toss games found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="closed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <CardTossGame key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-queen-text-secondary text-lg">No closed toss games found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TossGameListing;
