import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const seedData = async () => {
  console.log('Seeding initial data...');

  // 1. Portfolio Info
  const { error: infoError } = await supabase.from('portfolio_info').upsert({
    id: 1,
    about_text: 'I am a passionate software developer specializing in the MERN stack. I love building full-stack applications that are scalable, maintainable, and user-friendly. With a strong foundation in modern web technologies, I strive to create impactful digital experiences.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Supabase', 'JavaScript', 'Tailwind CSS', 'Redux', 'Git'],
    social_links: {
      github: 'https://github.com/abhishektripathi',
      linkedin: 'https://linkedin.com/in/abhishektripathi',
      twitter: 'https://twitter.com/abhishek_dev'
    },
    resume_url: 'https://example.com/resume.pdf'
  });
  if (infoError) console.error('Error seeding portfolio_info:', infoError.message);

  // 2. Projects
  const projects = [
    {
      title: 'E-commerce Premium',
      description: 'A fully functional e-commerce platform with Stripe integration, user authentication, and an admin dashboard for product management.',
      tech_stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      github_url: 'https://github.com',
      live_url: 'https://example.com',
      image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Real-time Chat App',
      description: 'A real-time messaging application with private rooms, message persistence, and user presence tracking using Socket.io.',
      tech_stack: ['React', 'Node.js', 'Socket.io', 'Supabase'],
      github_url: 'https://github.com',
      live_url: 'https://example.com',
      image_url: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const { error: projectError } = await supabase.from('projects').insert(projects);
  if (projectError) console.error('Error seeding projects:', projectError.message);

  // 3. Certificates
  const certificates = [
    {
      title: 'Full Stack Web Development',
      organization: 'Meta (via Coursera)',
      date: 'Dec 2023',
      image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'React Native Expert',
      organization: 'Udemy',
      date: 'Jan 2024',
      image_url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const { error: certError } = await supabase.from('certificates').insert(certificates);
  if (certError) console.error('Error seeding certificates:', certError.message);

  console.log('Seeding complete!');
};

seedData();
