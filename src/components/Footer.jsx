
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/logo.png" alt="Solar as a Service logo" className="footer-brand-logo" />
            <div>
              <div className="footer-brand-wordmark">Solar as a Service</div>
              <div className="footer-brand-subtitle">Global Solar Platform</div>
            </div>
          </div>

          <div className="footer-desc">
            Powering rooftop solar growth through transparent collaboration
            <strong>Build A Brighter Future.</strong>
          </div>
        </div>

        <div className="footer-info">
          <div>
            <div className="footer-info-row">+886 2 3366 0000</div>
            <div className="footer-info-row">hello@solarservice.com</div>
          </div>
          <div>
            <div className="footer-info-row">No. 43, Sec. 4, Keelung Rd., Da’an Dist., Taipei City, Taiwan</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
