import React, { useState, useEffect } from 'react';
import { api } from '../api/portfolioApi';
import { useAuth } from '../context/AuthContext';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import Loader from './Loader';

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    date: '',
    image_url: ''
  });
  const { session } = useAuth();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setIsLoading(true);
    const data = await api.getCertificates();
    setCertificates(data);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (editingCert) {
      await api.updateCertificate(editingCert.id, formData, session.access_token);
    } else {
      await api.createCertificate(formData, session.access_token);
    }
    setIsModalOpen(false);
    setEditingCert(null);
    setFormData({ title: '', organization: '', date: '', image_url: '' });
    fetchCertificates();
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      date: cert.date,
      image_url: cert.image_url
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setIsLoading(true);
      await api.deleteCertificate(id, session.access_token);
      fetchCertificates();
    }
  };

  return (
    <div className="admin-certificates">
      <div className="action-bar" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Manage Certificates</h2>
        <button className="btn btn-primary" onClick={() => { setIsModalOpen(true); setEditingCert(null); }} disabled={isLoading}>
          <Plus size={18} /> Add Certificate
        </button>
      </div>

      <div className="certificates-list">
        {isLoading ? <Loader variant="admin-certificates-grid" /> : (
          <div className="admin-grid">
            {certificates.map(cert => (
              <div key={cert.id} className="glass-card certificate-admin-card" style={{ padding: '1.5rem' }}>
                {cert.image_url && (
                  <img src={cert.image_url} alt={cert.title} loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                )}
                <h3>{cert.title}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '600' }}>{cert.organization}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cert.date}</p>
                <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(cert)}>
                    <Edit2 size={16} /> Edit
                  </button>
                  <button className="btn btn-outline btn-sm" style={{ color: '#ef4444' }} onClick={() => handleDelete(cert.id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card modal-content" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <h2>{editingCert ? 'Edit Certificate' : 'Add New Certificate'}</h2>
            <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-input" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Organization</label>
                <input type="text" name="organization" className="form-input" value={formData.organization} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="text" name="date" className="form-input" value={formData.date} onChange={handleInputChange} placeholder="Aug 2023" />
              </div>
              <ImageUploader 
                initialImage={formData.image_url} 
                onUploadSuccess={(url) => setFormData({ ...formData, image_url: url })} 
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingCert ? 'Update' : 'Create'}</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
