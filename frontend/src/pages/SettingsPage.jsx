import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.full_name || '',
    email: user?.email || ''
  });

  const handleUpdate = async () => {
    // Perform your PATCH/PUT request to your backend here
    // Example: fetch('/api/user/update', { method: 'PATCH', body: JSON.stringify(formData) })
    alert("Profile updated!");
  };

  return (
    <div style={glassStyle}>
      <h2 style={{ color: '#fff' }}>Edit Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={inputStyle} 
        />
        <button onClick={handleUpdate} style={buttonStyle}>Save Changes</button>
      </div>
    </div>
  );
}

const glassStyle = { /* reuse your glassStyle object */ };
const inputStyle = { padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', color: '#fff' };
const buttonStyle = { padding: '10px', borderRadius: '8px', cursor: 'pointer', background: '#38bdf8', border: 'none' };