
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGame } from "@/contexts/GameContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { GameStatus } from "@/types/gameTypes";
import { Check, Plus, X } from "lucide-react";

const MarketManagement = () => {
  const { markets, gameTypes, updateMarketStatus, declareResult, createMarket } = useGame();
  const { toast } = useToast();
  const [newMarket, setNewMarket] = useState({
    name: "",
    slug: "",
    status: "upcoming" as GameStatus,
    description: "",
    imageUrl: "",
    timeRemaining: "",
    nextDraw: ""
  });
  const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>([]);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [currentMarketId, setCurrentMarketId] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  const handleStatusChange = async (marketId: string, newStatus: GameStatus) => {
    const success = await updateMarketStatus(marketId, newStatus);
    if (success) {
      toast({
        title: "Status Updated",
        description: `Market status has been updated to ${newStatus}`,
      });
    }
  };

  const handleDeclareResult = async () => {
    if (!currentMarketId) return;
    
    const success = await declareResult(currentMarketId, results);
    if (success) {
      setResultDialogOpen(false);
      setCurrentMarketId(null);
      setResults({});
    }
  };

  const openResultDialog = (marketId: string) => {
    const market = markets.find(m => m.id === marketId);
    if (!market) return;
    
    // Initialize results object with empty strings for each game
    const initialResults: Record<string, string> = {};
    market.games.forEach(game => {
      initialResults[game.gameTypeId] = "";
    });
    
    setResults(initialResults);
    setCurrentMarketId(marketId);
    setResultDialogOpen(true);
  };

  const handleCreateMarket = async () => {
    if (!newMarket.name || !newMarket.slug || selectedGameTypes.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one game type.",
        variant: "destructive"
      });
      return;
    }

    const success = await createMarket(newMarket, selectedGameTypes);
    if (success) {
      // Reset form
      setNewMarket({
        name: "",
        slug: "",
        status: "upcoming",
        description: "",
        imageUrl: "",
        timeRemaining: "",
        nextDraw: ""
      });
      setSelectedGameTypes([]);
    }
  };

  const handleCheckGameType = (gameTypeId: string) => {
    setSelectedGameTypes(prev => 
      prev.includes(gameTypeId)
        ? prev.filter(id => id !== gameTypeId)
        : [...prev, gameTypeId]
    );
  };

  return (
    <>
      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Market Management</CardTitle>
            <CardDescription className="text-white/70">Manage your markets and games</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Market
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-queen-dark border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Create New Market</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Market Name*</label>
                    <Input 
                      value={newMarket.name}
                      onChange={(e) => setNewMarket({...newMarket, name: e.target.value})}
                      placeholder="e.g. Mumbai Matka"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Slug*</label>
                    <Input 
                      value={newMarket.slug}
                      onChange={(e) => setNewMarket({...newMarket, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                      placeholder="e.g. mumbai-matka"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Input
                    value={newMarket.description}
                    onChange={(e) => setNewMarket({...newMarket, description: e.target.value})}
                    placeholder="Market description"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Image URL</label>
                    <Input
                      value={newMarket.imageUrl}
                      onChange={(e) => setNewMarket({...newMarket, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Status</label>
                    <select
                      value={newMarket.status}
                      onChange={(e) => setNewMarket({...newMarket, status: e.target.value as GameStatus})}
                      className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Time Remaining</label>
                    <Input
                      value={newMarket.timeRemaining}
                      onChange={(e) => setNewMarket({...newMarket, timeRemaining: e.target.value})}
                      placeholder="e.g. Closes in 2h 30m"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Next Draw</label>
                    <Input
                      value={newMarket.nextDraw}
                      onChange={(e) => setNewMarket({...newMarket, nextDraw: e.target.value})}
                      placeholder="e.g. Today at 6:00 PM"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Select Game Types*</label>
                  <div className="grid grid-cols-2 gap-2">
                    {gameTypes.map(gameType => (
                      <div key={gameType.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={gameType.id} 
                          checked={selectedGameTypes.includes(gameType.id)}
                          onCheckedChange={() => handleCheckGameType(gameType.id)}
                        />
                        <label htmlFor={gameType.id} className="text-sm">{gameType.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleCreateMarket}
                  className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90 mt-2"
                >
                  Create Market
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white/70">Market</TableHead>
                <TableHead className="text-white/70">Games</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Next Draw</TableHead>
                <TableHead className="text-white/70">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {markets.map((market) => (
                <TableRow key={market.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{market.name}</TableCell>
                  <TableCell className="text-white/70">{market.games.length} game(s)</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                      ${market.status === 'open' ? 'bg-queen-success/20 text-queen-success' :
                        market.status === 'upcoming' ? 'bg-queen-warning/20 text-queen-warning' : 
                        'bg-queen-error/20 text-queen-error'}`}>
                      {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/70">{market.nextDraw || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {market.status === "upcoming" && (
                        <Button 
                          variant="ghost"
                          className="text-queen-success hover:text-queen-success hover:bg-queen-success/10"
                          onClick={() => handleStatusChange(market.id, "open")}
                        >
                          Open
                        </Button>
                      )}
                      {market.status === "open" && (
                        <>
                          <Button 
                            variant="ghost"
                            className="text-queen-error hover:text-queen-error hover:bg-queen-error/10"
                            onClick={() => handleStatusChange(market.id, "closed")}
                          >
                            Close
                          </Button>
                          <Button 
                            variant="ghost"
                            className="text-queen-warning hover:text-queen-warning hover:bg-queen-warning/10"
                            onClick={() => openResultDialog(market.id)}
                          >
                            Declare Result
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={resultDialogOpen} onOpenChange={setResultDialogOpen}>
        <DialogContent className="bg-queen-dark border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Declare Results</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {currentMarketId && (
              <div className="space-y-4">
                {markets
                  .find(m => m.id === currentMarketId)
                  ?.games.map(game => (
                    <div key={game.id} className="grid gap-2">
                      <label className="text-sm font-medium">
                        {game.gameType.name} Result
                      </label>
                      <Input
                        value={results[game.gameTypeId] || ""}
                        onChange={(e) => setResults({...results, [game.gameTypeId]: e.target.value})}
                        placeholder={game.gameType.name === "Jodi" ? "e.g. 45" : game.gameType.name === "Odd-Even" ? "Odd or Even" : "e.g. 7"}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  ))}
                
                <Button 
                  onClick={handleDeclareResult}
                  className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90 w-full mt-2"
                >
                  Submit Results
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketManagement;
