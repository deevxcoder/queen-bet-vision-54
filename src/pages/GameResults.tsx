
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";

// Mock game results data
const gameResultsData = [
  {
    id: "result1",
    gameId: "game1",
    gameName: "Mumbai Matka",
    date: new Date(Date.now() - 86400000), // Yesterday
    numbers: ["3", "8", "5"],
    winningNumber: "385",
    status: "completed",
  },
  {
    id: "result2",
    gameId: "game2",
    gameName: "Delhi King",
    date: new Date(Date.now() - 172800000), // 2 days ago
    numbers: ["7", "2", "9"],
    winningNumber: "729",
    status: "completed",
  },
  {
    id: "result3",
    gameId: "game3",
    gameName: "Kalyan Special",
    date: new Date(Date.now() - 259200000), // 3 days ago
    numbers: ["4", "1", "6"],
    winningNumber: "416",
    status: "completed",
  },
  {
    id: "result4",
    gameId: "game4",
    gameName: "IPL T20 Toss",
    date: new Date(Date.now() - 345600000), // 4 days ago
    numbers: ["9", "5", "2"],
    winningNumber: "952",
    status: "completed",
  },
  {
    id: "result5",
    gameId: "game5",
    gameName: "Friday Bonanza",
    date: new Date(Date.now() - 432000000), // 5 days ago
    numbers: ["6", "3", "7"],
    winningNumber: "637",
    status: "completed",
  },
  {
    id: "result6",
    gameId: "game1",
    gameName: "Mumbai Matka",
    date: new Date(Date.now() - 518400000), // 6 days ago
    numbers: ["2", "7", "4"],
    winningNumber: "274",
    status: "completed",
  },
  {
    id: "result7",
    gameId: "game2",
    gameName: "Delhi King",
    date: new Date(Date.now() - 604800000), // 7 days ago
    numbers: ["8", "4", "1"],
    winningNumber: "841",
    status: "completed",
  },
  {
    id: "result8",
    gameId: "game3",
    gameName: "Kalyan Special",
    date: new Date(Date.now() - 691200000), // 8 days ago
    numbers: ["5", "9", "3"],
    winningNumber: "593",
    status: "completed",
  },
];

type SortField = "date" | "gameName";
type SortDirection = "asc" | "desc";

const GameResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const sortedResults = [...gameResultsData]
    .filter(result => 
      result.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.winningNumber.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc" 
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      } else if (sortField === "gameName") {
        return sortDirection === "asc"
          ? a.gameName.localeCompare(b.gameName)
          : b.gameName.localeCompare(a.gameName);
      }
      return 0;
    });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Game Results</h1>
            <p className="text-queen-text-secondary">Check recent game results and winning numbers</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Link to="/" className="text-queen-text-secondary hover:text-white transition-colors">
              Home
            </Link>
            <ArrowRight className="h-4 w-4 text-queen-text-secondary" />
            <span className="text-white">Results</span>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 text-white mb-8">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription className="text-white/70">Find results by game name or winning number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
              <Input 
                type="text" 
                placeholder="Search by game name or winning number..." 
                className="pl-10 bg-white/5 border-white/10 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Results History</CardTitle>
            <CardDescription className="text-white/70">
              {sortedResults.length} {sortedResults.length === 1 ? 'result' : 'results'} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead 
                    className="text-white/70 cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Date</span>
                      {getSortIcon("date")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-white/70 cursor-pointer"
                    onClick={() => handleSort("gameName")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Game</span>
                      {getSortIcon("gameName")}
                    </div>
                  </TableHead>
                  <TableHead className="text-white/70">Winning Numbers</TableHead>
                  <TableHead className="text-white/70">Result</TableHead>
                  <TableHead className="text-white/70 text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedResults.length === 0 ? (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={5} className="text-center py-8 text-queen-text-secondary">
                      No results found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedResults.map((result) => (
                    <TableRow key={result.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">
                        {format(result.date, "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-white">
                        {result.gameName}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {result.numbers.map((num, idx) => (
                            <div 
                              key={idx} 
                              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-queen-gold font-semibold"
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-queen-gold/10 text-queen-gold px-3 py-1 rounded-full inline-block font-semibold">
                          {result.winningNumber}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          asChild
                          variant="outline" 
                          size="sm" 
                          className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                        >
                          <Link to={`/games/${encodeURIComponent(result.gameId)}`}>
                            View Game
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameResults;
