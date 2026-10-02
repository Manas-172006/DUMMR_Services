import React, { useState } from 'react';
import './App.css';
import AuthPage from './AuthPage';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [authMode, setAuthMode] = useState('signin');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Programming');
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [sellerDashTab, setSellerDashTab] = useState('Dashboard');
  const [buyerDashTab, setBuyerDashTab] = useState('Dashboard');
  const [activeInboxThread, setActiveInboxThread] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  const triggerNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="app-container">

      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#222325',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          {notification}
        </div>
      )}

      <header className="global-header">
        <div className="content-wrapper header-inner">
          <div className="logo-area" onClick={() => setActivePage('home')}>
            <svg className="brand-logo-svg" viewBox="0 0 26.9 16.6" width="28" height="18" fill="none">
              <ellipse cx="13.25" cy="8.4" rx="13.2" ry="2.9" transform="rotate(-25 13.25 8.4)" stroke="currentColor" strokeWidth="1.25"/>
              <circle cx="13.25" cy="8.4" r="8.8" fill="#000"/>
              <circle cx="13.25" cy="8.4" r="8.1" fill="currentColor"/>
              <ellipse cx="13.25" cy="8.4" rx="13.2" ry="2.9" transform="rotate(-25 13.25 8.4)" stroke="#000" strokeWidth="0.9" strokeDasharray="28.2 28.2"/>
              <ellipse cx="13.25" cy="8.4" rx="13.2" ry="2.9" transform="rotate(-25 13.25 8.4)" stroke="currentColor" strokeWidth="1.25" strokeDasharray="28.2 28.2"/>
            </svg>
            <span className="brand-logo">
              DUMMR<span>.</span>
            </span>
          </div>

          <nav className="header-nav" aria-label="Main Navigation">
            <button
              type="button"
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`nav-link ${activePage === 'listing' ? 'active' : ''}`}
              onClick={() => {
                setActivePage('listing');
                setSelectedCategory('All');
              }}
            >
              Explore
            </button>
            <button
              type="button"
              className={`nav-link ${activePage === 'buyer-dash' && buyerDashTab === 'Messages' ? 'active' : ''}`}
              onClick={() => {
                setActivePage('buyer-dash');
                setBuyerDashTab('Messages');
              }}
            >
              Messages
            </button>
            <button
              type="button"
              className={`nav-link ${activePage === 'buyer-dash' && buyerDashTab === 'Active Orders' ? 'active' : ''}`}
              onClick={() => {
                setActivePage('buyer-dash');
                setBuyerDashTab('Active Orders');
              }}
            >
              Orders
            </button>

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {currentUser.role !== 'provider' && (
                  <button
                    type="button"
                    className="nav-link seller-cta-nav"
                    onClick={() => setActivePage('seller-dash')}
                  >
                    Become a Seller
                  </button>
                )}
                <button
                  type="button"
                  className="profile-avatar-btn"
                  onClick={() => {
                    if (currentUser.role === 'provider') {
                      setActivePage('seller-dash');
                    } else {
                      setActivePage('buyer-dash');
                      setBuyerDashTab('Profile');
                    }
                  }}
                  title={`Signed in as ${currentUser.name} (${currentUser.role})`}
                >
                  <span className="avatar-badge">{currentUser.avatar || 'ME'}</span>
                  <span>{currentUser.name}</span>
                </button>
                <button
                  type="button"
                  className="nav-link"
                  style={{ fontSize: '0.82rem', color: '#94a3b8' }}
                  onClick={() => {
                    setCurrentUser(null);
                    triggerNotice('Signed out successfully.');
                    setActivePage('home');
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className={`nav-link ${activePage === 'auth' && authMode === 'signin' ? 'active' : ''}`}
                  onClick={() => {
                    setAuthMode('signin');
                    setActivePage('auth');
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="nav-link seller-cta-nav"
                  onClick={() => setActivePage('seller-dash')}
                >
                  Become a Seller
                </button>
                <button
                  type="button"
                  className="nav-link seller-cta-nav"
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    setAuthMode('signup');
                    setActivePage('auth');
                  }}
                >
                  Join DUMMR
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="content-wrapper" style={{ flex: 1 }}>
        {activePage === 'auth' && (
          <AuthPage
            initialMode={authMode}
            onAuthSuccess={(profile, mode) => {
              setCurrentUser(profile);
              triggerNotice(
                mode === 'signup'
                  ? `Welcome to DUMMR, ${profile.name}! Your account is ready.`
                  : `Welcome back, ${profile.name}!`
              );
              if (profile.role === 'provider') {
                setActivePage('seller-dash');
              } else {
                setActivePage('buyer-dash');
              }
            }}
            onBack={() => setActivePage('home')}
          />
        )}

        {activePage === 'home' && (
          <div className="home-section">
            <div className="hero-search-banner">
              <div className="hero-eyebrow-pill" onClick={() => setActivePage('listing')}>
                <span className="pill-chip">New</span>
                <span className="pill-text">Own your expertise. Earn your value.</span>
                <span className="pill-arrow">→</span>
              </div>
              <h1 className="hero-title">
                Own your expertise.<br />
                <span>Earn your value.</span>
              </h1>
              <p className="hero-subtitle">
                A one-stop platform for independent service providing — storefronts, bookings, invoicing, and client management on your terms.
              </p>
              <form
                className="hero-search-box"
                onSubmit={(e) => {
                  e.preventDefault();
                  setActivePage('listing');
                }}
              >
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Search independent services, storefronts, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="hero-search-btn">
                  Search
                </button>
              </form>
            </div>

            <div className="categories-shortcuts-row">
              <h2 className="section-heading">Categories</h2>
              <div className="category-pills">
                {['Design', 'Video', 'Programming', 'AI', 'Writing'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="category-pill-btn"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActivePage('listing');
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '48px' }}>
              <h2 className="section-heading">Featured Services</h2>
              <div className="services-grid">
                <div
                  className="service-card"
                  onClick={() => setActivePage('detail')}
                >
                  <div className="service-card-image" style={{ background: '#e0f2fe' }}>
                    <span>🎨 Image</span>
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-seller-info">
                      <div className="mini-avatar">JS</div>
                      <span className="seller-name-small">John Studio</span>
                    </div>
                    <h3 className="service-card-title">
                      I will design a modern minimalist brand identity and logo
                    </h3>
                    <div className="service-card-rating">
                      <span className="rating-star">★ 4.9</span>
                      <span style={{ color: 'var(--text-muted)' }}>(124)</span>
                    </div>
                    <div className="service-card-footer">
                      <span className="price-label">Starting at</span>
                      <span className="price-amount">$25</span>
                    </div>
                  </div>
                </div>

                <div
                  className="service-card"
                  onClick={() => setActivePage('detail')}
                >
                  <div className="service-card-image" style={{ background: '#fef3c7' }}>
                    <span>🎬 Image</span>
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-seller-info">
                      <div className="mini-avatar" style={{ background: '#d97706' }}>AM</div>
                      <span className="seller-name-small">Alex Motion</span>
                    </div>
                    <h3 className="service-card-title">
                      I will create a cinematic 4K promotional commercial video
                    </h3>
                    <div className="service-card-rating">
                      <span className="rating-star">★ 4.8</span>
                      <span style={{ color: 'var(--text-muted)' }}>(86)</span>
                    </div>
                    <div className="service-card-footer">
                      <span className="price-label">Starting at</span>
                      <span className="price-amount">$40</span>
                    </div>
                  </div>
                </div>

                <div
                  className="service-card"
                  onClick={() => setActivePage('detail')}
                >
                  <div className="service-card-image" style={{ background: '#dcfce7' }}>
                    <span>💻 Image</span>
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-seller-info">
                      <div className="mini-avatar" style={{ background: '#10b981' }}>ST</div>
                      <span className="seller-name-small">Sarah Tech</span>
                    </div>
                    <h3 className="service-card-title">
                      I will build your responsive React and Node web application
                    </h3>
                    <div className="service-card-rating">
                      <span className="rating-star">★ 5.0</span>
                      <span style={{ color: 'var(--text-muted)' }}>(215)</span>
                    </div>
                    <div className="service-card-footer">
                      <span className="price-label">Starting at</span>
                      <span className="price-amount">$30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="popular-services-row">
              <h2 className="section-heading" style={{ marginBottom: '16px' }}>
                Popular Services
              </h2>
              <div className="popular-chips">
                <span className="popular-chip">Website Development</span>
                <span className="popular-chip">Logo Design</span>
                <span className="popular-chip">Video Editing</span>
                <span className="popular-chip">Voice Over</span>
                <span className="popular-chip">Search Engine Optimization</span>
                <span className="popular-chip">AI Art &amp; Prompts</span>
              </div>
            </div>

            <div className="top-rated-row">
              <h2 className="section-heading">Top-Rated Freelancers</h2>
              <div className="freelancers-grid">
                <div className="freelancer-card">
                  <div className="freelancer-avatar-lg" style={{ background: '#3b82f6' }}>
                    JS
                  </div>
                  <h3 className="freelancer-name">John Studio</h3>
                  <p className="freelancer-role">Video Editor &amp; Director</p>
                  <span className="badge badge-toprated">Top Rated</span>
                </div>

                <div className="freelancer-card">
                  <div className="freelancer-avatar-lg" style={{ background: '#10b981' }}>
                    ST
                  </div>
                  <h3 className="freelancer-name">Sarah Tech</h3>
                  <p className="freelancer-role">Full-Stack Engineer</p>
                  <span className="badge badge-toprated">Top Rated</span>
                </div>

                <div className="freelancer-card">
                  <div className="freelancer-avatar-lg" style={{ background: '#8b5cf6' }}>
                    AD
                  </div>
                  <h3 className="freelancer-name">Alex Designs</h3>
                  <p className="freelancer-role">UI/UX &amp; Brand Strategist</p>
                  <span className="badge badge-toprated">Top Rated</span>
                </div>
              </div>
            </div>

            <div className="become-seller-banner">
              <div className="banner-text">
                <h3>Launch your Independent Storefront</h3>
                <p>
                  Keep 100% of your earnings with automated booking, direct client relationships, and custom invoicing.
                </p>
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
                onClick={() => setActivePage('create-service')}
              >
                Create Storefront →
              </button>
            </div>
          </div>
        )}

        {activePage === 'listing' && (
          <div className="listing-section">
            <div className="listing-search-row">
              <input
                type="text"
                className="listing-search-input"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="btn-primary"
                onClick={() => triggerNotice('Searching services...')}
              >
                Search
              </button>
            </div>

            <div className="listing-category-tabs">
              {['All', 'Design', 'Video', 'Programming', 'AI', 'Writing'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="listing-header-row">
              <h1 className="page-title">
                {selectedCategory === 'All' ? 'All Services' : `${selectedCategory} & Tech`}
              </h1>
              <div className="sort-container">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Sort:
                </span>
                <select className="sort-select" defaultValue="recommended">
                  <option value="recommended">Recommended</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            <div className="listing-body-layout">
              <aside className="filters-sidebar">
                <div className="filter-group">
                  <h3 className="filter-group-title">Delivery Time</h3>
                  <label className="filter-option">
                    <input type="checkbox" /> 24 Hours
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" /> 3 Days
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" /> 7 Days
                  </label>
                </div>

                <div className="filter-group">
                  <h3 className="filter-group-title">Price</h3>
                  <label className="filter-option">
                    <input type="checkbox" /> Under $25
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" /> $25–$50
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" /> $50–$100
                  </label>
                </div>

                <div className="filter-group">
                  <h3 className="filter-group-title">Seller Level</h3>
                  <label className="filter-option">
                    <input type="checkbox" defaultChecked /> Top Rated
                  </label>
                </div>
              </aside>

              <div>
                <div className="services-grid">
                  <div
                    className="service-card"
                    onClick={() => setActivePage('detail')}
                  >
                    <div className="service-card-image" style={{ background: '#e2e8f0' }}>
                      <span>Image</span>
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-seller-info">
                        <div className="mini-avatar">JS</div>
                        <span className="seller-name-small">John Studio</span>
                      </div>
                      <h2 className="service-card-title">
                        I will build your website
                      </h2>
                      <div className="service-card-rating">
                        <span className="rating-star">★ 4.9</span>
                        <span style={{ color: 'var(--text-muted)' }}>(124)</span>
                      </div>
                      <div className="service-card-footer">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">$30</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="service-card"
                    onClick={() => setActivePage('detail')}
                  >
                    <div className="service-card-image" style={{ background: '#ede9fe' }}>
                      <span>Image</span>
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-seller-info">
                        <div className="mini-avatar" style={{ background: '#7c3aed' }}>EW</div>
                        <span className="seller-name-small">Emma Web</span>
                      </div>
                      <h2 className="service-card-title">
                        I will develop responsive React web applications
                      </h2>
                      <div className="service-card-rating">
                        <span className="rating-star">★ 4.8</span>
                        <span style={{ color: 'var(--text-muted)' }}>(95)</span>
                      </div>
                      <div className="service-card-footer">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">$45</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="service-card"
                    onClick={() => setActivePage('detail')}
                  >
                    <div className="service-card-image" style={{ background: '#fef2f2' }}>
                      <span>Image</span>
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-seller-info">
                        <div className="mini-avatar" style={{ background: '#ef4444' }}>DK</div>
                        <span className="seller-name-small">Dev Kevin</span>
                      </div>
                      <h2 className="service-card-title">
                        I will create custom Python scripts and automation bots
                      </h2>
                      <div className="service-card-rating">
                        <span className="rating-star">★ 5.0</span>
                        <span style={{ color: 'var(--text-muted)' }}>(230)</span>
                      </div>
                      <div className="service-card-footer">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">$35</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="load-more-row">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => triggerNotice('Loading more service cards...')}
                  >
                    Load More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'detail' && (
          <div className="detail-section">
            <div className="detail-layout">
              <div className="service-main-col">
                <h1 className="detail-service-title">
                  I will create a cinematic 4K video for you
                </h1>

                <div className="seller-header-bar">
                  <div className="seller-avatar-large">JS</div>
                  <div className="seller-meta-info">
                    <span className="seller-name-bold">John Studio</span>
                    <span className="seller-sub-meta">
                      <span className="rating-star">★ 4.9</span> • 250+ Orders Completed
                    </span>
                  </div>
                  <span className="badge badge-toprated">Top Rated</span>
                </div>

                <div className="media-preview-box">
                  <span className="media-preview-badge">4K Cinematic Preview</span>
                  <div style={{ fontSize: '3rem', marginBottom: '8px' }}>▶</div>
                  <p style={{ fontWeight: 600 }}>Interactive Video Player &amp; Gallery</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                  <span className="rating-star">★ 4.9</span>
                  <span style={{ fontWeight: 700 }}>127 Reviews</span>
                </div>

                <div className="content-block">
                  <h2 className="block-title">About This Service</h2>
                  <p className="block-text">
                    I am a professional video director and editor with over 8 years of experience
                    crafting commercials, short films, YouTube content, and corporate videos.
                    Every video is produced in 4K resolution with custom color grading, sound design,
                    and royalty-free background audio.
                  </p>
                </div>

                <div className="content-block">
                  <h2 className="block-title">Reviews (127)</h2>
                  <div className="reviews-list">
                    <div className="review-item">
                      <div className="reviewer-header">
                        <div className="mini-avatar" style={{ background: '#0284c7' }}>MC</div>
                        <div>
                          <div className="reviewer-name">Michael C.</div>
                          <span className="rating-star">★★★★★</span>
                        </div>
                      </div>
                      <p className="block-text">
                        "Outstanding cinematic quality! John delivered ahead of schedule and the 4K
                        grading looked phenomenal on our landing page."
                      </p>
                    </div>

                    <div className="review-item">
                      <div className="reviewer-header">
                        <div className="mini-avatar" style={{ background: '#16a34a' }}>AR</div>
                        <div>
                          <div className="reviewer-name">Anna R.</div>
                          <span className="rating-star">★★★★★</span>
                        </div>
                      </div>
                      <p className="block-text">
                        "Very communicative and took all revisions into account seamlessly. Highly
                        recommended for any video project."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="content-block">
                  <h2 className="block-title">Related Services</h2>
                  <div className="services-grid" style={{ marginBottom: 0 }}>
                    <div
                      className="service-card"
                      onClick={() => triggerNotice('Selected Related Service')}
                    >
                      <div className="service-card-image" style={{ height: '120px' }}>
                        <span>Image</span>
                      </div>
                      <div className="service-card-body">
                        <h3 className="service-card-title" style={{ fontSize: '0.9rem' }}>
                          I will do YouTube video editing and color correction
                        </h3>
                        <div className="service-card-footer">
                          <span className="price-label">Starting at</span>
                          <span className="price-amount">$30</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="service-card"
                      onClick={() => triggerNotice('Selected Related Service')}
                    >
                      <div className="service-card-image" style={{ height: '120px' }}>
                        <span>Image</span>
                      </div>
                      <div className="service-card-body">
                        <h3 className="service-card-title" style={{ fontSize: '0.9rem' }}>
                          I will create custom motion graphics and logo intro
                        </h3>
                        <div className="service-card-footer">
                          <span className="price-label">Starting at</span>
                          <span className="price-amount">$50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="package-box">
                  <div className="package-tabs">
                    <button
                      type="button"
                      className={`package-tab-btn ${selectedPackage === 'basic' ? 'active' : ''}`}
                      onClick={() => setSelectedPackage('basic')}
                    >
                      Basic
                    </button>
                    <button
                      type="button"
                      className={`package-tab-btn ${selectedPackage === 'standard' ? 'active' : ''}`}
                      onClick={() => setSelectedPackage('standard')}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      className={`package-tab-btn ${selectedPackage === 'premium' ? 'active' : ''}`}
                      onClick={() => setSelectedPackage('premium')}
                    >
                      Premium
                    </button>
                  </div>

                  <div className="package-content">
                    <div className="package-price-row">
                      <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>
                        {selectedPackage} Package
                      </span>
                      <span className="package-price">
                        {selectedPackage === 'basic' && '$25'}
                        {selectedPackage === 'standard' && '$60'}
                        {selectedPackage === 'premium' && '$120'}
                      </span>
                    </div>

                    <div className="package-delivery-row">
                      <span>⏱ Delivery Time:</span>
                      <span>
                        {selectedPackage === 'basic' && '2 Days'}
                        {selectedPackage === 'standard' && '4 Days'}
                        {selectedPackage === 'premium' && '7 Days'}
                      </span>
                    </div>

                    <ul className="package-features-list">
                      <li>✓ Up to 4K resolution output</li>
                      <li>
                        ✓{' '}
                        {selectedPackage === 'basic'
                          ? '1 Revision included'
                          : selectedPackage === 'standard'
                          ? '3 Revisions included'
                          : 'Unlimited Revisions'}
                      </li>
                      <li>✓ Sound design &amp; audio mastering</li>
                      {selectedPackage !== 'basic' && <li>✓ Custom color grading included</li>}
                      {selectedPackage === 'premium' && <li>✓ Source project files included</li>}
                    </ul>

                    <button
                      type="button"
                      className="btn-primary order-now-btn"
                      onClick={() => {
                        triggerNotice(`Order placed for ${selectedPackage.toUpperCase()} package!`);
                        setActivePage('buyer-dash');
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'seller-dash' && (
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
              <div className="sidebar-title">Seller Hub</div>
              <ul className="sidebar-nav-list">
                {[
                  'Dashboard',
                  'My Services',
                  'Orders',
                  'Messages',
                  'Analytics',
                  'Earnings',
                  'Profile',
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={`sidebar-nav-item ${sellerDashTab === item ? 'active' : ''}`}
                      onClick={() => setSellerDashTab(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="dashboard-main">
              <div className="dash-header-row">
                <h1 className="page-title">Seller Dashboard</h1>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setActivePage('create-service')}
                >
                  + Create New Service
                </button>
              </div>

              <div className="stats-cards-grid">
                <div className="stat-card">
                  <div className="stat-label">Revenue</div>
                  <div className="stat-value" style={{ color: 'var(--primary)' }}>
                    $2,450
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Orders</div>
                  <div className="stat-value">38</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Views</div>
                  <div className="stat-value">12.4K</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Rating</div>
                  <div className="stat-value">★ 4.9</div>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header">Active Orders</div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Service</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Rahul</td>
                      <td>Website Design</td>
                      <td style={{ fontWeight: 700 }}>$120</td>
                      <td>
                        <span className="badge-status badge-in-progress">In Progress</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Arjun</td>
                      <td>Video Editing</td>
                      <td style={{ fontWeight: 700 }}>$80</td>
                      <td>
                        <span className="badge-status badge-delivered">Delivered</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Priya</td>
                      <td>Logo Design</td>
                      <td style={{ fontWeight: 700 }}>$40</td>
                      <td>
                        <span className="badge-status badge-revision">Revision</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="content-block">
                <div className="dash-header-row" style={{ marginBottom: '16px' }}>
                  <h2 className="block-title" style={{ margin: 0 }}>My Services</h2>
                  <button
                    type="button"
                    className="btn-outline-primary"
                    onClick={() => setActivePage('create-service')}
                  >
                    + Create New Service
                  </button>
                </div>
                <div className="services-grid" style={{ marginBottom: 0 }}>
                  <div className="service-card">
                    <div className="service-card-body">
                      <h3 className="service-card-title">Professional Website Design</h3>
                      <div className="service-card-footer">
                        <span className="badge badge-toprated">Active</span>
                        <span className="price-amount">$120</span>
                      </div>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-card-body">
                      <h3 className="service-card-title">Cinematic 4K Video Editing</h3>
                      <div className="service-card-footer">
                        <span className="badge badge-toprated">Active</span>
                        <span className="price-amount">$80</span>
                      </div>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-card-body">
                      <h3 className="service-card-title">Modern Minimalist Logo Design</h3>
                      <div className="service-card-footer">
                        <span className="badge badge-toprated">Active</span>
                        <span className="price-amount">$40</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'buyer-dash' && (
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
              <div className="sidebar-title">Buyer Hub</div>
              <ul className="sidebar-nav-list">
                {[
                  'Dashboard',
                  'Active Orders',
                  'Messages',
                  'Saved Services',
                  'Order History',
                  'Payments',
                  'Profile',
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={`sidebar-nav-item ${buyerDashTab === item ? 'active' : ''}`}
                      onClick={() => setBuyerDashTab(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="dashboard-main">
              <div className="dash-header-row">
                <h1 className="page-title">
                  {buyerDashTab === 'Messages' ? 'Inbox' : 'Buyer Dashboard'}
                </h1>
              </div>

              {/* ── MESSAGES / INBOX TAB ─────────────────────────────── */}
              {buyerDashTab === 'Messages' && (() => {
                const threads = [
                  {
                    id: 0,
                    name: 'John Studio',
                    initials: 'JS',
                    color: '#7c3aed',
                    service: 'Video Editing – 4K Cinematic',
                    preview: 'Hi! I have uploaded the first cut of your 4K video.',
                    time: '2m ago',
                    unread: 2,
                    messages: [
                      { from: 'them', text: 'Hey! Just wanted to confirm the order details before I start.', ts: '10:02 AM' },
                      { from: 'me',   text: 'Sure! I need a 2-minute highlight reel from the raw footage.', ts: '10:08 AM' },
                      { from: 'them', text: 'Got it. Any specific colour grade style — warm, cool, or natural?', ts: '10:11 AM' },
                      { from: 'me',   text: 'Warm and cinematic please. Think golden hour vibes.', ts: '10:14 AM' },
                      { from: 'them', text: 'Perfect. I will have a rough cut ready within 48 hours.', ts: '11:30 AM' },
                      { from: 'them', text: 'Hi! I have uploaded the first cut of your 4K video. Let me know what you think!', ts: '2:15 PM' },
                    ],
                  },
                  {
                    id: 1,
                    name: 'Sarah Tech',
                    initials: 'ST',
                    color: '#10b981',
                    service: 'Website Development – Full Stack',
                    preview: 'I have deployed the staging database for your site.',
                    time: '1h ago',
                    unread: 1,
                    messages: [
                      { from: 'me',   text: 'Hi Sarah, can you share the project timeline?', ts: 'Yesterday' },
                      { from: 'them', text: 'Of course! Frontend – 3 days, backend – 5 days, testing – 2 days.', ts: 'Yesterday' },
                      { from: 'me',   text: 'Sounds good. Please keep the backend on Node.js and PostgreSQL.', ts: 'Yesterday' },
                      { from: 'them', text: 'Absolutely, that is my default stack. I have deployed the staging database for your website testing.', ts: '9:45 AM' },
                    ],
                  },
                  {
                    id: 2,
                    name: 'Priya Design',
                    initials: 'PD',
                    color: '#f59e0b',
                    service: 'Logo Design – Brand Identity',
                    preview: 'Here are the 3 initial concept drafts for review.',
                    time: '3h ago',
                    unread: 0,
                    messages: [
                      { from: 'me',   text: 'Hi Priya! We are looking for something modern and minimal.', ts: 'Mon' },
                      { from: 'them', text: 'Got it! What colours does your brand use?', ts: 'Mon' },
                      { from: 'me',   text: 'Deep indigo, white, and a touch of violet.', ts: 'Mon' },
                      { from: 'them', text: 'Love that palette. Here are the 3 initial concept drafts for review.', ts: 'Today' },
                    ],
                  },
                ];
                const thread = threads[activeInboxThread];
                return (
                  <div className="inbox-layout">
                    {/* Thread list */}
                    <div className="inbox-sidebar">
                      <div className="inbox-search-wrap">
                        <input
                          type="text"
                          className="inbox-search"
                          placeholder="🔍  Search messages…"
                        />
                      </div>
                      {threads.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className={`inbox-thread-item ${activeInboxThread === t.id ? 'active' : ''}`}
                          onClick={() => setActiveInboxThread(t.id)}
                        >
                          <div
                            className="inbox-avatar"
                            style={{ background: t.color }}
                          >
                            {t.initials}
                          </div>
                          <div className="inbox-thread-meta">
                            <div className="inbox-thread-top">
                              <span className="inbox-thread-name">{t.name}</span>
                              <span className="inbox-thread-time">{t.time}</span>
                            </div>
                            <div className="inbox-thread-service">{t.service}</div>
                            <div className="inbox-thread-preview">{t.preview}</div>
                          </div>
                          {t.unread > 0 && (
                            <span className="inbox-unread-badge">{t.unread}</span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Chat pane */}
                    <div className="inbox-chat">
                      <div className="inbox-chat-header">
                        <div
                          className="inbox-avatar"
                          style={{ background: thread.color, width: '38px', height: '38px', fontSize: '0.85rem' }}
                        >
                          {thread.initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{thread.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{thread.service}</div>
                        </div>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ marginLeft: 'auto', fontSize: '0.78rem', padding: '6px 14px' }}
                          onClick={() => triggerNotice('Order page opened')}
                        >
                          View Order
                        </button>
                      </div>

                      <div className="inbox-messages">
                        {thread.messages.map((msg, i) => (
                          <div
                            key={i}
                            className={`inbox-bubble-row ${msg.from === 'me' ? 'mine' : 'theirs'}`}
                          >
                            {msg.from === 'them' && (
                              <div
                                className="inbox-avatar"
                                style={{
                                  background: thread.color,
                                  width: '30px',
                                  height: '30px',
                                  fontSize: '0.7rem',
                                  flexShrink: 0,
                                  alignSelf: 'flex-end',
                                }}
                              >
                                {thread.initials}
                              </div>
                            )}
                            <div className="inbox-bubble-wrap">
                              <div className={`inbox-bubble ${msg.from === 'me' ? 'bubble-mine' : 'bubble-theirs'}`}>
                                {msg.text}
                              </div>
                              <span className="inbox-bubble-ts">{msg.ts}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="inbox-composer">
                        <input
                          type="text"
                          className="inbox-input"
                          placeholder="Type a message…"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              triggerNotice('Message sent!');
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ padding: '10px 20px', borderRadius: '12px' }}
                          onClick={(e) => {
                            const input = e.currentTarget.previousSibling;
                            if (input.value.trim()) {
                              triggerNotice('Message sent!');
                              input.value = '';
                            }
                          }}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ── ALL OTHER TABS ────────────────────────────────────── */}
              {buyerDashTab !== 'Messages' && (
                <>
                  <div className="content-block">
                    <h2 className="block-title">Active Orders</h2>
                    <div className="progress-card">
                      <div className="progress-header">
                        <span>Service: <strong>Video Editing</strong></span>
                        <span>Price: <strong>$80</strong> (Progress: 60%)</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                      </div>
                    </div>

                    <div className="progress-card" style={{ marginBottom: 0 }}>
                      <div className="progress-header">
                        <span>Service: <strong>Website Development</strong></span>
                        <span>Price: <strong>$250</strong> (Progress: 25%)</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="content-block">
                    <h2 className="block-title">Saved Services</h2>
                    <div className="services-grid" style={{ marginBottom: 0 }}>
                      <div className="service-card" onClick={() => setActivePage('detail')}>
                        <div className="service-card-body">
                          <h3 className="service-card-title">I will create a cinematic 4K video for you</h3>
                          <div className="service-card-footer">
                            <span className="price-label">Starting at</span>
                            <span className="price-amount">$60</span>
                          </div>
                        </div>
                      </div>
                      <div className="service-card" onClick={() => setActivePage('detail')}>
                        <div className="service-card-body">
                          <h3 className="service-card-title">I will build responsive web applications in React</h3>
                          <div className="service-card-footer">
                            <span className="price-label">Starting at</span>
                            <span className="price-amount">$150</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-container">
                    <div className="table-header">Order History</div>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Service</th>
                          <th>Seller</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#ORD-7812</td>
                          <td>Logo Design</td>
                          <td>Priya</td>
                          <td>$40</td>
                          <td><span className="badge-status badge-delivered">Completed</span></td>
                        </tr>
                        <tr>
                          <td>#ORD-6541</td>
                          <td>SEO Consultation</td>
                          <td>Mark Words</td>
                          <td>$35</td>
                          <td><span className="badge-status badge-delivered">Completed</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activePage === 'create-service' && (
          <div className="create-service-section">
            <div className="form-card">
              <h1 className="page-title" style={{ marginBottom: '24px' }}>
                Create a Service
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerNotice('Service published successfully!');
                  setActivePage('seller-dash');
                }}
              >
                <div className="form-group">
                  <label htmlFor="service-title-input" className="form-label">
                    Service Title
                  </label>
                  <input
                    id="service-title-input"
                    type="text"
                    className="form-input"
                    placeholder="I will do something I am really good at..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service-cat-select" className="form-label">
                    Category
                  </label>
                  <select id="service-cat-select" className="form-select" defaultValue="design">
                    <option value="design">Design</option>
                    <option value="video">Video</option>
                    <option value="programming">Programming</option>
                    <option value="ai">AI</option>
                    <option value="writing">Writing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="service-desc-input" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="service-desc-input"
                    className="form-textarea"
                    rows="5"
                    placeholder="Describe your service in detail..."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <span className="form-label">Gallery</span>
                  <div className="gallery-dropzone-row">
                    <div
                      className="dropzone-box"
                      onClick={() => triggerNotice('Upload image modal opened')}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📷</div>
                      <span className="btn-secondary">+ Add Image</span>
                    </div>

                    <div
                      className="dropzone-box"
                      onClick={() => triggerNotice('Upload video modal opened')}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🎥</div>
                      <span className="btn-secondary">+ Add Video</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <span className="form-label">Packages</span>
                  <div className="packages-editor-grid">
                    <div className="package-editor-card">
                      <div className="package-editor-title">Basic</div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Price ($)</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="25"
                        defaultValue="25"
                        style={{ marginBottom: '12px' }}
                      />

                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Delivery Time</label>
                      <select className="form-select" defaultValue="2" style={{ marginBottom: '12px' }}>
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                      </select>

                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Revisions</label>
                      <select className="form-select" defaultValue="1">
                        <option value="1">1 Revision</option>
                        <option value="2">2 Revisions</option>
                      </select>
                    </div>

                    <div className="package-editor-card">
                      <div className="package-editor-title">Standard</div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Price ($)</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="60"
                        defaultValue="60"
                        style={{ marginBottom: '12px' }}
                      />

                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Delivery Time</label>
                      <select className="form-select" defaultValue="4" style={{ marginBottom: '12px' }}>
                        <option value="3">3 Days</option>
                        <option value="4">4 Days</option>
                        <option value="5">5 Days</option>
                      </select>

                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Revisions</label>
                      <select className="form-select" defaultValue="3">
                        <option value="2">2 Revisions</option>
                        <option value="3">3 Revisions</option>
                        <option value="5">5 Revisions</option>
                      </select>
                    </div>

                    <div className="package-editor-card">
                      <div className="package-editor-title">Premium</div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Price ($)</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="120"
                        defaultValue="120"
                        style={{ marginBottom: '12px' }}
                      />

                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Delivery Time</label>
                      <select className="form-select" defaultValue="7" style={{ marginBottom: '12px' }}>
                        <option value="5">5 Days</option>
                        <option value="7">7 Days</option>
                        <option value="10">10 Days</option>
                      </select>

                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Revisions</label>
                      <select className="form-select" defaultValue="unlimited">
                        <option value="5">5 Revisions</option>
                        <option value="unlimited">Unlimited Revisions</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-actions-row">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setActivePage('detail')}
                  >
                    Preview
                  </button>
                  <button type="submit" className="btn-primary">
                    Publish Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <footer className="global-footer">
        <div className="content-wrapper footer-content">
          <div className="footer-links-row">
            <a href="#about" className="footer-link">About</a>
            <a href="#help" className="footer-link">Help</a>
            <a href="#terms" className="footer-link">Terms</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#social" className="footer-link">Social</a>
          </div>
          <div className="footer-bottom">
            &copy; 2026 DUMMR Services. Own your expertise. Earn your value.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
