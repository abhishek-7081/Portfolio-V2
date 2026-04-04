import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin, PortfolioInfo } from './models.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed Admin
    const adminExists = await Admin.findOne({ username: '1234' });
    if (!adminExists) {
      const newAdmin = new Admin({ username: '1234', password: '1234' });
      await newAdmin.save();
      console.log('Default admin created: ID "1234", Password "1234"');
    } else {
      console.log('Default admin already exists.');
    }

    // Seed Portfolio Info
    const infoExists = await PortfolioInfo.findOne();
    if (!infoExists) {
      const newInfo = new PortfolioInfo({ about_text: 'Welcome to my portfolio.' });
      await newInfo.save();
      console.log('Default portfolio info created.');
    } else {
      console.log('Portfolio info already exists.');
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedDatabase();
