// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState("signin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    
    if (authStatus) {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);
  
  const handleSignIn = () => {
    setAuthModalView("signin");
    setIsAuthModalOpen(true);
  };
  
  const handleSignUp = () => {
    setAuthModalView("signup");
    setIsAuthModalOpen(true);
  };
  
  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <div className="text-xl font-bold text-navy">PlacementPath</div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-navy/80 hover:text-navy transition-colors">
            Dashboard
          </Link>
          <Link to="/interview-prep" className="text-navy/80 hover:text-navy transition-colors">
            Interview Prep
          </Link>
          <Link to="/company-matcher" className="text-navy/80 hover:text-navy transition-colors">
            Company Matcher
          </Link>
        </nav>
        
        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-navy/20">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center mr-2">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  {user?.name || "User"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="bg-navy hover:bg-navy-dark"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          )}
        </div>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          initialView={authModalView}
        />
      </div>
    </header>
  );
};