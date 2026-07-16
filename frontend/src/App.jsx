import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard'; 
import Simulation from './pages/Simulation';
import Dop from './pages/Dop';
import { AuthContext } from './context/AuthContext';
import PositioningEstimation from './pages/PositioningEstimation';
import ForgotPassword from './components/ForgotPassword';
import SavedLogs from './pages/SavedLogs'; 
import SpaceBackground from './components/SpaceBackground';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { user } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState('dashboard');

  const [notesList, setNotesList] = useState(() => {
    const saved = localStorage.getItem('gnss_academic_notes');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Lab Session 1: Dilution of Precision', content: 'Observed that tightly clustered setups increase GDOP values.' }
    ];
  });
  
  const [activeNoteId, setActiveNoteId] = useState('1');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    const activeNote = notesList.find(n => n.id === activeNoteId);
    if (activeNote) {
      setNoteTitle(activeNote.title);
      setNoteContent(activeNote.content);
    }
  }, [activeNoteId, notesList]);

  const handleCreateNote = () => {
    const newNote = { id: Date.now().toString(), title: 'New Experiment Entry', content: '' };
    const updated = [...notesList, newNote];
    setNotesList(updated);
    setActiveNoteId(newNote.id);
    setCurrentTab('logs'); 
    localStorage.setItem('gnss_academic_notes', JSON.stringify(updated));
  };

  const handleSaveNote = () => {
    const updated = notesList.map(note => note.id === activeNoteId ? { ...note, title: noteTitle, content: noteContent } : note);
    setNotesList(updated);
    localStorage.setItem('gnss_academic_notes', JSON.stringify(updated));
    alert('Log entry updated successfully!');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/workspace" />} />
      
      <Route path="/workspace" element={
        user ? (
         <div style={{ position: 'relative', minHeight: '100vh', width: '100%', backgroundColor: '#050507' }}>
            {/* Background is always rendered here */}
            <SpaceBackground />

            <MainLayout 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab}
              notesList={notesList}
              activeNoteId={activeNoteId}
              setActiveNoteId={setActiveNoteId}
              onCreateNote={handleCreateNote}
            >
              {currentTab === 'dashboard' && <Dashboard setCurrentTab={setCurrentTab} />}
              {currentTab === 'simulation' && <Simulation />}
              {currentTab === 'dop' && <Dop />}
              {currentTab === 'positioning' && <PositioningEstimation />}
              {currentTab === 'settings' && <SettingsPage />}
              {currentTab === 'logs' && (
                <SavedLogs 
                  notesList={notesList}
                  activeNoteId={activeNoteId}
                  setActiveNoteId={setActiveNoteId}
                  noteTitle={noteTitle}
                  setNoteTitle={setNoteTitle}
                  noteContent={noteContent}
                  setNoteContent={setNoteContent}
                  onSaveNote={handleSaveNote}
                  onCreateNote={handleCreateNote}
                />
              )}
            </MainLayout>
          </div>
        ) : (
          <Navigate to="/" />
        )
      } />
      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  );
}