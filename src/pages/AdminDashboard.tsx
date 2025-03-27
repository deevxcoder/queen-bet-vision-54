
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GamepadIcon, CreditCard, Settings, LogOut, Plus, DollarSign, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Activity, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
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
                    <SidebarMenuButton asChild>
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
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70">Manage your platform and monitor performance</p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription className="text-white/70">Active accounts</CardDescription>
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
                <CardDescription className="text-white/70">Active markets</CardDescription>
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
                <CardTitle>Game Types</CardTitle>
                <CardDescription className="text-white/70">Available types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{gameTypes.length}</div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-white/70">Across all markets</div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription className="text-white/70">Financial requests awaiting approval</CardDescription>
                </div>
                <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/70">Type</TableHead>
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Amount</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowDownToLine className="h-4 w-4 mr-2 text-green-400" />
                          <span>Deposit</span>
                        </div>
                      </TableCell>
                      <TableCell>John D.</TableCell>
                      <TableCell>₹5,000</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpFromLine className="h-4 w-4 mr-2 text-red-400" />
                          <span>Withdrawal</span>
                        </div>
                      </TableCell>
                      <TableCell>Emma W.</TableCell>
                      <TableCell>₹2,500</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowDownToLine className="h-4 w-4 mr-2 text-green-400" />
                          <span>Deposit</span>
                        </div>
                      </TableCell>
                      <TableCell>Michael B.</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription className="text-white/70">Latest platform transactions</CardDescription>
                </div>
                <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Type</TableHead>
                      <TableHead className="text-white/70">Amount</TableHead>
                      <TableHead className="text-white/70">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell>Sarah J.</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                          Bet
                        </span>
                      </TableCell>
                      <TableCell>₹500</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell>David K.</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Win
                        </span>
                      </TableCell>
                      <TableCell>₹1,200</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableCell>Maria L.</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Deposit
                        </span>
                      </TableCell>
                      <TableCell>₹3,000</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Quick Access</CardTitle>
                  <CardDescription className="text-white/70">Manage key platform areas</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="bg-white/10 text-white hover:bg-white/20 h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>User Management</span>
                  </Button>
                  <Button className="bg-white/10 text-white hover:bg-white/20 h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <BarChart className="h-6 w-6" />
                    <span>Market Management</span>
                  </Button>
                  <Button className="bg-white/10 text-white hover:bg-white/20 h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <GamepadIcon className="h-6 w-6" />
                    <span>Game Types</span>
                  </Button>
                  <Button className="bg-white/10 text-white hover:bg-white/20 h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>Toss Games</span>
                  </Button>
                  <Button className="bg-white/10 text-white hover:bg-white/20 h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <ArrowDownToLine className="h-6 w-6" />
                    <span>Deposit Requests</span>
                  </Button>
                  <Button className="bg-white/10 text-white hover:bg-white/20 h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <ArrowUpFromLine className="h-6 w-6" />
                    <span>Withdrawal Requests</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
