import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import cosmicBg from '../assets/cosmic-bg.jpg';
import ncgsaLogo from '../assets/ncgsa-logo.png';
import authService from "../services/authService";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext); // Assuming your context has a login method

  // 🔄 States to control what shows inside the glass panel: 'landing', 'login', or 'register'
  const [panelView, setPanelView] = useState('landing');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState("Student");
  
  // 👁️ State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        if (panelView === "register") {
            await authService.register({
                full_name: fullName,
                email,
                password,
                role,
            });

            alert("Registration Successful");
            setPanelView("login");
            return;
        }

        if (panelView === "login") {

    const response = await authService.login({
        email,
        password,
    });

    console.log("FULL RESPONSE:", response);
    console.log("TOKEN:", response.access_token);
    console.log("USER:", response.user);

    login(
        response.access_token,
        response.user
    );

    console.log(
        "Stored User:",
        localStorage.getItem("user")
    );

    navigate("/workspace");
}

    } catch (err) {
        alert(
            err.response?.data?.detail ||
            "Something went wrong."
        );
    }
  };

  // SVG Eye Icon (Open)
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );

  // SVG Eye-Slash Icon (Closed)
  const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M21 21l-18-18m4.5 4.5a3.5 3.5 0 0 0 4.95 4.95M15.73 15.73a3.5 3.5 0 0 0-4.48-4.48M14.12 4.168A11.398 11.398 0 0 1 12 4.5c-4.756 0-8.773 3.162-10.065 7.498a10.522 10.522 0 0 1 4.293-5.774M19.5 8.223a10.477 10.477 0 0 1 2.046 3.777" />
    </svg>
  );

  return (
    <div style={styles.container}>
      {/* Dark Screen Filter Overlay */}
      <div style={styles.overlay}></div>

     {/* 🧭 Header Section */}
      <header style={styles.header}>
        {/* 🏛️ Official NCGSA Dynamic Brand Logo */}
        <div style={styles.logoContainer} onClick={() => setPanelView('landing')}>
          <img 
            src={ncgsaLogo} 
            alt="NCGSA Brand Logo" 
            style={styles.logoImg} 
          />
          <div style={styles.logoTextGroup}>
            <span style={styles.mainLogoText}>NCGSA</span>
            <span style={styles.subLogoText}>National Center of GIS & Space Applications</span>
          </div>
        </div>
        
        <div style={styles.authGroup}>
          <button onClick={() => { setPanelView('login'); setShowPassword(false); }} style={styles.textBtn}>Sign In</button>
          <button onClick={() => { setPanelView('register'); setShowPassword(false); }} style={styles.primaryBtn}>Register</button>
        </div>

      </header>
      {/* 🌍 Workspace Interactive Panel */}
      <main style={styles.mainContent}>
        <div style={styles.glassCard}>
          
          {/* 1️⃣ VIEW: DEFAULT LANDING CONTENT */}
          {panelView === 'landing' && (
            <>
              <div>
                <p style={styles.subtitlePre}>Welcome to</p>
                <h1 style={styles.mainTitle}>
                  GNSS  <br />
                  <span style={styles.titleHighlight}>SIMULATION LAB</span>
                </h1>
                <div style={styles.divider}></div>
              </div>

              <p style={styles.description}>
                Simulate GNSS satellite visibility, explore skyplots, and evaluate positioning accuracy through real-time DOP analysis.
              </p>

              <div style={styles.btnStack}>
                <button onClick={() => setPanelView('login')} style={styles.cardOutlineBtn}>
                  Explore GNSS Constellations <span style={styles.arrow}>→</span>
                </button>
                <button onClick={() => setPanelView('login')} style={styles.cardSolidBtn}>
                  Launch Virtual Simulation Lab <span style={styles.arrow}>→</span>
                </button>
              </div>
            </>
          )}

          {/* 2️⃣ VIEW: TRANSPARENT LOGIN FORM */}
          {panelView === 'login' && (
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <div>
                <p style={styles.subtitlePre}>Authentication</p>
                <h1 style={styles.formTitle}>SIGN IN</h1>
                <div style={styles.divider}></div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  style={styles.input} 
                  placeholder="name@example.com"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrapper}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={styles.passwordInput} 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={styles.passwordToggleBtn}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button type="submit" style={styles.submitBtn}>
                Enter Workspace →
              </button>

              <p style={styles.switchText}>
                Don't have an account?{' '}
                <span onClick={() => { setPanelView('register'); setShowPassword(false); }} style={styles.switchLink}>Register here</span>
              </p>
            </form>
          )}

          {/* 3️⃣ VIEW: TRANSPARENT REGISTER FORM */}
          {panelView === 'register' && (
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <div>
                <p style={styles.subtitlePre}>Getting Started</p>
                <h1 style={styles.formTitle}>Create Account</h1>
                <div style={styles.divider}></div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  style={styles.input} 
                  placeholder="ali khan"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  style={styles.input} 
                  placeholder="name@example.com"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <div style={styles.selectWrapper}>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="Student" style={styles.selectOption}>Student</option>
                    <option value="Instructor" style={styles.selectOption}>Instructor</option>
                    <option value="Admin" style={styles.selectOption}>Admin</option>
                  </select>
                  <span style={styles.selectArrow}>▼</span>
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrapper}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={styles.passwordInput} 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={styles.passwordToggleBtn}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button type="submit" style={styles.submitBtn}>
                Register Account
              </button>

              <p style={styles.switchText}>
                Already have an account?{' '}
                <span onClick={() => { setPanelView('login'); setShowPassword(false); }} style={styles.switchLink}>Sign In</span>
              </p>
            </form>
          )}

          <footer style={styles.cardFooter}>
            "Welcome to the GNSS Virtual Laboratory."
          </footer>
        </div>
      </main>
    </div>
  );
};

// 🎨 Pure CSS Theme Configuration
const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: `url(${cosmicBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'between',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#fff',
    boxSizing: 'border-box',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 1,
  },
  header: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    cursor: 'pointer',
  },
  logoAccent: {
    color: '#476654',
  },
  authGroup: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  textBtn: {
    background: 'none',
    border: 'none',
    color: '#d1d5db',
    fontSize: '14px',
    cursor: 'pointer',
  },
  primaryBtn: {
    backgroundColor: '#2d4236',
    border: '1px solid #3d5a49',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  mainContent: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '10%',
    boxSizing: 'border-box',
  },
  glassCard: {
    width: '420px',
    padding: '35px',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
  },
  subtitlePre: {
    fontSize: '11px',
    letterSpacing: '3px',
    color: '#9ca3af',
    textTransform: 'uppercase',
    margin: 0,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: '300',
    letterSpacing: '1px',
    lineHeight: '1.2',
    margin: '4px 0 0 0',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '1px',
    margin: '4px 0 0 0',
  },
  titleHighlight: {
    fontWeight: '600',
    color: '#e5e7eb',
  },
  divider: {
    width: '50px',
    height: '2px',
    backgroundColor: '#3d5a49',
    marginTop: '12px',
  },
  description: {
    fontSize: '14px',
    color: '#d1d5db',
    lineHeight: '1.6',
    margin: 0,
    fontWeight: '300',
  },
  btnStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardOutlineBtn: {
    width: '100%',
    padding: '12px 16px',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSolidBtn: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#23332a',
    border: '1px solid #354d3f',
    color: '#f3f4f6',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  input: {
    padding: '10px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  // 👁️ New styling fields for password icon wrapper
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    padding: '10px 42px 10px 14px', // Expanded right padding to avoid text clash with icon
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  passwordToggleBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#2d4236',
    border: '1px solid #3d5a49',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
  switchText: {
    fontSize: '13px',
    color: '#9ca3af',
    textAlign: 'center',
    margin: '10px 0 0 0',
  },
  switchLink: {
    color: '#4ade80',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  cardFooter: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9ca3af',
    fontStyle: 'italic',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '15px',
    marginTop: '5px',
  },
  footerBar: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    padding: '12px 40px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#9ca3af',
    letterSpacing: '1px',
    boxSizing: 'border-box',
  },
  statusActive: {
    color: '#4ade80',
    fontWeight: '500',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer',
    zIndex: 15,
  },
  logoImg: {
    height: '52px',
    width: 'auto',
    objectFit: 'contain',
  },
  logoTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainLogoText: {
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#ffffff',
    lineHeight: '1.1',
  },
  subLogoText: {
    fontSize: '11px',
    fontWeight: '400',
    color: '#9ca3af',
    letterSpacing: '0.5px',
  },
  selectWrapper: {
    position: "relative",
  },
  selectInput: {
    padding: "10px 14px",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    paddingRight: "40px",
    cursor: 'pointer',
  },
  // 🎨 Dark option elements styling to fix the blinding white default drop-down options
  selectOption: {
    backgroundColor: '#161d19', // Matches your subtle greenish-dark cosmic workspace theme
    color: '#fff',
    padding: '10px',
  },
  selectArrow: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    pointerEvents: "none",
    fontSize: "11px",
  },
};

export default LandingPage;
