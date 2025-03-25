
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGames from "./pages/AdminGames";
import GameListing from "./pages/GameListing";
import GameDetail from "./pages/GameDetail";
import Wallet from "./pages/Wallet";
import UserProfile from "./pages/UserProfile";
import AdminUsers from "./pages/AdminUsers";
import GameResults from "./pages/GameResults";
import Notifications from "./pages/Notifications";
import Transactions from "./pages/Transactions";
import TossGames from "./pages/TossGames";
import TossGameDetail from "./pages/TossGameDetail";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/games" element={<AdminGames />} />
              <Route path="/admin/transactions" element={<Transactions />} />
              <Route path="/games" element={<GameListing />} />
              <Route path="/games/:slug" element={<GameDetail />} />
              <Route path="/toss-games" element={<TossGames />} />
              <Route path="/toss-games/:id" element={<TossGameDetail />} />
              <Route path="/game-results" element={<GameResults />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
