import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skyplot from '../components/Skyplot';

export default function Simulation() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [height, setHeight] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Custom Coordinates");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [satellites, setSatellites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Responsive state tracking window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if we should stack vertically (e.g., screen width less than 1024px)
  const isMobileOrTablet = windowWidth < 1024;

  const locations = [
    { name: "Custom Coordinates", latitude: "", longitude: "", height: "" },
    { name: "Islamabad", latitude: 33.6844, longitude: 73.0479, height: 540 },
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011, height: 8 },
    { name: "Lahore", latitude: 31.5204, longitude: 74.3587, height: 217 },
    { name: "Peshawar", latitude: 34.0151, longitude: 71.5249, height: 331 },
    { name: "Quetta", latitude: 30.1798, longitude: 66.9750, height: 1680 },
    { name: "Gilgit", latitude: 35.9208, longitude: 74.3142, height: 1500 },
    { name: "Skardu", latitude: 35.2971, longitude: 75.6337, height: 2228 },
  ];

  const years = Array.from({ length: 2026 - 2018 + 1 }, (_, i) => 2018 + i);

  const fetchVisibility = async (lat, lon, h, year) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/visibility/", {
        latitude: Number(lat),
        longitude: Number(lon),
        height: Number(h),
      });
      setSatellites(response.data);
    } catch (error) {
      console.error("Backend connection error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVisibility(latitude, longitude, height, selectedYear);
  };

  const handleLocationChange = async (e) => {
    const city = locations.find((loc) => loc.name === e.target.value);
    setSelectedLocation(city.name);
    setLatitude(city.latitude);
    setLongitude(city.longitude);
    setHeight(city.height);

    if (city.name !== "Custom Coordinates") {
      await fetchVisibility(city.latitude, city.longitude, city.height, selectedYear);
    }
  };

  const visibleSatellites = satellites.filter((sat) => sat.visible);
  const hiddenSatellites = satellites.filter((sat) => !sat.visible);

  return (
    <div className="cute-card" style={containerStyle}>
      <h3 style={{ margin: '0 0 5px 0', color: '#3d614e', fontSize: '22px', fontWeight: '600' }}>
        Simulation Parameters
      </h3>

      {/* 🛠️ Dynamic Responsive Control Form */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex', 
        gap: '12px', 
        alignItems: 'flex-end', 
        background: 'rgba(255,255,255,0.4)', 
        padding: '15px', 
        borderRadius: '16px',
        flexWrap: isMobileOrTablet ? 'wrap' : 'nowrap'
      }}>
        <div style={{ ...inputGroupStyle, minWidth: isMobileOrTablet ? '45%' : 'auto' }}>
          <label style={labelStyle}>Location Preset</label>
          <select value={selectedLocation} onChange={handleLocationChange} style={selectStyle}>
            {locations.map((loc) => <option key={loc.name} value={loc.name}>{loc.name}</option>)}
          </select>
        </div>

        <div style={{ ...inputGroupStyle, minWidth: isMobileOrTablet ? '45%' : 'auto' }}>
          <label style={labelStyle}>Dataset Year</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={selectStyle}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div style={{ ...inputGroupStyle, minWidth: isMobileOrTablet ? '28%' : 'auto' }}>
          <label style={labelStyle}>Latitude</label>
          <input type="number" step="any" value={latitude} disabled={selectedLocation !== "Custom Coordinates"} onChange={(e) => setLatitude(e.target.value)} required style={inputStyle} />
        </div>

        <div style={{ ...inputGroupStyle, minWidth: isMobileOrTablet ? '28%' : 'auto' }}>
          <label style={labelStyle}>Longitude</label>
          <input type="number" step="any" value={longitude} disabled={selectedLocation !== "Custom Coordinates"} onChange={(e) => setLongitude(e.target.value)} required style={inputStyle} />
        </div>

        <div style={{ ...inputGroupStyle, minWidth: isMobileOrTablet ? '28%' : 'auto' }}>
          <label style={labelStyle}>Height (m)</label>
          <input type="number" value={height} disabled={selectedLocation !== "Custom Coordinates"} onChange={(e) => setHeight(e.target.value)} required style={inputStyle} />
        </div>

        <button type="submit" style={{ ...actionBtnStyle, width: isMobileOrTablet ? '100%' : 'auto' }}>
          {loading ? 'Processing...' : 'Simulate'}
        </button>
      </form>

      {/* 📱 Main Workspace Split Panel layout */}
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobileOrTablet ? 'column' : 'row', 
        gap: '20px', 
        flex: 1, 
        overflow: 'visible',
      }}>
        
        {/* Left Scroll Panel: Tables */}
        <div style={{ 
          ...scrollPanelStyle, 
          width: isMobileOrTablet ? '100%' : '40%',
          maxHeight: isMobileOrTablet ? '350px' : 'none',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e5ede9', paddingBottom: '10px', fontSize: '13px' }}>
            <span>Total: <b>{satellites.length}</b></span>
            <span style={{ color: '#4caf50' }}>Visible: <b>{visibleSatellites.length}</b></span>
            <span style={{ color: '#e91e63' }}>Hidden: <b>{hiddenSatellites.length}</b></span>
          </div>

          {visibleSatellites.length > 0 ? (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#3d614e', margin: '0 0 10px 0' }}> Visible Satellites Matrix</h4>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: '#eef4f1' }}>
                    <th style={thStyle}>PRN</th>
                    <th style={thStyle}>Azimuth</th>
                    <th style={thStyle}>Elevation</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleSatellites.map((sat, index) => (
                    <tr key={sat.satellite || index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={tdStyle}><b>{sat.satellite}</b></td>
                      <td style={tdStyle}>{sat.azimuth?.toFixed(1)}°</td>
                      <td style={tdStyle}>{sat.elevation?.toFixed(1)}°</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#7a8c85', padding: '20px 0' }}>
              No active visible tracking coordinates. Run simulate parameters above.
            </div>
          )}
        </div>
        
        {/* Right Panel: Skyplot Graphics Window */}
        <div style={{ 
          ...graphPanelStyle, 
          width: isMobileOrTablet ? '100%' : '60%',
          height: isMobileOrTablet ? 'auto' : '100%'
        }}>
          <Skyplot visibleSatellites={visibleSatellites} isCompact={isMobileOrTablet} />
        </div>

      </div>
    </div>
  );
}

// Styling Objects Setup
const containerStyle = { 
  padding: '30px', 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '24px',
  width: '100%',
  boxSizing: 'border-box'
};

const scrollPanelStyle = {
  background: '#fff',
  borderRadius: '16px',
  padding: '24px',
  border: '1px solid #e2ece7',
  boxSizing: 'border-box'
};

const graphPanelStyle = {
  background: '#fff',
  borderRadius: '16px',
  padding: '24px',
  border: '1px solid #e2ece7',
  boxSizing: 'border-box'
};

const inputGroupStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#50635c',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #c8d6d0',
  fontSize: '14px',
  boxSizing: 'border-box',
  outline: 'none',
  color: '#2e3b37',
  height: '41px',
  backgroundColor: '#fff'
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #c8d6d0',
  fontSize: '14px',
  boxSizing: 'border-box',
  outline: 'none',
  color: '#2e3b37',
  height: '41px',
  backgroundColor: '#fff',
  cursor: 'pointer'
};

const actionBtnStyle = {
  backgroundColor: '#3d614e',
  color: '#fff',
  border: 'none',
  padding: '11px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  height: '41px',
  whiteSpace: 'nowrap'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontSize: '13px'
};

const thStyle = {
  padding: '10px',
  fontWeight: '600',
  color: '#3d614e',
  borderBottom: '2px solid #e2ece7'
};

const tdStyle = {
  padding: '10px',
  color: '#2e3b37'
};