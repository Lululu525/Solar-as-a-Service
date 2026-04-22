
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IOSStepsSection from "../components/IOSStepsSection";
import { heroSlides, regionalCoverage, proposals } from "../data";
import { useNavigate } from "react-router-dom";

export default function HomePage({ onOpenLogin, onOpenSignup, isLoggedIn, onLogout }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % heroSlides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[index];

  return (
    <div className="page-shell">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} isMember={isLoggedIn} memberName="Demo User" onLogout={onLogout} />

      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${current.image})` }} />
        <div className="hero-shade" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>{current.title}</h1>
            <p>{current.text}</p>

            <div className="hero-actions">
              <button className="hero-button hero-button-primary" type="button" onClick={() => navigate("/proposals")}>Explore Projects</button>
              <button className="hero-button hero-button-secondary" type="button" onClick={() => navigate("/contact")}>Contact Us</button>
            </div>

            <div className="hero-dots">
              {heroSlides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  className={`hero-dot${dotIndex === index ? " active" : ""}`}
                  onClick={() => setIndex(dotIndex)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <h2>Regional Coverage</h2>
            <p className="section-eyebrow">Southern Taiwan Focus</p>
          </div>
          <div className="coverage-grid">
            {regionalCoverage.map((item) => (
              <article className="coverage-card" key={item.title}>
                <img src={item.image} alt={item.title} className="coverage-image" />
                <div className="coverage-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <IOSStepsSection />

      <section
        className="trend-banner"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=80)" }}
      >
        <div className="trend-banner-overlay" />
        <div className="container trend-banner-inner">
          <p className="trend-eyebrow">Market Direction</p>
          <h2>Rooftop Solar Trends</h2>
          <p>Southern Taiwan rooftop solar development is moving toward clearer participation models for property owners and investors.</p>
        </div>
      </section>

      <section
        className="contact-banner"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=2200&q=80)" }}
      >
        <div className="contact-banner-overlay" />
        <div className="container contact-banner-inner">
          <h2>Contact Us</h2>
          <p>Talk to our team about rooftop projects, partnerships, and solar participation in Taiwan.</p>
          <button className="btn btn-primary" type="button" onClick={() => navigate("/contact")}>Open Contact Form</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
