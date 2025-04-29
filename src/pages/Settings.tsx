import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Palette } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { User as UserType } from '../types';

interface SettingsProps {
  user: UserType;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy', icon: <Lock className="w-5 h-5" /> },
    { id: 'appearance', name: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'integrations', name: 'Integrations', icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 max-w-3xl">
          {activeTab === 'profile' && (
            <Card title="Profile Settings">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <div className="mt-2 flex items-center space-x-4">
                    <img
                      src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Profile"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Write a few sentences about yourself"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card title="Notification Preferences">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive email updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after: h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card title="Privacy Settings">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Profile Visibility</h4>
                  <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Data Sharing</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Share analytics with partners</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Allow third-party integrations</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Account Protection</h4>
                  <Button variant="outline" size="sm">Enable Two-Factor Authentication</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card title="Appearance Settings">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border rounded-lg text-center hover:border-blue-500">
                      <div className="h-20 bg-white border rounded mb-2"></div>
                      <span className="text-sm">Light</span>
                    </button>
                    <button className="p-4 border rounded-lg text-center hover:border-blue-500">
                      <div className="h-20 bg-gray-900 border rounded mb-2"></div>
                      <span className="text-sm">Dark</span>
                    </button>
                    <button className="p-4 border rounded-lg text-center hover:border-blue-500">
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 border rounded mb-2"></div>
                      <span className="text-sm">System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Color Scheme</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {['#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#6B7280'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-transparent hover:ring-gray-300"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Font Size</h4>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    defaultValue="16"
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card title="Platform Integrations">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=50"
                      alt="Instagram"
                      className="w-8 h-8 rounded"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium">Instagram</h4>
                      <p className="text-sm text-gray-500">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=50"
                      alt="YouTube"
                      className="w-8 h-8 rounded"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium">YouTube</h4>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=50"
                      alt="Twitter"
                      className="w-8 h-8 rounded"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium">Twitter</h4>
                      <p className="text-sm text-gray-500">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;