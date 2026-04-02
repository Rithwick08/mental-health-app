import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}>
    <path d="M12 2C6.5 2 3 7 3 12c0 3.5 2.5 6.5 6 7.5V22h2v-3c1 .3 2 .5 3 .5 5 0 8-4 8-9S17.5 2 12 2z" fill="currentColor" opacity="0.85" />
    <path d="M12 2c0 0-2 8 0 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const navStyle = {
  background: 'var(--white)',
  borderBottom: '1px solid rgba(107,143,113,0.15)',
  boxShadow: 'var(--shadow-sm)',
  padding: '0.75rem 0',
};

const brandStyle = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 600,
  fontSize: '1.4rem',
  color: 'var(--forest)',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const linkBase = {
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 600,
  fontSize: '0.92rem',
  color: 'var(--text-medium)',
  textDecoration: 'none',
  padding: '0.4rem 0.9rem',
  borderRadius: '50px',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

export default function Navbar({ user, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const themeToggleStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.35rem 0.75rem',
    borderRadius: '50px',
    border: '1.5px solid var(--sage-mist)',
    background: isDark ? 'var(--sage-bg)' : 'var(--cream)',
    color: 'var(--text-medium)',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: 700,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: '0.02em',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <div className="container-fluid px-4">
        <NavLink to="/" style={brandStyle}>
          <LeafIcon /> MentiHaven
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: 'var(--sage)' }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {user ? (
            <div className="d-flex align-items-center ms-auto gap-1 flex-wrap">
              <NavLink
                to="/dashboard"
                style={({ isActive }) => ({
                  ...linkBase,
                  background: isActive ? 'var(--sage-bg)' : 'transparent',
                  color: isActive ? 'var(--sage)' : 'var(--text-medium)',
                })}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/journal"
                style={({ isActive }) => ({
                  ...linkBase,
                  background: isActive ? 'var(--sage-bg)' : 'transparent',
                  color: isActive ? 'var(--sage)' : 'var(--text-medium)',
                })}
              >
                Journal
              </NavLink>
              <NavLink
                to="/exercises"
                style={({ isActive }) => ({
                  ...linkBase,
                  background: isActive ? 'var(--sage-bg)' : 'transparent',
                  color: isActive ? 'var(--sage)' : 'var(--text-medium)',
                })}
              >
                Exercises
              </NavLink>
              <NavLink
                to="/stress-checkup"
                style={({ isActive }) => ({
                  ...linkBase,
                  background: isActive ? 'var(--sage-bg)' : 'transparent',
                  color: isActive ? 'var(--sage)' : 'var(--text-medium)',
                })}
              >
                Stress Checkup
              </NavLink>

              <div style={{ borderLeft: '1px solid var(--sage-mist)', height: '24px', margin: '0 0.5rem' }} />

              {/* Theme Toggle */}
              <button onClick={toggleTheme} style={themeToggleStyle} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{isDark ? '☀️' : '🌙'}</span>
              </button>

              <div style={{ borderLeft: '1px solid var(--sage-mist)', height: '24px', margin: '0 0.25rem' }} />

              <span style={{ fontSize: '0.88rem', color: 'var(--text-light)', fontWeight: 500 }}>
                {user.name}
              </span>
              <button
                onClick={onLogout}
                style={{
                  ...linkBase,
                  background: 'var(--sage-bg)',
                  color: 'var(--sage)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center ms-auto gap-2">
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                🌿 Your safe space for mental well-being
              </span>
              <button onClick={toggleTheme} style={themeToggleStyle} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{isDark ? '☀️' : '🌙'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
