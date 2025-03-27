
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useGame } from "@/contexts/GameContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const GameListing = () => {
  const { markets } = useGame();
  
  return (
    <DashboardLayout
      pageTitle="Number Games"
      pageDescription="Play various number games and win rewards"
    >
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-queen-text-secondary h-5 w-5" />
          <Input 
            placeholder="Search games..." 
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">All Games</Button>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">Popular</Button>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">New</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="overflow-hidden bg-white/5 border-white/10 transition-all duration-300 hover:border-queen-gold/30">
            <div className="relative h-48 bg-gradient-to-b from-purple-900/50 to-queen-dark">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-white/10">{index + 1}</div>
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 bg-queen-gold/90 text-queen-dark text-xs font-bold rounded-lg">
                {index % 3 === 0 ? "High Odds" : index % 3 === 1 ? "Popular" : "New"}
              </div>
            </div>
            
            <CardContent className="p-5">
              <h3 className="text-xl font-bold mb-2">Number Game #{index + 1001}</h3>
              <p className="text-queen-text-secondary text-sm mb-4">
                {index % 3 === 0 
                  ? "Predict the correct number and win big rewards." 
                  : index % 3 === 1 
                  ? "Choose the winning digits in this exciting number game." 
                  : "Test your luck with this thrilling number prediction game."}
              </p>
              
              <div className="flex justify-between items-center text-sm mb-4">
                <div className="text-queen-text-secondary">Min Bet: <span className="text-white">₹50</span></div>
                <div className="text-queen-text-secondary">Max Win: <span className="text-queen-gold">₹{(index + 1) * 1000}</span></div>
              </div>
              
              <Link to={`/games/${1001 + index}`}>
                <Button className="w-full bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                  Play Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default GameListing;
