
import React, { useState, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, CreditCard, Settings, LogOut, Search, Filter, CheckCircle, XCircle, Edit, Trash2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/contexts/AuthContext";

type UserStatus = "active" | "inactive";
type FilterStatus = "all" | UserStatus;

interface ProfileUser {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  status?: UserStatus;
  balance: number;
  created_at: string;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [users, setUsers] = useState<ProfileUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ProfileUser | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editRole, setEditRole] = useState<UserRole>("user");
  
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Add a default status property to each user
          const usersWithStatus = data.map(user => ({
            ...user,
            status: "active" as UserStatus
          }));
          setUsers(usersWithStatus);
        }
      } catch (error: any) {
        toast({
          title: "Error Loading Users",
          description: error.message || "Could not load users. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && user.role === "admin") {
      fetchUsers();
    }
  }, [user, toast]);
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone?.includes(searchTerm) || '');
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && user.status === statusFilter;
  });
  
  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    // In a real application, you might want to store the user's status in the database
    // For now, we'll just update the local state
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: `User ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `User has been ${newStatus === "active" ? "activated" : "deactivated"} successfully.`,
    });
  };
  
  const handleRoleChange = async () => {
    if (!selectedUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: editRole })
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role: editRole } : user
      ));
      
      setShowEditDialog(false);
      
      toast({
        title: "Role Updated",
        description: `User's role has been updated to ${editRole}.`,
      });
    } catch (error: any) {
      toast({
        title: "Role Update Failed",
        description: error.message || "Could not update user role. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      // Note: In a real application, you might want to implement a soft delete instead
      // or handle user deletion through Supabase Auth
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteDialog(false);
      
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Could not delete user. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-queen-dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription className="text-white/70">You need admin privileges to view this page</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
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
                    <SidebarMenuButton asChild isActive={true}>
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
              <h1 className="text-2xl font-bold text-white">User Management</h1>
              <p className="text-white/70">Manage users and their accounts</p>
            </div>
            <SidebarTrigger />
          </div>

          <Card className="bg-white/5 border-white/10 text-white mb-6">
            <CardHeader className="pb-2">
              <CardTitle>User Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
                  <Input 
                    type="text" 
                    placeholder="Search users by name, email or phone..." 
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={statusFilter === "all" ? "default" : "outline"} 
                    className={statusFilter === "all" ? "bg-queen-gold text-queen-dark" : "border-white/10 text-white"}
                    onClick={() => setStatusFilter("all")}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    All
                  </Button>
                  <Button 
                    variant={statusFilter === "active" ? "default" : "outline"} 
                    className={statusFilter === "active" ? "bg-queen-success/80 text-white" : "border-white/10 text-white"}
                    onClick={() => setStatusFilter("active")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Active
                  </Button>
                  <Button 
                    variant={statusFilter === "inactive" ? "default" : "outline"} 
                    className={statusFilter === "inactive" ? "bg-queen-error/80 text-white" : "border-white/10 text-white"}
                    onClick={() => setStatusFilter("inactive")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Inactive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Users</CardTitle>
                <CardDescription className="text-white/70">
                  {isLoading ? "Loading users..." : `${filteredUsers.length} ${filteredUsers.length === 1 ? 'user' : 'users'} found`}
                </CardDescription>
              </div>
              <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                <Shield className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-queen-text-secondary">Loading users...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Role</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Balance</TableHead>
                      <TableHead className="text-white/70">Joined</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow className="border-white/10">
                        <TableCell colSpan={6} className="text-center py-8 text-queen-text-secondary">
                          No users found matching the current filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="font-bold text-queen-gold">{user.name ? user.name.charAt(0) : 'U'}</span>
                              </div>
                              <div>
                                <div className="font-medium text-white">{user.name || 'No Name'}</div>
                                <div className="text-sm text-queen-text-secondary">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${user.role === 'admin' ? 'bg-queen-gold/20 text-queen-gold' : 
                                user.role === 'subadmin' ? 'bg-blue-400/20 text-blue-400' : 
                                'bg-blue-400/20 text-blue-400'}
                            `}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${user.status === 'active' ? 'bg-queen-success/20 text-queen-success' : 'bg-queen-error/20 text-queen-error'}
                            `}>
                              {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">
                            ₹{user.balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-queen-text-secondary">
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-white hover:bg-white/10 hover:text-white"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setEditRole(user.role);
                                  setShowEditDialog(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              {user.status === "active" ? (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-queen-error hover:bg-queen-error/10 hover:text-queen-error"
                                  onClick={() => handleStatusChange(user.id, "inactive")}
                                >
                                  <XCircle className="h-4 w-4" />
                                  <span className="sr-only">Deactivate</span>
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-queen-success hover:bg-queen-success/10 hover:text-queen-success"
                                  onClick={() => handleStatusChange(user.id, "active")}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="sr-only">Activate</span>
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-queen-error hover:bg-queen-error/10 hover:text-queen-error"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Delete User Confirmation Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="bg-white/5 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription className="text-white/70">
                  Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-queen-error text-white hover:bg-queen-error/90"
                  onClick={handleDeleteUser}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit User Role Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="bg-white/5 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Edit User Role</DialogTitle>
                <DialogDescription className="text-white/70">
                  Change the role for user "{selectedUser?.name}".
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="role" className="text-white mb-2 block">
                  Role
                </Label>
                <Select 
                  value={editRole} 
                  onValueChange={(value) => setEditRole(value as UserRole)}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/10 border-white/10 text-white">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="subadmin">Subadmin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90"
                  onClick={handleRoleChange}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminUsers;
