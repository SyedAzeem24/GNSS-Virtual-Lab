import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ncgsaLogo from '../assets/ncgsa-logo.png'; 

// --- STYLES DEFINED BEFORE COMPONENT ---
const sidebarWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '260px',
  boxSizing: 'border-box',
  padding: '24px 18px',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
};

const brandHeaderStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '35px', paddingLeft: '4px' };
const logoImageStyle = { width: '34px', height: '34px', objectFit: 'contain', filter: 'brightness(0.9)' };
const brandTitleStyle = { fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px', color: '#f8fafc', lineHeight: '1.2' };
const brandSubtitleStyle = { fontSize: '10px', color: '#64748b', fontWeight: '500' };
const closeSidebarButtonStyle = { background: 'none', border: 'none', color: '#64748b', fontSize: '14px', cursor: 'pointer' };
const navigationStackStyle = { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 };
const navButtonStyle = { display: 'flex', alignItems: 'center', width: '100%', padding: '12px 14px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '13.5px', fontWeight: '500', border: 'none', transition: 'all 0.2s ease' };
const profileFooterSectionStyle = { position: 'relative', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' };
const profileActionTriggerStyle = { background: 'none', border: 'none', width: '100%', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 0.2s' };
const avatarPlaceholderStyle = { width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500', fontSize: '13px', flexShrink: 0 };
const sidebarDropdownCardStyle = { position: 'absolute', bottom: '65px', left: '0', right: '0', backgroundColor: '#0d0f12', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 110 };
const dropdownItemStyle = { width: '100%', background: 'none', border: 'none', padding: '12px 14px', textAlign: 'left', color: '#94a3b8', fontSize: '13px', cursor: 'pointer', display: 'block', transition: 'background 0.2s' };

// --- COMPONENT DEFINITION ---
export default function Sidebar({ currentTab, setCurrentTab, onCloseSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'simulation', label: 'Simulation Stage' },
    { id: 'positioning', label: 'Positioning Estimation' },
    { id: 'dop', label: 'DOP Analysis' },
    { id: 'logs', label: 'Saved Logs' },
    
  ];

  return (
    <div style={sidebarWrapperStyle}>
      <div style={brandHeaderStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={ncgsaLogo} alt="Logo" style={logoImageStyle} />
          <div>
            <div style={brandTitleStyle}>NCGSA</div>
            <div style={brandSubtitleStyle}>Space Simulation Lab</div>
          </div>
        </div>
        <button onClick={onCloseSidebar} style={closeSidebarButtonStyle}>✕</button>
      </div>

      <nav style={navigationStackStyle}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setCurrentTab(item.id); onCloseSidebar(); }}
            style={{
              ...navButtonStyle,
              backgroundColor: currentTab === item.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent', 
              color: currentTab === item.id ? '#f8fafc' : '#94a3b8',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div style={profileFooterSectionStyle} ref={profileDropdownRef}>
        <button onClick={() => setIsProfileOpen(!isProfileOpen)} style={profileActionTriggerStyle}>
          <div style={avatarPlaceholderStyle}>{user?.full_name?.charAt(0).toUpperCase() || 'U'}</div>
          <div style={{ overflow: 'hidden', textAlign: 'left' }}>
            <div style={{ color: '#f8fafc', fontSize: '13px', fontWeight: '500' }}>{user?.full_name || 'Account'}</div>
            <div style={{ color: '#64748b', fontSize: '10px' }}>{user?.email || 'User Settings'}</div>
          </div>
        </button>

        {isProfileOpen && (
          <div style={sidebarDropdownCardStyle}>
            <button onClick={() => { setCurrentTab('settings'); setIsProfileOpen(false); }} style={dropdownItemStyle}>
              ⚙️ System Settings
            </button>
            <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }}></div>
            <button onClick={handleSignOut} style={{ ...dropdownItemStyle, color: '#ff6b6b' }}>
              🛑 Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}