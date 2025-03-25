
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

export type TransactionType = "deposit" | "withdrawal" | "bet" | "win" | "bonus";
export type TransactionStatus = "pending" | "approved" | "rejected" | "completed";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  paymentDetails?: {
    utrNumber?: string;
    paymentScreenshot?: string;
    paymentMethod?: string;
    accountDetails?: string;
  };
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  rejectionReason?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  createDeposit: (amount: number, paymentDetails: { utrNumber: string, paymentScreenshot: string, paymentMethod: string }) => Promise<void>;
  createWithdrawal: (amount: number, accountDetails: string) => Promise<void>;
  approveTransaction: (id: string) => Promise<void>;
  rejectTransaction: (id: string, reason: string) => Promise<void>;
  getUserTransactions: (userId?: string) => Transaction[];
  getPendingTransactions: () => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};

// Initial mock transactions
const initialTransactions: Transaction[] = [
  {
    id: "tx1",
    userId: "user123",
    type: "deposit",
    amount: 2000,
    status: "approved",
    paymentDetails: {
      utrNumber: "UTR123456789",
      paymentMethod: "UPI",
      paymentScreenshot: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 82800000).toISOString(),
    approvedBy: "admin1",
  },
  {
    id: "tx2",
    userId: "user123",
    type: "withdrawal",
    amount: 1000,
    status: "pending",
    paymentDetails: {
      accountDetails: "Bank Account: XXXX1234",
    },
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "tx3",
    userId: "user123",
    type: "bet",
    amount: 500,
    status: "completed",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "tx4",
    userId: "user123",
    type: "win",
    amount: 1200,
    status: "completed",
    createdAt: new Date(Date.now() - 172000000).toISOString(),
    updatedAt: new Date(Date.now() - 172000000).toISOString(),
  },
];

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Load transactions from localStorage or use initial transactions
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(initialTransactions);
    }
  }, []);

  useEffect(() => {
    // Save transactions to localStorage whenever they change
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const createDeposit = async (
    amount: number, 
    paymentDetails: { utrNumber: string; paymentScreenshot: string; paymentMethod: string; }
  ) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `tx${Date.now()}`,
        userId: user.id,
        type: "deposit",
        amount,
        status: "pending",
        paymentDetails,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setTransactions([newTransaction, ...transactions]);
      
      addNotification({
        title: "Deposit Request Submitted",
        message: `Your deposit request of ₹${amount} has been submitted and is pending approval.`,
        type: "info"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createWithdrawal = async (amount: number, accountDetails: string) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `tx${Date.now()}`,
        userId: user.id,
        type: "withdrawal",
        amount,
        status: "pending",
        paymentDetails: {
          accountDetails,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setTransactions([newTransaction, ...transactions]);
      
      addNotification({
        title: "Withdrawal Request Submitted",
        message: `Your withdrawal request of ₹${amount} has been submitted and is pending approval.`,
        type: "info"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const approveTransaction = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(transactions.map(tx => {
        if (tx.id === id) {
          return {
            ...tx,
            status: "approved",
            updatedAt: new Date().toISOString(),
            approvedBy: "admin", // In a real app, this would be the admin's ID
          };
        }
        return tx;
      }));
      
      // Find the transaction to get details for the notification
      const transaction = transactions.find(tx => tx.id === id);
      if (transaction) {
        addNotification({
          title: `${transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} Approved`,
          message: `Your ${transaction.type} of ₹${transaction.amount} has been approved.`,
          type: "success"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const rejectTransaction = async (id: string, reason: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(transactions.map(tx => {
        if (tx.id === id) {
          return {
            ...tx,
            status: "rejected",
            updatedAt: new Date().toISOString(),
            rejectionReason: reason,
          };
        }
        return tx;
      }));
      
      // Find the transaction to get details for the notification
      const transaction = transactions.find(tx => tx.id === id);
      if (transaction) {
        addNotification({
          title: `${transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} Rejected`,
          message: `Your ${transaction.type} of ₹${transaction.amount} has been rejected: ${reason}`,
          type: "error"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTransactions = (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return [];
    return transactions.filter(tx => tx.userId === targetUserId);
  };

  const getPendingTransactions = () => {
    return transactions.filter(tx => tx.status === "pending");
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      isLoading,
      createDeposit,
      createWithdrawal,
      approveTransaction,
      rejectTransaction,
      getUserTransactions,
      getPendingTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
