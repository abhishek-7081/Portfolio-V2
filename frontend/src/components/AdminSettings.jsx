import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { api } from '../api/portfolioApi';
import { useAuth } from '../context/AuthContext';
import ImageUploader from './ImageUploader';
import Loader from './Loader';
import { normalizePortfolioInfo } from '../lib/portfolioInfo';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(() => normalizePortfolioInfo());
  const { session } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.getPortfolioInfo();
      setFormData(normalizePortfolioInfo(data));
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      social_links: { ...previous.social_links, [name]: value }
    }));
  };

  const handleCommaSeparatedList = (field) => (e) => {
    const value = e.target.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleNumberChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((previous) => ({
      ...previous,
      [field]: value === '' ? 0 : Math.max(0, Number(value))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedInfo = await api.updatePortfolioInfo(formData, session.access_token);
      setFormData(normalizePortfolioInfo(updatedInfo));
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader variant="admin-settings" />;

  return (
    <div className="admin-settings glass-card" style={{ padding: '2rem', maxWidth: '960px' }}>
      <h2>Portfolio Information</h2>
      <p className="contact-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        Update your hero roles, markdown bio, contact details, profile image, and social links.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <h3 className="admin-settings-heading">Hero</h3>
        <div className="settings-grid settings-grid-wide">
          <div className="form-group">
            <label>Typing Roles (comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.hero_roles.join(', ')}
              onChange={handleCommaSeparatedList('hero_roles')}
              placeholder="MERN Stack Developer, Full-Stack Engineer, Problem Solver"
            />
          </div>

          <div className="form-group">
            <label>Resume Download URL</label>
            <input
              type="url"
              name="resume_url"
              className="form-input"
              value={formData.resume_url}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h3 className="admin-settings-heading">About</h3>
        <div className="form-group">
          <label>About Me Content (Markdown supported)</label>
          <textarea
            name="about_text"
            className="form-textarea"
            value={formData.about_text}
            onChange={handleInputChange}
            rows="8"
            placeholder={'## About Me\nWrite your bio using Markdown.'}
            required
          />
          <small className="settings-help-text">
            You can use headings, bold text, bullet lists, links, and inline code.
          </small>
        </div>

        <div className="settings-grid">
          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              min="0"
              className="form-input"
              value={formData.years_experience}
              onChange={handleNumberChange('years_experience')}
            />
          </div>

          <div className="form-group">
            <label>Projects Completed</label>
            <input
              type="number"
              min="0"
              className="form-input"
              value={formData.projects_completed}
              onChange={handleNumberChange('projects_completed')}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input
            type="text"
            className="form-input"
            value={formData.skills.join(', ')}
            onChange={handleCommaSeparatedList('skills')}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div className="settings-grid settings-media-grid" style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <ImageUploader
              initialImage={formData.profile_image_url}
              onUploadSuccess={(url) => setFormData((previous) => ({ ...previous, profile_image_url: url }))}
            />
          </div>

          <div className="settings-side-fields">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        <h3 style={{ margin: '2rem 0 1rem' }} className="admin-settings-heading">
          Social Links
        </h3>
        <div className="settings-grid settings-grid-social">
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              name="github"
              className="form-input"
              value={formData.social_links.github}
              onChange={handleSocialChange}
            />
          </div>
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              className="form-input"
              value={formData.social_links.linkedin}
              onChange={handleSocialChange}
            />
          </div>
          <div className="form-group">
            <label>Twitter / X</label>
            <input
              type="url"
              name="twitter"
              className="form-input"
              value={formData.social_links.twitter}
              onChange={handleSocialChange}
            />
          </div>
          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              name="instagram"
              className="form-input"
              value={formData.social_links.instagram}
              onChange={handleSocialChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          disabled={saving}
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </form>

      <style>{`
        .admin-settings-heading {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        }

        .settings-grid-wide {
          grid-template-columns: 1.2fr 1fr;
        }

        .settings-media-grid {
          align-items: start;
        }

        .settings-side-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .settings-grid-social {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .settings-help-text {
          display: block;
          margin-top: 0.5rem;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .settings-grid-wide,
          .settings-grid-social {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;
