-- Add status column to contact_submissions for lead management
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'done'));

-- Page content overrides table
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  page_type TEXT NOT NULL DEFAULT 'service' CHECK (page_type IN ('service', 'city', 'static')),
  meta_title TEXT,
  meta_description TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  intro TEXT,
  sections JSONB DEFAULT '[]',
  is_visible BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Redirects table for 301 redirects
CREATE TABLE IF NOT EXISTS redirects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT UNIQUE NOT NULL,
  to_path TEXT NOT NULL,
  status_code INT DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services table for managing services
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Cities table for managing cities
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  distance INT DEFAULT 0,
  custom_description TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add page assignment to reviews (multi-select support via JSONB)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS page_slugs JSONB DEFAULT '[]';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_page_content_slug ON page_content(slug);
CREATE INDEX IF NOT EXISTS idx_page_content_type ON page_content(page_type);
CREATE INDEX IF NOT EXISTS idx_redirects_from ON redirects(from_path);
CREATE INDEX IF NOT EXISTS idx_redirects_active ON redirects(is_active);
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(is_visible);
CREATE INDEX IF NOT EXISTS idx_cities_visible ON cities(is_visible);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON contact_submissions(status);

-- Apply updated_at triggers
CREATE TRIGGER update_page_content_updated_at
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cities_updated_at
    BEFORE UPDATE ON cities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read page_content" ON page_content FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read redirects" ON redirects FOR SELECT USING (is_active = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (is_visible = true);

-- Service role full access
CREATE POLICY "Service full page_content" ON page_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full redirects" ON redirects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full services" ON services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full cities" ON cities FOR ALL USING (auth.role() = 'service_role');

-- Auth manage policies
CREATE POLICY "Auth manage page_content" ON page_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage redirects" ON redirects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cities" ON cities FOR ALL USING (auth.role() = 'authenticated');
