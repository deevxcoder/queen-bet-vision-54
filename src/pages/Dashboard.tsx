
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Home, 
  Gamepad2, 
  Wallet, 
  History, 
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  Trophy,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarInset 
} from "@/components/ui/sidebar";

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [balance, setBalance] = useState("₹10,000.00");
  const [username, setUsername] = useState("JohnPlayer");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    // In a real app, connect to Supabase here for logout
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSidebarOpen]);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex bg-queen-dark">
        {/* Desktop Sidebar using Shadcn Sidebar component */}
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="p-4 flex flex-row items-center gap-2">
            <div className="flex-1">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative size-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-queen-gold to-orange-500 animate-pulse"></div>
                  <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center text-queen-gold font-bold">Q</div>
                </div>
                <span className="text-xl font-bold">Queen Games</span>
              </Link>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/games">
                    <SidebarMenuButton tooltip="Number Games">
                      <Gamepad2 className="h-5 w-5" />
                      <span>Number Games</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/toss-games">
                    <SidebarMenuButton tooltip="Toss Games">
                      <Trophy className="h-5 w-5" />
                      <span>Toss Games</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/wallet">
                    <SidebarMenuButton tooltip="Wallet">
                      <Wallet className="h-5 w-5" />
                      <span>Wallet</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/game-results">
                    <SidebarMenuButton tooltip="History">
                      <History className="h-5 w-5" />
                      <span>Game History</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/profile">
                    <SidebarMenuButton tooltip="Profile">
                      <UserCircle className="h-5 w-5" />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 border-white/10 hover:bg-white/5 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 bg-black/80 z-50 transition-opacity md:hidden ${
          isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
          <div className={`absolute inset-y-0 left-0 w-3/4 max-w-xs bg-queen-card transform transition-transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                  <div className="relative size-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-queen-gold to-orange-500 animate-pulse"></div>
                    <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center text-queen-gold font-bold">Q</div>
                  </div>
                  <span className="text-xl font-bold">Queen Games</span>
                </Link>
                <button onClick={toggleMobileSidebar} className="p-1 rounded-full hover:bg-white/5">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                  <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/10 text-white">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link to="/games" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white">
                    <Gamepad2 className="h-5 w-5" />
                    <span>Number Games</span>
                  </Link>
                  
                  <Link to="/toss-games" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white">
                    <Trophy className="h-5 w-5" />
                    <span>Toss Games</span>
                  </Link>
                  
                  <Link to="/wallet" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white">
                    <Wallet className="h-5 w-5" />
                    <span>Wallet</span>
                  </Link>
                  
                  <Link to="/game-results" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white">
                    <History className="h-5 w-5" />
                    <span>Game History</span>
                  </Link>
                  
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white">
                    <UserCircle className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/10">
                <Button 
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <SidebarInset>
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-queen-dark/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex md:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </div>
                
                <div className="ml-auto flex items-center space-x-4">
                  <div className="hidden md:block">
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 font-medium text-sm">
                      Balance: <span className="text-queen-gold">{balance}</span>
                    </div>
                  </div>
                  
                  <div className="border-l border-white/10 pl-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-queen-gold flex items-center justify-center text-black font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-sm font-medium">{username}</span>
                      <span className="text-xs text-queen-text-secondary">Player</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-queen-text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Page content */}
          <div className="container mx-auto px-4 py-6">
            <div className="grid gap-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
                <p className="text-queen-text-secondary">Welcome back, {username}!</p>
              </div>
              
              {/* Balance Card - Mobile Only */}
              <div className="md:hidden bg-queen-card/30 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-queen-text-secondary text-sm">Total Balance</div>
                    <div className="text-2xl font-bold text-queen-gold mt-1">{balance}</div>
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
                      <div className="text-2xl font-bold text-queen-gold mt-1">{balance}</div>
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
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
