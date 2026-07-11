import React, { useState } from 'react';

// Comprehensive Location Presets Across Pakistan
const PAKISTAN_LOCATIONS = {
  custom: { name: 'Custom Coordinates', lat: '', lng: '', alt: '' },
  karachi: { name: 'Karachi (Sindh)', lat: '24.8607', lng: '67.0011', alt: '10' },
  lahore: { name: 'Lahore (Punjab)', lat: '31.5204', lng: '74.3587', alt: '217' },
  faisalabad: { name: 'Faisalabad (Punjab)', lat: '31.4504', lng: '73.1350', alt: '184' },
  rawalpindi: { name: 'Rawalpindi (Punjab)', lat: '33.5651', lng: '73.0169', alt: '508' },
  peshawar: { name: 'Peshawar (KPK)', lat: '34.0151', lng: '71.5249', alt: '331' },
  quetta: { name: 'Quetta (Balochistan)', lat: '30.1798', lng: '66.9750', alt: '1680' },
  multan: { name: 'Multan (Punjab)', lat: '30.1575', lng: '71.5249', alt: '122' },
  gujranwala: { name: 'Gujranwala (Punjab)', lat: '32.1877', lng: '74.1945', alt: '226' },
  hyderabad: { name: 'Hyderabad (Sindh)', lat: '25.3960', lng: '68.3578', alt: '13' },
  gilgit: { name: 'Gilgit (Gilgit-Baltistan)', lat: '35.9208', lng: '74.3089', alt: '1500' },
  muzaffarabad: { name: 'Muzaffarabad (Azad Kashmir)', lat: '34.3700', lng: '73.4708', alt: '737' }
};

export default function Dop() {
  // Defaulting to the first city in our list (Karachi) to avoid specific emphasis
  const [selectedPreset, setSelectedPreset] = useState('karachi');
  const [formData, setFormData] = useState({
    latitude: '24.8607',
    longitude: '67.0011',
    height: '10'
  });
  
  const [dopResults, setDopResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePresetChange = (e) => {
    const presetKey = e.target.value;
    setSelectedPreset(presetKey);
    
    if (presetKey !== 'custom') {
      const target = PAKISTAN_LOCATIONS[presetKey];
      setFormData({
        latitude: target.lat,
        longitude: target.lng,
        height: target.alt
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSelectedPreset('custom');
  };

  const handleCalculateDop = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/dop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          height: parseFloat(formData.height)
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setDopResults(data);
    } catch (err) {
      console.error("Error calculating DOP metrics:", err);
      setError("Failed to fetch calculation from the GNSS backend service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', color: '#2e3b37', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '26px', margin: '0 0 6px 0', color: '#3d614e' }}>Dedicated DOP Analysis Workspace</h1>
        <p style={{ color: '#7a8c85', margin: 0 }}>Evaluate geometry dilution constraints and coordinate matrices vectors.</p>
      </div>

      {/* Parameter Entry Form */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2ece7', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#3d614e', fontSize: '16px' }}>Receiver Position Input Parameters</h3>
        
        <form onSubmit={handleCalculateDop} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
          
          {/* Dropdown Menu featuring regional choices */}
          <div style={{ flex: '1.5', minWidth: '220px' }}>
            <label style={labelStyle}>Select Station / Location</label>
            <select 
              value={selectedPreset} 
              onChange={handlePresetChange} 
              style={selectStyle}
            >
              <option value="custom">-- Custom Coordinates --</option>
              {Object.keys(PAKISTAN_LOCATIONS).map((key) => {
                if (key === 'custom') return null;
                return (
                  <option key={key} value={key}>
                    {PAKISTAN_LOCATIONS[key].name}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '120px' }}>
            <label style={labelStyle}>Latitude</label>
            <input type="number" name="latitude" step="any" value={formData.latitude} onChange={handleInputChange} style={inputStyle} required />
          </div>
          
          <div style={{ flex: '1', minWidth: '120px' }}>
            <label style={labelStyle}>Longitude</label>
            <input type="number" name="longitude" step="any" value={formData.longitude} onChange={handleInputChange} style={inputStyle} required />
          </div>
          
          <div style={{ flex: '1', minWidth: '120px' }}>
            <label style={labelStyle}>Height (m)</label>
            <input type="number" name="height" step="any" value={formData.height} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Computing...' : 'Analyze Vector'}
          </button>
        </form>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div style={{ padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '25px', fontSize: '14px' }}>
           {error}
        </div>
      )}

      {/* Live Data Dashboard Grid */}
      {dopResults ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2ece7' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#3d614e', fontSize: '16px' }}>
              Calculated Dilution Results (Active Satellites: {dopResults.visibleSatellites ?? 'N/A'})
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px' }}>
              <div style={resultCardStyle}>
                <span style={dopLabelStyle}>Geometric DOP (GDOP)</span>
                <span style={dopValueStyle}>{dopResults.GDOP?.toFixed(2) ?? '0.00'}</span>
              </div>
              <div style={resultCardStyle}>
                <span style={dopLabelStyle}>Position DOP (PDOP)</span>
                <span style={dopValueStyle}>{dopResults.PDOP?.toFixed(2) ?? '0.00'}</span>
              </div>
              <div style={resultCardStyle}>
                <span style={dopLabelStyle}>Horizontal DOP (HDOP)</span>
                <span style={dopValueStyle}>{dopResults.HDOP?.toFixed(2) ?? '0.00'}</span>
              </div>
              <div style={resultCardStyle}>
                <span style={dopLabelStyle}>Vertical DOP (VDOP)</span>
                <span style={dopValueStyle}>{dopResults.VDOP?.toFixed(2) ?? '0.00'}</span>
              </div>
              <div style={resultCardStyle}>
                <span style={dopLabelStyle}>Time DOP (TDOP)</span>
                <span style={dopValueStyle}>{dopResults.TDOP?.toFixed(2) ?? '0.00'}</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#eef4f1', padding: '16px', borderRadius: '12px', border: '1px solid #d8e6df', fontSize: '13px', color: '#3d614e', lineHeight: '1.5' }}>
             <b>Interpretation:</b> Low values represent robust positional geometry, providing high-precision triangulation for tracking hardware configurations.
          </div>
        </div>
      ) : (
        !loading && (
          <div style={{ padding: '40px', background: '#fff', borderRadius: '16px', border: '1px solid #e2ece7', textAlign: 'center', color: '#7a8c85' }}>
            Select a station preset or provide manual input metrics above, then click analyze to compute the live constellation profiles.
          </div>
        )
      )}
    </div>
  );
}

// Layout Configuration Objects
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#50635c', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #c8d6d0', fontSize: '14px', boxSizing: 'border-box', outline: 'none', color: '#2e3b37', height: '41px' };
const selectStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #c8d6d0', fontSize: '14px', boxSizing: 'border-box', outline: 'none', color: '#2e3b37', height: '41px', backgroundColor: '#fff', cursor: 'pointer' };
const btnStyle = { backgroundColor: '#3d614e', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', height: '41px', whiteSpace: 'nowrap' };
const resultCardStyle = { background: '#f8faf9', padding: '16px', borderRadius: '12px', border: '1px solid #e8edea', display: 'flex', flexDirection: 'column', gap: '6px' };
const dopLabelStyle = { fontSize: '11px', color: '#7a8c85', fontWeight: 'bold' };
const dopValueStyle = { fontSize: '22px', color: '#2e3b37', fontWeight: '700' };