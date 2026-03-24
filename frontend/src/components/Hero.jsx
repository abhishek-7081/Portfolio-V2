import React from 'react';
import '../styles/global.css';

const Hero = ({ info }) => {
  return (
    <section id="home" className="hero-section">
      <div className="container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '4rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">Hi, I'm <span className="highlight">Abhishek Tripathi</span></h1>
          <h2 className="hero-subtitle">MERN Stack Developer</h2>
          <p className="hero-description">
            {info?.about_text ? info.about_text.substring(0, 150) + '...' : 'Crafting digital experiences with precision and passion. Specialist in building high-performance web applications using modern technologies.'}
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">My Work</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
        <div className="hero-image-container">
          {info?.profile_image_url ? (
            <img src={info.profile_image_url} alt="Profile" className="hero-profile-img" style={{ width: 'min(380px, 80vw)', height: 'min(380px, 80vw)', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--primary)', animation: 'float 6s ease-in-out infinite', boxShadow: '0 0 30px var(--primary-glow)' }} />
          ) : (
            <div className="tech-stack-circles">
              <div className="circle react-circle"></div>
              <div className="circle node-circle"></div>
              <div className="circle mongo-circle"></div>
            </div>
          )}
        </div>
        <style>{`
          @media (max-width: 992px) {
            .hero-section {
              padding-top: 6rem;
              min-height: auto;
            }
            .hero-title {
              font-size: 3rem;
            }
            .hero-subtitle {
              font-size: 1.5rem;
            }
            .hero-image-container {
              margin-top: 2rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
