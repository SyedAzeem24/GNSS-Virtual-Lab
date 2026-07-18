import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ 
  children, 
  currentTab, 
  setCurrentTab, 
  onCreateNote,
  style 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ ...layoutWrapperStyle, ...style }}> 
      <div style={lowerSectionStyle}>
        
        {/* Sliding Sidebar */}
        <div style={{
          ...sidebarContainerTransitionStyle,
          width: isSidebarOpen ? '260px' : '0px',
        }}>
          {isSidebarOpen && (
            <Sidebar 
              currentTab={currentTab} 
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                setIsSidebarOpen(false); 
              }} 
              onCreateNote={onCreateNote}
              onCloseSidebar={() => setIsSidebarOpen(false)} 
            />
          )}
        </div>

        {/* Core Content Panel */}
        <main style={mainContentPanelStyle}>
          
          {/* Floating Trigger Button */}
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              style={floatingModulesButtonStyle}
              title="Open Modules Menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}

const layoutWrapperStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  height: '100vh', 
  backgroundColor: 'transparent', // Ensure base is clear
  overflow: 'hidden' 
};

const lowerSectionStyle = { 
  display: 'flex', 
  flex: 1, 
  position: 'relative', 
  overflow: 'hidden', 
  height: '100%',
  backgroundColor: 'transparent' // Force clear
};

const sidebarContainerTransitionStyle = { 
  backgroundColor: 'rgba(14, 13, 17, 0.6)', 
  backdropFilter: 'blur(20px)',
  height: '100%', 
  overflowX: 'hidden', 
  overflowY: 'auto', 
  transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
  display: 'flex', 
  flexDirection: 'column', 
  flexShrink: 0,
  zIndex: 100 // Keep sidebar above background
};

const mainContentPanelStyle = {
    flex: 1,
    padding: '30px',
    paddingTop: '80px',
    overflowY: 'auto',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    position: 'relative',
    transition: 'padding 0.25s ease'
};

const floatingModulesButtonStyle = { 
  position: 'absolute',
  top: '24px',
  left: '24px',
  zIndex: 90,
  background: 'rgba(255, 255, 255, 0.01)', 
  cursor: 'pointer', 
  display: 'flex', 
  alignItems: 'center', 
  padding: '10px 16px', 
  borderRadius: '10px', 
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)', 
  transition: 'all 0.2s ease'
};
