
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-queen-dark/90 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-heading font-bold"
          >
            <span className="text-queen-gold">Queen</span>
            <span className="text-white">Games</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/sign-in"
              className="flex items-center text-queen-text-primary hover:text-queen-gold transition-colors px-3 py-2"
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </Link>
            <Link
              to="/sign-up"
              className="flex items-center bg-queen-gold text-queen-dark font-semibold px-4 py-2 rounded-lg hover:bg-queen-gold/90 transition-all"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="lg:hidden text-queen-text-primary hover:text-queen-gold"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 animate-fade-in" />
            ) : (
              <Menu className="h-6 w-6 animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-queen-card border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4 mb-4">
              <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <Link
                to="/sign-in"
                className="flex items-center justify-center text-queen-text-primary hover:text-queen-gold transition-colors px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/sign-up"
                className="flex items-center justify-center bg-queen-gold text-queen-dark font-semibold px-4 py-2 rounded-lg hover:bg-queen-gold/90 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link
        to="/"
        className="text-queen-text-primary hover:text-queen-gold transition-colors"
      >
        Home
      </Link>
      <DropdownLink
        title="Games"
        links={[
          { to: "/games/number", label: "Number Games" },
          { to: "/games/option", label: "Option Games" },
          { to: "/games/jodi", label: "Jodi Games" },
          { to: "/games/all", label: "All Games" },
        ]}
      />
      <Link
        to="/how-to-play"
        className="text-queen-text-primary hover:text-queen-gold transition-colors"
      >
        How to Play
      </Link>
      <Link
        to="/results"
        className="text-queen-text-primary hover:text-queen-gold transition-colors"
      >
        Results
      </Link>
      <Link
        to="/contact"
        className="text-queen-text-primary hover:text-queen-gold transition-colors"
      >
        Contact
      </Link>
    </>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      <Link
        to="/"
        className="text-queen-text-primary hover:text-queen-gold transition-colors py-2"
        onClick={closeMenu}
      >
        Home
      </Link>
      <MobileDropdownLink
        title="Games"
        links={[
          { to: "/games/number", label: "Number Games" },
          { to: "/games/option", label: "Option Games" },
          { to: "/games/jodi", label: "Jodi Games" },
          { to: "/games/all", label: "All Games" },
        ]}
        closeMenu={closeMenu}
      />
      <Link
        to="/how-to-play"
        className="text-queen-text-primary hover:text-queen-gold transition-colors py-2"
        onClick={closeMenu}
      >
        How to Play
      </Link>
      <Link
        to="/results"
        className="text-queen-text-primary hover:text-queen-gold transition-colors py-2"
        onClick={closeMenu}
      >
        Results
      </Link>
      <Link
        to="/contact"
        className="text-queen-text-primary hover:text-queen-gold transition-colors py-2"
        onClick={closeMenu}
      >
        Contact
      </Link>
    </>
  );
};

const DropdownLink = ({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center text-queen-text-primary hover:text-queen-gold transition-colors">
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md overflow-hidden border border-white/10 bg-queen-card shadow-lg glass animate-fade-in">
          <div className="py-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2 text-sm text-queen-text-primary hover:bg-queen-gold hover:text-queen-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileDropdownLink = ({
  title,
  links,
  closeMenu,
}: {
  title: string;
  links: { to: string; label: string }[];
  closeMenu: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full text-queen-text-primary hover:text-queen-gold transition-colors py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pl-4 border-l border-white/10 mt-1 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-queen-text-primary hover:text-queen-gold transition-colors"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
