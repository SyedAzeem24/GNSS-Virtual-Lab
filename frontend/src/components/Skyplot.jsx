import React from 'react';

export default function Skyplot({ visibleSatellites, isCompact }) {
  // SVG configuration
  const size = 320;
  const center = size / 2;
  const radius = (size / 2) - 25;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div style={{ 
        background: '#1e2623', // Rich, sleek dark theme background
        padding: '24px', 
        borderRadius: '16px', 
        border: '1px solid #2d3a35',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#a3b899', fontSize: '16px', alignSelf: 'flex-start', fontWeight: '600' }}>
          Active Satellite Constellation Skyplot
        </h3>

        <svg width={size} height={size} style={{ background: '#171e1b', borderRadius: '50%', border: '2px solid #2d3a35' }}>
          {/* Concentric Elevation Rings (90°, 60°, 30°) */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="#2d3a35" strokeWidth="1.5" />
          <circle cx={center} cy={center} r={radius * 0.66} fill="none" stroke="#25312c" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx={center} cy={center} r={radius * 0.33} fill="none" stroke="#25312c" strokeWidth="1" strokeDasharray="5 5" />
          
          {/* Crosshair Axes (North-South, East-West) */}
          <line x1={center} y1={25} x2={center} y2={size - 25} stroke="#2d3a35" strokeWidth="1" />
          <line x1={25} y1={center} x2={size - 25} y2={center} stroke="#2d3a35" strokeWidth="1" />

          {/* Grid Elevation Angle Labels */}
          <text x={center + 5} y={center - radius * 0.33 + 4} fontSize="9" fill="#4d5f57">60°</text>
          <text x={center + 5} y={center - radius * 0.66 + 4} fontSize="9" fill="#4d5f57">30°</text>

          {/* Compass Rose Labels */}
          <text x={center} y={18} textAnchor="middle" fontSize="11" fill="#8fa38a" fontWeight="bold">N</text>
          <text x={size - 14} y={center + 4} textAnchor="middle" fontSize="11" fill="#8fa38a" fontWeight="bold">E</text>
          <text x={center} y={size - 8} textAnchor="middle" fontSize="11" fill="#8fa38a" fontWeight="bold">S</text>
          <text x={14} y={center + 4} textAnchor="middle" fontSize="11" fill="#8fa38a" fontWeight="bold">W</text>

          {/* Dynamic Satellites Rendering */}
          {visibleSatellites && visibleSatellites.map((sat, index) => {
            // Safely parse the vehicle label identifier
            const satelliteLabel = sat.satellite || `G${sat.prn || index + 1}`;
            
            // Convert elevation/azimuth degrees to polar grid positions
            const elevationRad = (90 - sat.elevation) * (Math.PI / 180);
            const azimuthRad = (sat.azimuth - 90) * (Math.PI / 180);
            const r = (elevationRad / (Math.PI / 2)) * radius;
            
            const x = center + r * Math.cos(azimuthRad);
            const y = center + r * Math.sin(azimuthRad);

            return (
              <g key={index} style={{ cursor: 'pointer' }}>
                {/* Glowing Outer Ring for visibility */}
                <circle cx={x} cy={y} r="10" fill="rgba(76, 175, 80, 0.15)" stroke="#4caf50" strokeWidth="1" />
                
                {/* Core Satellite Node */}
                <circle cx={x} cy={y} r="5" fill="#4caf50" />
                
                {/* High Contrast Background Badge for Label */}
                <rect x={x - 14} y={y - 23} width={28} height={13} rx={3} fill="#171e1b" stroke="#3d614e" strokeWidth="1" />
                
                {/* Sharp Text Label */}
                <text x={x} y={y - 13} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">
                  {satelliteLabel}
                </text>
              </g>
            );
          })}
        </svg>

        <div style={{ marginTop: '18px', fontSize: '12px', color: '#63786f', textAlign: 'center', lineHeight: '1.4' }}>
          High-contrast radar mesh mapping active tracking coordinates.
        </div>
      </div>
    </div>
  );
}