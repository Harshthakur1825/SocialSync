import React from 'react';
import { Instagram, Youtube, Twitter, ExternalLink } from 'lucide-react';
import { SocialProfile } from '../../types';
import Card from '../ui/Card';

interface ProfileCardProps {
  profile: SocialProfile;
  isSelected?: boolean;
  onClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isSelected = false,
  onClick,
}) => {
  const getPlatformIcon = () => {
    switch (profile.platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getPlatformColor = () => {
    switch (profile.platform) {
      case 'instagram':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'youtube':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'twitter':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      className={`transition-all duration-200 cursor-pointer hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {profile.avatar ? (
            <img 
              src={profile.avatar} 
              alt={profile.name || profile.handle} 
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              {getPlatformIcon()}
            </div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-base font-medium text-gray-900">{profile.name || profile.handle}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <div className={`text-xs px-2 py-0.5 rounded-full ${getPlatformColor()}`}>
              {profile.platform}
            </div>
            <span className="text-sm text-gray-500">@{profile.handle}</span>
          </div>
        </div>
        {profile.url && (
          <a 
            href={profile.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-gray-400 hover:text-gray-500"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;