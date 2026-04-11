import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/global.css';

const Contact = ({ info }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData(event.target);
    // User needs to update this access key for their own Web3Forms account
    formData.append("access_key", "38a79457-2127-4717-9fec-439c100d61e4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        event.target.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section fade-in">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a project in mind or just want to say hi? My inbox is always open!
        </p>

        <div className="contact-grid">
          {/* Contact Info Column */}
          <div className="contact-info-cards">
            <div className="contact-info-card glass-card">
              <div className="icon-box primary-glow">
                <Mail color="var(--primary)" size={28} />
              </div>
              <div>
                <h4>Email Me</h4>
                <p>{info?.email || 'abhi1golu@gmail.com'}</p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="icon-box secondary-glow">
                <MapPin color="var(--secondary)" size={28} />
              </div>
              <div>
                <h4>Location</h4>
                <p>{info?.location || 'Greater Noida, India'}</p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="icon-box primary-glow">
                <Phone color="var(--primary)" size={28} />
              </div>
              <div>
                <h4>Let's Chat</h4>
                <div className="social-icons">
                  {info?.social_links?.github && (
                    <a href={info.social_links.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                      <Github color="#ffffff" size={24} />
                    </a>
                  )}
                  {info?.social_links?.linkedin && (
                    <a href={info.social_links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <Linkedin color="#0A66C2" size={24} />
                    </a>
                  )}
                  {info?.social_links?.twitter && (
                    <a href={info.social_links.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                      <Twitter color="#1DA1F2" size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-wrapper glass-card">
            {submitStatus === 'success' ? (
              <div className="success-message">
                <CheckCircle size={60} color="#10b981" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button className="btn btn-primary" onClick={() => setSubmitStatus(null)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="contact-form-main">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" className="form-input" placeholder="Abhi" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="form-input" placeholder="abhi@gmail.com" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" className="form-input" placeholder="Project Inquiry" required />
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea name="message" className="form-textarea" placeholder="Tell me about your project..." rows="5" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>

                {submitStatus === 'error' && (
                  <p className="error-text">
                    <AlertCircle size={16} /> Opps! Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem !important;
        }

        .icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
        }

        .contact-info-card h4 {
          font-size: 1rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.5rem;
        }

        .contact-info-card p, .contact-info-card .social-icons {
          font-size: 1.2rem;
          font-weight: 500;
        }

        .social-icons {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.75rem;
        }

        .social-icons a {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icons a:hover {
          transform: translateY(-5px) scale(1.2);
        }

        .contact-form-wrapper {
          padding: 3rem !important;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .form-input, .form-textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 1.2rem;
          border-radius: 12px;
          font-size: 1rem;
          width: 100%;
          color: var(--text-main);
          transition: var(--transition);
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.05);
          outline: none;
        }

        .submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 55px;
          font-size: 1.1rem;
          gap: 1rem;
        }

        .success-message {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          animation: fadeIn 0.5s ease;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.9rem;
          margin-top: 1rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-form-wrapper {
            padding: 2rem !important;
          }
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
