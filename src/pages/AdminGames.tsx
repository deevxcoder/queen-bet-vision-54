
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import GameTypeManagement from "@/components/admin/GameTypeManagement";
import MarketManagement from "@/components/admin/MarketManagement";
import TossGameManagement from "@/components/admin/TossGameManagement";

const AdminGames = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-white mb-2">Game Management</h1>
        <p className="text-queen-text-secondary mb-8">Manage game types, markets, and toss games</p>
        
        <Tabs defaultValue="markets" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-0">
              <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none p-0">
                <TabsTrigger 
                  value="markets" 
                  className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-queen-gold data-[state=active]:border-b-2 data-[state=active]:border-queen-gold h-12"
                >
                  Markets
                </TabsTrigger>
                <TabsTrigger 
                  value="gameTypes" 
                  className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-queen-gold data-[state=active]:border-b-2 data-[state=active]:border-queen-gold h-12"
                >
                  Game Types
                </TabsTrigger>
                <TabsTrigger 
                  value="tossGames" 
                  className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-queen-gold data-[state=active]:border-b-2 data-[state=active]:border-queen-gold h-12"
                >
                  Toss Games
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          
          <TabsContent value="markets" className="mt-0">
            <MarketManagement />
          </TabsContent>
          
          <TabsContent value="gameTypes" className="mt-0">
            <GameTypeManagement />
          </TabsContent>
          
          <TabsContent value="tossGames" className="mt-0">
            <TossGameManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminGames;
