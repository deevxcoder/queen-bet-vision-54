
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart3, Gamepad2, Trophy, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const username = user?.name || 'User';
  
  return (
    <DashboardLayout 
      pageTitle="Dashboard" 
      pageDescription={`Welcome back, ${username}!`}
    >
      <div className="grid gap-6">
        {/* Balance Card - Mobile Only */}
        <div className="md:hidden bg-queen-card/30 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-queen-text-secondary text-sm">Total Balance</div>
              <div className="text-2xl font-bold text-queen-gold mt-1">₹{user?.balance?.toLocaleString() || "0"}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-queen-gold/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-queen-gold" />
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-queen-card/30 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:border-queen-gold/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-queen-text-secondary text-sm">Total Balance</div>
                <div className="text-2xl font-bold text-queen-gold mt-1">₹{user?.balance?.toLocaleString() || "0"}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-queen-gold/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-queen-gold" />
              </div>
            </div>
          </div>
          
          <div className="bg-queen-card/30 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-queen-text-secondary text-sm">Active Bets</div>
                <div className="text-2xl font-bold text-white mt-1">3</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Gamepad2 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-queen-card/30 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-queen-text-secondary text-sm">Total Won</div>
                <div className="text-2xl font-bold text-green-500 mt-1">₹25,000.00</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-queen-card/30 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-queen-text-secondary text-sm">Win Rate</div>
                <div className="text-2xl font-bold text-white mt-1">67%</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Games & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-queen-card/30 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-medium">Recent Games</h2>
              <Link to="/game-results" className="text-sm text-queen-gold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-white/5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-white/5 flex items-center justify-center">
                      <Gamepad2 className="h-5 w-5 text-queen-gold" />
                    </div>
                    <div>
                      <div className="font-medium">Toss Game #{index + 1001}</div>
                      <div className="text-sm text-queen-text-secondary">
                        {["Yesterday", "2 days ago", "3 days ago", "Last week"][index]}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    index % 2 === 0 ? "text-green-500" : "text-red-500"
                  }`}>
                    {index % 2 === 0 ? "Won" : "Lost"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-queen-card/30 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-medium">Recent Transactions</h2>
              <Link to="/wallet" className="text-sm text-queen-gold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-white/5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-md ${
                      index % 3 === 0 
                        ? "bg-green-500/10" 
                        : index % 3 === 1 
                        ? "bg-red-500/10" 
                        : "bg-white/5"
                    } flex items-center justify-center`}>
                      <Wallet className={`h-5 w-5 ${
                        index % 3 === 0 
                          ? "text-green-500" 
                          : index % 3 === 1 
                          ? "text-red-500" 
                          : "text-queen-gold"
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">
                        {index % 3 === 0 
                          ? "Deposit" 
                          : index % 3 === 1 
                          ? "Withdrawal" 
                          : "Bet Placed"}
                      </div>
                      <div className="text-sm text-queen-text-secondary">
                        {["Today", "Yesterday", "3 days ago", "Last week"][index]}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    index % 3 === 0 
                      ? "text-green-500" 
                      : index % 3 === 1 
                      ? "text-red-500" 
                      : "text-white"
                  }`}>
                    {index % 3 === 0 
                      ? "+₹1,000.00" 
                      : index % 3 === 1 
                      ? "-₹500.00" 
                      : "-₹200.00"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
