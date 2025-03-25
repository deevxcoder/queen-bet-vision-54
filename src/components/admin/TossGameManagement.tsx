
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGame } from "@/contexts/GameContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GameStatus, TossGame } from "@/types/gameTypes";
import { Plus } from "lucide-react";

const TossGameManagement = () => {
  const { tossGames, updateTossGameStatus, declareTossResult, createTossGame } = useGame();
  const { toast } = useToast();
  const [newGame, setNewGame] = useState<Omit<TossGame, "id">>({
    marketId: "toss_market",
    title: "",
    teamA: "",
    teamB: "",
    status: "upcoming" as GameStatus,
    startTime: "",
    imageUrl: ""
  });
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [winningTeam, setWinningTeam] = useState<string>("");

  const handleStatusChange = async (gameId: string, newStatus: GameStatus) => {
    const success = await updateTossGameStatus(gameId, newStatus);
    if (success) {
      toast({
        title: "Status Updated",
        description: `Game status has been updated to ${newStatus}`,
      });
    }
  };

  const handleDeclareResult = async () => {
    if (!currentGameId || !winningTeam) return;
    
    const success = await declareTossResult(currentGameId, winningTeam);
    if (success) {
      setResultDialogOpen(false);
      setCurrentGameId(null);
      setWinningTeam("");
    }
  };

  const openResultDialog = (gameId: string) => {
    const game = tossGames.find(g => g.id === gameId);
    if (!game) return;
    
    setCurrentGameId(gameId);
    setWinningTeam("");
    setResultDialogOpen(true);
  };

  const handleCreateGame = async () => {
    if (!newGame.title || !newGame.teamA || !newGame.teamB || !newGame.startTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const success = await createTossGame(newGame);
    if (success) {
      // Reset form
      setNewGame({
        marketId: "toss_market",
        title: "",
        teamA: "",
        teamB: "",
        status: "upcoming",
        startTime: "",
        imageUrl: ""
      });
    }
  };

  return (
    <>
      <Card className="bg-white/5 border-white/10 text-white mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Toss Game Management</CardTitle>
            <CardDescription className="text-white/70">Create and manage toss games</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Toss Game
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-queen-dark border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Create New Toss Game</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Game Title*</label>
                  <Input 
                    value={newGame.title}
                    onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                    placeholder="e.g. IPL 2023: RCB vs CSK"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Team A*</label>
                    <Input 
                      value={newGame.teamA}
                      onChange={(e) => setNewGame({...newGame, teamA: e.target.value})}
                      placeholder="e.g. Royal Challengers Bangalore"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Team B*</label>
                    <Input 
                      value={newGame.teamB}
                      onChange={(e) => setNewGame({...newGame, teamB: e.target.value})}
                      placeholder="e.g. Chennai Super Kings"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Start Time*</label>
                    <Input
                      value={newGame.startTime}
                      onChange={(e) => setNewGame({...newGame, startTime: e.target.value})}
                      placeholder="e.g. Today at 7:30 PM"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Status</label>
                    <select
                      value={newGame.status}
                      onChange={(e) => setNewGame({...newGame, status: e.target.value as GameStatus})}
                      className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Image URL</label>
                  <Input
                    value={newGame.imageUrl}
                    onChange={(e) => setNewGame({...newGame, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <Button 
                  onClick={handleCreateGame}
                  className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90 mt-2"
                >
                  Create Toss Game
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white/70">Game</TableHead>
                <TableHead className="text-white/70">Teams</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Start Time</TableHead>
                <TableHead className="text-white/70">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tossGames.map((game) => (
                <TableRow key={game.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{game.title}</TableCell>
                  <TableCell className="text-white/70">{game.teamA} vs {game.teamB}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                      ${game.status === 'open' ? 'bg-queen-success/20 text-queen-success' :
                        game.status === 'upcoming' ? 'bg-queen-warning/20 text-queen-warning' : 
                        'bg-queen-error/20 text-queen-error'}`}>
                      {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/70">{game.startTime}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {game.status === "upcoming" && (
                        <Button 
                          variant="ghost"
                          className="text-queen-success hover:text-queen-success hover:bg-queen-success/10"
                          onClick={() => handleStatusChange(game.id, "open")}
                        >
                          Open
                        </Button>
                      )}
                      {game.status === "open" && (
                        <>
                          <Button 
                            variant="ghost"
                            className="text-queen-error hover:text-queen-error hover:bg-queen-error/10"
                            onClick={() => handleStatusChange(game.id, "closed")}
                          >
                            Close
                          </Button>
                          <Button 
                            variant="ghost"
                            className="text-queen-warning hover:text-queen-warning hover:bg-queen-warning/10"
                            onClick={() => openResultDialog(game.id)}
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
            <DialogTitle>Declare Toss Result</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {currentGameId && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Winning Team*</label>
                  <select
                    value={winningTeam}
                    onChange={(e) => setWinningTeam(e.target.value)}
                    className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
                  >
                    <option value="" disabled>Select winning team</option>
                    {tossGames.find(g => g.id === currentGameId)?.teamA && (
                      <option value={tossGames.find(g => g.id === currentGameId)?.teamA || ""}>
                        {tossGames.find(g => g.id === currentGameId)?.teamA}
                      </option>
                    )}
                    {tossGames.find(g => g.id === currentGameId)?.teamB && (
                      <option value={tossGames.find(g => g.id === currentGameId)?.teamB || ""}>
                        {tossGames.find(g => g.id === currentGameId)?.teamB}
                      </option>
                    )}
                  </select>
                </div>
                
                <Button 
                  onClick={handleDeclareResult}
                  disabled={!winningTeam}
                  className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90 w-full mt-2"
                >
                  Submit Result
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TossGameManagement;
