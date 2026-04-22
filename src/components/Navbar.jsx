
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({
  onOpenLogin,
  onOpenSignup,
  isMember = false,
  memberName = "Demo User",
  onLogout = () => {},
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inMemberCenter = location.pathname === "/member-center";

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="Solar as a Service logo" className="brand-logo" />
          <div className="brand-copy">
            <strong>Solar as a Service</strong>
            <span>Global Solar Platform</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Home</NavLink>
          <button className="nav-link" type="button">About Us</button>
          <button className="nav-link" type="button">Services</button>
          <NavLink to="/proposals" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Proposals</NavLink>
          <NavLink to="/contact" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/start-project" className="btn btn-outline">Submit Proposal</Link>

          {isMember ? (
            <>
              <div className="member-menu-wrap">
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  {memberName}
                </button>

                {openMenu ? (
                  <div className="member-dropdown">
                    <button
                      type="button"
                      className="member-dropdown-item"
                      onClick={() => {
                        setOpenMenu(false);
                        navigate("/member-center");
                      }}
                    >
                      Member Center
                    </button>
                    <button
                      type="button"
                      className="member-dropdown-item danger"
                      onClick={() => {
                        setOpenMenu(false);
                        onLogout();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                ) : null}
              </div>

              {inMemberCenter ? (
                <button className="btn btn-dark" type="button" onClick={onLogout}>Log Out</button>
              ) : null}
            </>
          ) : (
            <>
              <button className="btn btn-outline" type="button" onClick={onOpenLogin}>Log In</button>
              <button className="btn btn-primary" type="button" onClick={onOpenSignup}>Create Account</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
