
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Info, Activity, LayoutGrid, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGame } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import GamePlayComponent from "@/components/game/GamePlayComponent";

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getMarketBySlug, markets } = useGame();
  const { user } = useAuth();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  
  // Get the market from the slug
  const market = getMarketBySlug(slug || "");
  
  if (!market) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Market Not Found</h2>
          <p className="text-queen-text-secondary mb-6">The market you're looking for does not exist or has been removed.</p>
          <Link to="/games">
            <Button className="bg-queen-gold hover:bg-queen-gold/90 text-queen-dark">
              Back to Markets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find related markets (excluding current market)
  const relatedMarkets = markets
    .filter(m => m.id !== market.id)
    .slice(0, 3);

  // Get available game types for this market
  const availableGames = market.games;

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/games" className="text-queen-text-secondary hover:text-white transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Markets
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Info Column */}
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${market.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-queen-dark via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white mr-3">
                    {market.games.length} Games
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    market.status === 'open' ? 'bg-queen-success text-white' :
                    market.status === 'upcoming' ? 'bg-queen-warning text-white' : 
                    'bg-queen-error text-white'
                  }`}>
                    {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{market.name}</h1>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-4 flex items-center">
                  <Clock className="h-8 w-8 mr-3 text-queen-gold" />
                  <div>
                    <p className="text-sm text-queen-text-secondary">Time Remaining</p>
                    <p className="text-lg font-semibold">{market.timeRemaining || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-4 flex items-center">
                  <Activity className="h-8 w-8 mr-3 text-queen-gold" />
                  <div>
                    <p className="text-sm text-queen-text-secondary">Next Draw</p>
                    <p className="text-lg font-semibold">{market.nextDraw || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Game Selection */}
            <Card className="bg-white/5 border-white/10 text-white p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Available Games</h3>
              <p className="text-queen-text-secondary mb-6">
                {market.description || "Select a game type to place your bet."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableGames.map((game) => (
                  <Button
                    key={game.id}
                    className={`h-auto py-4 border ${
                      selectedGameId === game.id 
                        ? "bg-queen-gold text-queen-dark border-queen-gold" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                    disabled={market.status !== "open"}
                    onClick={() => setSelectedGameId(game.id)}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <LayoutGrid className="h-6 w-6 mb-2" />
                      <span className="font-semibold">{game.gameType.name}</span>
                      <span className="text-xs mt-1">{game.status}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
            
            {/* Game Play or Results */}
            {selectedGameId ? (
              <GamePlayComponent 
                marketId={market.id}
                game={availableGames.find(g => g.id === selectedGameId)!}
                market={market}
              />
            ) : (
              <Tabs defaultValue="rules" className="mb-8">
                <TabsList className="bg-white/5 border border-white/10 mb-6">
                  <TabsTrigger value="rules" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Rules</TabsTrigger>
                  <TabsTrigger value="results" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="rules">
                  <Card className="bg-white/5 border-white/10 text-white p-6">
                    <div className="flex items-start mb-4">
                      <Info className="h-5 w-5 text-queen-gold mr-2 mt-1" />
                      <h3 className="text-xl font-bold">Market Rules</h3>
                    </div>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3 mt-0.5">
                          1
                        </div>
                        <p className="text-queen-text-secondary">Choose from the available game types in this market.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3 mt-0.5">
                          2
                        </div>
                        <p className="text-queen-text-secondary">Follow the specific rules for each game type when placing bets.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3 mt-0.5">
                          3
                        </div>
                        <p className="text-queen-text-secondary">Place your bet before the market closes.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3 mt-0.5">
                          4
                        </div>
                        <p className="text-queen-text-secondary">Results will be declared after the draw time.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3 mt-0.5">
                          5
                        </div>
                        <p className="text-queen-text-secondary">Winnings will be automatically credited to your account.</p>
                      </li>
                    </ul>
                  </Card>
                </TabsContent>
                
                <TabsContent value="results">
                  <Card className="bg-white/5 border-white/10 text-white p-6">
                    <h3 className="text-xl font-bold mb-4">Previous Results</h3>
                    
                    {market.previousResults && market.previousResults.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-white/70">Date</TableHead>
                            <TableHead className="text-white/70">Game</TableHead>
                            <TableHead className="text-white/70">Result</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {market.previousResults.flatMap((result) => 
                            Object.entries(result.results).map(([gameTypeId, gameResult], idx) => {
                              const gameType = availableGames.find(g => g.gameTypeId === gameTypeId)?.gameType;
                              return (
                                <TableRow key={`${result.id}-${idx}`} className="border-white/10 hover:bg-white/5">
                                  <TableCell className="text-queen-text-secondary">{result.date}</TableCell>
                                  <TableCell className="text-queen-text-secondary">{gameType?.name || "Unknown"}</TableCell>
                                  <TableCell>
                                    <div className="font-bold text-white">{gameResult}</div>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-queen-text-secondary">No previous results available.</p>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
          
          {/* Sidebar Column */}
          <div>
            <div className="sticky top-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
                <p className="text-queen-text-secondary mb-4">
                  If you need any assistance with this market or have questions about how to play, our support team is here to help.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-queen-gold text-queen-gold hover:bg-queen-gold/10"
                >
                  Contact Support
                </Button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Similar Markets</h3>
                  <Button variant="link" className="text-queen-gold p-0 h-auto">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {relatedMarkets.map((relatedMarket) => (
                    <Link to={`/games/${relatedMarket.slug}`} key={relatedMarket.id} className="block group">
                      <div className="flex items-center bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                        <div className="h-16 w-16 relative overflow-hidden">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" 
                            style={{ backgroundImage: `url(${relatedMarket.imageUrl})` }}
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-white group-hover:text-queen-gold transition-colors">{relatedMarket.name}</p>
                          <div className="flex items-center text-xs text-queen-text-secondary mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {relatedMarket.timeRemaining || "Coming soon"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
