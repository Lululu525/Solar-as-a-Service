
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage({ onOpenLogin, onOpenSignup, isLoggedIn, onLogout }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    location: "",
    rooftopArea: "",
    requirements: "",
  });

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="page-shell">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} isMember={isLoggedIn} memberName="Demo User" onLogout={onLogout} />

      <section
        className="contact-page-hero"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=2200&q=80)" }}
      >
        <div className="contact-banner-overlay" />
        <div className="container contact-page-hero-inner centered">
          <h2>Contact Us</h2>
          <p className="contact-page-eyebrow">CONTACT</p>
          <p>Talk to our team about rooftop projects, partnerships, and solar participation in Taiwan.</p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="contact-card">
            <form>
              <div className="contact-grid">
                <div className="contact-field">
                  <label>Full Name</label>
                  <input value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder="Enter your full name" />
                </div>
                <div className="contact-field">
                  <label>Phone Number</label>
                  <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="Enter your phone number" />
                </div>
                <div className="contact-field">
                  <label>Email Address</label>
                  <input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="Enter your email address" />
                </div>
                <div className="contact-field">
                  <label>Company Name</label>
                  <input value={form.company} onChange={(e) => setField("company", e.target.value)} placeholder="Enter your company name" />
                </div>
                <div className="contact-field">
                  <label>Project Location</label>
                  <input value={form.location} onChange={(e) => setField("location", e.target.value)} placeholder="Enter project location" />
                </div>
                <div className="contact-field">
                  <label>Rooftop Area (m²)</label>
                  <input value={form.rooftopArea} onChange={(e) => setField("rooftopArea", e.target.value)} placeholder="Enter rooftop area" />
                </div>
              </div>

              <div className="contact-field full">
                <label>Project Requirements</label>
                <textarea value={form.requirements} onChange={(e) => setField("requirements", e.target.value)} placeholder="Describe your rooftop solar needs, timeline, or collaboration idea" />
              </div>

              <div className="contact-submit-wrap">
                <button className="btn btn-primary" type="button">Submit Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
