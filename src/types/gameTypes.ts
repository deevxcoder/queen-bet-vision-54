
export type GameStatus = "open" | "closed" | "upcoming";

export interface GameType {
  id: string;
  name: string;
  description: string;
  rules: string[];
  odds: number;
  minBet?: number;
  maxBet?: number;
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
  status: "pending" | "won" | "lost";
  createdAt: string;
}
