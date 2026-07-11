import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard'; // We will create this next
import Simulation from './pages/Simulation';
import Dop from './pages/Dop';

export default function App() {
  // 💡 Opening application state changed to 'dashboard'
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <MainLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {currentTab === 'dashboard' && <Dashboard setCurrentTab={setCurrentTab} />}
      {currentTab === 'simulation' && <Simulation />}
      {currentTab === 'dop' && <Dop />}
      {currentTab === 'information' && (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
          <h3 style={{ color: 'var(--text-main)' }}>Information Module</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            GNSS Satellite Orbit calculations and Ephemeris data documentation.
          </p>
        </div>
      )}
    </MainLayout>
  );
}