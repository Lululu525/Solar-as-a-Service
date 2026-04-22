
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const overviewStats = [
  { title: "Participated Projects", value: "0" },
  { title: "Projects Under Construction", value: "0" },
  { title: "Panels Held", value: "0" },
];

const menuConfig = [
  { key: "overview", label: "Member Overview", type: "link" },
  { key: "plants", label: "My Solar Panels", type: "group", children: [] },
  {
    key: "revenue",
    label: "Electricity Revenue",
    type: "group",
    children: [
      { key: "latest-bill", label: "Latest Bill" },
      { key: "history-bill", label: "Billing History" },
      { key: "payment-release", label: "Payment Release Info" },
    ],
  },
  {
    key: "account",
    label: "Account Info",
    type: "group",
    children: [
      { key: "account-profile", label: "Profile / Billing Account" },
      { key: "change-password", label: "Change Password" },
      { key: "volt-credits", label: "Volt Credits" },
      { key: "member-terms", label: "Member Terms" },
    ],
  },
  { key: "notifications", label: "Notifications", type: "link" },
];

function SidebarGroup({ item, expandedMenu, setExpandedMenu, activePage, setActivePage }) {
  const expanded = expandedMenu === item.key;

  return (
    <div className="mc-group">
      <button
        type="button"
        className={`mc-menu-item ${expanded ? "active-group" : ""}`}
        onClick={() => {
          if (expanded) {
            setExpandedMenu(null);
          } else {
            setExpandedMenu(item.key);
            if (item.children[0]) setActivePage(item.children[0].key);
            if (!item.children.length) setActivePage(item.key);
          }
        }}
      >
        <span className="mc-menu-main">
          <span className="mc-menu-icon">
            {item.key === "plants" ? "⏍" : item.key === "revenue" ? "◉" : "◌"}
          </span>
          <span>{item.label}</span>
        </span>
        <span className={`mc-toggle-pill ${expanded ? "minus" : "plus"}`}>{expanded ? "−" : "+"}</span>
      </button>

      {expanded && item.children.length > 0 ? (
        <div className="mc-submenu">
          {item.children.map((child) => (
            <button
              key={child.key}
              type="button"
              className={`mc-submenu-item ${activePage === child.key ? "active" : ""}`}
              onClick={() => setActivePage(child.key)}
            >
              {child.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SectionHeader({ title, right }) {
  return (
    <div className="mc-section-header">
      <div className="mc-title-wrap">
        <span className="mc-title-dot" />
        <h1>{title}</h1>
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  );
}

function Card({ title, children, corner = true, className = "" }) {
  return (
    <article className={`mc-card ${className}`.trim()}>
      {corner ? <span className="mc-card-corner" /> : null}
      {title ? <h3>{title}</h3> : null}
      {children}
    </article>
  );
}

function OverviewPage() {
  return (
    <>
      <SectionHeader title="Plant Analytics Overview" />
      <div className="mc-overview-grid">
        <div className="mc-overview-left">
          <div className="mc-stat-grid">
            {overviewStats.map((item) => (
              <Card key={item.title} title={item.title} className="mc-stat-card">
                <div className="mc-zero">{item.value}</div>
              </Card>
            ))}
          </div>

          <Card title="Total Investment Amount" className="mc-wide-card">
            <div className="mc-zero">0 <span>TWD</span></div>
          </Card>

          <Card title="Generated Electricity" className="mc-wide-card">
            <div className="mc-zero">0 <span>kWh</span></div>
          </Card>

          <Card title="Electricity Revenue" className="mc-wide-card">
            <div className="mc-zero">0 <span>TWD</span></div>
          </Card>
        </div>

        <Card title="Project Distribution" className="mc-map-card">
          <div className="mc-map-wrap">
            <img src="/TWmap-removebg-preview.png" alt="Taiwan map" className="mc-map-image" />
          </div>
        </Card>
      </div>
    </>
  );
}

function LatestBillPage() {
  return (
    <>
      <SectionHeader title="Latest Bill" />
      <div className="mc-stat-grid bill-stats">
        <Card title="Period" className="mc-mini-stat"><div className="mc-zero small">--</div></Card>
        <Card title="Total Active Plants" className="mc-mini-stat"><div className="mc-zero small">0 <span>plants</span></div></Card>
        <Card title="Panels Held This Period" className="mc-mini-stat"><div className="mc-zero small">0 <span>panels</span></div></Card>
        <Card title="Revenue This Period" className="mc-mini-stat"><div className="mc-zero small">0 <span>TWD</span></div></Card>
      </div>

      <Card className="mc-empty-card" corner={false}>
        <div className="mc-empty">EMPTY</div>
      </Card>

      <div className="mc-pager">
        <button type="button" className="mc-page-btn">◀</button>
        <span>1</span>
        <button type="button" className="mc-page-btn">▶</button>
      </div>
    </>
  );
}

function PaymentReleasePage() {
  return (
    <>
      <SectionHeader
        title="Payment Release Info"
        right={
          <select className="mc-year-select" defaultValue="year">
            <option value="year">Year</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        }
      />
      <Card title="Payment Release Notice" className="mc-empty-card">
        <div className="mc-empty">EMPTY</div>
      </Card>
    </>
  );
}

function ChangePasswordPage() {
  return (
    <>
      <SectionHeader title="Change Password" />
      <div className="mc-form-shell">
        <div className="mc-password-grid">
          {[
            ["Current Password", "Enter current password"],
            ["New Password", "Enter new password"],
            ["Confirm New Password", "Confirm new password"],
          ].map(([label, placeholder]) => (
            <div className="mc-form-row" key={label}>
              <label>{label}</label>
              <input placeholder={placeholder} />
            </div>
          ))}
        </div>

        <button type="button" className="mc-yellow-btn">Confirm Update →</button>
      </div>
    </>
  );
}

function MemberTermsPage() {
  return (
    <>
      <SectionHeader title="Member Terms" />
      <p className="mc-terms-intro">
        Please review the member terms carefully. If you have any questions, please contact us at any time.<br />
        Service email: <a href="mailto:service@solarservice.com">service@solarservice.com</a>
      </p>

      <Card className="mc-terms-card" corner={false}>
        <div className="mc-terms-inner">
          <h2>Member Terms</h2>
          <p><strong>1. Confirmation and Acceptance of Terms</strong></p>
          <p>
            Welcome to Solar as a Service. By registering for an account or using the platform, you acknowledge that you have read,
            understood, and agreed to these member terms and the related service rules.
          </p>
          <p><strong>2. Definitions</strong></p>
          <p>
            A member is a user whose application has been accepted by the platform and who may access the services provided here.
            A proposer may submit rooftop solar, leasing, or energy cooperation proposals through the platform.
          </p>
          <p><strong>3. Service Scope</strong></p>
          <p>
            The platform provides proposal browsing, project submission, participation information, member center management,
            notifications, and related account services. Service items may be adjusted according to operational needs.
          </p>
          <p><strong>4. Member Responsibilities</strong></p>
          <p>
            Members must provide accurate and up-to-date information and properly keep their account credentials secure.
            If any account abnormality or suspected misuse occurs, members should notify the platform immediately.
          </p>
          <p><strong>5. Privacy and Data Protection</strong></p>
          <p>
            The platform processes and uses personal data only within the scope necessary for service delivery, communication,
            and lawful platform operations, subject to the privacy policy.
          </p>
          <p><strong>6. Revisions</strong></p>
          <p>
            Solar as a Service reserves the right to revise these terms at any time. Continued use of the service after changes
            are published will be treated as acceptance of the revised terms.
          </p>
        </div>
      </Card>
    </>
  );
}

function NotificationsPage() {
  return (
    <>
      <SectionHeader
        title="Notifications"
        right={<button type="button" className="mc-read-btn">☑ Mark All as Read</button>}
      />
      <div className="mc-notice-tabs">
        <button type="button" className="active">All Messages</button>
        <button type="button">Project Messages</button>
        <button type="button">Activity Messages</button>
      </div>

      <Card className="mc-empty-card" corner={false}>
        <div className="mc-empty">You do not have any messages</div>
      </Card>

      <div className="mc-pager">
        <button type="button" className="mc-page-btn">◀</button>
        <span>1</span>
        <button type="button" className="mc-page-btn">▶</button>
      </div>
    </>
  );
}

function PlaceholderPage({ title, subtitle = "EMPTY" }) {
  return (
    <>
      <SectionHeader title={title} />
      <Card className="mc-empty-card" corner={false}>
        <div className="mc-empty">{subtitle}</div>
      </Card>
    </>
  );
}

export default function MemberCenterPage({ onOpenLogin, onOpenSignup, isLoggedIn, onLogout }) {
  const [expandedMenu, setExpandedMenu] = useState("revenue");
  const [activePage, setActivePage] = useState("latest-bill");

  const pageMeta = useMemo(() => ({
    overview: <OverviewPage />,
    "latest-bill": <LatestBillPage />,
    "history-bill": <PlaceholderPage title="Billing History" />,
    "payment-release": <PaymentReleasePage />,
    "account-profile": <PlaceholderPage title="Profile / Billing Account" />,
    "change-password": <ChangePasswordPage />,
    "volt-credits": <PlaceholderPage title="Volt Credits" />,
    "member-terms": <MemberTermsPage />,
    notifications: <NotificationsPage />,
    plants: <PlaceholderPage title="My Solar Panels" />,
  }), []);

  return (
    <div className="page-shell member-page-shell">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} isMember={isLoggedIn} memberName="Demo User" onLogout={onLogout} />

      <div className="mc-shell with-topnav">
        <aside className="mc-sidebar">
          <div className="mc-profile">
            <div className="mc-profile-avatar">D</div>
            <p>Welcome Back,</p>
            <h3>Demo User</h3>
            <div className="mc-profile-email">demo@solarservice.com</div>
          </div>

          <nav className="mc-nav">
            <button
              type="button"
              className={`mc-menu-item ${activePage === "overview" ? "active" : ""}`}
              onClick={() => {
                setExpandedMenu(null);
                setActivePage("overview");
              }}
            >
              <span className="mc-menu-main"><span className="mc-menu-icon">◎</span><span>Member Overview</span></span>
            </button>

            <SidebarGroup
              item={menuConfig[1]}
              expandedMenu={expandedMenu}
              setExpandedMenu={setExpandedMenu}
              activePage={activePage}
              setActivePage={(page) => setActivePage(page || "plants")}
            />

            <SidebarGroup
              item={menuConfig[2]}
              expandedMenu={expandedMenu}
              setExpandedMenu={setExpandedMenu}
              activePage={activePage}
              setActivePage={setActivePage}
            />

            <SidebarGroup
              item={menuConfig[3]}
              expandedMenu={expandedMenu}
              setExpandedMenu={setExpandedMenu}
              activePage={activePage}
              setActivePage={setActivePage}
            />

            <button
              type="button"
              className={`mc-menu-item ${activePage === "notifications" ? "active" : ""}`}
              onClick={() => {
                setExpandedMenu(null);
                setActivePage("notifications");
              }}
            >
              <span className="mc-menu-main"><span className="mc-menu-icon">✉</span><span>Notifications</span></span>
            </button>
          </nav>
        </aside>

        <main className="mc-main">
          <div className="mc-bg-blur mc-bg-left" />
          <div className="mc-bg-blur mc-bg-right" />

          <div className="mc-topbar">
            <div className="mc-topbar-right">
              <div className="mc-notification-chip">Notifications <span>0</span></div>
              <div className="mc-top-user">
                <div className="mc-top-avatar">D</div>
                <span>Demo User</span>
              </div>
            </div>
          </div>

          <div className="mc-content">
            {pageMeta[activePage] || <OverviewPage />}
          </div>

          <button type="button" className="mc-fab">•••</button>
        </main>
      </div>

      <Footer />
    </div>
  );
}
