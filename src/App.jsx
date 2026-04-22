
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProposalsPage from "./pages/ProposalsPage";
import ContactPage from "./pages/ContactPage";
import StartProjectPage from "./pages/StartProjectPage";
import MemberCenterPage from "./pages/MemberCenterPage";
import { LoginModal, SignupModal } from "./components/AuthModals";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("solarLoggedIn") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowLogin(false);
        setShowSignup(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem("solarLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const openLogin = () => {
    if (isLoggedIn) return;
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    if (isLoggedIn) return;
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeAuth = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeAuth();
    navigate("/member-center");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const sharedProps = {
    onOpenLogin: openLogin,
    onOpenSignup: openSignup,
    isLoggedIn,
    onLogout: handleLogout,
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage {...sharedProps} />} />
        <Route path="/proposals" element={<ProposalsPage {...sharedProps} />} />
        <Route path="/contact" element={<ContactPage {...sharedProps} />} />
        <Route path="/start-project" element={<StartProjectPage {...sharedProps} />} />
        <Route path="/member-center" element={<MemberCenterPage {...sharedProps} />} />
      </Routes>

      <LoginModal open={showLogin} onClose={closeAuth} onSwitch={openSignup} onLogin={handleLogin} />
      <SignupModal open={showSignup} onClose={closeAuth} onSwitch={openLogin} />
    </>
  );
}
