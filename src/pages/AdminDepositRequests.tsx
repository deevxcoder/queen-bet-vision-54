
import React, { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GamepadIcon, CreditCard, Settings, LogOut, ArrowDownToLine, ArrowUpFromLine, CheckCircle, XCircle, Search, Filter, TrendingUp, Activity, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Mock deposit requests data
const mockDepositRequests = [
  {
    id: "req1",
    userId: "user1",
    userName: "John Doe",
    amount: 5000,
    method: "UPI",
    transactionId: "UPIID123456789",
    status: "pending",
    createdAt: "2023-08-15T10:30:00Z"
  },
  {
    id: "req2",
    userId: "user2",
    userName: "Emma Wilson",
    amount: 2500,
    method: "Bank Transfer",
    transactionId: "BANK123456789",
    status: "pending",
    createdAt: "2023-08-14T14:20:00Z"
  },
  {
    id: "req3",
    userId: "user3",
    userName: "Michael Brown",
    amount: 10000,
    method: "UPI",
    transactionId: "UPIID987654321",
    status: "approved",
    createdAt: "2023-08-13T09:15:00Z"
  },
  {
    id: "req4",
    userId: "user4",
    userName: "Sarah Johnson",
    amount: 1000,
    method: "Bank Transfer",
    transactionId: "BANK987654321",
    status: "rejected",
    createdAt: "2023-08-12T16:45:00Z"
  }
];

type RequestStatus = "pending" | "approved" | "rejected";
type FilterStatus = "all" | RequestStatus;

const AdminDepositRequests = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [requests, setRequests] = useState(mockDepositRequests);
  const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[0] | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  
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
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && request.status === statusFilter;
  });
  
  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
    
    toast({
      title: `Deposit Request ${newStatus === "approved" ? "Approved" : "Rejected"}`,
      description: `Request has been ${newStatus === "approved" ? "approved" : "rejected"} successfully.`,
    });
    
    setShowApproveDialog(false);
    setShowRejectDialog(false);
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
                    <SidebarMenuButton asChild isActive={true}>
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
              <h1 className="text-2xl font-bold text-white">Deposit Requests</h1>
              <p className="text-white/70">Manage user deposit requests</p>
            </div>
            <SidebarTrigger />
          </div>

          <Card className="bg-white/5 border-white/10 text-white mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Request Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
                  <Input 
                    type="text" 
                    placeholder="Search by user or transaction ID..." 
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
                    variant={statusFilter === "pending" ? "default" : "outline"} 
                    className={statusFilter === "pending" ? "bg-yellow-500/80 text-white" : "border-white/10 text-white"}
                    onClick={() => setStatusFilter("pending")}
                  >
                    <span className="h-4 w-4 mr-2">⏳</span>
                    Pending
                  </Button>
                  <Button 
                    variant={statusFilter === "approved" ? "default" : "outline"} 
                    className={statusFilter === "approved" ? "bg-queen-success/80 text-white" : "border-white/10 text-white"}
                    onClick={() => setStatusFilter("approved")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approved
                  </Button>
                  <Button 
                    variant={statusFilter === "rejected" ? "default" : "outline"} 
                    className={statusFilter === "rejected" ? "bg-queen-error/80 text-white" : "border-white/10 text-white"}
                    onClick={() => setStatusFilter("rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Deposit Requests</CardTitle>
                <CardDescription className="text-white/70">
                  {filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'} found
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                >
                  Export
                </Button>
                <Button className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/70">User</TableHead>
                    <TableHead className="text-white/70">Amount</TableHead>
                    <TableHead className="text-white/70">Method</TableHead>
                    <TableHead className="text-white/70">Transaction ID</TableHead>
                    <TableHead className="text-white/70">Date</TableHead>
                    <TableHead className="text-white/70">Status</TableHead>
                    <TableHead className="text-white/70">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow className="border-white/10">
                      <TableCell colSpan={7} className="text-center py-8 text-queen-text-secondary">
                        No deposit requests found matching the current filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="font-bold text-queen-gold">{request.userName.charAt(0)}</span>
                            </div>
                            <div className="font-medium text-white">{request.userName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{request.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {request.method}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {request.transactionId}
                        </TableCell>
                        <TableCell className="text-queen-text-secondary">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                              request.status === 'approved' ? 'bg-queen-success/20 text-queen-success' : 
                              'bg-queen-error/20 text-queen-error'}
                          `}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {request.status === "pending" && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-queen-success hover:bg-queen-success/10 hover:text-queen-success"
                                  onClick={() => {
                                    setSelectedRequest(request);
                                    setShowApproveDialog(true);
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-queen-error hover:bg-queen-error/10 hover:text-queen-error"
                                  onClick={() => {
                                    setSelectedRequest(request);
                                    setShowRejectDialog(true);
                                  }}
                                >
                                  <XCircle className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-white hover:bg-white/10 hover:text-white"
                            >
                              <span className="sr-only">View Details</span>
                              <span>Details</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Approve Request Confirmation Dialog */}
          <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
            <DialogContent className="bg-white/5 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Approve Deposit Request</DialogTitle>
                <DialogDescription className="text-white/70">
                  Are you sure you want to approve this deposit request from {selectedRequest?.userName} for ₹{selectedRequest?.amount.toLocaleString()}?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/70">User</p>
                    <p className="font-medium">{selectedRequest?.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Amount</p>
                    <p className="font-medium">₹{selectedRequest?.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Method</p>
                    <p className="font-medium">{selectedRequest?.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Transaction ID</p>
                    <p className="font-mono text-xs">{selectedRequest?.transactionId}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowApproveDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-queen-success text-white hover:bg-queen-success/90"
                  onClick={() => selectedRequest && handleStatusChange(selectedRequest.id, "approved")}
                >
                  Approve Deposit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Reject Request Confirmation Dialog */}
          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogContent className="bg-white/5 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Reject Deposit Request</DialogTitle>
                <DialogDescription className="text-white/70">
                  Are you sure you want to reject this deposit request from {selectedRequest?.userName} for ₹{selectedRequest?.amount.toLocaleString()}?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/70">User</p>
                    <p className="font-medium">{selectedRequest?.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Amount</p>
                    <p className="font-medium">₹{selectedRequest?.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Method</p>
                    <p className="font-medium">{selectedRequest?.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Transaction ID</p>
                    <p className="font-mono text-xs">{selectedRequest?.transactionId}</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="rejection-reason" className="block text-sm text-white/70 mb-1">
                    Rejection Reason
                  </label>
                  <Input 
                    id="rejection-reason" 
                    type="text" 
                    placeholder="Enter reason for rejection..." 
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowRejectDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-queen-error text-white hover:bg-queen-error/90"
                  onClick={() => selectedRequest && handleStatusChange(selectedRequest.id, "rejected")}
                >
                  Reject Deposit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDepositRequests;
