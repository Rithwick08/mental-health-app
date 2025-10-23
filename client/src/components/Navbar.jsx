import { NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="/">
          🧠 MentiHaven
        </a>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {user ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold text-light" : ""}`
                    }
                  >
                    🏠 Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/journal"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold text-light" : ""}`
                    }
                  >
                    📔 Journal
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/exercises"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold text-light" : ""}`
                    }
                  >
                    🧘 Exercises
                  </NavLink>
                </li>
              </ul>

              {/* User Info + Logout */}
              <div className="d-flex align-items-center">
                <span className="navbar-text me-3 text-light">
                  Welcome, <strong>{user.name}</strong>
                </span>
                <button className="btn btn-light btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="ms-auto text-light fw-semibold">
              🌿 Your safe space for mental well-being
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}