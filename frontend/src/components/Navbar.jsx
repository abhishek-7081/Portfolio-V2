import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/global.css';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = ({ socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-capsule glass-card">
        <div className="nav-brand">
          <a href="#home" className="gradient-text">Abhishek.</a>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links desktop-only">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/admin" className="admin-btn">Admin</a></li>
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          <ThemeSwitcher />
          {/* Mobile Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <button className="close-mobile-btn" onClick={toggleMenu}><X size={32} /></button>
        <ul className="mobile-links">
          <li><a href="#home" onClick={toggleMenu}>Home</a></li>
          <li><a href="#about" onClick={toggleMenu}>About</a></li>
          <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
          <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
          <li><a href="#certificates" onClick={toggleMenu}>Certificates</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          <li><a href="/admin" className="admin-btn" onClick={toggleMenu}>Admin Panel</a></li>
        </ul>
      </div>

      <style>{`
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 1.5rem 2rem;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .navbar-container.scrolled {
          padding: 1rem 2rem;
        }

        .navbar-capsule {
          width: 100%;
          max-width: 1200px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 2rem;
          border-radius: 50px !important;
          background: var(--nav-bg) !important;
          border: 1px solid var(--nav-border) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
        }

        .navbar-container.scrolled .navbar-capsule {
          background: var(--nav-scrolled-bg) !important;
          backdrop-filter: blur(15px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .nav-brand a {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.95rem;
          transition: var(--transition);
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        .admin-btn {
          background: var(--primary);
          color: white !important;
          padding: 0.5rem 1.2rem;
          border-radius: 25px;
          font-weight: 600 !important;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
        }

        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: 75%;
          height: 75vh;
          background: transparent opacity(0.8);
          // background: var(--mobile-nav-bg);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 2000;
          border-radius: 50px 50px 50px 50px;    }

        .mobile-nav.open {
          right: 0;
        }

        .close-mobile-btn {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
        }

        .mobile-links {
          list-style: none;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mobile-links a {
          color: var(--text-main);
          font-size: 2rem;
          font-weight: 700;
          transition: transform 0.3s ease;
          display: block;
        }

        .mobile-links a:hover {
          color: var(--primary);
          transform: scale(1.1);
        }

        @media (max-width: 992px) {
          .desktop-only {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
          .navbar-container {
            padding: 1rem;
          }
          .navbar-capsule {
            padding: 0.5rem 1.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
