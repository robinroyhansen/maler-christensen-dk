// This module creates Supabase client for browser usage
// It must be called only on the client side

let supabaseClient: any = null

export async function getClient() {
  if (typeof window === 'undefined') {
    // Return null on server during build
    return null
  }
  
  if (supabaseClient) {
    return supabaseClient
  }
  
  const { createBrowserClient } = await import('@supabase/ssr')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    return null
  }
  
  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Legacy function for components that still use createClient
export function createClient() {
  if (typeof window === 'undefined') {
    // Return a mock during SSR/build
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ error: null }),
        signOut: async () => {},
      },
      from: () => ({
        select: () => ({
          eq: () => ({ data: [], error: null }),
          order: () => ({ data: [], error: null, limit: () => ({ data: [], error: null }) }),
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
  
  // This is synchronous but only called client-side where we can access env vars
  const { createBrowserClient } = require('@supabase/ssr')
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
