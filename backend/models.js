import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tech_stack: { type: [String], default: [] },
  github_url: { type: String },
  live_url: { type: String },
  image_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String },
  date: { type: String },
  image_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

const portfolioInfoSchema = new mongoose.Schema({
  about_text: { type: String, default: 'Welcome to my portfolio.' },
  hero_roles: {
    type: [String],
    default: ['MERN Stack Developer', 'Full-Stack Engineer', 'Problem Solver']
  },
  skills: { type: [String], default: [] },
  social_links: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  resume_url: { type: String, default: '' },
  profile_image_url: { type: String, default: '' },
  email: { type: String, default: '' },
  location: { type: String, default: '' },
  years_experience: { type: Number, default: 0 },
  projects_completed: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
adminSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const Project = mongoose.model('Project', projectSchema);
export const Certificate = mongoose.model('Certificate', certificateSchema);
export const PortfolioInfo = mongoose.model('PortfolioInfo', portfolioInfoSchema);
export const Admin = mongoose.model('Admin', adminSchema);
