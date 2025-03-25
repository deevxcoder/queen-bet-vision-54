
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet as WalletIcon, ArrowRight, ArrowDown, ArrowUp, Clock, Tag, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock transaction data
const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 500,
    balance: 2500,
    description: "Deposit via UPI",
    date: "May 5, 2023 - 14:30",
    status: "completed",
  },
  {
    id: 2,
    type: "debit",
    amount: 100,
    balance: 2000,
    description: "Bet on Mumbai Matka",
    date: "May 4, 2023 - 18:15",
    status: "completed",
  },
  {
    id: 3,
    type: "credit",
    amount: 450,
    balance: 2100,
    description: "Win from Delhi King",
    date: "May 4, 2023 - 20:45",
    status: "completed",
  },
  {
    id: 4,
    type: "debit",
    amount: 200,
    balance: 1650,
    description: "Bet on Golden Jackpot",
    date: "May 3, 2023 - 16:20",
    status: "completed",
  },
  {
    id: 5,
    type: "credit",
    amount: 1000,
    balance: 1850,
    description: "Deposit via Net Banking",
    date: "May 2, 2023 - 12:10",
    status: "completed",
  },
  {
    id: 6,
    type: "debit",
    amount: 150,
    balance: 850,
    description: "Bet on IPL T20 Toss",
    date: "May 1, 2023 - 19:30",
    status: "completed",
  },
  {
    id: 7,
    type: "credit",
    amount: 300,
    balance: 1000,
    description: "Win from Rajdhani Day",
    date: "May 1, 2023 - 21:45",
    status: "completed",
  },
  {
    id: 8,
    type: "debit",
    amount: 50,
    balance: 700,
    description: "Bet on Supreme Night",
    date: "Apr 30, 2023 - 17:50",
    status: "completed",
  },
];

const WalletPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [depositAmount, setDepositAmount] = useState("500");
  const [withdrawAmount, setWithdrawAmount] = useState("500");
  
  const handleDeposit = () => {
    if (!depositAmount || parseInt(depositAmount) < 100) {
      toast({
        title: "Invalid amount",
        description: "Minimum deposit amount is ₹100",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Deposit initiated",
      description: `Your deposit of ₹${depositAmount} has been initiated.`,
    });
  };
  
  const handleWithdraw = () => {
    if (!withdrawAmount || parseInt(withdrawAmount) < 100) {
      toast({
        title: "Invalid amount",
        description: "Minimum withdrawal amount is ₹100",
        variant: "destructive"
      });
      return;
    }
    
    if (parseInt(withdrawAmount) > 2500) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Withdrawal initiated",
      description: `Your withdrawal of ₹${withdrawAmount} has been initiated.`,
    });
  };
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (dateFilter === "all") return matchesSearch;
    if (dateFilter === "today") return matchesSearch && transaction.date.includes("May 5");
    if (dateFilter === "yesterday") return matchesSearch && transaction.date.includes("May 4");
    if (dateFilter === "thisWeek") return matchesSearch && transaction.date.includes("May");
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Wallet</h1>
            <p className="text-queen-text-secondary">Manage your funds and track transactions</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Link to="/dashboard" className="text-queen-text-secondary hover:text-white transition-colors">
              Dashboard
            </Link>
            <ArrowRight className="h-4 w-4 text-queen-text-secondary" />
            <span className="text-white">Wallet</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 text-white col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Balance</CardTitle>
              <CardDescription className="text-queen-text-secondary">Available for betting and withdrawal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-queen-gold">₹2,500.00</div>
            </CardContent>
            <CardFooter className="flex gap-3 pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1 bg-queen-success hover:bg-queen-success/90 text-white">
                    <ArrowDown className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-queen-dark border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Deposit Funds</DialogTitle>
                    <DialogDescription className="text-queen-text-secondary">
                      Add money to your wallet to place bets and play games.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Amount</label>
                      <Input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        min="100"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <p className="text-xs text-queen-text-secondary">Minimum deposit: ₹100</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[100, 500, 1000, 2000, 5000].map(amount => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          className={`border-white/10 ${
                            depositAmount === amount.toString() 
                              ? 'bg-queen-gold text-queen-dark border-queen-gold' 
                              : 'text-white hover:bg-white/10'
                          }`}
                          onClick={() => setDepositAmount(amount.toString())}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Payment Method</label>
                      <Select defaultValue="upi">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent className="bg-queen-dark border-white/10 text-white">
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="netbanking">Net Banking</SelectItem>
                          <SelectItem value="card">Debit/Credit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="bg-queen-gold hover:bg-queen-gold/90 text-queen-dark w-full"
                      onClick={handleDeposit}
                    >
                      Proceed to Payment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/10 hover:text-white">
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-queen-dark border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription className="text-queen-text-secondary">
                      Withdraw your winnings to your bank account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Amount</label>
                      <Input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        min="100"
                        max="2500"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <p className="text-xs text-queen-text-secondary">Available balance: ₹2,500</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[100, 500, 1000, 2000, 2500].map(amount => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          className={`border-white/10 ${
                            withdrawAmount === amount.toString() 
                              ? 'bg-queen-gold text-queen-dark border-queen-gold' 
                              : 'text-white hover:bg-white/10'
                          }`}
                          onClick={() => setWithdrawAmount(amount.toString())}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Withdrawal Method</label>
                      <Select defaultValue="bank">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select withdrawal method" />
                        </SelectTrigger>
                        <SelectContent className="bg-queen-dark border-white/10 text-white">
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="bg-queen-gold hover:bg-queen-gold/90 text-queen-dark w-full"
                      onClick={handleWithdraw}
                    >
                      Request Withdrawal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Quick Stats</CardTitle>
              <CardDescription className="text-queen-text-secondary">Your wallet activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-queen-success/20 flex items-center justify-center mr-3">
                    <ArrowDown className="h-4 w-4 text-queen-success" />
                  </div>
                  <span className="text-white/70">Total Deposits</span>
                </div>
                <span className="font-bold">₹1,500</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-queen-error/20 flex items-center justify-center mr-3">
                    <ArrowUp className="h-4 w-4 text-queen-error" />
                  </div>
                  <span className="text-white/70">Total Withdrawals</span>
                </div>
                <span className="font-bold">₹0</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-queen-warning/20 flex items-center justify-center mr-3">
                    <Tag className="h-4 w-4 text-queen-warning" />
                  </div>
                  <span className="text-white/70">Total Bets</span>
                </div>
                <span className="font-bold">₹500</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-queen-gold/20 flex items-center justify-center mr-3">
                    <WalletIcon className="h-4 w-4 text-queen-gold" />
                  </div>
                  <span className="text-white/70">Total Winnings</span>
                </div>
                <span className="font-bold">₹750</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-white/5 border-white/10 text-white mb-8">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription className="text-queen-text-secondary">
              View all your deposits, withdrawals, bets, and winnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-queen-text-secondary" />
                <Input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="pl-10 bg-white/5 border-white/10 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all" onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent className="bg-queen-dark border-white/10 text-white">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="bg-white/5 border border-white/10 mb-6">
                <TabsTrigger value="all" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">All</TabsTrigger>
                <TabsTrigger value="deposits" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Withdrawals</TabsTrigger>
                <TabsTrigger value="bets" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Bets</TabsTrigger>
                <TabsTrigger value="winnings" className="data-[state=active]:bg-queen-gold data-[state=active]:text-queen-dark">Winnings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="rounded-md border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/70">Date & Time</TableHead>
                        <TableHead className="text-white/70">Description</TableHead>
                        <TableHead className="text-white/70">Amount</TableHead>
                        <TableHead className="text-white/70">Balance</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="font-medium text-white/80">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-queen-text-secondary" />
                              {transaction.date}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className={transaction.type === "credit" ? "text-queen-success" : "text-queen-error"}>
                            {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                          </TableCell>
                          <TableCell>₹{transaction.balance}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-queen-success/20 text-queen-success">
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredTransactions.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-queen-text-secondary">No transactions found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Similar TabsContent for other tabs (deposits, withdrawals, bets, winnings) */}
              <TabsContent value="deposits">
                <div className="rounded-md border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-white/70">Date & Time</TableHead>
                        <TableHead className="text-white/70">Description</TableHead>
                        <TableHead className="text-white/70">Amount</TableHead>
                        <TableHead className="text-white/70">Balance</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter(t => t.type === "credit" && t.description.toLowerCase().includes("deposit"))
                        .map((transaction) => (
                          <TableRow key={transaction.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium text-white/80">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-queen-text-secondary" />
                                {transaction.date}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell className="text-queen-success">
                              +₹{transaction.amount}
                            </TableCell>
                            <TableCell>₹{transaction.balance}</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-queen-success/20 text-queen-success">
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  
                  {filteredTransactions.filter(t => t.type === "credit" && t.description.toLowerCase().includes("deposit")).length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-queen-text-secondary">No deposits found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
