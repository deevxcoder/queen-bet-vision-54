
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import GameTypeManagement from "@/components/admin/GameTypeManagement";
import MarketManagement from "@/components/admin/MarketManagement";
import TossGameManagement from "@/components/admin/TossGameManagement";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GamepadIcon, CreditCard, Settings, LogOut, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Activity, BarChart } from "lucide-react";

const AdminGames = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("markets");
  
  // Parse the tab from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['markets', 'gameTypes', 'tossGames'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin/games?tab=${value}`);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-queen-dark">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-queen-gold flex items-center justify-center">
                  <span className="font-bold text-queen-dark">Q</span>
                </div>
                <div className="font-bold text-white">Queen Admin</div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/users">
                        <Users />
                        <span>User Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Game Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <Link to="/admin/games">
                        <GamepadIcon />
                        <span>All Games</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/games?tab=markets">
                        <BarChart />
                        <span>Market Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/games?tab=gameTypes">
                        <Activity />
                        <span>Game Types</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/games?tab=tossGames">
                        <TrendingUp />
                        <span>Toss Games</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Financial</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/transactions">
                        <CreditCard />
                        <span>Transactions</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/deposit-requests">
                        <ArrowDownToLine />
                        <span>Deposit Requests</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/withdrawal-requests">
                        <ArrowUpFromLine />
                        <span>Withdrawal Requests</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/sign-in">
                        <LogOut />
                        <span>Logout</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center px-4 py-2 text-sm text-white/50">
              Admin Portal v1.0
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Game Management</h1>
              <p className="text-white/70">Manage game types, markets, and toss games</p>
            </div>
            <SidebarTrigger />
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-0">
                <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none p-0">
                  <TabsTrigger 
                    value="markets" 
                    className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-queen-gold data-[state=active]:border-b-2 data-[state=active]:border-queen-gold h-12"
                  >
                    Markets
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gameTypes" 
                    className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-queen-gold data-[state=active]:border-b-2 data-[state=active]:border-queen-gold h-12"
                  >
                    Game Types
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tossGames" 
                    className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-queen-gold data-[state=active]:border-b-2 data-[state=active]:border-queen-gold h-12"
                  >
                    Toss Games
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            
            <TabsContent value="markets" className="mt-0">
              <MarketManagement />
            </TabsContent>
            
            <TabsContent value="gameTypes" className="mt-0">
              <GameTypeManagement />
            </TabsContent>
            
            <TabsContent value="tossGames" className="mt-0">
              <TossGameManagement />
            </TabsContent>
          </Tabs>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminGames;
