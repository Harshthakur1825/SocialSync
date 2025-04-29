import React, { useState, useEffect } from 'react';
import { Bell, User, Menu, Search, X } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatar,
  toggleSidebar,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu button and logo */}
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-shrink-0 flex items-center ml-4 md:ml-0">
              <span className="text-blue-600 font-bold text-xl">SocialSync</span>
            </div>
          </div>
          
          {/* Center - Search */}
          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search profiles or metrics..."
              />
            </div>
          </div>
          
          {/* Mobile search button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Search className="h-6 w-6" />
            )}
          </button>
          
          {/* Right side - Notifications and profile */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            
            <div className="ml-3 relative">
              <div className="flex items-center">
                {userAvatar ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={userAvatar}
                    alt={userName}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
                  {userName}
                </span>
              </div>
            </div>
            
            <div className="ml-4 hidden md:block">
              <Button
                size="sm"
                variant="primary"
              >
                Add Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile search, only visible when search is open */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 px-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search profiles or metrics..."
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;