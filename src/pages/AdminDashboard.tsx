
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, CreditCard, Settings, LogOut, Plus, ListIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import MarketManagement from "@/components/admin/MarketManagement";
import GameTypeManagement from "@/components/admin/GameTypeManagement";
import { useGame } from "@/contexts/GameContext";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { markets, gameTypes } = useGame();

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
                    <SidebarMenuButton asChild isActive={true}>
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
                    <SidebarMenuButton asChild>
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
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70">Manage your platform and monitor performance</p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription className="text-white/70">Active accounts on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-white/70">+12% from last month</div>
              </CardFooter>
            </Card>
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Total Markets</CardTitle>
                <CardDescription className="text-white/70">Active markets on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{markets.length}</div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-white/70">{markets.filter(m => m.status === "open").length} currently open</div>
              </CardFooter>
            </Card>
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription className="text-white/70">Total platform revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹245,678</div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-white/70">+18% from last month</div>
              </CardFooter>
            </Card>
          </div>

          {/* Market Management */}
          <div className="mt-6">
            <MarketManagement />
          </div>
          
          {/* Game Type Management */}
          <div>
            <GameTypeManagement />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
