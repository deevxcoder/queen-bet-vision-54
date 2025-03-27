
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useGame } from "@/contexts/GameContext";

const Results = () => {
  const { markets, tossGames, userBets } = useGame();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [gameType, setGameType] = useState<"all" | "number" | "toss">("all");
  
  // Combine results from both number games and toss games
  const allResults = [
    // Generate number game results from markets and userBets
    ...Array.from({ length: 10 }).map((_, index) => ({
      id: `num_${index}`,
      gameName: `Number Game #${1000 + index}`,
      date: new Date(Date.now() - index * 86400000),
      betAmount: (Math.floor(Math.random() * 10) + 1) * 100,
      prediction: `Number ${Math.floor(Math.random() * 100)}`,
      result: `Number ${Math.floor(Math.random() * 100)}`,
      status: index % 3 === 0 ? 'Won' : index % 3 === 1 ? 'Lost' : 'Draw',
      payout: index % 3 === 0 
        ? (Math.floor(Math.random() * 10) + 1) * 200
        : index % 3 === 1 
        ? -(Math.floor(Math.random() * 10) + 1) * 100
        : 0,
      type: "number"
    })),
    // Generate toss game results 
    ...Array.from({ length: 8 }).map((_, index) => ({
      id: `toss_${index}`,
      gameName: `Toss Game #${2000 + index}`,
      date: new Date(Date.now() - (index + 2) * 86400000),
      betAmount: (Math.floor(Math.random() * 10) + 1) * 150,
      prediction: index % 2 === 0 ? 'Team A' : 'Team B',
      result: index % 3 === 0 ? 'Team A' : 'Team B',
      status: index % 3 === 0 ? 'Won' : index % 3 === 1 ? 'Lost' : 'Draw',
      payout: index % 3 === 0 
        ? (Math.floor(Math.random() * 10) + 1) * 250
        : index % 3 === 1 
        ? -(Math.floor(Math.random() * 10) + 1) * 150
        : 0,
      type: "toss"
    }))
  ];

  // Apply filters
  const filteredResults = allResults.filter(result => {
    // Filter by game type
    if (gameType !== "all" && result.type !== gameType) {
      return false;
    }
    
    // Filter by date if selected
    if (selectedDate) {
      const resultDate = new Date(result.date);
      return (
        resultDate.getDate() === selectedDate.getDate() &&
        resultDate.getMonth() === selectedDate.getMonth() &&
        resultDate.getFullYear() === selectedDate.getFullYear()
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-queen-dark text-white pb-12">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Game Results</h1>
          <p className="text-queen-text-secondary">View all game results and outcomes</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-queen-card/30 border border-white/10 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-medium">Game Results</h2>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "border-white/10 text-white hover:bg-white/10",
                    gameType === "all" && "bg-white/10"
                  )}
                  onClick={() => setGameType("all")}
                >
                  All Games
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "border-white/10 text-white hover:bg-white/10",
                    gameType === "number" && "bg-white/10"
                  )}
                  onClick={() => setGameType("number")}
                >
                  Number Games
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "border-white/10 text-white hover:bg-white/10",
                    gameType === "toss" && "bg-white/10"
                  )}
                  onClick={() => setGameType("toss")}
                >
                  Toss Games
                </Button>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white hover:bg-white/10 ml-auto"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-queen-card border-white/10">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                    {selectedDate && (
                      <div className="p-3 border-t border-white/10 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedDate(null)}
                          className="border-white/10 text-white hover:bg-white/10"
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-queen-text-secondary">Game Name</TableHead>
                  <TableHead className="text-queen-text-secondary">Date</TableHead>
                  <TableHead className="text-queen-text-secondary">Bet Amount</TableHead>
                  <TableHead className="text-queen-text-secondary">Prediction</TableHead>
                  <TableHead className="text-queen-text-secondary">Result</TableHead>
                  <TableHead className="text-queen-text-secondary">Status</TableHead>
                  <TableHead className="text-queen-text-secondary">Payout</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((result) => (
                  <TableRow key={result.id} className="border-white/10">
                    <TableCell className="font-medium">
                      {result.gameName}
                    </TableCell>
                    <TableCell>
                      {format(new Date(result.date), "PPP")}
                    </TableCell>
                    <TableCell>₹{result.betAmount}</TableCell>
                    <TableCell>{result.prediction}</TableCell>
                    <TableCell>{result.result}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        result.status === 'Won'
                          ? 'bg-green-500/10 text-green-500' 
                          : result.status === 'Lost'
                          ? 'bg-red-500/10 text-red-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {result.status}
                      </span>
                    </TableCell>
                    <TableCell className={
                      result.status === 'Won'
                        ? 'text-green-500' 
                        : result.status === 'Lost'
                        ? 'text-red-500' 
                        : 'text-queen-text-secondary'
                    }>
                      {result.status === 'Won'
                        ? `+₹${result.payout}` 
                        : result.status === 'Lost'
                        ? `-₹${Math.abs(result.payout)}` 
                        : '₹0'}
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredResults.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-queen-text-secondary">
                      No results found for the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
