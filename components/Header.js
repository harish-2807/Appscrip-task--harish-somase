import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <section className="header-top">
        <div className="header-top-content">
          <div className="brand">
            <h1 className="brand-name">NEXIVO</h1>
          </div>
          <div className="header-actions">
            <div className="search-wrapper">
              <input 
                type="search" 
                className="search-field" 
                placeholder="Search products..."
                aria-label="Search products"
              />
              <button className="search-trigger" aria-label="Submit search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
            <button className="action-btn" aria-label="Shoes">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 10c0-1.1.9-2 2-2 4 1.1 2 2 0 4-1.1 2-2 0-6-1.1-2-2-6 1.1 0-2 2-2 6 1.1 2 2 4 1.1 2 2 0 4-1.1-2-2 6-1.1z"></path>
              </svg>
            </button>
            <button className="action-btn" aria-label="Watches">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8"></circle>
                <path d="M12 6v6l4 4"></path>
                <path d="M12 14v2"></path>
              </svg>
            </button>
            <button className="action-btn" aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button className="lang-toggle" aria-label="Language">
              <span>ENG</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <nav className="main-nav">
        <div className="nav-wrapper">
          <button 
            className="menu-toggle d-md-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12"></path>
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              )}
            </svg>
          </button>

          <ul className="nav-menu d-none d-md-flex">
            <li><a href="#shop" className="nav-item">SHOP</a></li>
            <li><a href="#new" className="nav-item">NEW</a></li>
            <li><a href="#skills" className="nav-item">SKILLS</a></li>
            <li><a href="#stories" className="nav-item">STORIES</a></li>
            <li><a href="#about" className="nav-item">ABOUT</a></li>
            <li><a href="#contact" className="nav-item">CONTACT US</a></li>
          </ul>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-nav d-md-none">
            <ul className="mobile-nav-menu">
              <li><a href="#shop" className="mobile-nav-item" onClick={toggleMobileMenu}>SHOP</a></li>
              <li><a href="#new" className="mobile-nav-item" onClick={toggleMobileMenu}>NEW</a></li>
              <li><a href="#skills" className="mobile-nav-item" onClick={toggleMobileMenu}>SKILLS</a></li>
              <li><a href="#stories" className="mobile-nav-item" onClick={toggleMobileMenu}>STORIES</a></li>
              <li><a href="#about" className="mobile-nav-item" onClick={toggleMobileMenu}>ABOUT</a></li>
              <li><a href="#contact" className="mobile-nav-item" onClick={toggleMobileMenu}>CONTACT US</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
