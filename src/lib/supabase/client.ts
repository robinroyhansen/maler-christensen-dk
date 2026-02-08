import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Create a thenable mock result that can be both awaited and chained
function createMockQueryResult(data: any[] = [], error: null = null) {
  const result = {
    data,
    error,
    count: 0,
    // Chaining methods - each returns the same thenable structure
    eq: () => result,
    neq: () => result,
    gt: () => result,
    gte: () => result,
    lt: () => result,
    lte: () => result,
    like: () => result,
    ilike: () => result,
    is: () => result,
    in: () => result,
    contains: () => result,
    containedBy: () => result,
    order: () => result,
    limit: () => result,
    range: () => result,
    single: () => ({ data: data[0] || null, error }),
    maybeSingle: () => ({ data: data[0] || null, error }),
    // Make it a thenable (Promise-like) so it can be awaited
    then: (resolve: (value: any) => void) => resolve({ data, error, count: 0 }),
  }
  return result
}

function createMockMutationResult(data: any = null, error: null = null) {
  const result = {
    data,
    error,
    eq: () => result,
    select: () => ({
      single: () => Promise.resolve({ data, error }),
      maybeSingle: () => Promise.resolve({ data, error }),
      then: (resolve: (value: any) => void) => resolve({ data: data ? [data] : [], error }),
    }),
    then: (resolve: (value: any) => void) => resolve({ data, error }),
  }
  return result
}

// Simple Supabase client that works on both server (build) and client
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock during build/SSR when env vars might not be available
    return {
      from: () => ({
        select: () => createMockQueryResult(),
        insert: () => createMockMutationResult(),
        update: () => createMockMutationResult(),
        delete: () => createMockMutationResult(),
        upsert: () => createMockMutationResult(),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
          remove: async () => ({ error: null }),
          list: async () => ({ data: [], error: null }),
        }),
      },
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
