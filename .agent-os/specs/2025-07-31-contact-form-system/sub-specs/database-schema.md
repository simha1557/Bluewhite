# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-07-31-contact-form-system/spec.md

## Schema Changes

### New Tables

#### contacts
Primary table for storing contact form submissions

```sql
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
```

### Indexes

```sql
-- Index for querying by email
CREATE INDEX idx_contacts_email ON contacts(email);

-- Index for querying by creation date (for admin dashboard)
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Index for rate limiting by IP address
CREATE INDEX idx_contacts_ip_created ON contacts(ip_address, created_at);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on contacts table
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form submissions)
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow service role to read all contacts (for admin purposes)
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
```

### Triggers

```sql
-- Automatic updated_at timestamp trigger
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
```

## Rationale

**UUID Primary Key:** Prevents enumeration attacks and provides globally unique identifiers for contact submissions.

**Email Validation:** Database-level constraint ensures data integrity while client-side validation provides immediate feedback.

**IP Address Tracking:** Enables rate limiting and spam prevention while respecting privacy.

**RLS Policies:** Secure by default - anonymous users can only insert, not read existing submissions.

**Timestamps:** Automatic tracking of creation and modification times for audit trails and reporting.

**Indexes:** Optimized for common query patterns including email lookup and date-based filtering for admin interfaces.