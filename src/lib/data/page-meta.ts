import { createClient } from "@supabase/supabase-js"
import { COMPANY } from "@/lib/constants"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export async function getPageMeta(
  slug: string,
  defaults: { title: string; description: string }
): Promise<{ title: string; description: string }> {
  try {
    if (!supabaseUrl || !supabaseKey) return defaults
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from("page_content")
      .select("meta_title, meta_description")
      .eq("slug", slug)
      .single()

    return {
      title: data?.meta_title || defaults.title,
      description: data?.meta_description || defaults.description,
    }
  } catch {
    return defaults
  }
}
