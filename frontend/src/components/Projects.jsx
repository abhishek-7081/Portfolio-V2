import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Github } from 'lucide-react';
import '../styles/global.css';

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; 
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container fade-in">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects?.map((project) => (
            <div 
              key={project.id} 
              className="project-card hover-glow" 
              onClick={(e) => openModal(e, project)} 
              style={{ cursor: 'pointer', overflow: 'hidden' }}
            >
              <div className="project-image-wrapper">
                <img 
                  src={project.image_url || 'https://via.placeholder.com/400x250'} 
                  alt={project.title} 
                  className="project-image" 
                  loading="lazy" 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {project.description?.substring(0, 120)}...
                </p>
                <div className="tech-stack-tags">
                  {project.tech_stack?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                  {project.tech_stack?.length > 3 && <span className="tech-tag">+{project.tech_stack.length - 3}</span>}
                </div>
              </div>
            </div>
          ))}
          {(!projects || projects.length === 0) && <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No projects found. Add them from the admin panel!</p>}
        </div>
      </div>

      {/* Project Detail Modal - Rendered via Portal for true full-screen */}
      {selectedProject && createPortal(
        <div className="project-modal-overlay" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <div className="project-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={24} />
            </button>
            
            <div className="modal-layout">
              <div className="modal-image-side">
                <img 
                  src={selectedProject.image_url || 'https://via.placeholder.com/1200x800'} 
                  alt={selectedProject.title} 
                  className="modal-full-img"
                />
              </div>
              
              <div className="modal-info-side">
                <div className="modal-badge-custom">
                  <span>Featured Development Project</span>
                </div>
                <h2 className="modal-title">{selectedProject.title}</h2>
                
                <div className="modal-detail-item">
                  <span className="label">Technologies Used</span>
                  <div className="modal-tech-stack" style={{ marginTop: '0.5rem' }}>
                    {selectedProject.tech_stack?.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-detail-item">
                  <span className="label">Project Overview</span>
                  <p className="modal-description" style={{ marginTop: '0.5rem' }}>{selectedProject.description}</p>
                </div>

                <div className="modal-links">
                  {selectedProject.github_url && (
                    <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <Github size={18} /> View Source Code
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ border: 'none', background: 'rgba(255,255,255,0.05)' }}>
                      <ExternalLink size={18} /> Live Demonstration
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .modal-badge-custom {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: rgba(var(--primary-rgb), 0.1);
          color: var(--primary);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          border: 1px solid rgba(var(--primary-rgb), 0.2);
        }

        .modal-detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 2rem;
        }

        .modal-detail-item .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--primary);
          font-weight: 700;
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

export default Projects;
