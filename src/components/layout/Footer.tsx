
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-queen-card border-t border-white/10 pt-12 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center text-2xl font-heading font-bold mb-4">
              <span className="text-queen-gold">Queen</span>
              <span className="text-white">Games</span>
            </Link>
            <p className="text-queen-text-secondary mb-4">
              Experience the next level of online gaming with our sleek, modern platform built for serious players.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/games/all">Games</FooterLink>
              <FooterLink to="/how-to-play">How to Play</FooterLink>
              <FooterLink to="/results">Results</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-medium mb-4">Games</h4>
            <ul className="space-y-2">
              <FooterLink to="/games/number">Number Games</FooterLink>
              <FooterLink to="/games/option">Option Games</FooterLink>
              <FooterLink to="/games/jodi">Jodi Games</FooterLink>
              <FooterLink to="/games/harf">Harf Games</FooterLink>
              <FooterLink to="/games/crossing">Crossing Games</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/responsible-gaming">Responsible Gaming</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-queen-text-secondary text-sm mb-2 md:mb-0">
              &copy; {currentYear} Queen Games. All rights reserved.
            </p>
            <p className="text-queen-text-secondary text-sm">
              18+ | Gamble Responsibly
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <a
      href="#"
      className="w-8 h-8 rounded-full bg-white/5 hover:bg-queen-gold/20 flex items-center justify-center text-queen-text-secondary hover:text-queen-gold transition-colors"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        to={to}
        className="text-queen-text-secondary hover:text-queen-gold transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
