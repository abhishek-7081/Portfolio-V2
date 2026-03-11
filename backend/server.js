import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up Mutler for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Init Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'YOUR_SUPABASE_SERVICE_KEY';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'MERN Portfolio API running' });
});

// Middleware to verify admin JWT from Supabase
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' });

  req.user = user;
  next();
};

// --- Upload API ---
app.post('/api/upload', verifyAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileName = `${Date.now()}-${req.file.originalname}`;
  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: true
    });

  if (error) return res.status(500).json({ error: error.message });

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio')
    .getPublicUrl(fileName);

  res.json({ url: publicUrl });
});

// --- Projects API ---
app.get('/api/projects', async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/projects', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('projects').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.put('/api/projects/:id', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('projects').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  const { error } = await supabase.from('projects').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

// --- Certificates API ---
app.get('/api/certificates', async (req, res) => {
  const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/certificates', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('certificates').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.put('/api/certificates/:id', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('certificates').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete('/api/certificates/:id', verifyAdmin, async (req, res) => {
  const { error } = await supabase.from('certificates').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

// --- Portfolio Info API ---
app.get('/api/portfolio-info', async (req, res) => {
  const { data, error } = await supabase.from('portfolio_info').select('*').eq('id', 1).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/portfolio-info', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('portfolio_info').update(req.body).eq('id', 1).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
