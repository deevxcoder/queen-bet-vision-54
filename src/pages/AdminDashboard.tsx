
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, CreditCard, Settings, LogOut, Plus, ListIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();

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
                <CardTitle>Total Games</CardTitle>
                <CardDescription className="text-white/70">Active games on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">56</div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-white/70">+3 new this week</div>
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

          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription className="text-white/70">Newly registered users</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Type</TableHead>
                      <TableHead className="text-white/70">Joined</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-white">user{i}@example.com</TableCell>
                        <TableCell className="text-white/70">Player</TableCell>
                        <TableCell className="text-white/70">Today</TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-queen-success/20 text-queen-success">
                            Active
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Games</CardTitle>
                  <CardDescription className="text-white/70">Latest game activities</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                  <ListIcon className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/70">Game</TableHead>
                      <TableHead className="text-white/70">Type</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Mumbai Matka", type: "Number Game", status: "open" },
                      { name: "Delhi King", type: "Jodi Game", status: "open" },
                      { name: "Kalyan Special", type: "Harf Game", status: "upcoming" },
                      { name: "IPL T20 Toss", type: "Option Game", status: "closed" },
                      { name: "Friday Bonanza", type: "Crossing Game", status: "upcoming" }
                    ].map((game, i) => (
                      <TableRow key={i} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-white">{game.name}</TableCell>
                        <TableCell className="text-white/70">{game.type}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                            ${game.status === 'open' ? 'bg-queen-success/20 text-queen-success' :
                              game.status === 'upcoming' ? 'bg-queen-warning/20 text-queen-warning' : 
                              'bg-queen-error/20 text-queen-error'}`}>
                            {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toast({
                              title: "Game management",
                              description: `Managing ${game.name}`,
                            })}
                            className="text-white hover:bg-white/10 hover:text-white"
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription className="text-white/70">Common administrative tasks</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Button className="bg-white/10 border-white/10 text-white hover:bg-white/20"
                    onClick={() => toast({
                      title: "Adding new game",
                      description: "Form would open to add a new game",
                    })}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Game
                  </Button>
                  <Button className="bg-white/10 border-white/10 text-white hover:bg-white/20"
                    onClick={() => toast({
                      title: "Managing users",
                      description: "Users management interface would open",
                    })}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button className="bg-white/10 border-white/10 text-white hover:bg-white/20"
                    onClick={() => toast({
                      title: "Publishing Results",
                      description: "Form would open to publish game results",
                    })}>
                    <ListIcon className="h-4 w-4 mr-2" />
                    Publish Results
                  </Button>
                  <Button className="bg-white/10 border-white/10 text-white hover:bg-white/20"
                    onClick={() => toast({
                      title: "System Settings",
                      description: "Global system settings would open",
                    })}>
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
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
