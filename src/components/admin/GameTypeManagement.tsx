
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGame } from "@/contexts/GameContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const GameTypeManagement = () => {
  const { gameTypes, createGameType } = useGame();
  const [newGameType, setNewGameType] = useState({
    name: "",
    description: "",
    rules: [""],
    odds: 0,
    minBet: 10,
    maxBet: 10000
  });

  const addRule = () => {
    setNewGameType({
      ...newGameType,
      rules: [...newGameType.rules, ""]
    });
  };

  const removeRule = (index: number) => {
    setNewGameType({
      ...newGameType,
      rules: newGameType.rules.filter((_, i) => i !== index)
    });
  };

  const updateRule = (index: number, value: string) => {
    const updatedRules = [...newGameType.rules];
    updatedRules[index] = value;
    setNewGameType({
      ...newGameType,
      rules: updatedRules
    });
  };

  const handleCreateGameType = async () => {
    // Validate and filter out empty rules
    const filteredRules = newGameType.rules.filter(rule => rule.trim() !== "");
    
    const gameTypeToCreate = {
      ...newGameType,
      rules: filteredRules,
      // Ensure odds is a number
      odds: typeof newGameType.odds === 'number' ? newGameType.odds : parseFloat(newGameType.odds as unknown as string)
    };
    
    const success = await createGameType(gameTypeToCreate);
    
    if (success) {
      // Reset form
      setNewGameType({
        name: "",
        description: "",
        rules: [""],
        odds: 0,
        minBet: 10,
        maxBet: 10000
      });
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 text-white mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Game Type Management</CardTitle>
          <CardDescription className="text-white/70">Create and manage game types</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Game Type
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-queen-dark border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Create New Game Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Game Type Name*</label>
                <Input 
                  value={newGameType.name}
                  onChange={(e) => setNewGameType({...newGameType, name: e.target.value})}
                  placeholder="e.g. Jodi, Cross, etc."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Description*</label>
                <Input
                  value={newGameType.description}
                  onChange={(e) => setNewGameType({...newGameType, description: e.target.value})}
                  placeholder="Short description of the game type"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Odds*</label>
                  <Input
                    type="number"
                    value={newGameType.odds}
                    onChange={(e) => setNewGameType({...newGameType, odds: parseFloat(e.target.value)})}
                    placeholder="e.g. 9.5"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Min Bet</label>
                  <Input
                    type="number"
                    value={newGameType.minBet}
                    onChange={(e) => setNewGameType({...newGameType, minBet: parseInt(e.target.value)})}
                    placeholder="e.g. 10"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Max Bet</label>
                  <Input
                    type="number"
                    value={newGameType.maxBet}
                    onChange={(e) => setNewGameType({...newGameType, maxBet: parseInt(e.target.value)})}
                    placeholder="e.g. 10000"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Rules*</label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addRule}
                    className="h-8 text-xs border-white/10 text-white hover:bg-white/10"
                  >
                    Add Rule
                  </Button>
                </div>
                {newGameType.rules.map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={rule}
                      onChange={(e) => updateRule(index, e.target.value)}
                      placeholder={`Rule ${index + 1}`}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    {newGameType.rules.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeRule(index)}
                        className="h-8 w-8 p-0 text-queen-error hover:text-queen-error hover:bg-queen-error/10"
                      >
                        &times;
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleCreateGameType}
                className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90 mt-2"
              >
                Create Game Type
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white/70">Game Type</TableHead>
              <TableHead className="text-white/70">Description</TableHead>
              <TableHead className="text-white/70">Odds</TableHead>
              <TableHead className="text-white/70">Bet Range</TableHead>
              <TableHead className="text-white/70">Rules</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gameTypes.map((gameType) => (
              <TableRow key={gameType.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium text-white">{gameType.name}</TableCell>
                <TableCell className="text-white/70">{gameType.description}</TableCell>
                <TableCell className="text-white/70">{gameType.odds}x</TableCell>
                <TableCell className="text-white/70">₹{gameType.minBet || 10} - ₹{gameType.maxBet || 10000}</TableCell>
                <TableCell className="text-white/70">
                  <span className="inline-block cursor-pointer text-queen-gold hover:underline">
                    {gameType.rules.length} rules
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GameTypeManagement;
