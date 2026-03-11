-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  tech_stack text[] DEFAULT '{}',
  github_url text,
  live_url text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  organization text,
  date text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create portfolio info table (single row using constraint)
CREATE TABLE IF NOT EXISTS portfolio_info (
  id int PRIMARY KEY CHECK (id = 1),
  about_text text,
  skills jsonb DEFAULT '[]',
  social_links jsonb DEFAULT '{}',
  resume_url text,
  profile_image_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial empty/placeholder portfolio_info row
INSERT INTO portfolio_info (id, about_text) 
VALUES (1, 'Welcome to my portfolio.')
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_info ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all three tables
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read access to portfolio_info" ON portfolio_info FOR SELECT USING (true);

-- Allow all operations for authenticated users (your service key / admin users)
CREATE POLICY "Allow full access to projects for authenticated users" ON projects USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to certificates for authenticated users" ON certificates USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to portfolio_info for authenticated users" ON portfolio_info USING (auth.role() = 'authenticated');
