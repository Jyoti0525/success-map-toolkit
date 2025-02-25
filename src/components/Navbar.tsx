
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-navy">PlacementPath</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-navy hover:text-navy-light transition-colors">
              Dashboard
            </Link>
            <Link to="/interview-prep" className="text-navy hover:text-navy-light transition-colors">
              Interview Prep
            </Link>
            <Link to="/company-matcher" className="text-navy hover:text-navy-light transition-colors">
              Company Matcher
            </Link>
            <Button variant="default" className="bg-navy hover:bg-navy-light text-white">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-16 left-0 w-full border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/dashboard"
                className="text-navy hover:text-navy-light transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/interview-prep"
                className="text-navy hover:text-navy-light transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Interview Prep
              </Link>
              <Link
                to="/company-matcher"
                className="text-navy hover:text-navy-light transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Company Matcher
              </Link>
              <Button
                variant="default"
                className="bg-navy hover:bg-navy-light text-white w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
