import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Simple Supabase client that works on both server (build) and client
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock during build/SSR when env vars might not be available
    return {
      from: () => ({
        select: () => ({
          eq: () => ({ data: [], error: null, count: 0 }),
          order: () => ({ data: [], error: null, limit: () => ({ data: [], error: null }) }),
          neq: () => ({ data: [], error: null }),
          in: () => ({ data: [], error: null }),
        }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }), error: null }),
        update: () => ({ eq: () => ({ error: null }) }),
        delete: () => ({ eq: () => ({ error: null }) }),
        upsert: () => ({ error: null }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
