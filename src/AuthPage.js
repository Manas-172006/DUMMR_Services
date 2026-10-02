import React, { useState } from 'react';
import './AuthPage.css';

function AuthPage({ initialMode = 'signin', onAuthSuccess, onBack }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Form Fields
  const [role, setRole] = useState('provider'); // 'provider' | 'client'
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('Web & Software Development');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: 'None', class: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, text: 'Weak', class: 'active-weak' };
    if (score === 2) return { score: 2, text: 'Fair', class: 'active-fair' };
    if (score === 3) return { score: 3, text: 'Good', class: 'active-good' };
    return { score: 4, text: 'Strong', class: 'active-strong' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    if (isSignUp) {
      if (!fullName) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please agree to the Terms of Service to continue.');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userProfile = {
        name: isSignUp ? fullName : (email.split('@')[0] || 'Alex Hunter'),
        username: username || (email.split('@')[0] || 'alexhunter'),
        email: email,
        role: role,
        specialty: specialty,
        avatar: (fullName || email).substring(0, 2).toUpperCase(),
      };

      if (onAuthSuccess) {
        onAuthSuccess(userProfile, isSignUp ? 'signup' : 'signin');
      }
    }, 700);
  };

  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'provider') {
      setEmail('sarah.chen@dummr.services');
      setPassword('ExpertPro2026!');
      setFullName('Sarah Chen');
      setUsername('sarahchen');
      setRole('provider');
      setSpecialty('UI/UX & Product Design');
    } else {
      setEmail('marcus.client@studio.io');
      setPassword('ClientAccount2026!');
      setFullName('Marcus Vance');
      setUsername('marcusv');
      setRole('client');
    }
    setErrorMsg('');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        
        {/* Left Hero Sidebar */}
        <div className="auth-sidebar-hero">
          <div>
            <div className="auth-brand-badge" onClick={onBack}>
              <svg width="18" height="14" viewBox="0 0 27 17" fill="none">
                <ellipse cx="13.25" cy="8.4" rx="13.2" ry="2.9" transform="rotate(-25 13.25 8.4)" stroke="currentColor" strokeWidth="1.25"/>
                <circle cx="13.25" cy="8.4" r="8.8" fill="#0f172a"/>
                <circle cx="13.25" cy="8.4" r="8.1" fill="currentColor"/>
              </svg>
              <span>DUMMR SERVICES</span>
            </div>

            <div className="auth-hero-main">
              <div className="auth-hero-tagline">Independent Service Platform</div>
              <h2 className="auth-hero-title">
                Own your expertise.<br />
                <span>Earn your value.</span>
              </h2>
              <p className="auth-hero-description">
                The modern business OS for independent professionals, consultants, and creators. Showcase your storefront, book high-value clients, and automate invoices on your own terms.
              </p>

              <div className="auth-perks-list">
                <div className="auth-perk-item">
                  <div className="auth-perk-icon">✓</div>
                  <span><strong>Personal Storefront</strong> with custom booking calendar</span>
                </div>
                <div className="auth-perk-item">
                  <div className="auth-perk-icon">✓</div>
                  <span><strong>Zero Middleman Cut</strong> — keep 100% of your earnings</span>
                </div>
                <div className="auth-perk-item">
                  <div className="auth-perk-icon">✓</div>
                  <span><strong>Built-in Invoicing & CRM</strong> for streamlined client operations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <span>© 2026 DUMMR Platform</span>
            <span>Privacy & Security Guaranteed</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-header-toggle-row">
            <div className="auth-tab-buttons">
              <button
                type="button"
                className={`auth-tab-btn ${!isSignUp ? 'active' : ''}`}
                onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
              >
                Create Account
              </button>
            </div>

            {onBack && (
              <button type="button" className="auth-back-link" onClick={onBack}>
                ← Back
              </button>
            )}
          </div>

          <h1 className="auth-form-title">
            {isSignUp ? 'Join DUMMR Services' : 'Welcome back'}
          </h1>
          <p className="auth-form-subtitle">
            {isSignUp
              ? 'Start running your independent business with confidence.'
              : 'Enter your credentials to access your provider or client hub.'}
          </p>

          {/* Social Logins */}
          <div className="auth-social-row">
            <button
              type="button"
              className="auth-social-btn"
              onClick={() => handleQuickDemo('provider')}
              title="Sign in with Google"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="auth-social-btn"
              onClick={() => handleQuickDemo('client')}
              title="Sign in with Apple"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.04-.51 2.65-1.24z"/>
              </svg>
              <span>Apple</span>
            </button>

            <button
              type="button"
              className="auth-social-btn"
              onClick={() => handleQuickDemo('provider')}
              title="Sign in with GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          {errorMsg && (
            <div className="auth-error-banner">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Account Type Selection on Signup */}
            {isSignUp && (
              <div>
                <label className="auth-label" style={{ marginBottom: '8px' }}>
                  I want to join as:
                </label>
                <div className="auth-role-selector">
                  <div
                    className={`auth-role-card ${role === 'provider' ? 'active' : ''}`}
                    onClick={() => setRole('provider')}
                  >
                    <div className="auth-role-icon">💼</div>
                    <div className="auth-role-details">
                      <strong>Independent Pro</strong>
                      <small>Sell services & get booked</small>
                    </div>
                  </div>

                  <div
                    className={`auth-role-card ${role === 'client' ? 'active' : ''}`}
                    onClick={() => setRole('client')}
                  >
                    <div className="auth-role-icon">🏢</div>
                    <div className="auth-role-details">
                      <strong>Client / Buyer</strong>
                      <small>Hire pros & pay invoices</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Signup: Name and Desired Handle */}
            {isSignUp && (
              <div className="auth-form-row-2">
                <div className="auth-field-group">
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-container">
                    <span className="auth-input-icon">👤</span>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="e.g. Maya Patel"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">Username / Handle</label>
                  <div className="auth-input-container">
                    <span className="auth-input-icon">@</span>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="mayapatel"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    />
                  </div>
                  {username && (
                    <span className="auth-handle-preview">
                      dummr.services/@{username}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Signup: Provider Specialty */}
            {isSignUp && role === 'provider' && (
              <div className="auth-field-group">
                <label className="auth-label">Primary Expertise</label>
                <div className="auth-input-container">
                  <span className="auth-input-icon">⚡</span>
                  <select
                    className="auth-input"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    style={{ paddingRight: '14px' }}
                  >
                    <option value="Web & Software Development">Web & Software Development</option>
                    <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                    <option value="Strategy & Business Consulting">Strategy & Business Consulting</option>
                    <option value="Branding & Visual Identity">Branding & Visual Identity</option>
                    <option value="Content & Copywriting">Content & Copywriting</option>
                    <option value="Video & Motion Production">Video & Motion Production</option>
                    <option value="Marketing & Growth Operations">Marketing & Growth Operations</option>
                    <option value="Legal & Financial Advisory">Legal & Financial Advisory</option>
                  </select>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="auth-field-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-container">
                <span className="auth-input-icon">✉️</span>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="auth-field-group">
              <div className="auth-label">
                <span>Password</span>
                {!isSignUp && (
                  <button
                    type="button"
                    className="auth-forgot-btn"
                    onClick={() => { setShowForgotModal(true); setForgotSubmitted(false); }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="auth-input-container">
                <span className="auth-input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder={isSignUp ? 'Create a secure password (8+ chars)' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* Password strength meter during signup */}
              {isSignUp && password && (
                <div className="auth-pwd-strength">
                  <div className="auth-strength-bars">
                    <div className={`auth-strength-segment ${strength.score >= 1 ? strength.class : ''}`} />
                    <div className={`auth-strength-segment ${strength.score >= 2 ? strength.class : ''}`} />
                    <div className={`auth-strength-segment ${strength.score >= 3 ? strength.class : ''}`} />
                    <div className={`auth-strength-segment ${strength.score >= 4 ? strength.class : ''}`} />
                  </div>
                  <div className="auth-strength-label">
                    Strength: <strong>{strength.text}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Checkbox Options */}
            <div className="auth-options-row">
              {!isSignUp ? (
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember this device for 30 days</span>
                </label>
              ) : (
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>I agree to the Terms of Service & Privacy Policy</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : isSignUp ? (
                <span>Create DUMMR Account →</span>
              ) : (
                <span>Sign in to Dashboard →</span>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Pill */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: '#64748b' }}>
            <span>Need a quick test? </span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer', padding: '0 4px', textDecoration: 'underline' }}
              onClick={() => handleQuickDemo('provider')}
            >
              Fill Demo Provider
            </button>
            <span> • </span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer', padding: '0 4px', textDecoration: 'underline' }}
              onClick={() => handleQuickDemo('client')}
            >
              Fill Demo Client
            </button>
          </div>

          <div className="auth-terms-note">
            By signing up, you agree to DUMMR's independent contractor guidelines.
            Your storefront URL is uniquely reserved for your brand.
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Reset your password</h3>
            {!forgotSubmitted ? (
              <>
                <p>
                  Enter the email associated with your DUMMR account and we will send you a secure link to reset your password.
                </p>
                <div className="auth-field-group">
                  <label className="auth-label">Email address</label>
                  <input
                    type="email"
                    className="auth-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="you@domain.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <div className="auth-modal-actions">
                  <button
                    type="button"
                    className="auth-tab-btn"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="auth-submit-btn"
                    style={{ width: 'auto', padding: '0 20px', marginTop: 0 }}
                    onClick={() => {
                      if (forgotEmail) setForgotSubmitted(true);
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ color: '#059669', fontSize: '2rem', marginBottom: '8px' }}>✓</div>
                <p>
                  Password reset link sent to <strong>{forgotEmail}</strong>. Please check your inbox and spam folder.
                </p>
                <div className="auth-modal-actions">
                  <button
                    type="button"
                    className="auth-submit-btn"
                    style={{ width: 'auto', padding: '0 20px', marginTop: 0 }}
                    onClick={() => setShowForgotModal(false)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
