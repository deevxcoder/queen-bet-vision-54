
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, CreditCard, Settings, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketManagement from "@/components/admin/MarketManagement";
import GameTypeManagement from "@/components/admin/GameTypeManagement";

const AdminGames = () => {
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
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <Link to="/admin/games">
                        <GraduationCap />
                        <span>Games</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/transactions">
                        <CreditCard />
                        <span>Transactions</span>
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
              <h1 className="text-2xl font-bold text-white">Games Management</h1>
              <p className="text-white/70">Manage markets and game types</p>
            </div>
            <SidebarTrigger />
          </div>

          <Tabs defaultValue="markets" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 mb-6">
              <TabsTrigger value="markets" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
                Markets
              </TabsTrigger>
              <TabsTrigger value="gametypes" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
                Game Types
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="markets" className="mt-0">
              <MarketManagement />
            </TabsContent>
            
            <TabsContent value="gametypes" className="mt-0">
              <GameTypeManagement />
            </TabsContent>
          </Tabs>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminGames;
