import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const { wallet } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-queen-dark-secondary">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-white">
            Queen Games
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {/* Add Results link here */}
            <Link
              to="/results"
              className="text-queen-text-secondary hover:text-white transition-colors"
            >
              Results
            </Link>
            
            <Link
              to="/games"
              className="text-queen-text-secondary hover:text-white transition-colors"
            >
              Games
            </Link>
            <Link
              to="/markets"
              className="text-queen-text-secondary hover:text-white transition-colors"
            >
              Markets
            </Link>
            <Link
              to="/toss-games"
              className="text-queen-text-secondary hover:text-white transition-colors"
            >
              Toss Games
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/notifications"
                  className="text-queen-text-secondary hover:text-white transition-colors"
                >
                  Notifications
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full h-full block">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/wallet" className="w-full h-full block">
                        Wallet ({wallet?.balance})
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/transactions" className="w-full h-full block">
                        Transactions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="text-queen-text-secondary hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="text-white bg-queen-gold hover:bg-queen-gold/90 py-2 px-4 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore the app and manage your account.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-4">
                <Link to="/" className="block py-2 text-sm font-medium hover:underline">
                  Home
                </Link>
                <Link to="/games" className="block py-2 text-sm font-medium hover:underline">
                  Games
                </Link>
                <Link to="/markets" className="block py-2 text-sm font-medium hover:underline">
                  Markets
                </Link>
                <Link to="/toss-games" className="block py-2 text-sm font-medium hover:underline">
                  Toss Games
                </Link>
                <Link
                  to="/results"
                  className="block py-2 text-sm font-medium hover:underline"
                >
                  Results
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="block py-2 text-sm font-medium hover:underline">
                      Profile
                    </Link>
                    <Link to="/wallet" className="block py-2 text-sm font-medium hover:underline">
                      Wallet
                    </Link>
                    <Link to="/notifications" className="block py-2 text-sm font-medium hover:underline">
                      Notifications
                    </Link>
                    <Button variant="destructive" size="sm" className="w-full" onClick={() => signOut()}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/sign-in" className="block py-2 text-sm font-medium hover:underline">
                      Sign In
                    </Link>
                    <Link to="/sign-up" className="block py-2 text-sm font-medium hover:underline">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Make sure to add Results to mobile menu as well */}
          <div
            className={`fixed inset-0 z-50 bg-black/90 transform ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:hidden`}
          >
            <div className="flex items-center justify-between p-4">
              <Link to="/" className="text-lg font-bold text-white">
                Queen Games
              </Link>
              <Button variant="ghost" onClick={toggleMobileMenu}>
                Close
              </Button>
            </div>
            
            <div className="flex flex-col space-y-4 p-6">
              {/* Add Results link to mobile menu */}
              <Link
                to="/results"
                className="text-white hover:text-queen-gold transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Results
              </Link>
              
              <Link
                to="/games"
                className="text-white hover:text-queen-gold transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Games
              </Link>
              <Link
                to="/markets"
                className="text-white hover:text-queen-gold transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Markets
              </Link>
              <Link
                to="/toss-games"
                className="text-white hover:text-queen-gold transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Toss Games
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:text-queen-gold transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/wallet"
                    className="text-white hover:text-queen-gold transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Wallet
                  </Link>
                  <Link
                    to="/notifications"
                    className="text-white hover:text-queen-gold transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Notifications
                  </Link>
                  <Button variant="destructive" size="sm" className="w-full" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="text-white hover:text-queen-gold transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-white bg-queen-gold hover:bg-queen-gold/90 py-2 px-4 rounded-md transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
