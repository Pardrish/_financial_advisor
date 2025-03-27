
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { ChartLine, ShieldAlert, MessageSquare } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md",
        isScrolled 
          ? "bg-background/80 shadow-sm" 
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ChartLine className="h-6 w-6 text-primary" />
              <span className="text-xl font-medium tracking-tight">Portfolio Tracker</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink to="/" exact label="Portfolio" icon={<ChartLine className="h-4 w-4" />} />
            <NavLink to="/chat" label="Chat Assistant" icon={<MessageSquare className="h-4 w-4" />} />
            <NavLink to="/fraud-alerts" label="Fraud Alerts" icon={<ShieldAlert className="h-4 w-4" />} />
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button - simplified for this version */}
            <button className="p-2 rounded-md text-foreground hover:bg-secondary transition-colors">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, exact }) => {
  // For a real implementation, you'd use a proper router hook to check if the link is active
  const isActive = window.location.pathname === to || (!exact && window.location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:text-foreground hover:bg-secondary"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default NavBar;
