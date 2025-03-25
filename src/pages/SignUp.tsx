
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to Supabase here
      // For now, simulate registration
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        navigate("/sign-in");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-queen-dark">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-queen-card/30 p-6 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="text-center mb-6">
            <UserPlus className="mx-auto h-12 w-12 text-queen-gold mb-2" />
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-queen-text-secondary mt-1">
              Join Queen Games and start betting on your favorite games
            </p>
          </div>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johnsmith"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-queen-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-queen-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus-visible:ring-queen-gold pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-queen-text-secondary hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus-visible:ring-queen-gold pr-10"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-queen-gold hover:bg-queen-gold/90 text-queen-dark font-semibold"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-queen-text-secondary">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-queen-gold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
