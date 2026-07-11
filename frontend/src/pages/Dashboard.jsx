import React from 'react';

export default function Dashboard({ setCurrentTab }) {
  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', color: '#2e3b37', width: '100%' }}>
      {/* Welcome Banner */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', color: '#3d614e' }}>GNSS Analysis Center</h1>
        <p style={{ color: '#7a8c85', margin: 0 }}>Welcome to the Virtual Laboratory Control Hub.</p>
      </div>

      {/* Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={kpiCardStyle}>
          <span style={kpiLabelStyle}>Supported Constellations</span>
          <span style={kpiValueStyle}>GPS (NAVSTAR)</span>
        </div>
        <div style={kpiCardStyle}>
          <span style={kpiLabelStyle}>System Status</span>
          <span style={{ ...kpiValueStyle, color: '#4caf50' }}>● Operational</span>
        </div>
        <div style={kpiCardStyle}>
          <span style={kpiLabelStyle}>Default Reference Year</span>
          <span style={kpiValueStyle}>2026</span>
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={launchBoxStyle}>
          <div style={{ fontSize: '32px' }}></div>
          <div>
            <h3 style={{ margin: '0 0 6px 0', color: '#3d614e' }}>Interactive Skyplot Simulator</h3>
            <p style={{ margin: '0 0 12px 0', color: '#60736c', fontSize: '14px' }}>
              Track real-time satellite elevations, coordinate matrices, and visibility parameters.
            </p>
            <button onClick={() => setCurrentTab('simulation')} style={btnStyle}>
              Launch Simulator →
            </button>
          </div>
        </div>

        <div style={launchBoxStyle}>
          <div style={{ fontSize: '32px' }}></div>
          <div>
            <h3 style={{ margin: '0 0 6px 0', color: '#3d614e' }}>Dedicated DOP Analysis Terminal</h3>
            <p style={{ margin: '0 0 12px 0', color: '#60736c', fontSize: '14px' }}>
              Evaluate geometry parameters including GDOP, PDOP, HDOP, and clock biases.
            </p>
            <button onClick={() => setCurrentTab('dop')} style={btnStyle}>
              Open DOP Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const kpiCardStyle = { background: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2ece7', display: 'flex', flexDirection: 'column', gap: '8px' };
const kpiLabelStyle = { fontSize: '11px', color: '#7a8c85', fontWeight: 'bold', textTransform: 'uppercase' };
const kpiValueStyle = { fontSize: '18px', color: '#2e3b37', fontWeight: '700' };
const launchBoxStyle = { background: '#fff', border: '1px solid #e2ece7', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' };
const btnStyle = { backgroundColor: '#3d614e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };