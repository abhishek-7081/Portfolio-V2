import React from 'react';

const AboutMe = ({ aboutText, resumeUrl }) => {
  return (
    <section id="about" className="about-section">
      <div className="container fade-in">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              {aboutText || 'I am a passionate software developer specializing in the MERN stack. I love building full-stack applications that are scalable, maintainable, and user-friendly.'}
            </p>
            <div className="about-actions" style={{ marginTop: '2rem' }}>
              {resumeUrl && (
                <a href={resumeUrl} download className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              )}
            </div>
          </div>
          <div className="about-stats grid-cols-2">
            <div className="stat glass-card">
              <h3>2+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat glass-card">
              <h3>20+</h3>
              <p>Projects Completed</p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-content {
              gap: 2rem;
            }
            .about-stats.grid-cols-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1rem;
              width: 100%;
            }
            .stat.glass-card {
              padding: 1.5rem 1rem;
            }
            .stat h3 {
              font-size: 2rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default AboutMe;
