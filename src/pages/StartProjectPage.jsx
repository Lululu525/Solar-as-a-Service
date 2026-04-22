
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cityDistricts, serviceCoverageEnglish } from "../data";

const initialForm = {
  city: "",
  district: "",
  address: "",
  buildingType: "",
  installationType: "",
  fullName: "",
  phone: "",
  email: "",
  company: "",
  rooftopArea: "",
  requirements: "",
};

export default function StartProjectPage({ onOpenLogin, onOpenSignup, isLoggedIn, onLogout }) {
  const [form, setForm] = useState(initialForm);
  const [openCoverage, setOpenCoverage] = useState(true);
  const [errors, setErrors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);

  const districts = useMemo(() => cityDistricts[form.city] ?? [], [form.city]);

  const setField = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "city") next.district = "";
      return next;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    ["city", "district", "address", "buildingType", "installationType", "fullName", "phone"].forEach((field) => {
      if (!String(form[field] || "").trim()) next[field] = "This field is required.";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccessOpen(true);
    setForm(initialForm);
  };

  return (
    <div className="page-shell">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} isMember={isLoggedIn} memberName="Demo User" onLogout={onLogout} />

      <section
        className="proposal-page-hero"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=80)" }}
      >
        <div className="proposal-page-overlay" />
        <div className="container proposal-page-hero-inner">
          <h1>Start Your Project</h1>
          <p>Professional consultation and free evaluation for rooftop owners in Taiwan.</p>
        </div>
      </section>

      <section className="start-project-shell">
        <div className="container start-project-wrap">
          <div className="project-form-title-block">
            <h2>I Have a Rooftop to Lease</h2>
            <p>Professional consultation and free evaluation</p>
          </div>

          <div className="coverage-accordion">
            <button className="coverage-accordion-head" type="button" onClick={() => setOpenCoverage((prev) => !prev)}>
              <span>Service Coverage</span>
              <span>{openCoverage ? "⌃" : "⌄"}</span>
            </button>
            {openCoverage ? (
              <div className="coverage-accordion-body">
                <ul>
                  {serviceCoverageEnglish.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ) : null}
          </div>

          <form className="start-project-card" onSubmit={handleSubmit}>
            <div className="project-section">
              <div className="project-section-title">
                <span className="project-section-badge">1</span>
                <h3>Building Assessment Information</h3>
              </div>

              <div className="project-row">
                <label className="project-label">Building Address <span>*</span></label>
                <div className="project-address-grid">
                  <div className="project-field-block">
                    <select value={form.city} onChange={(e) => setField("city", e.target.value)} className={errors.city ? "field-error" : ""}>
                      <option value="">City</option>
                      {Object.keys(cityDistricts).map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                    {errors.city ? <div className="field-error-text">{errors.city}</div> : null}
                  </div>

                  <div className="project-field-block">
                    <select value={form.district} onChange={(e) => setField("district", e.target.value)} className={errors.district ? "field-error" : ""}>
                      <option value="">District</option>
                      {districts.map((district) => <option key={district} value={district}>{district}</option>)}
                    </select>
                    {errors.district ? <div className="field-error-text">{errors.district}</div> : null}
                  </div>

                  <div className="project-field-block">
                    <input value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="Example: No. 267, Chongyang Rd." className={errors.address ? "field-error" : ""} />
                    {errors.address ? <div className="field-error-text">{errors.address}</div> : null}
                  </div>
                </div>
              </div>

              <div className="project-row">
                <label className="project-label">Building Type <span>*</span></label>
                <div className="project-field-block full-width">
                  <select value={form.buildingType} onChange={(e) => setField("buildingType", e.target.value)} className={errors.buildingType ? "field-error" : ""}>
                    <option value="">Please select building type</option>
                    <option>Residential Building</option>
                    <option>Commercial Building</option>
                    <option>Industrial Building</option>
                    <option>Apartment / Mixed-use Building</option>
                  </select>
                  {errors.buildingType ? <div className="field-error-text">{errors.buildingType}</div> : null}
                </div>
              </div>

              <div className="project-row">
                <label className="project-label">Expected Installation Method <span>*</span></label>
                <div className="project-field-block full-width">
                  <select value={form.installationType} onChange={(e) => setField("installationType", e.target.value)} className={errors.installationType ? "field-error" : ""}>
                    <option value="">Please select installation method</option>
                    <option>Lease rooftop for solar installation</option>
                    <option>Self-funded solar installation</option>
                    <option>Other</option>
                  </select>
                  {errors.installationType ? <div className="field-error-text">{errors.installationType}</div> : null}
                </div>
              </div>
            </div>

            <div className="project-section">
              <div className="project-section-title">
                <span className="project-section-badge">2</span>
                <h3>Contact Information</h3>
              </div>

              {[
                ["Full Name", "fullName", "Please enter your name", true],
                ["Phone Number", "phone", "Please enter your phone number", true],
                ["Email Address", "email", "Please enter your email address", false],
                ["Company Name", "company", "Enter your company name", false],
                ["Rooftop Area (m²)", "rooftopArea", "Enter rooftop area", false],
              ].map(([label, key, placeholder, required]) => (
                <div className="project-row" key={key}>
                  <label className="project-label">{label}{required ? <span>*</span> : null}</label>
                  <div className="project-field-block full-width">
                    <input value={form[key]} onChange={(e) => setField(key, e.target.value)} placeholder={placeholder} className={errors[key] ? "field-error" : ""} />
                    {errors[key] ? <div className="field-error-text">{errors[key]}</div> : null}
                  </div>
                </div>
              ))}

              <div className="project-row">
                <label className="project-label">Project Requirements</label>
                <div className="project-field-block full-width">
                  <textarea rows="6" value={form.requirements} onChange={(e) => setField("requirements", e.target.value)} placeholder="Describe your rooftop solar needs, timeline, or collaboration idea" />
                </div>
              </div>
            </div>

            <div className="project-submit-wrap">
              <button className="btn btn-primary project-submit-btn" type="submit">Submit Form</button>
            </div>
          </form>
        </div>
      </section>

      <Footer />

      {successOpen ? (
        <div className="proposal-modal-backdrop" onClick={() => setSuccessOpen(false)}>
          <div className="success-box" onClick={(e) => e.stopPropagation()}>
            <h3>Proposal Received</h3>
            <p>We have received your proposal. Thank you. We will contact you as soon as possible.</p>
            <button className="btn btn-primary" type="button" onClick={() => setSuccessOpen(false)}>Close</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
