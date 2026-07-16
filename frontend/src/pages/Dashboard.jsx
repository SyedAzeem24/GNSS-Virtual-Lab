import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SpaceBackground from '../components/SpaceBackground';

export default function Dashboard({ setCurrentTab }) {
  const { user } = useContext(AuthContext);
  
  const [notes, setNotes] = useState([
    { id: 1, text: 'Adjusted satellite speeds for the basic simulation map.', date: 'Just now' },
    { id: 2, text: 'Saved the recent error calculations to the logs folder.', date: '2 hours ago' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setNotes([{ id: Date.now(), text: newNoteText, date: 'Just now' }, ...notes]);
    setNewNoteText('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const navigationCards = [
    { id: 'simulation', label: 'LAB WORKSPACE', title: 'Simulation Stage', desc: 'Set up your virtual map, control satellite numbers, and watch paths move in real time.' },
    { id: 'positioning', label: 'LOCATION DATA', title: 'Positioning Estimation', desc: 'Calculate exact coordinate targets and measure differences in tracking signals.' },
    { id: 'dop', label: 'ACCURACY METRICS', title: 'DOP Analysis', desc: 'Check geometry scores to see how satellite spacing changes your position accuracy.' },
    { id: 'logs', label: 'HISTORY RECORD', title: 'Saved Logs', desc: 'Browse through previous experiments, review graph exports, and download lab data.' }
  ];

  const studentFirstName = user?.full_name ? user.full_name.split(' ')[0] : 'jhfd';

  return (
    <div style={dashboardContainerStyle}>
      <SpaceBackground />
      <div style={layoutWrapperStyle}>
        <div style={welcomeHeroStyle}>
          <div>
            <div style={heroLabelStyle}>WORKSPACE DASHBOARD</div>
            <h1 style={heroTitleStyle}>Welcome back, {studentFirstName}</h1>
            <p style={heroSubtitleStyle}>Space Simulation Lab • Current student profile active</p>
          </div>
          <div style={badgeContainerStyle}>System Ready</div>
        </div>

        <div style={contentGridStyle}>
          <div style={leftCardsColumnStyle}>
            <div style={sectionHeadingStyle}>Available Laboratory Modules</div>
            <div style={cardGridStyle}>
              {navigationCards.map((card) => (
                <div key={card.id} onClick={() => setCurrentTab(card.id)} style={moduleCardLayoutStyle} className="dashboard-card-hover">
                  <div style={cardLabelTagStyle}>{card.label}</div>
                  <h3 style={cardTitleStyle}>{card.title}</h3>
                  <div style={dividerStyle}></div>
                  <p style={cardDescStyle}>{card.desc}</p>
                  <div style={cardLinkIndicatorStyle}>Launch Module <span style={{ marginLeft: '8px' }}>→</span></div>
                </div>
              ))}
            </div>
          </div>

          <div style={rightNotesColumnStyle}>
            <div style={sectionHeadingStyle}>Personal Lab Scratchpad</div>
            <div style={notesWidgetContainerStyle}>
              <form onSubmit={handleAddNote} style={noteFormStyle}>
                <input type="text" placeholder="Write down a lab note..." value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)} style={noteInputStyle} />
                <button type="submit" style={curvedAddButtonStyle}>Add</button>
              </form>
              <div style={notesScrollContainerStyle}>
                {notes.length === 0 ? <div style={emptyNotesStyle}>Your scratchpad is empty. Add a note above.</div> : (
                  notes.map((note) => (
                    <div key={note.id} style={noteItemCardStyle}>
                      <div style={noteContentLayoutStyle}>
                        <p style={noteTextStyle}>{note.text}</p>
                        <button onClick={() => handleDeleteNote(note.id)} style={deleteNoteButtonStyle}>✕</button>
                      </div>
                      <span style={noteDateStampStyle}>{note.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// STYLES: Corrected to use neutral, desaturated grey glass
const dashboardContainerStyle = { position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'transparent' };
const layoutWrapperStyle = { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', padding: '0 24px 40px 24px', boxSizing: 'border-box' };

const glassStyle = {
  backgroundColor: 'rgba(30, 30, 35, 0.4)', // Neutral dark grey, no green/red bias
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '20px'
};

const welcomeHeroStyle = { ...glassStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', padding: '32px' };
const moduleCardLayoutStyle = { ...glassStyle, display: 'flex', flexDirection: 'column', padding: '28px', cursor: 'pointer', transition: 'transform 0.2s' };
const notesWidgetContainerStyle = { ...glassStyle, display: 'flex', flexDirection: 'column', height: '490px', padding: '24px', overflow: 'hidden' };

// ... (Keep existing layout/text styles exactly as they were)
const heroLabelStyle = { fontSize: '11px', color: '#94a3b8', letterSpacing: '2px', fontWeight: '700', marginBottom: '6px' };
const heroTitleStyle = { margin: 0, fontSize: '32px', fontWeight: '600', color: '#ffffff' };
const heroSubtitleStyle = { margin: '8px 0 0 0', fontSize: '14px', color: '#94a3b8' };
const badgeContainerStyle = { padding: '8px 16px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '12px', fontWeight: '600', color: '#ffffff' };
const sectionHeadingStyle = { margin: '0 0 16px 4px', color: '#ffffff', fontSize: '15px', fontWeight: '600' };
const contentGridStyle = { display: 'flex', gap: '24px', flexWrap: 'wrap' };
const leftCardsColumnStyle = { flex: '2 1 500px', display: 'flex', flexDirection: 'column' };
const cardGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' };
const cardLabelTagStyle = { fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1.5px', marginBottom: '10px' };
const cardTitleStyle = { margin: 0, fontSize: '22px', fontWeight: '600', color: '#ffffff' };
const dividerStyle = { height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '16px 0' };
const cardDescStyle = { margin: '0 0 24px 0', fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6', flexGrow: 1 };
const cardLinkIndicatorStyle = { display: 'flex', alignItems: 'center', fontSize: '13px', color: '#ffffff', fontWeight: '600', marginTop: 'auto' };
const rightNotesColumnStyle = { flex: '1 1 340px', display: 'flex', flexDirection: 'column' };
const noteFormStyle = { display: 'flex', gap: '10px', marginBottom: '20px' };
const noteInputStyle = { flex: 1, height: '42px', backgroundColor: 'rgba(0, 0, 0, 0.2)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '0 16px', fontSize: '14px', outline: 'none' };
const curvedAddButtonStyle = { height: '42px', padding: '0 22px', backgroundColor: '#ffffff', color: '#000000', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };
const notesScrollContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1 };
const emptyNotesStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', fontSize: '13px', textAlign: 'center' };
const noteItemCardStyle = { display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px' };
const noteContentLayoutStyle = { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' };
const noteTextStyle = { margin: 0, fontSize: '13px', color: '#e2e8f0', lineHeight: '1.5', wordBreak: 'break-word' };
const deleteNoteButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px', padding: '2px' };
const noteDateStampStyle = { fontSize: '11px', color: '#64748b', alignSelf: 'flex-start' };