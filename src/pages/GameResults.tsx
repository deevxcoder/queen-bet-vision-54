
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";

const GameResults = () => {
  const { gameResults } = useGame();
  
  return (
    <DashboardLayout
      pageTitle="Game Results"
      pageDescription="View your game history and results"
    >
      <div className="bg-queen-card/30 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Game Results</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
                Number Games
              </Button>
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
                Toss Games
              </Button>
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
                All Games
              </Button>
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
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index} className="border-white/10">
                  <TableCell className="font-medium">
                    {index % 2 === 0 ? `Number Game #${1000 + index}` : `Toss Game #${2000 + index}`}
                  </TableCell>
                  <TableCell>
                    {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                  </TableCell>
                  <TableCell>₹{(Math.floor(Math.random() * 10) + 1) * 100}</TableCell>
                  <TableCell>
                    {index % 2 === 0 ? `Number ${Math.floor(Math.random() * 100)}` : index % 4 === 1 ? 'Team A' : 'Team B'}
                  </TableCell>
                  <TableCell>
                    {index % 2 === 0 ? `Number ${Math.floor(Math.random() * 100)}` : index % 4 === 1 ? 'Team A' : 'Team B'}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      index % 3 === 0 
                        ? 'bg-green-500/10 text-green-500' 
                        : index % 3 === 1 
                        ? 'bg-red-500/10 text-red-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {index % 3 === 0 ? 'Won' : index % 3 === 1 ? 'Lost' : 'Draw'}
                    </span>
                  </TableCell>
                  <TableCell className={
                    index % 3 === 0 
                      ? 'text-green-500' 
                      : index % 3 === 1 
                      ? 'text-red-500' 
                      : 'text-queen-text-secondary'
                  }>
                    {index % 3 === 0 
                      ? `+₹${(Math.floor(Math.random() * 10) + 1) * 200}` 
                      : index % 3 === 1 
                      ? `-₹${(Math.floor(Math.random() * 10) + 1) * 100}` 
                      : '₹0'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GameResults;
