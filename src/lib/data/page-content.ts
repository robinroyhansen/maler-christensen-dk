import { createClient } from '@/lib/supabase/server'

export interface PageContentData {
  slug: string
  page_type: string
  meta_title: string | null
  meta_description: string | null
  hero_title: string | null
  hero_subtitle: string | null
  intro: string | null
  sections: Array<{ title: string; content: string }>
  content: Record<string, unknown>
}

/**
 * Fetch editable page content from Supabase.
 * Returns DB content merged with provided defaults — DB values take priority.
 */
export async function getPageContent(
  slug: string,
  defaults: Partial<PageContentData> = {}
): Promise<PageContentData> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('page_content')
      .select('*')
      .eq('slug', slug)
      .single()

    if (data) {
      return {
        slug,
        page_type: data.page_type || defaults.page_type || 'static',
        meta_title: data.meta_title || defaults.meta_title || null,
        meta_description: data.meta_description || defaults.meta_description || null,
        hero_title: data.hero_title || defaults.hero_title || null,
        hero_subtitle: data.hero_subtitle || defaults.hero_subtitle || null,
        intro: data.intro || defaults.intro || null,
        sections: data.sections?.length ? data.sections : defaults.sections || [],
        content: data.content || defaults.content || {},
      }
    }
  } catch {
    // DB not available — use defaults
  }

  return {
    slug,
    page_type: defaults.page_type || 'static',
    meta_title: defaults.meta_title || null,
    meta_description: defaults.meta_description || null,
    hero_title: defaults.hero_title || null,
    hero_subtitle: defaults.hero_subtitle || null,
    intro: defaults.intro || null,
    sections: defaults.sections || [],
    content: defaults.content || {},
  }
}
