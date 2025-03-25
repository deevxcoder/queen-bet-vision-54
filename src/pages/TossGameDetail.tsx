
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Clock, Trophy } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Form schema for bet placement
const betFormSchema = z.object({
  selectedTeam: z.enum(["teamA", "teamB"], {
    required_error: "You must select a team",
  }),
  amount: z.coerce
    .number()
    .min(50, "Minimum bet amount is ₹50")
    .max(20000, "Maximum bet amount is ₹20000"),
});

type BetFormValues = z.infer<typeof betFormSchema>;

const TossGameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getTossGameById, placeBet, getGameTypeById } = useGame();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  // Get the toss game details
  const game = getTossGameById(id || "");
  
  // Get the toss game type
  const tossGameType = getGameTypeById("gt5"); // Using the ID of the Toss game type
  
  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game Not Found</h1>
          <p className="text-queen-text-secondary mb-6">The game you're looking for doesn't exist.</p>
          <Link to="/toss-games" className="text-queen-gold hover:text-queen-gold/80 transition-colors">
            Back to Toss Games
          </Link>
        </div>
      </div>
    );
  }

  // Set up form with default values
  const form = useForm<BetFormValues>({
    resolver: zodResolver(betFormSchema),
    defaultValues: {
      selectedTeam: undefined,
      amount: 100,
    },
  });

  // Function to handle bet submission
  const onSubmit = async (values: BetFormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place a bet",
        variant: "destructive",
      });
      navigate("/sign-in");
      return;
    }

    if (game.status !== "open") {
      toast({
        title: "Game Closed",
        description: "This game is not open for betting",
        variant: "destructive",
      });
      return;
    }

    setIsPlacingBet(true);

    try {
      // Map the selectedTeam value to the actual team name
      const teamName = values.selectedTeam === "teamA" ? game.teamA : game.teamB;
      
      // Place the bet
      const success = await placeBet(
        game.id,
        "gt5", // Toss game type ID
        values.amount,
        [], // No numbers for toss games
        teamName
      );

      if (success) {
        toast({
          title: "Bet Placed Successfully",
          description: `You bet ₹${values.amount} on ${teamName}`,
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place bet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPlacingBet(false);
    }
  };

  // Determine status badge color
  const statusColors = {
    open: "bg-queen-success text-white",
    closed: "bg-queen-error text-white",
    upcoming: "bg-queen-warning text-white",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Back button */}
        <div className="flex items-center mb-6">
          <Link to="/toss-games" className="text-queen-text-secondary hover:text-white transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Toss Games
          </Link>
        </div>

        {/* Game details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Game details */}
          <div className="lg:col-span-7">
            <div className="bg-queen-card rounded-xl overflow-hidden border border-white/10">
              {/* Game image */}
              <div className="relative h-56 lg:h-72">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      game.imageUrl ||
                      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                    })`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-queen-dark via-queen-dark/50 to-transparent" />
                
                {/* Game Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      statusColors[game.status]
                    }`}
                  >
                    {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Game content */}
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{game.title}</h1>
                
                {/* Teams */}
                <div className="bg-white/5 rounded-lg p-5 mb-6 flex items-center justify-between">
                  <div className="text-center">
                    <div className="bg-queen-gold/20 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-queen-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{game.teamA}</h3>
                  </div>
                  
                  <div className="text-white/70 text-lg font-bold">VS</div>
                  
                  <div className="text-center">
                    <div className="bg-queen-gold/20 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-queen-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{game.teamB}</h3>
                  </div>
                </div>

                {/* Game info */}
                <div className="flex items-center text-sm text-queen-text-secondary mb-6">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Match starts: {game.startTime}</span>
                </div>

                {/* Game rules and description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Game Description</h3>
                  <p className="text-queen-text-secondary mb-4">
                    {tossGameType?.description || "Predict which team will win the toss and earn rewards."}
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Rules</h3>
                  <ul className="text-queen-text-secondary list-disc pl-5 space-y-1">
                    {tossGameType?.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    )) || (
                      <>
                        <li>Choose either Team A or Team B</li>
                        <li>If your chosen team wins the toss, you win</li>
                        <li>Minimum bet amount is ₹50</li>
                        <li>Maximum bet amount is ₹20,000</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Betting form */}
          <div className="lg:col-span-5">
            <div className="bg-queen-card rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Place Your Bet</h2>

              {game.status !== "open" ? (
                <div className="text-center py-8">
                  <p className="text-queen-text-secondary mb-2">
                    {game.status === "upcoming" 
                      ? "This game is not yet open for betting"
                      : "Betting for this game is closed"}
                  </p>
                  <Link 
                    to="/toss-games" 
                    className="text-queen-gold hover:text-queen-gold/80 transition-colors"
                  >
                    View other games
                  </Link>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Team selection */}
                    <FormField
                      control={form.control}
                      name="selectedTeam"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-white">Select Team</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <div className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-lg cursor-pointer">
                                <RadioGroupItem value="teamA" id="teamA" />
                                <FormLabel htmlFor="teamA" className="cursor-pointer font-normal text-white">
                                  {game.teamA}
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-lg cursor-pointer">
                                <RadioGroupItem value="teamB" id="teamB" />
                                <FormLabel htmlFor="teamB" className="cursor-pointer font-normal text-white">
                                  {game.teamB}
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Bet amount */}
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Bet Amount (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter amount" 
                              {...field} 
                              className="bg-white/5 border-white/10 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Potential winning calculation */}
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-queen-text-secondary">Odds</span>
                        <span className="text-white font-medium">
                          {tossGameType?.odds || 1.9}x
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-queen-text-secondary">Potential Winning</span>
                        <span className="text-queen-gold font-semibold">
                          ₹{Math.round((form.watch("amount") || 0) * (tossGameType?.odds || 1.9))}
                        </span>
                      </div>
                    </div>

                    {/* Submit button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-queen-gold hover:bg-queen-gold/80 text-white" 
                      disabled={isPlacingBet || !isAuthenticated}
                    >
                      {isPlacingBet ? "Placing Bet..." : "Place Bet"}
                    </Button>

                    {!isAuthenticated && (
                      <p className="text-queen-text-secondary text-sm text-center">
                        Please{" "}
                        <Link to="/sign-in" className="text-queen-gold hover:underline">
                          sign in
                        </Link>{" "}
                        to place a bet
                      </p>
                    )}
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TossGameDetail;
