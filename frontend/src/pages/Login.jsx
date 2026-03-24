import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error: loginError } = await login(email, password);
    
    if (loginError) {
      setError(loginError.message);
    } else {
      navigate('/admin');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card">
        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Admin Login</h2>
        <p className="contact-subtitle" style={{ marginBottom: '2rem' }}>Secure access to portfolio dashboard.</p>
        
        {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleLogin} className="contact-form" style={{ width: '100%' }}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Admin Email" 
              required 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <input 
              type="password" 
              placeholder="Password" 
              required 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-btn" style={{ width: '100%', marginTop: '1.5rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" className="btn btn-outline btn-sm">Return Home</a>
        </div>
      </div>
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .login-card {
          width: 100%;
          max-width: 450px;
        }
      `}</style>
    </div>
  );
};

export default Login;
