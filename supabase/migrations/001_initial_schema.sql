-- Pages table for all content
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  page_type TEXT CHECK (page_type IN ('service', 'city', 'general')) NOT NULL,
  city_name TEXT,
  content JSONB DEFAULT '{}',
  hero_image TEXT,
  hero_heading TEXT,
  hero_subheading TEXT,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table for Trustpilot reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  source TEXT DEFAULT 'trustpilot',
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery images
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  category TEXT,
  sort_order INT DEFAULT 0,
  page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  page_slug TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings key-value store
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_type ON pages(page_type);
CREATE INDEX idx_pages_published ON pages(is_published);
CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);
CREATE INDEX idx_submissions_read ON contact_submissions(is_read);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to pages
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to site_settings
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Public insert for contact submissions
CREATE POLICY "Public insert submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Service role full access
CREATE POLICY "Service full pages" ON pages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full reviews" ON reviews FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full gallery" ON gallery_images FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full partners" ON partners FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full submissions" ON contact_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service full settings" ON site_settings FOR ALL USING (auth.role() = 'service_role');

-- Authenticated users can manage content (for admin)
CREATE POLICY "Auth manage pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage gallery" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policies
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
