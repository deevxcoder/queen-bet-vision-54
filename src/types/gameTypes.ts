
export type GameStatus = "open" | "closed" | "upcoming";

export interface GameType {
  id: string;
  name: string;
  description: string;
  rules: string[];
  odds: number;
  minBet?: number;
  maxBet?: number;
  category?: "number" | "toss"; // Added category for different game types
}

export interface TossGame {
  id: string;
  marketId: string;
  title: string;
  teamA: string;
  teamB: string;
  status: GameStatus;
  startTime: string;
  imageUrl?: string;
}

export interface Market {
  id: string;
  name: string;
  slug: string;
  status: GameStatus;
  timeRemaining?: string;
  nextDraw?: string;
  description?: string;
  imageUrl?: string;
  games: MarketGame[];
  previousResults?: MarketResult[];
}

export interface MarketGame {
  id: string;
  marketId: string;
  gameTypeId: string;
  gameType: GameType;
  status: GameStatus;
}

export interface MarketResult {
  id: string;
  marketId: string;
  date: string;
  results: Record<string, string>; // gameTypeId: result
}

export interface Bet {
  id: string;
  userId: string;
  marketId: string;
  gameTypeId: string;
  amount: number;
  numbers: number[];
  selectedTeam?: string; // Added for toss game bets
  status: "pending" | "won" | "lost";
  createdAt: string;
}

// Demo credentials for the app
export interface DemoCredentials {
  admin: {
    email: string;
    password: string;
  };
  subadmin: {
    email: string;
    password: string;
  };
  user: {
    email: string;
    password: string;
  };
}

export const DEMO_CREDENTIALS: DemoCredentials = {
  admin: {
    email: "admin@example.com",
    password: "admin123"
  },
  subadmin: {
    email: "subadmin@example.com",
    password: "subadmin123"
  },
  user: {
    email: "user@example.com",
    password: "user123"
  }
};
