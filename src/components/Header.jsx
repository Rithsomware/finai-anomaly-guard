
import React from 'react';
import { ChevronRight, BarChart3, FileText, Upload, Home, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary p-1 rounded">
            <BarChart3 className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">FIN.AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
            <Home className="mr-1 h-4 w-4" />
            Home
          </Link>
          <Link to="/education" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
            <BookOpen className="mr-1 h-4 w-4" />
            Educational Resources
          </Link>
          <Link to="/" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
            <Upload className="mr-1 h-4 w-4" />
            Upload Data
          </Link>
          <Link to="/" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
            <FileText className="mr-1 h-4 w-4" />
            Documentation
          </Link>
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
