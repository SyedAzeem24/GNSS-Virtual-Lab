import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Request Email, Step 2: Verify code & reset
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('Verification security code dispatched to email successfully!');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to dispatch verification email target.');
    }
  };

  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('/api/auth/reset-password', {
        email,
        verification_code: code,
        new_password: newPassword
      });
      setMessage('Password updated successfully! Navigating back to sign in portal...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Verification code failed or password reset rejected.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Recover Credentials</h2>
        {error && <div style={errorStyle}>{error}</div>}
        {message && <div style={messageStyle}>{message}</div>}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: '#8fa397', fontSize: '13px', margin: '0 0 10px 0', textAlign: 'center' }}>
              Enter your student email configuration to receive a transient verification token.
            </p>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
            </div>
            <button type="submit" style={btnStyle}>Send Recovery Code</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Verification Code</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} style={inputStyle} required placeholder="Enter token numeric code" />
            </div>
            <div>
              <label style={labelStyle}>New Complex Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} required />
            </div>
            <button type="submit" style={btnStyle}>Update Password</button>
          </form>
        )}

        <div style={footerStyle}>
          <Link to="/login" style={linkStyle}>Back to Log In</Link>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#171e1b', fontFamily: 'sans-serif' };
const cardStyle = { background: '#1e2623', padding: '40px', borderRadius: '16px', border: '1px solid #2d3a35', width: '100%', maxWidth: '400px', boxSizing: 'border-box' };
const titleStyle = { color: '#a3b899', margin: '0 0 24px 0', textAlign: 'center', fontWeight: '600' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#8fa38a', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2d3a35', backgroundColor: '#171e1b', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { backgroundColor: '#3d614e', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const errorStyle = { color: '#ff6b6b', backgroundColor: 'rgba(255,107,107,0.1)', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '15px', border: '1px solid rgba(255,107,107,0.2)' };
const messageStyle = { color: '#4caf50', backgroundColor: 'rgba(76,175,80,0.1)', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '15px', border: '1px solid rgba(76,175,80,0.2)' };
const footerStyle = { marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#63786f' };
const linkStyle = { color: '#4caf50', textDecoration: 'none', fontWeight: 'bold' };