
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Filter,
  CreditCard,
  Wallet as WalletIcon,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Wallet = () => {
  const { user } = useAuth();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  return (
    <DashboardLayout
      pageTitle="Wallet"
      pageDescription="Manage your funds and transactions"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
            <CardDescription className="text-white/70">Your current account balance</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-queen-gold to-queen-gold/80 flex items-center justify-center mb-4">
              <WalletIcon size={32} className="text-queen-dark" />
            </div>
            
            <div className="text-3xl font-bold text-queen-gold mb-1">₹{user?.balance?.toLocaleString() || "0"}</div>
            <p className="text-sm text-queen-text-secondary">Available Balance</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4 w-full">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Deposit
              </Button>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                <Minus className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 bg-white/5 border-white/10 text-white">
          <Tabs defaultValue="deposit" className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add/Withdraw Funds</CardTitle>
                <TabsList className="bg-white/5">
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription className="text-white/70">Add or withdraw funds from your wallet</CardDescription>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="deposit" className="mt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Amount (₹)</Label>
                      <Input 
                        id="deposit-amount" 
                        placeholder="Enter amount to deposit" 
                        value={depositAmount} 
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deposit-method">Payment Method</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:border-queen-gold transition-colors">
                          <CreditCard className="h-6 w-6 mb-2 text-queen-gold" />
                          <span className="font-medium">UPI</span>
                        </div>
                        <div className="border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:border-queen-gold transition-colors">
                          <ArrowRightLeft className="h-6 w-6 mb-2 text-queen-gold" />
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Request Deposit
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="withdraw" className="mt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Amount (₹)</Label>
                      <Input 
                        id="withdraw-amount" 
                        placeholder="Enter amount to withdraw" 
                        value={withdrawAmount} 
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-method">Bank Account</Label>
                      <div className="border border-white/10 rounded-lg p-4 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold">B</span>
                          </div>
                          <div>
                            <div className="font-medium">Bank of India</div>
                            <div className="text-sm text-queen-text-secondary">XXXX XXXX XXXX 4321</div>
                          </div>
                        </div>
                        <div className="text-queen-gold text-sm">Default</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Minus className="mr-2 h-4 w-4" />
                    Request Withdrawal
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      
      <div className="mt-6 bg-queen-card/30 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Transaction History</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-queen-text-secondary">Transaction ID</TableHead>
                <TableHead className="text-queen-text-secondary">Date</TableHead>
                <TableHead className="text-queen-text-secondary">Type</TableHead>
                <TableHead className="text-queen-text-secondary">Status</TableHead>
                <TableHead className="text-queen-text-secondary">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index} className="border-white/10">
                  <TableCell className="font-medium">
                    TX-{1000000 + index}
                  </TableCell>
                  <TableCell>
                    {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {index % 3 === 0 ? (
                        <>
                          <div className="mr-2 h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                            <ArrowDownRight className="h-4 w-4 text-green-500" />
                          </div>
                          <span>Deposit</span>
                        </>
                      ) : index % 3 === 1 ? (
                        <>
                          <div className="mr-2 h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                            <ArrowUpRight className="h-4 w-4 text-red-500" />
                          </div>
                          <span>Withdrawal</span>
                        </>
                      ) : (
                        <>
                          <div className="mr-2 h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-purple-500" />
                          </div>
                          <span>Game Bet</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      index % 4 === 0 || index % 4 === 2 
                        ? 'bg-green-500/10 text-green-500' 
                        : index % 4 === 1 
                        ? 'bg-yellow-500/10 text-yellow-500' 
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {index % 4 === 0 || index % 4 === 2 
                        ? 'Completed' 
                        : index % 4 === 1 
                        ? 'Pending' 
                        : 'Processing'}
                    </span>
                  </TableCell>
                  <TableCell className={
                    index % 3 === 0 
                      ? 'text-green-500' 
                      : index % 3 === 1 
                      ? 'text-red-500' 
                      : 'text-purple-500'
                  }>
                    {index % 3 === 0 
                      ? `+₹${(Math.floor(Math.random() * 10) + 1) * 500}` 
                      : index % 3 === 1 
                      ? `-₹${(Math.floor(Math.random() * 10) + 1) * 300}` 
                      : `-₹${(Math.floor(Math.random() * 10) + 1) * 100}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
