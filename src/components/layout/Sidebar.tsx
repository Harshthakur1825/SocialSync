import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Users, Settings, PlusCircle, X } from 'lucide-react';
import Button from '../ui/Button';
import { SocialProfile } from '../../types';
import ProfileCard from '../profile/ProfileCard';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  profiles: SocialProfile[];
  selectedProfileId?: string;
  onSelectProfile: (profileId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  closeSidebar,
  profiles,
  selectedProfileId,
  onSelectProfile,
}) => {
  const navigationItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/' },
    { name: 'Analytics', icon: <BarChart2 className="h-5 w-5" />, path: '/analytics' },
    { name: 'Audience', icon: <Users className="h-5 w-5" />, path: '/audience' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:z-0`}
      >
        <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="px-4 flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">SocialSync</span>
            </div>
            <button
              type="button"
              className="md:hidden rounded-md text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={closeSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-4 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                onClick={closeSidebar}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Profiles section */}
          <div className="mt-8 px-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Your Profiles</h3>
              <Button
                size="sm"
                variant="ghost"
                icon={<PlusCircle className="h-4 w-4" />}
              >
                Add New
              </Button>
            </div>
            
            <div className="mt-2 space-y-3">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  isSelected={profile.id === selectedProfileId}
                  onClick={() => onSelectProfile(profile.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto px-4 pb-4">
            <Button
              variant="outline"
              fullWidth
              icon={<PlusCircle className="h-4 w-4" />}
            >
              Connect New Platform
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;