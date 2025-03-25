
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Info, Activity, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import CardGame from "@/components/ui/CardGame";

// Mock data for the game
const mockGame = {
  id: 1,
  title: "Mumbai Matka",
  type: "Number Game",
  slug: "mumbai-matka",
  status: "open" as const,
  timeRemaining: "Closes in 2h 30m",
  nextDraw: "Today at 6:00 PM",
  description: "Mumbai Matka is one of the most popular number games. Pick your lucky numbers and win big with high odds!",
  imageUrl: "https://images.unsplash.com/photo-1596838132731-3bdb4df691d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  rules: [
    "Pick numbers between 0-9",
    "Place your bet before the countdown ends",
    "Minimum bet amount is ₹10",
    "Maximum bet amount is ₹10,000",
    "Results will be announced after the draw time"
  ],
  previousResults: [
    { date: "May 5, 2023", result: "4-8-7" },
    { date: "May 4, 2023", result: "2-6-3" },
    { date: "May 3, 2023", result: "9-0-1" },
    { date: "May 2, 2023", result: "5-7-2" },
    { date: "May 1, 2023", result: "8-1-6" }
  ]
};

// Mock data for related games
const relatedGames = [
  {
    id: 2,
    title: "Delhi King",
    type: "Jodi Game",
    slug: "delhi-king",
    status: "open" as const,
    timeRemaining: "Closes in 1h 15m",
    imageUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Golden Jackpot",
    type: "Number Game",
    slug: "golden-jackpot",
    status: "open" as const,
    timeRemaining: "Closes in 4h 45m",
    imageUrl: "https://images.unsplash.com/photo-1533077162801-86490c593afb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    title: "Rajdhani Day",
    type: "Number Game",
    slug: "rajdhani-day",
    status: "open" as const,
    timeRemaining: "Closes in 3h 15m",
    imageUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  }
];

const GameDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<string>("100");
  
  // In a real app, you'd fetch the game data based on the slug
  const game = mockGame;
  
  const toggleNumberSelection = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };
  
  const placeBet = () => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one number",
        variant: "destructive"
      });
      return;
    }
    
    if (!betAmount || parseInt(betAmount) < 10) {
      toast({
        title: "Invalid bet amount",
        description: "Minimum bet amount is ₹10",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Bet placed successfully!",
      description: `Placed ₹${betAmount} on numbers ${selectedNumbers.join(", ")}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/games" className="text-queen-text-secondary hover:text-white transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Games
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Info Column */}
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${game.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-queen-dark via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white mr-3">
                    {game.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    game.status === 'open' ? 'bg-queen-success text-white' :
                    game.status === 'upcoming' ? 'bg-queen-warning text-white' : 
                    'bg-queen-error text-white'
                  }`}>
                    {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{game.title}</h1>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-4 flex items-center">
                  <Clock className="h-8 w-8 mr-3 text-queen-gold" />
                  <div>
                    <p className="text-sm text-queen-text-secondary">Time Remaining</p>
                    <p className="text-lg font-semibold">{game.timeRemaining}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-4 flex items-center">
                  <Activity className="h-8 w-8 mr-3 text-queen-gold" />
                  <div>
                    <p className="text-sm text-queen-text-secondary">Next Draw</p>
                    <p className="text-lg font-semibold">{game.nextDraw}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="play" className="mb-8">
              <TabsList className="bg-white/5 border border-white/10 mb-6">
                <TabsTrigger value="play" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Play Now</TabsTrigger>
                <TabsTrigger value="rules" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Rules</TabsTrigger>
                <TabsTrigger value="results" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="play">
                <Card className="bg-white/5 border-white/10 text-white p-6">
                  <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
                  <p className="text-queen-text-secondary mb-6">{game.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-md font-semibold mb-3">Select Numbers</h4>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {Array.from({ length: 10 }, (_, i) => (
                        <button
                          key={i}
                          className={`h-12 w-full rounded-md font-bold transition-colors ${
                            selectedNumbers.includes(i)
                              ? 'bg-queen-gold text-queen-dark'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                          onClick={() => toggleNumberSelection(i)}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-md font-semibold mb-3">Bet Amount</h4>
                    <div className="flex space-x-3">
                      <Input 
                        type="number" 
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        min="10"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <div className="flex space-x-2">
                        {[100, 500, 1000].map(amount => (
                          <Button
                            key={amount}
                            variant="outline" 
                            className={`border-white/10 ${
                              betAmount === amount.toString() 
                                ? 'bg-queen-gold text-queen-dark border-queen-gold' 
                                : 'text-white hover:bg-white/10'
                            }`}
                            onClick={() => setBetAmount(amount.toString())}
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-6">
                    <div>
                      <p className="text-queen-text-secondary">Potential Winning</p>
                      <p className="text-xl font-bold">₹{selectedNumbers.length > 0 ? (parseInt(betAmount || "0") * 9.5 * selectedNumbers.length).toFixed(2) : 0}</p>
                    </div>
                    <div>
                      <p className="text-queen-text-secondary">Odds</p>
                      <p className="text-xl font-bold">9.5x</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-queen-gold hover:bg-queen-gold/90 text-queen-dark font-bold"
                    onClick={placeBet}
                  >
                    Place Bet
                  </Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="rules">
                <Card className="bg-white/5 border-white/10 text-white p-6">
                  <div className="flex items-start mb-4">
                    <Info className="h-5 w-5 text-queen-gold mr-2 mt-1" />
                    <h3 className="text-xl font-bold">Game Rules</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {game.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-queen-text-secondary">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                <Card className="bg-white/5 border-white/10 text-white p-6">
                  <h3 className="text-xl font-bold mb-4">Previous Results</h3>
                  
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/70">Date</TableHead>
                        <TableHead className="text-white/70">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {game.previousResults.map((result, index) => (
                        <TableRow key={index} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-queen-text-secondary">{result.date}</TableCell>
                          <TableCell>
                            <div className="font-bold text-white">{result.result}</div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar Column */}
          <div>
            <div className="sticky top-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
                <p className="text-queen-text-secondary mb-4">
                  If you need any assistance with this game or have questions about how to play, our support team is here to help.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-queen-gold text-queen-gold hover:bg-queen-gold/10"
                  onClick={() => toast({
                    title: "Support",
                    description: "Our support team will contact you soon.",
                  })}
                >
                  Contact Support
                </Button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Similar Games</h3>
                  <Button variant="link" className="text-queen-gold p-0 h-auto">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {relatedGames.map((game) => (
                    <Link to={`/games/${game.slug}`} key={game.id} className="block group">
                      <div className="flex items-center bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                        <div className="h-16 w-16 relative overflow-hidden">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" 
                            style={{ backgroundImage: `url(${game.imageUrl})` }}
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-white group-hover:text-queen-gold transition-colors">{game.title}</p>
                          <div className="flex items-center text-xs text-queen-text-secondary mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {game.timeRemaining}
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
