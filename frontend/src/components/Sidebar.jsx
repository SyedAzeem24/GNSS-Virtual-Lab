import React from 'react';

export default function Sidebar({ isMobile, currentTab, setCurrentTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard'},
    { id: 'simulation', label: 'Simulation'},
    { id: 'dop', label: 'DOP Analysis' },
    { id: 'information', label: 'Information'}
  ];

  return (
    <div style={{
      width: isMobile ? '100%' : '240px',
      minWidth: isMobile ? '100%' : '240px',
      backgroundColor: '#2e3b37',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px', color: '#a3b899' }}>
        GNSS Lab
      </div>

      <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)} // 👈 THIS Wires up the active navigation click!
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: isMobile ? 'auto' : '100%',
                padding: '12px 16px',
                backgroundColor: isActive ? '#3d614e' : 'transparent',
                color: isActive ? '#fff' : '#b2c2bc',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: isActive ? 'bold' : 'normal',
                transition: 'background 0.2s'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}