
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { proposals } from "../data";

function PaymentModal({ open, onClose }) {
  const [method, setMethod] = useState("paypal");
  const [bank, setBank] = useState("Select a bank");

  if (!open) return null;

  return (
    <div className="proposal-modal-backdrop" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="proposal-close" type="button" onClick={onClose}>×</button>
        <h2>Payment methods</h2>

        <div className={`pay-option ${method === "paypal" ? "active" : ""}`} onClick={() => setMethod("paypal")}>
          <div className="pay-option-row">
            <label><input type="radio" checked={method === "paypal"} onChange={() => setMethod("paypal")} /> <span>PayPal</span></label>
            <div className="pay-cards"><span>VISA</span><span>MC</span><span>AMEX</span></div>
          </div>
        </div>

        <div className={`pay-option ${method === "card" ? "active" : ""}`} onClick={() => setMethod("card")}>
          <div className="pay-option-row">
            <label><input type="radio" checked={method === "card"} onChange={() => setMethod("card")} /> <span>Credit card / debit card</span></label>
            <div className="pay-cards"><span>VISA</span><span>MC</span><span>AMEX</span></div>
          </div>

          {method === "card" ? (
            <div className="pay-grid">
              <div className="pay-field">
                <label>Card Number</label>
                <input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="pay-field">
                <label>Name on card</label>
                <input placeholder="Full name" />
              </div>
              <div className="pay-field">
                <label>Expiration Date</label>
                <input placeholder="MM / YY" />
              </div>
              <div className="pay-field">
                <label>CVV</label>
                <input placeholder="123" />
              </div>
            </div>
          ) : null}
        </div>

        <div className={`pay-option ${method === "bank" ? "active" : ""}`} onClick={() => setMethod("bank")}>
          <div className="pay-option-row">
            <label><input type="radio" checked={method === "bank"} onChange={() => setMethod("bank")} /> <span>Bank transfer</span></label>
          </div>

          {method === "bank" ? (
            <div className="pay-bank-select">
              <select value={bank} onChange={(e) => setBank(e.target.value)}>
                <option>Select a bank</option>
                <option>CTBC Bank</option>
                <option>HSBC Bank</option>
                <option>DBS Bank</option>
                <option>Cathay United Bank</option>
              </select>
            </div>
          ) : null}
        </div>

        <div className="pay-checks">
          <label><input type="checkbox" /> Keep me informed on offers or promotions</label>
          <label><input type="checkbox" /> Want to check out faster next time? Create an account in one easy step.</label>
        </div>

        <button className="pay-order-btn" type="button" onClick={onClose}>Order now</button>
        <p className="pay-secure">SECURE · All transactions are secure and encrypted. Credit card information is never stored.</p>
      </div>
    </div>
  );
}

export default function ProposalsPage({ onOpenLogin, onOpenSignup, isLoggedIn, onLogout }) {
  const [active, setActive] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");

  const regions = ["All", ...new Set(proposals.map((item) => item.region))];
  const types = ["All", ...new Set(proposals.map((item) => item.type))];

  const filtered = useMemo(() => {
    return proposals.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesRegion = region === "All" || item.region === region;
      const matchesType = type === "All" || item.type === type;
      return matchesQuery && matchesRegion && matchesType;
    });
  }, [query, region, type]);

  return (
    <div className="page-shell">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} isMember={isLoggedIn} memberName="Demo User" onLogout={onLogout} />

      <section
        className="proposal-page-hero"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=80)" }}
      >
        <div className="proposal-page-overlay" />
        <div className="container proposal-page-hero-inner">
          <h1>Explore Proposals</h1>
          <p>Browse rooftop solar proposals in Taiwan, with a strong focus on southern regions and project type.</p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="proposal-filter-bar">
            <input
              className="proposal-search"
              placeholder="Search proposals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select className="proposal-select" value={region} onChange={(e) => setRegion(e.target.value)}>
              {regions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select className="proposal-select" value={type} onChange={(e) => setType(e.target.value)}>
              {types.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div className="proposal-grid">
            {filtered.map((item) => (
              <article key={item.id} className="proposal-card" onClick={() => setActive(item)}>
                <img src={item.image} alt={item.title} className="proposal-thumb" />
                <div className="proposal-card-body">
                  <h3>{item.title}</h3>

                  <div className="proposal-tags">
                    <span>{item.region}</span>
                    <span>{item.type}</span>
                  </div>

                  <div className="progress-track">
                    <div className="progress-bar" style={{ width: `${item.progress}%` }} />
                  </div>

                  <div className="proposal-meta">
                    <strong>{item.target}</strong>
                    <span>{item.daysLeft} days left</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {active ? (
        <div className="proposal-modal-backdrop" onClick={() => setActive(null)}>
          <div className="proposal-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proposal-close" type="button" onClick={() => setActive(null)}>×</button>
            <img src={active.image} alt={active.title} className="proposal-detail-image" />

            <div className="proposal-detail-body">
              <div className="proposal-overview-kicker">PROJECT OVERVIEW</div>
              <h2>{active.title}</h2>

              <div className="proposal-info-grid">
                <div className="proposal-info-card"><span>Continent</span><strong>{active.continent}</strong></div>
                <div className="proposal-info-card"><span>Country</span><strong>{active.country}</strong></div>
                <div className="proposal-info-card"><span>Location</span><strong>{active.location}</strong></div>
                <div className="proposal-info-card"><span>Funding Target</span><strong>{active.target}</strong></div>
              </div>

              <div className="proposal-progress-card">
                <span>Progress</span>
                <div className="progress-track large">
                  <div className="progress-bar" style={{ width: `${active.progress}%` }} />
                </div>
                <div className="proposal-progress-text">{active.progress}% funded · {active.daysLeft} days left</div>
              </div>

              <div className="proposal-summary-card">
                <span>Summary</span>
                <p>{active.summary}</p>
                <p>{active.details}</p>
                <button className="btn btn-primary" type="button" onClick={() => setShowPayment(true)}>Invest Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <PaymentModal open={showPayment} onClose={() => setShowPayment(false)} />

      <Footer />
    </div>
  );
}
