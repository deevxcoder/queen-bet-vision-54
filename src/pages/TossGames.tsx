
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import TossGameListing from "@/components/game/TossGameListing";

const TossGames = () => {
  const { tossGames } = useGame();
  
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Toss Games</h1>
          <p className="text-queen-text-secondary">Predict which team will win the toss and earn rewards</p>
        </div>
        
        <TossGameListing tossGames={tossGames} />
      </div>
    </div>
  );
};

export default TossGames;
