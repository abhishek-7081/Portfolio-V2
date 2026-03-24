import React, { useState } from 'react';
import { api } from '../api/portfolioApi';
import { useAuth } from '../context/AuthContext';
import { Upload, X } from 'lucide-react';

const ImageUploader = ({ onUploadSuccess, initialImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initialImage || null);
  const { session } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const { url, error } = await api.uploadImage(file, session.access_token);
      if (error) throw new Error(error);
      onUploadSuccess(url);
    } catch (err) {
      alert('Upload failed: ' + err.message);
      setPreview(initialImage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader" style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Image</label>
      <div className="uploader-container" style={{ 
        border: '2px dashed var(--glass-border)', 
        borderRadius: '12px', 
        padding: '1rem', 
        textAlign: 'center',
        position: 'relative',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {preview ? (
          <div className="preview-container" style={{ position: 'relative', width: '100%' }}>
            <img src={preview} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            <button 
              type="button"
              onClick={() => { setPreview(null); onUploadSuccess(''); }}
              style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.8)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', padding: '0.2rem' }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
            <Upload size={32} color="var(--primary)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to upload image</span>
            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" disabled={uploading} />
          </label>
        )}
        
        {uploading && (
          <div className="uploading-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <div style={{ color: 'white', fontSize: '0.8rem' }}>Uploading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
