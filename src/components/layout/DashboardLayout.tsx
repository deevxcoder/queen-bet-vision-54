import React, { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
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

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const DashboardLayout = ({ 
  children, 
  pageTitle = "Dashboard", 
  pageDescription = "Welcome back!"
}: DashboardLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSidebarOpen]);

  if (!user && !isLoading) {
    navigate("/sign-in");
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex bg-queen-dark">
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
                  <Link to="/dashboard">
                    <SidebarMenuButton isActive={isActive("/dashboard")} tooltip="Dashboard">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/games">
                    <SidebarMenuButton isActive={isActive("/games")} tooltip="Number Games">
                      <Gamepad2 className="h-5 w-5" />
                      <span>Number Games</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/toss-games">
                    <SidebarMenuButton isActive={isActive("/toss-games")} tooltip="Toss Games">
                      <Trophy className="h-5 w-5" />
                      <span>Toss Games</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/wallet">
                    <SidebarMenuButton isActive={isActive("/wallet")} tooltip="Wallet">
                      <Wallet className="h-5 w-5" />
                      <span>Wallet</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/game-results">
                    <SidebarMenuButton isActive={isActive("/game-results")} tooltip="History">
                      <History className="h-5 w-5" />
                      <span>Game History</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Link to="/profile">
                    <SidebarMenuButton isActive={isActive("/profile")} tooltip="Profile">
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
        
        <div className={`fixed inset-0 bg-black/80 z-50 transition-opacity md:hidden ${
          isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
          <div className={`absolute inset-y-0 left-0 w-3/4 max-w-xs bg-queen-card transform transition-transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileSidebarOpen(false)}>
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
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard") ? "bg-white/10" : "hover:bg-white/5"} text-white`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link 
                    to="/games" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/games") ? "bg-white/10" : "hover:bg-white/5"} text-white`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Gamepad2 className="h-5 w-5" />
                    <span>Number Games</span>
                  </Link>
                  
                  <Link 
                    to="/toss-games" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/toss-games") ? "bg-white/10" : "hover:bg-white/5"} text-white`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Trophy className="h-5 w-5" />
                    <span>Toss Games</span>
                  </Link>
                  
                  <Link 
                    to="/wallet" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/wallet") ? "bg-white/10" : "hover:bg-white/5"} text-white`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Wallet</span>
                  </Link>
                  
                  <Link 
                    to="/game-results" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/game-results") ? "bg-white/10" : "hover:bg-white/5"} text-white`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <History className="h-5 w-5" />
                    <span>Game History</span>
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/profile") ? "bg-white/10" : "hover:bg-white/5"} text-white`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
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
        
        <SidebarInset>
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
                      Balance: <span className="text-queen-gold">₹{user?.balance?.toLocaleString() || "0"}</span>
                    </div>
                  </div>
                  
                  <div className="border-l border-white/10 pl-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-queen-gold flex items-center justify-center text-black font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-sm font-medium">{user?.name || 'User'}</span>
                      <span className="text-xs text-queen-text-secondary capitalize">{user?.role || 'Player'}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-queen-text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            {pageTitle && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">{pageTitle}</h1>
                {pageDescription && <p className="text-queen-text-secondary">{pageDescription}</p>}
              </div>
            )}
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
