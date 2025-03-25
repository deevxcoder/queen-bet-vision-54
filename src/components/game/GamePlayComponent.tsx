
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { MarketGame, Market } from "@/types/gameTypes";
import { useToast } from "@/hooks/use-toast";

interface GamePlayComponentProps {
  marketId: string;
  game: MarketGame;
  market: Market;
}

const GamePlayComponent: React.FC<GamePlayComponentProps> = ({ 
  marketId, 
  game,
  market
}) => {
  const { toast } = useToast();
  const { placeBet } = useGame();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<string>("100");

  const isJodiGame = game.gameType.name === "Jodi";
  const isOddEvenGame = game.gameType.name === "Odd-Even";

  // Function to toggle number selection
  const toggleNumberSelection = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  // Function to handle bet submission
  const handlePlaceBet = async () => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one number",
        variant: "destructive"
      });
      return;
    }
    
    if (!betAmount || parseInt(betAmount) < (game.gameType.minBet || 10)) {
      toast({
        title: "Invalid bet amount",
        description: `Minimum bet amount is ₹${game.gameType.minBet || 10}`,
        variant: "destructive"
      });
      return;
    }

    const success = await placeBet(
      marketId,
      game.gameTypeId,
      parseInt(betAmount),
      selectedNumbers
    );

    if (success) {
      // Reset selections after successful bet
      setSelectedNumbers([]);
      setBetAmount("100");
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 text-white p-6">
      <h3 className="text-xl font-bold mb-4">Play {game.gameType.name}</h3>
      <p className="text-queen-text-secondary mb-6">{game.gameType.description}</p>
      
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-3">Game Rules</h4>
        <ul className="space-y-2 mb-6">
          {game.gameType.rules.map((rule, index) => (
            <li key={index} className="text-queen-text-secondary text-sm">• {rule}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-3">Select {isOddEvenGame ? "Option" : "Numbers"}</h4>
        
        {isOddEvenGame ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              className={`h-12 w-full rounded-md font-bold transition-colors ${
                selectedNumbers.includes(0)
                  ? 'bg-queen-gold text-queen-dark'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => setSelectedNumbers([0])}
            >
              Even
            </Button>
            <Button
              className={`h-12 w-full rounded-md font-bold transition-colors ${
                selectedNumbers.includes(1)
                  ? 'bg-queen-gold text-queen-dark'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => setSelectedNumbers([1])}
            >
              Odd
            </Button>
          </div>
        ) : isJodiGame ? (
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: 100 }, (_, i) => (
              <button
                key={i}
                className={`h-12 w-full rounded-md font-bold transition-colors ${
                  selectedNumbers.includes(i)
                    ? 'bg-queen-gold text-queen-dark'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => toggleNumberSelection(i)}
              >
                {i < 10 ? `0${i}` : i}
              </button>
            ))}
          </div>
        ) : (
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
        )}
      </div>
      
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-3">Bet Amount</h4>
        <div className="flex space-x-3">
          <Input 
            type="number" 
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            min={game.gameType.minBet || 10}
            max={game.gameType.maxBet || 10000}
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
          <p className="text-xl font-bold">
            ₹{selectedNumbers.length > 0 
                ? (parseInt(betAmount || "0") * game.gameType.odds).toFixed(2) 
                : 0}
          </p>
        </div>
        <div>
          <p className="text-queen-text-secondary">Odds</p>
          <p className="text-xl font-bold">{game.gameType.odds}x</p>
        </div>
      </div>
      
      <Button 
        className="w-full bg-queen-gold hover:bg-queen-gold/90 text-queen-dark font-bold"
        onClick={handlePlaceBet}
        disabled={market.status !== "open"}
      >
        Place Bet
      </Button>
    </Card>
  );
};

export default GamePlayComponent;
