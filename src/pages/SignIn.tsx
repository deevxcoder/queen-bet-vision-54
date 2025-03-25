
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to Supabase here
      // For now, simulate authentication
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        navigate("/dashboard");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please check your credentials.",
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
            <LogIn className="mx-auto h-12 w-12 text-queen-gold mb-2" />
            <h1 className="text-2xl font-bold text-white">Sign In</h1>
            <p className="text-queen-text-secondary mt-1">
              Welcome back! Sign in to your account
            </p>
          </div>
          
          <form onSubmit={handleSignIn} className="space-y-4">
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
              <div className="flex justify-end">
                <Link 
                  to="/reset-password" 
                  className="text-sm text-queen-text-secondary hover:text-queen-gold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-queen-gold hover:bg-queen-gold/90 text-queen-dark font-semibold"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-queen-text-secondary">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-queen-gold hover:underline">
                  Sign Up
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

export default SignIn;
