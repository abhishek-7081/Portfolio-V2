export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
});

export const api = {
  // Projects
  getProjects: () => fetch(`${API_BASE_URL}/projects`).then(res => res.json()),
  createProject: (data, token) => fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateProject: (id, data, token) => fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteProject: (id, token) => fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token)
  }),

  // Certificates
  getCertificates: () => fetch(`${API_BASE_URL}/certificates`).then(res => res.json()),
  createCertificate: (data, token) => fetch(`${API_BASE_URL}/certificates`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateCertificate: (id, data, token) => fetch(`${API_BASE_URL}/certificates/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteCertificate: (id, token) => fetch(`${API_BASE_URL}/certificates/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token)
  }),

  // Portfolio Info
  getPortfolioInfo: () => fetch(`${API_BASE_URL}/portfolio-info`).then(res => res.json()),
  updatePortfolioInfo: (data, token) => fetch(`${API_BASE_URL}/portfolio-info`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  }).then(res => res.json()),

  // Image Upload
  uploadImage: (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    return fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    }).then(res => res.json());
  }
};
