import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Admin, Project, Certificate, PortfolioInfo } from './models.js';

// For Supabase
// import { createClient } from '@supabase/supabase-js';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Set up Multer with CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});
const upload = multer({ storage: storage });

// For Supabase setup
// const uploadMemory = multer({ storage: multer.memoryStorage() });
// const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'YOUR_SUPABASE_SERVICE_KEY';
// const supabase = createClient(supabaseUrl, supabaseServiceKey);

// For MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch(console.error);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'MERN Portfolio API running' });
});

// For MongoDB Auth
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // using username '1234' with the email field from frontend
  try {
    const admin = await Admin.findOne({ username: email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
    res.json({ data: { session: { access_token: token, user: { email: admin.username } } } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to verify admin JWT
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  // For Supabase
  /*
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
  */

  // For MongoDB
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Caching structure (For Mongoose optimization)
const cache = {
  projects: null,
  certificates: null,
  portfolioInfo: null
};
const clearCache = (key) => { cache[key] = null; };



const defaultPortfolioInfo = {
  about_text: 'Welcome to my portfolio.',
  hero_roles: ['MERN Stack Developer', 'Full-Stack Engineer', 'Problem Solver'],
  skills: [],
  social_links: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: ''
  },
  resume_url: '',
  profile_image_url: '',
  email: '',
  location: '',
  years_experience: 0,
  projects_completed: 0
};

const normalizeStringArray = (value, fallback = []) => {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.map((item) => `${item ?? ''}`.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
};

const normalizeCount = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

const normalizePortfolioInfo = (info = {}) => ({
  ...defaultPortfolioInfo,
  ...info,
  about_text: `${info?.about_text ?? defaultPortfolioInfo.about_text}`.trim() || defaultPortfolioInfo.about_text,
  hero_roles: normalizeStringArray(info?.hero_roles, defaultPortfolioInfo.hero_roles),
  skills: normalizeStringArray(info?.skills, defaultPortfolioInfo.skills),
  social_links: {
    ...defaultPortfolioInfo.social_links,
    ...(info?.social_links ?? {})
  },
  resume_url: `${info?.resume_url ?? ''}`.trim(),
  profile_image_url: `${info?.profile_image_url ?? ''}`.trim(),
  email: `${info?.email ?? ''}`.trim(),
  location: `${info?.location ?? ''}`.trim(),
  years_experience: normalizeCount(info?.years_experience),
  projects_completed: normalizeCount(info?.projects_completed)
});

// --- Upload API ---
app.post('/api/upload', verifyAdmin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err);
      // Catch Cloudinary or Multer errors and return as JSON
      return res.status(500).json({ error: err.message || 'Error occurred during image upload' });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // With CloudinaryStorage, req.file.path contains the uploaded file URL
    const publicUrl = req.file.path;
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// --- Projects API ---
app.get('/api/projects', async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
  */

  // For MongoDB with Cache
  try {
    if (cache.projects) return res.json(cache.projects);
    const projects = await Project.find().sort({ created_at: -1 }).lean();
    
    // Map Mongoose _id to id for frontend compatibility
    const mapped = projects.map(p => ({ ...p, id: p._id.toString() }));
    cache.projects = mapped;
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('projects').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
  */

  // For MongoDB
  try {
    const project = new Project(req.body);
    await project.save();
    clearCache('projects');
    const response = { ...project.toObject(), id: project._id.toString() };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('projects').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
  */

  // For MongoDB
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('projects');
    res.json({ ...project.toObject(), id: project._id.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { error } = await supabase.from('projects').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
  */

  // For MongoDB
  try {
    await Project.findByIdAndDelete(req.params.id);
    clearCache('projects');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Certificates API ---
app.get('/api/certificates', async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
  */

  // For MongoDB
  try {
    if (cache.certificates) return res.json(cache.certificates);
    const certificates = await Certificate.find().sort({ created_at: -1 }).lean();
    const mapped = certificates.map(c => ({ ...c, id: c._id.toString() }));
    cache.certificates = mapped;
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/certificates', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('certificates').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
  */

  // For MongoDB
  try {
    const cert = new Certificate(req.body);
    await cert.save();
    clearCache('certificates');
    res.status(201).json({ ...cert.toObject(), id: cert._id.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/certificates/:id', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('certificates').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
  */

  // For MongoDB
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('certificates');
    res.json({ ...cert.toObject(), id: cert._id.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/certificates/:id', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { error } = await supabase.from('certificates').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
  */

  // For MongoDB
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    clearCache('certificates');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Portfolio Info API ---
app.get('/api/portfolio-info', async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('portfolio_info').select('*').eq('id', 1).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
  */

  // For MongoDB
  try {
    if (cache.portfolioInfo) return res.json(cache.portfolioInfo);
    let info = await PortfolioInfo.findOne().lean();
    if (!info) {
      info = normalizePortfolioInfo();
    } else {
      info = {
        ...normalizePortfolioInfo(info),
        id: info._id.toString()
      };
    }
    cache.portfolioInfo = info;
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/portfolio-info', verifyAdmin, async (req, res) => {
  // For Supabase
  /*
  const { data, error } = await supabase.from('portfolio_info').update(req.body).eq('id', 1).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
  */

  // For MongoDB
  try {
    const info = await PortfolioInfo.findOne();
    const currentInfo = info?.toObject?.() ?? {};
    const payload = normalizePortfolioInfo({
      ...currentInfo,
      ...req.body,
      social_links: {
        ...(currentInfo.social_links ?? {}),
        ...(req.body.social_links ?? {})
      }
    });
    payload.updated_at = new Date();

    let updated;
    if (info) {
      updated = await PortfolioInfo.findByIdAndUpdate(info._id, payload, { new: true });
    } else {
      updated = new PortfolioInfo(payload);
      await updated.save();
    }
    clearCache('portfolioInfo');
    res.json({ ...normalizePortfolioInfo(updated.toObject()), id: updated._id.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
