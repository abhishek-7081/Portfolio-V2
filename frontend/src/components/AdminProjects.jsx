import React, { useState, useEffect } from 'react';
import { api } from '../api/portfolioApi';
import { useAuth } from '../context/AuthContext';
import { Edit2, Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import ImageUploader from './ImageUploader';
import Loader from './Loader';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: [],
    github_url: '',
    live_url: '',
    image_url: '' // Changed from image_urls: [] to image_url: ''
  });
  const { session } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await api.getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value.split(',').map(s => s.trim());
    setFormData({ ...formData, tech_stack: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (editingProject) {
      await api.updateProject(editingProject.id, formData, session.access_token);
    } else {
      await api.createProject(formData, session.access_token);
    }
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      tech_stack: [],
      github_url: '',
      live_url: '',
      image_url: '' // Changed from image_urls: [] to image_url: ''
    });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack,
      github_url: project.github_url,
      live_url: project.live_url,
      image_url: project.image_url // Changed from image_urls to image_url
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      await api.deleteProject(id, session.access_token);
      fetchProjects();
    }
  };

  return (
    <div className="admin-projects">
      <div className="action-bar" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Manage Projects</h2>
        <button className="btn btn-primary" onClick={() => { setIsModalOpen(true); setEditingProject(null); }}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="projects-list admin-grid">
        {isLoading && projects.length === 0 ? <Loader fullScreen={true} /> : projects.map(project => (
          <div key={project.id} className="glass-card project-admin-card" style={{ padding: '1.5rem' }}>
            {project.image_url && (
              <img src={project.image_url} alt={project.title} loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            )}
            <h3>{project.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0' }}>{project.description?.substring(0, 100)}...</p>
            <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-outline btn-sm" onClick={() => handleEdit(project)}>
                <Edit2 size={16} /> Edit
              </button>
              <button className="btn btn-outline btn-sm" style={{ color: '#ef4444' }} onClick={() => handleDelete(project.id)}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card modal-content" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-input" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="form-textarea" value={formData.description} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Tech Stack (comma separated)</label>
                <input type="text" className="form-input" value={formData.tech_stack.join(', ')} onChange={handleTechStackChange} placeholder="React, Node.js, Supabase" />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input type="url" name="github_url" className="form-input" value={formData.github_url} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Live Demo URL</label>
                <input type="url" name="live_url" className="form-input" value={formData.live_url} onChange={handleInputChange} />
              </div>
              <ImageUploader
                initialImage={formData.image_url}
                onUploadSuccess={(url) => setFormData({ ...formData, image_url: url })}
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingProject ? 'Update' : 'Create'}</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
