
import React, { createContext, useContext, useState, useEffect } from "react";
import { Market, GameType, MarketGame, MarketResult, Bet, GameStatus } from "@/types/gameTypes";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

// Mock data for game types
const mockGameTypes: GameType[] = [
  {
    id: "gt1",
    name: "Jodi",
    description: "Pick a pair of numbers that will appear in the result",
    rules: [
      "Pick numbers between 00-99",
      "If your number matches the result, you win",
      "Minimum bet amount is ₹10",
      "Maximum bet amount is ₹10,000"
    ],
    odds: 90.0
  },
  {
    id: "gt2",
    name: "Hurf",
    description: "Pick any single number that will appear anywhere in the result",
    rules: [
      "Pick numbers between 0-9",
      "If your number appears in the result, you win",
      "Minimum bet amount is ₹10",
      "Maximum bet amount is ₹5,000"
    ],
    odds: 9.5
  },
  {
    id: "gt3",
    name: "Cross",
    description: "Pick a number that will appear in a specific position",
    rules: [
      "Pick a position (first, middle, last) and a number (0-9)",
      "If your number appears in the selected position, you win",
      "Minimum bet amount is ₹10",
      "Maximum bet amount is ₹7,000"
    ],
    odds: 9.0
  },
  {
    id: "gt4",
    name: "Odd-Even",
    description: "Predict if the sum of the result will be odd or even",
    rules: [
      "Choose either 'Odd' or 'Even'",
      "If the sum of the digits in the result matches your prediction, you win",
      "Minimum bet amount is ₹20",
      "Maximum bet amount is ₹15,000"
    ],
    odds: 1.9
  }
];

// Mock data for markets
const mockMarkets: Market[] = [
  {
    id: "m1",
    name: "Mumbai Matka",
    slug: "mumbai-matka",
    status: "open",
    timeRemaining: "Closes in 2h 30m",
    nextDraw: "Today at 6:00 PM",
    description: "Mumbai Matka is one of the most popular number games. Pick your lucky numbers and win big with high odds!",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3bdb4df691d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    games: [
      {
        id: "mg1",
        marketId: "m1",
        gameTypeId: "gt1",
        gameType: mockGameTypes[0],
        status: "open"
      },
      {
        id: "mg2",
        marketId: "m1",
        gameTypeId: "gt2",
        gameType: mockGameTypes[1],
        status: "open"
      }
    ],
    previousResults: [
      { id: "r1", marketId: "m1", date: "May 5, 2023", results: { "gt1": "45", "gt2": "4" } },
      { id: "r2", marketId: "m1", date: "May 4, 2023", results: { "gt1": "26", "gt2": "2" } },
      { id: "r3", marketId: "m1", date: "May 3, 2023", results: { "gt1": "91", "gt2": "9" } }
    ]
  },
  {
    id: "m2",
    name: "Delhi King",
    slug: "delhi-king",
    status: "open",
    timeRemaining: "Closes in 1h 15m",
    nextDraw: "Today at 5:00 PM",
    description: "Delhi King is the premium number game for the capital region. Try your luck with various game types!",
    imageUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    games: [
      {
        id: "mg3",
        marketId: "m2",
        gameTypeId: "gt1",
        gameType: mockGameTypes[0],
        status: "open"
      },
      {
        id: "mg4",
        marketId: "m2",
        gameTypeId: "gt3",
        gameType: mockGameTypes[2],
        status: "open"
      },
      {
        id: "mg5",
        marketId: "m2",
        gameTypeId: "gt4",
        gameType: mockGameTypes[3],
        status: "open"
      }
    ],
    previousResults: [
      { id: "r4", marketId: "m2", date: "May 5, 2023", results: { "gt1": "78", "gt3": "7", "gt4": "Even" } },
      { id: "r5", marketId: "m2", date: "May 4, 2023", results: { "gt1": "39", "gt3": "3", "gt4": "Odd" } }
    ]
  },
  {
    id: "m3",
    name: "Kalyan Special",
    slug: "kalyan-special",
    status: "upcoming",
    timeRemaining: "Opens in 4h 15m",
    nextDraw: "Today at 8:00 PM",
    description: "The prestigious Kalyan Special game with the highest odds and biggest prizes.",
    imageUrl: "https://images.unsplash.com/photo-1533077162801-86490c593afb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    games: [
      {
        id: "mg6",
        marketId: "m3",
        gameTypeId: "gt1",
        gameType: mockGameTypes[0],
        status: "upcoming"
      },
      {
        id: "mg7",
        marketId: "m3",
        gameTypeId: "gt2",
        gameType: mockGameTypes[1],
        status: "upcoming"
      },
      {
        id: "mg8",
        marketId: "m3",
        gameTypeId: "gt3",
        gameType: mockGameTypes[2],
        status: "upcoming"
      },
      {
        id: "mg9",
        marketId: "m3",
        gameTypeId: "gt4",
        gameType: mockGameTypes[3],
        status: "upcoming"
      }
    ],
    previousResults: []
  }
];

interface GameContextType {
  markets: Market[];
  gameTypes: GameType[];
  userBets: Bet[];
  getMarketBySlug: (slug: string) => Market | undefined;
  getGameTypeById: (id: string) => GameType | undefined;
  placeBet: (marketId: string, gameTypeId: string, amount: number, numbers: number[]) => Promise<boolean>;
  updateMarketStatus: (marketId: string, status: GameStatus) => Promise<boolean>;
  declareResult: (marketId: string, results: Record<string, string>) => Promise<boolean>;
  createMarket: (market: Omit<Market, "id" | "games" | "previousResults">, gameTypeIds: string[]) => Promise<boolean>;
  createGameType: (gameType: Omit<GameType, "id">) => Promise<boolean>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markets, setMarkets] = useState<Market[]>(mockMarkets);
  const [gameTypes, setGameTypes] = useState<GameType[]>(mockGameTypes);
  const [userBets, setUserBets] = useState<Bet[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const getMarketBySlug = (slug: string) => {
    return markets.find(market => market.slug === slug);
  };

  const getGameTypeById = (id: string) => {
    return gameTypes.find(gameType => gameType.id === id);
  };

  const placeBet = async (marketId: string, gameTypeId: string, amount: number, numbers: number[]): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to place a bet",
          variant: "destructive"
        });
        return false;
      }

      const market = markets.find(m => m.id === marketId);
      if (!market) {
        toast({
          title: "Market not found",
          description: "The selected market does not exist",
          variant: "destructive"
        });
        return false;
      }

      if (market.status !== "open") {
        toast({
          title: "Market closed",
          description: "This market is not open for betting",
          variant: "destructive"
        });
        return false;
      }

      const gameType = getGameTypeById(gameTypeId);
      if (!gameType) {
        toast({
          title: "Game type not found",
          description: "The selected game type does not exist",
          variant: "destructive"
        });
        return false;
      }

      const minBet = gameType.minBet || 10;
      if (amount < minBet) {
        toast({
          title: "Invalid bet amount",
          description: `Minimum bet amount is ₹${minBet}`,
          variant: "destructive"
        });
        return false;
      }

      const maxBet = gameType.maxBet || 10000;
      if (amount > maxBet) {
        toast({
          title: "Invalid bet amount",
          description: `Maximum bet amount is ₹${maxBet}`,
          variant: "destructive"
        });
        return false;
      }

      if (numbers.length === 0) {
        toast({
          title: "Selection required",
          description: "Please select at least one number",
          variant: "destructive"
        });
        return false;
      }

      // Create new bet
      const newBet: Bet = {
        id: `bet_${Date.now()}`,
        userId: user.id,
        marketId,
        gameTypeId,
        amount,
        numbers,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      setUserBets(prevBets => [...prevBets, newBet]);

      toast({
        title: "Bet placed successfully!",
        description: `Placed ₹${amount} on ${gameType.name} in ${market.name}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Error placing bet",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateMarketStatus = async (marketId: string, status: GameStatus): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMarkets(prevMarkets => 
        prevMarkets.map(market => 
          market.id === marketId 
            ? { 
                ...market, 
                status,
                games: market.games.map(game => ({ ...game, status }))
              } 
            : market
        )
      );

      toast({
        title: "Market status updated",
        description: `The market status has been changed to ${status}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Error updating market",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const declareResult = async (marketId: string, results: Record<string, string>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add new result
      const newResult: MarketResult = {
        id: `result_${Date.now()}`,
        marketId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        results
      };

      setMarkets(prevMarkets => 
        prevMarkets.map(market => 
          market.id === marketId 
            ? { 
                ...market, 
                status: "closed",
                previousResults: [newResult, ...(market.previousResults || [])],
                games: market.games.map(game => ({ ...game, status: "closed" }))
              } 
            : market
        )
      );

      // Update bet statuses
      setUserBets(prevBets => 
        prevBets.map(bet => {
          if (bet.marketId === marketId && bet.status === "pending") {
            const result = results[bet.gameTypeId];
            if (!result) return bet;

            // This is a simplified example. In a real app, you'd need more complex logic based on game type
            const didWin = bet.numbers.some(num => result.includes(num.toString()));
            
            return {
              ...bet,
              status: didWin ? "won" : "lost"
            };
          }
          return bet;
        })
      );

      toast({
        title: "Results declared",
        description: "The market results have been declared and bets have been processed",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error declaring results",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const createMarket = async (
    market: Omit<Market, "id" | "games" | "previousResults">, 
    gameTypeIds: string[]
  ): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create games for the market
      const games: MarketGame[] = gameTypeIds.map(gameTypeId => {
        const gameType = getGameTypeById(gameTypeId);
        if (!gameType) {
          throw new Error(`Game type ${gameTypeId} not found`);
        }
        
        return {
          id: `mg_${Date.now()}_${gameTypeId}`,
          marketId: `m_${Date.now()}`,
          gameTypeId,
          gameType,
          status: market.status
        };
      });

      // Create new market
      const newMarket: Market = {
        id: `m_${Date.now()}`,
        ...market,
        games,
        previousResults: []
      };

      setMarkets(prevMarkets => [...prevMarkets, newMarket]);

      toast({
        title: "Market created",
        description: `${market.name} has been created successfully`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Error creating market",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const createGameType = async (gameType: Omit<GameType, "id">): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new game type
      const newGameType: GameType = {
        id: `gt_${Date.now()}`,
        ...gameType
      };

      setGameTypes(prevGameTypes => [...prevGameTypes, newGameType]);

      toast({
        title: "Game type created",
        description: `${gameType.name} game type has been created successfully`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Error creating game type",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <GameContext.Provider value={{
      markets,
      gameTypes,
      userBets,
      getMarketBySlug,
      getGameTypeById,
      placeBet,
      updateMarketStatus,
      declareResult,
      createMarket,
      createGameType
    }}>
      {children}
    </GameContext.Provider>
  );
};
