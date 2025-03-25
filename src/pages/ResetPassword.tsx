
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to Supabase here
      // For now, simulate password reset request
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
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
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <KeyRound className="mx-auto h-12 w-12 text-queen-gold mb-2" />
                <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                <p className="text-queen-text-secondary mt-1">
                  Enter your email to receive a password reset link
                </p>
              </div>
              
              <form onSubmit={handleResetPassword} className="space-y-4">
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

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-queen-gold hover:bg-queen-gold/90 text-queen-dark font-semibold"
                >
                  {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-queen-text-secondary">
                    Remember your password?{" "}
                    <Link to="/sign-in" className="text-queen-gold hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="bg-green-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <KeyRound className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-queen-text-secondary mb-6">
                We've sent a password reset link to<br /><span className="text-white">{email}</span>
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-white/5"
                >
                  Use Another Email
                </Button>
                <Link to="/sign-in">
                  <Button 
                    className="w-full bg-queen-gold hover:bg-queen-gold/90 text-queen-dark font-semibold"
                  >
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
