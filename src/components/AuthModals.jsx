
export function LoginModal({ open, onClose, onSwitch, onLogin }) {
  if (!open) return null;

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" type="button" onClick={onClose}>×</button>

        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue your journey</p>

        <div className="auth-field">
          <label>Email address</label>
          <div className="auth-input-wrap">
            <input defaultValue="demo@lupezo.com" placeholder="you@example.com" />
          </div>
        </div>

        <div className="auth-field">
          <label>Password</label>
          <div className="auth-input-wrap">
            <input defaultValue="demo12345" type="password" placeholder="••••••••" />
          </div>
        </div>

        <button className="auth-link-button" type="button">Forgot password?</button>
        <button className="auth-primary-button" type="button" onClick={onLogin}>Sign in →</button>

        <p className="auth-bottom-copy">Don’t have an account? <span onClick={onSwitch}>Create one</span></p>

        <div className="auth-divider"><span>or</span></div>

        <button className="auth-guest-button" type="button" onClick={onClose}>Continue as guest</button>
      </div>
    </div>
  );
}

export function SignupModal({ open, onClose, onSwitch }) {
  if (!open) return null;

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" type="button" onClick={onClose}>×</button>

        <h1>Create account</h1>
        <p className="auth-subtitle">Start your experience in moments</p>

        <div className="auth-field">
          <label>Full name</label>
          <div className="auth-input-wrap">
            <input placeholder="John Doe" />
          </div>
        </div>

        <div className="auth-field">
          <label>Email address</label>
          <div className="auth-input-wrap">
            <input placeholder="you@example.com" />
          </div>
        </div>

        <div className="auth-field">
          <label>Password</label>
          <div className="auth-input-wrap">
            <input type="password" placeholder="••••••••" />
          </div>
        </div>

        <div className="auth-field">
          <label>Confirm password</label>
          <div className="auth-input-wrap">
            <input type="password" placeholder="••••••••" />
          </div>
        </div>

        <button className="auth-primary-button" type="button">Create account →</button>
        <p className="auth-bottom-copy">Already have an account? <span onClick={onSwitch}>Sign in</span></p>
      </div>
    </div>
  );
}
