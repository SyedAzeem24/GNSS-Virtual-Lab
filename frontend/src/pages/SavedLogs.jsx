import React from 'react';

export default function SavedLogs({ 
  notesList = [], 
  activeNoteId, 
  setActiveNoteId, 
  noteTitle, 
  setNoteTitle, 
  noteContent, 
  setNoteContent, 
  onSaveNote, 
  onCreateNote 
}) {
  
  const activeNote = notesList.find(n => n.id === activeNoteId);

  return (
    <div style={styles.container}>
      {/* 🚀 Header Toolbar Row */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>Saved Lab Logs</h2>
          <p style={styles.pageSubtitle}>Review, manage, and edit historical satellite simulation outputs and evaluation notes.</p>
        </div>
        <button onClick={onCreateNote} style={styles.newLogBtn}>
          <span style={{ marginRight: '6px' }}>+</span> New Experiment Entry
        </button>
      </div>

      {/* 📊 Main Split Workspace Layout */}
      <div style={styles.layoutGrid}>
        
        {/* Left Panel: Historical Directory Tree */}
        <div style={styles.directoryCard}>
          <div style={styles.panelHeaderRow}>
            <h3 style={styles.sectionHeader}>Log Directory</h3>
            <span style={styles.badgeCount}>{notesList.length} Entries</span>
          </div>
          
          <div style={styles.scrollList}>
            {notesList.length === 0 ? (
              <div style={styles.emptyDirectory}>No logs saved yet. Click above to create one.</div>
            ) : (
              notesList.map((note) => {
                const isActive = note.id === activeNoteId;
                return (
                  <div 
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    style={{
                      ...styles.logItem,
                      backgroundColor: isActive ? 'rgba(15, 56, 34, 0.25)' : '#111417',
                      border: isActive ? '1px solid #16a34a' : '1px solid #1f2429',
                    }}
                  >
                    <div style={{ 
                      fontWeight: '600', 
                      color: isActive ? '#22c55e' : '#fff', 
                      fontSize: '13.5px',
                      textOverflow: 'ellipsis', 
                      overflow: 'hidden', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {note.title || "Untitled Experiment"}
                    </div>
                    <div style={styles.logPreviewText}>
                      {note.content || "No record observations added yet..."}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Dedicated Evaluation Editor Workspace */}
        <div style={styles.editorCard}>
          <div style={styles.panelHeaderRow}>
            <h3 style={styles.sectionHeader}>Workspace Editor</h3>
            {activeNote && (
              <button onClick={onSaveNote} style={styles.saveBtn}>
                Save Changes
              </button>
            )}
          </div>

          {activeNote ? (
            <div style={styles.editorForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>EXPERIMENT / SHEET TITLE</label>
                <input 
                  type="text" 
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g., Lab Session 1: Dilution of Precision"
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroupText}>
                <label style={styles.label}>LAB EVALUATION OBSERVATIONS & EQUATIONS</label>
                <textarea 
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Enter telemetry results, constraints, or satellite environment records..."
                  style={styles.textarea}
                />
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>📝</div>
              Select an entry from the left directory to inspect and edit details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { 
    width: '100%', 
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box' 
  },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '32px' 
  },
  pageTitle: { 
    fontSize: '24px', 
    fontWeight: '700', 
    margin: 0, 
    color: '#fff',
    letterSpacing: '-0.5px'
  },
  pageSubtitle: { 
    fontSize: '13.5px', 
    color: '#64748b', 
    margin: '6px 0 0 0' 
  },
  newLogBtn: { 
    backgroundColor: '#0f3822', 
    color: '#22c55e', 
    border: '1px solid rgba(34, 197, 94, 0.2)', 
    padding: '10px 18px', 
    borderRadius: '24px', 
    fontSize: '13px', 
    fontWeight: '700', 
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center'
  },
  layoutGrid: { 
    display: 'grid', 
    gridTemplateColumns: '400px 1fr', 
    gap: '24px',
    alignItems: 'start'
  },
  directoryCard: { 
    backgroundColor: '#0a0d0b', 
    border: '1px solid rgba(255, 255, 255, 0.05)', 
    borderRadius: '12px', 
    padding: '20px', 
    display: 'flex', 
    flexDirection: 'column' 
  },
  panelHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    minHeight: '32px'
  },
  sectionHeader: { 
    fontSize: '14px', 
    fontWeight: '700', 
    margin: 0, 
    color: '#f3f4f6',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  badgeCount: {
    fontSize: '11px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '4px 8px',
    borderRadius: '12px',
    color: '#94a3b8',
    fontWeight: '600'
  },
  scrollList: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px', 
    maxHeight: 'calc(100vh - 240px)', 
    overflowY: 'auto',
    paddingRight: '4px'
  },
  emptyDirectory: {
    color: '#4b5563',
    fontSize: '13px',
    textAlign: 'center',
    padding: '40px 0'
  },
  logItem: { 
    padding: '14px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  logPreviewText: { 
    color: '#64748b', 
    fontSize: '12px', 
    marginTop: '6px', 
    textOverflow: 'ellipsis', 
    overflow: 'hidden', 
    whiteSpace: 'nowrap' 
  },
  editorCard: { 
    backgroundColor: '#0a0d0b', 
    border: '1px solid rgba(255, 255, 255, 0.05)', 
    borderRadius: '12px', 
    padding: '24px', 
    display: 'flex', 
    flexDirection: 'column', 
    minHeight: '520px',
    boxSizing: 'border-box'
  },
  saveBtn: { 
    backgroundColor: '#0a2e1c', 
    border: '1px solid rgba(22, 163, 74, 0.3)', 
    color: '#16a34a', 
    padding: '8px 16px', 
    borderRadius: '12px', 
    fontSize: '12.5px', 
    fontWeight: '600', 
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  editorForm: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px', 
    flex: 1 
  },
  formGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px' 
  },
  formGroupText: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px', 
    flex: 1 
  },
  label: { 
    fontSize: '10.5px', 
    color: '#4b5563', 
    letterSpacing: '0.5px', 
    fontWeight: '700' 
  },
  input: { 
    backgroundColor: '#111417', 
    border: '1px solid #1f2429', 
    borderRadius: '8px', 
    padding: '12px 14px', 
    color: '#fff', 
    fontSize: '14px', 
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  textarea: { 
    width: '100%', 
    minHeight: '340px',
    backgroundColor: '#111417', 
    border: '1px solid #1f2429', 
    borderRadius: '8px', 
    padding: '14px', 
    color: '#e5e7eb', 
    fontSize: '13px', 
    fontFamily: 'monospace', 
    lineHeight: '1.6', 
    resize: 'none', 
    outline: 'none', 
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  emptyState: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#4b5563', 
    fontSize: '13.5px' 
  }
};