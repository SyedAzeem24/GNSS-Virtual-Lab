import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children, currentTab, setCurrentTab }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      width: '100vw',
      minHeight: '100vh', 
      backgroundColor: '#f0f4f2',
    }}>
      <Sidebar isMobile={isMobile} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box'
        
      }}>
        {children}
      </main>
    </div>
  );
}