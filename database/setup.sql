-- Contact Form Database Setup for Supabase
-- Run these commands in your Supabase SQL Editor

-- 1. Create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_ip_created ON contacts(ip_address, created_at);

-- 3. Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Allow anonymous inserts (for contact form submissions)
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow service role full access (for admin purposes)
CREATE POLICY "Allow service role full access" ON contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- No direct read access for anonymous users (privacy protection)
CREATE POLICY "No anonymous reads" ON contacts
  FOR SELECT
  TO anon
  USING (false);

-- 5. Create automatic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. Verify setup
SELECT 'Database setup complete! Contacts table created with proper RLS policies.' as status;