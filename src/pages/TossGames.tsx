
import React from "react";
import { useGame } from "@/contexts/GameContext";
import TossGameListing from "@/components/game/TossGameListing";
import DashboardLayout from "@/components/layout/DashboardLayout";

const TossGames = () => {
  const { tossGames } = useGame();
  
  return (
    <DashboardLayout
      pageTitle="Toss Games"
      pageDescription="Predict which team will win the toss and earn rewards"
    >
      <TossGameListing tossGames={tossGames} />
    </DashboardLayout>
  );
};

export default TossGames;
