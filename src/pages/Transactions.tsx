
import React, { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, CreditCard, Settings, LogOut, Search, Filter, CheckCircle, XCircle, ArrowUpRight, ArrowDownLeft, FileText, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTransaction, Transaction } from "@/contexts/TransactionContext";
import { format } from "date-fns";

const Transactions = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { 
    transactions, 
    isLoading, 
    approveTransaction, 
    rejectTransaction, 
    getPendingTransactions 
  } = useTransaction();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<"all" | "deposit" | "withdrawal">("all");
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  
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
  
  const pendingTransactions = getPendingTransactions().filter(tx => 
    tx.type === "deposit" || tx.type === "withdrawal"
  );
  
  const filteredTransactions = pendingTransactions.filter(tx => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tx.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.paymentDetails?.utrNumber && tx.paymentDetails.utrNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (transactionTypeFilter === "all") return matchesSearch;
    return matchesSearch && tx.type === transactionTypeFilter;
  });
  
  const handleApprove = async (txId: string) => {
    try {
      await approveTransaction(txId);
      toast({
        title: "Transaction Approved",
        description: "The transaction has been approved successfully.",
      });
    } catch (error) {
      toast({
        title: "Approval Failed",
        description: "There was an error approving the transaction.",
        variant: "destructive",
      });
    }
  };
  
  const handleReject = async () => {
    if (!viewingTransaction) return;
    
    try {
      await rejectTransaction(viewingTransaction.id, rejectionReason);
      setRejectDialogOpen(false);
      toast({
        title: "Transaction Rejected",
        description: "The transaction has been rejected successfully.",
      });
    } catch (error) {
      toast({
        title: "Rejection Failed",
        description: "There was an error rejecting the transaction.",
        variant: "destructive",
      });
    }
  };
  
  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-queen-success" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-queen-warning" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
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
                    <SidebarMenuButton asChild isActive={true}>
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
              <h1 className="text-2xl font-bold text-white">Transaction Management</h1>
              <p className="text-white/70">Manage deposits and withdrawals</p>
            </div>
            <SidebarTrigger />
          </div>

          <Tabs defaultValue="pending" className="mb-6">
            <TabsList className="bg-white/5 border border-white/10 mb-4">
              <TabsTrigger value="pending" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
                Pending Requests
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">
                Transaction History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-4">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader className="pb-2">
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
                      <Input 
                        type="text" 
                        placeholder="Search by ID, user or UTR number..." 
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant={transactionTypeFilter === "all" ? "default" : "outline"} 
                        className={transactionTypeFilter === "all" ? "bg-queen-gold text-queen-dark" : "border-white/10 text-white"}
                        onClick={() => setTransactionTypeFilter("all")}
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        All
                      </Button>
                      <Button 
                        variant={transactionTypeFilter === "deposit" ? "default" : "outline"} 
                        className={transactionTypeFilter === "deposit" ? "bg-queen-success/80 text-white" : "border-white/10 text-white"}
                        onClick={() => setTransactionTypeFilter("deposit")}
                      >
                        <ArrowDownLeft className="h-4 w-4 mr-2" />
                        Deposits
                      </Button>
                      <Button 
                        variant={transactionTypeFilter === "withdrawal" ? "default" : "outline"} 
                        className={transactionTypeFilter === "withdrawal" ? "bg-queen-warning/80 text-white" : "border-white/10 text-white"}
                        onClick={() => setTransactionTypeFilter("withdrawal")}
                      >
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Withdrawals
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription className="text-white/70">
                    {filteredTransactions.length} pending {filteredTransactions.length === 1 ? 'request' : 'requests'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/70">Transaction ID</TableHead>
                        <TableHead className="text-white/70">Type</TableHead>
                        <TableHead className="text-white/70">User</TableHead>
                        <TableHead className="text-white/70">Amount</TableHead>
                        <TableHead className="text-white/70">Date</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                        <TableHead className="text-white/70">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow className="border-white/10">
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex justify-center items-center">
                              <Clock className="h-6 w-6 text-queen-text-secondary animate-spin" />
                              <span className="ml-2 text-queen-text-secondary">Loading...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : filteredTransactions.length === 0 ? (
                        <TableRow className="border-white/10">
                          <TableCell colSpan={7} className="text-center py-8 text-queen-text-secondary">
                            No pending requests found matching the current filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTransactions.map((tx) => (
                          <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium text-white">
                              {tx.id.substring(0, 8)}...
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getTransactionTypeIcon(tx.type)}
                                <span className="capitalize">{tx.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-queen-text-secondary">
                              {tx.userId.substring(0, 8)}...
                            </TableCell>
                            <TableCell className="font-medium">
                              ₹{tx.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-queen-text-secondary">
                              {format(new Date(tx.createdAt), "dd MMM yyyy HH:mm")}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white hover:bg-white/10 hover:text-white"
                                  onClick={() => {
                                    setViewingTransaction(tx);
                                    setViewDetailsOpen(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-queen-success hover:bg-queen-success/10 hover:text-queen-success"
                                  onClick={() => handleApprove(tx.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-queen-error hover:bg-queen-error/10 hover:text-queen-error"
                                  onClick={() => {
                                    setViewingTransaction(tx);
                                    setRejectDialogOpen(true);
                                  }}
                                >
                                  <XCircle className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
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
            </TabsContent>
            
            <TabsContent value="history">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription className="text-white/70">
                    Complete history of all transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative flex-1 mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
                    <Input 
                      type="text" 
                      placeholder="Search transaction history..." 
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/70">Transaction ID</TableHead>
                        <TableHead className="text-white/70">Type</TableHead>
                        <TableHead className="text-white/70">User</TableHead>
                        <TableHead className="text-white/70">Amount</TableHead>
                        <TableHead className="text-white/70">Date</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                        <TableHead className="text-white/70">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter(tx => tx.status !== "pending" && (tx.type === "deposit" || tx.type === "withdrawal"))
                        .slice(0, 5)
                        .map((tx) => (
                          <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium text-white">
                              {tx.id.substring(0, 8)}...
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getTransactionTypeIcon(tx.type)}
                                <span className="capitalize">{tx.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-queen-text-secondary">
                              {tx.userId.substring(0, 8)}...
                            </TableCell>
                            <TableCell className="font-medium">
                              ₹{tx.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-queen-text-secondary">
                              {format(new Date(tx.createdAt), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell>
                              <span className={`
                                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${tx.status === 'approved' ? 'bg-queen-success/20 text-queen-success' : 
                                  tx.status === 'rejected' ? 'bg-queen-error/20 text-queen-error' : 
                                  'bg-blue-400/20 text-blue-400'}
                              `}>
                                {tx.status === 'approved' ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : tx.status === 'rejected' ? (
                                  <XCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                <span className="capitalize">{tx.status}</span>
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-white hover:bg-white/10 hover:text-white"
                                onClick={() => {
                                  setViewingTransaction(tx);
                                  setViewDetailsOpen(true);
                                }}
                              >
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Details</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 hover:text-white">
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Transaction Details Dialog */}
          <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
            <DialogContent className="bg-white/5 border-white/10 text-white max-w-3xl">
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogDescription className="text-white/70">
                  Full information about the selected transaction
                </DialogDescription>
              </DialogHeader>
              
              {viewingTransaction && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10 text-white">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium text-white/70">Transaction Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-queen-text-secondary">Transaction ID:</span>
                          <span className="font-medium">{viewingTransaction.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-queen-text-secondary">Type:</span>
                          <span className="capitalize font-medium">{viewingTransaction.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-queen-text-secondary">Amount:</span>
                          <span className="font-medium">₹{viewingTransaction.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-queen-text-secondary">Status:</span>
                          <span className={`
                            px-2 py-0.5 rounded-full text-xs font-medium
                            ${viewingTransaction.status === 'approved' ? 'bg-queen-success/20 text-queen-success' : 
                              viewingTransaction.status === 'rejected' ? 'bg-queen-error/20 text-queen-error' : 
                              'bg-yellow-500/20 text-yellow-500'}
                          `}>
                            {viewingTransaction.status.charAt(0).toUpperCase() + viewingTransaction.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-queen-text-secondary">Created:</span>
                          <span>{format(new Date(viewingTransaction.createdAt), "dd MMM yyyy HH:mm")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-queen-text-secondary">Updated:</span>
                          <span>{format(new Date(viewingTransaction.updatedAt), "dd MMM yyyy HH:mm")}</span>
                        </div>
                        {viewingTransaction.approvedBy && (
                          <div className="flex justify-between">
                            <span className="text-queen-text-secondary">Approved By:</span>
                            <span>{viewingTransaction.approvedBy}</span>
                          </div>
                        )}
                        {viewingTransaction.rejectionReason && (
                          <div className="flex justify-between">
                            <span className="text-queen-text-secondary">Rejection Reason:</span>
                            <span className="text-queen-error">{viewingTransaction.rejectionReason}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10 text-white">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium text-white/70">Payment Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {viewingTransaction.type === "deposit" && viewingTransaction.paymentDetails ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-queen-text-secondary">UTR Number:</span>
                              <span className="font-medium">{viewingTransaction.paymentDetails.utrNumber || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-queen-text-secondary">Payment Method:</span>
                              <span>{viewingTransaction.paymentDetails.paymentMethod || "N/A"}</span>
                            </div>
                            {viewingTransaction.paymentDetails.paymentScreenshot && (
                              <div className="mt-4">
                                <span className="text-queen-text-secondary block mb-2">Payment Screenshot:</span>
                                <div className="rounded-md overflow-hidden border border-white/10">
                                  <img 
                                    src={viewingTransaction.paymentDetails.paymentScreenshot} 
                                    alt="Payment Screenshot" 
                                    className="w-full h-auto" 
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        ) : viewingTransaction.type === "withdrawal" && viewingTransaction.paymentDetails ? (
                          <div className="flex justify-between">
                            <span className="text-queen-text-secondary">Account Details:</span>
                            <span>{viewingTransaction.paymentDetails.accountDetails || "N/A"}</span>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-queen-text-secondary">
                            No payment details available
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {viewingTransaction.status === "pending" && (
                    <div className="flex justify-end space-x-4">
                      <Button 
                        variant="outline" 
                        className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                        onClick={() => setViewDetailsOpen(false)}
                      >
                        Close
                      </Button>
                      <Button 
                        className="bg-queen-error text-white hover:bg-queen-error/90"
                        onClick={() => {
                          setViewDetailsOpen(false);
                          setRejectDialogOpen(true);
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button 
                        className="bg-queen-success text-white hover:bg-queen-success/90"
                        onClick={() => {
                          handleApprove(viewingTransaction.id);
                          setViewDetailsOpen(false);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Reject Transaction Dialog */}
          <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
            <DialogContent className="bg-white/5 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Reject Transaction</DialogTitle>
                <DialogDescription className="text-white/70">
                  Please provide a reason for rejecting this transaction.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Rejection Reason</label>
                  <Input 
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-queen-error text-white hover:bg-queen-error/90"
                  onClick={handleReject}
                  disabled={!rejectionReason.trim()}
                >
                  Reject Transaction
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Transactions;
