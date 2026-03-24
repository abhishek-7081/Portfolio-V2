import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Award, ExternalLink, ZoomIn } from 'lucide-react';
import '../styles/global.css';

const Certificates = ({ certificates }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (e, cert) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="container fade-in">
        <h2 className="section-title">Certifications & Achievements</h2>
        <div className="certificates-grid">
          {certificates?.map((cert) => (
            <div 
              key={cert.id} 
              className="certificate-card glass-card hover-glow" 
              onClick={(e) => openModal(e, cert)}
              style={{ cursor: 'pointer', overflow: 'hidden' }}
            >
              <div className="certificate-image-wrapper" style={{ position: 'relative' }}>
                <img 
                  src={cert.image_url || 'https://via.placeholder.com/400x300'} 
                  alt={cert.title} 
                  className="certificate-image" 
                  loading="lazy" 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="certificate-overlay">
                  <ZoomIn size={32} color="#fff" />
                  <span>View Full Certificate</span>
                </div>
              </div>
              <div className="certificate-content" style={{ padding: '1.5rem' }}>
                <h3 className="certificate-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cert.title}</h3>
                <p className="certificate-org" style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>{cert.organization}</p>
                <div className="cert-footer">
                  <span className="certificate-date" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
          {(!certificates || certificates.length === 0) && (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No certificates found. Add them from the admin panel!</p>
          )}
        </div>
      </div>

      {/* Certificate Detail Modal - Rendered via Portal for true full-screen */}
      {selectedCert && createPortal(
        <div className="project-modal-overlay" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <div className="project-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={24} />
            </button>
            
            <div className="modal-layout">
              <div className="modal-image-side">
                <img 
                  src={selectedCert.image_url || 'https://via.placeholder.com/1200x800'} 
                  alt={selectedCert.title} 
                  className="modal-full-img"
                />
              </div>
              
              <div className="modal-info-side">
                <div className="modal-badge-custom">
                  <Award size={20} />
                  <span>Professional Certification</span>
                </div>
                <h2 className="modal-title">{selectedCert.title}</h2>
                
                <div className="modal-description-container">
                  <div className="cert-detail-item">
                    <span className="label">Issuing Organization</span>
                    <span className="value">{selectedCert.organization}</span>
                  </div>
                  <div className="cert-detail-item">
                    <span className="label">Date Earned</span>
                    <span className="value">{selectedCert.date}</span>
                  </div>
                </div>

                <div className="modal-links">
                  {selectedCert.verification_url && (
                    <a href={selectedCert.verification_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <ExternalLink size={18} /> Verify Credential
                    </a>
                  )}
                  <button onClick={closeModal} className="btn btn-outline">
                    Back to Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .certificate-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(var(--primary-rgb), 0.7);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: var(--transition);
        }

        .certificate-card:hover .certificate-overlay {
          opacity: 1;
        }

        .certificate-overlay span {
          color: white;
          font-weight: 600;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .modal-badge-custom {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(var(--primary-rgb), 0.15);
          color: var(--primary);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          border: 1px solid rgba(var(--primary-rgb), 0.2);
        }

        .cert-detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 2rem;
        }

        .cert-detail-item .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--primary);
          font-weight: 700;
        }

        .cert-detail-item .value {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-main);
        }

        @media (max-width: 992px) {
          .modal-layout {
            grid-template-columns: 1fr;
          }
          .modal-image-side {
            min-height: 250px;
          }
          .modal-info-side {
            padding: 2rem;
          }
          .modal-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Certificates;
