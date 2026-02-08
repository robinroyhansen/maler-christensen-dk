import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// This endpoint runs database migrations
// Should only be called once to set up new tables
export async function POST() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const migrations = [
    // Add status column to contact_submissions
    `ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new'`,
    
    // Create page_content table
    `CREATE TABLE IF NOT EXISTS page_content (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      page_type TEXT NOT NULL DEFAULT 'service',
      meta_title TEXT,
      meta_description TEXT,
      hero_title TEXT,
      hero_subtitle TEXT,
      intro TEXT,
      sections JSONB DEFAULT '[]',
      is_visible BOOLEAN DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT now()
    )`,

    // Create redirects table
    `CREATE TABLE IF NOT EXISTS redirects (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      from_path TEXT UNIQUE NOT NULL,
      to_path TEXT NOT NULL,
      status_code INT DEFAULT 301,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now()
    )`,

    // Create services table
    `CREATE TABLE IF NOT EXISTS services (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      is_visible BOOLEAN DEFAULT true,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )`,

    // Create cities table
    `CREATE TABLE IF NOT EXISTS cities (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      distance INT DEFAULT 0,
      custom_description TEXT,
      is_visible BOOLEAN DEFAULT true,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )`,

    // Add page_slugs to reviews
    `ALTER TABLE reviews ADD COLUMN IF NOT EXISTS page_slugs JSONB DEFAULT '[]'`,
    `ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true`,
  ]

  const results: { sql: string; success: boolean; error?: string }[] = []

  for (const sql of migrations) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql })
      if (error) {
        // Try direct query approach for simple operations
        // For now, log the error but continue
        results.push({ sql: sql.substring(0, 50) + '...', success: false, error: error.message })
      } else {
        results.push({ sql: sql.substring(0, 50) + '...', success: true })
      }
    } catch (err) {
      results.push({ sql: sql.substring(0, 50) + '...', success: false, error: String(err) })
    }
  }

  return NextResponse.json({ results })
}
