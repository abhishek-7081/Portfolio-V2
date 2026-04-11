import React, { useState, useEffect } from 'react';
import { api } from '../api/portfolioApi';
import { useAuth } from '../context/AuthContext';
import { Save } from 'lucide-react';
import ImageUploader from './ImageUploader';
import Loader from './Loader';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    about_text: '',
    resume_url: '',
    profile_image_url: '',
    skills: [],
    social_links: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });
  const { session } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.getPortfolioInfo();
      if (data) {
        setFormData({
          about_text: data.about_text || '',
          resume_url: data.resume_url || '',
          profile_image_url: data.profile_image_url || '',
          skills: data.skills || [],
          social_links: data.social_links || { github: '', linkedin: '', twitter: '' }
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      social_links: { ...formData.social_links, [name]: value }
    });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value.split(',').map(s => s.trim());
    setFormData({ ...formData, skills: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updatePortfolioInfo(formData, session.access_token);
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader variant="admin-settings" />;

  return (
    <div className="admin-settings glass-card" style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2>Portfolio Information</h2>
      <p className="contact-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>Update your bio, skills, and links.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>About Me Text</label>
          <textarea 
            name="about_text" 
            className="form-textarea" 
            value={formData.about_text} 
            onChange={handleInputChange} 
            rows="6"
            required 
          />
        </div>

        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.skills.join(', ')} 
            onChange={handleSkillsChange}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div className="settings-grid" style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <ImageUploader 
               initialImage={formData.profile_image_url} 
               onUploadSuccess={(url) => setFormData({ ...formData, profile_image_url: url })} 
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

        <h3 style={{ margin: '2rem 0 1rem' }}>Social Links</h3>
        <div className="settings-grid">
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
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
