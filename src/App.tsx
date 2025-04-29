import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Audience from './pages/Audience';
import Settings from './pages/Settings';
import { mockUser, mockProfiles } from './utils/mockData';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(mockProfiles[0].id);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    closeSidebar();
  };

  const selectedProfile = mockProfiles.find(profile => profile.id === selectedProfileId) || mockProfiles[0];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          userName={mockUser.name} 
          toggleSidebar={toggleSidebar}
        />
        
        <div className="md:flex pt-16">
          <Sidebar 
            isOpen={sidebarOpen}
            closeSidebar={closeSidebar}
            profiles={mockProfiles}
            selectedProfileId={selectedProfileId}
            onSelectProfile={handleSelectProfile}
          />
          
          <main className="flex-1 min-w-0 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard selectedProfile={selectedProfile} />} />
              <Route path="/analytics" element={<Analytics selectedProfile={selectedProfile} />} />
              <Route path="/audience" element={<Audience selectedProfile={selectedProfile} />} />
              <Route path="/settings" element={<Settings user={mockUser} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;