const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL || 'https://qdphnqduwgnnwvmpksrr.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
if (!supabaseKey) { console.error('Set SUPABASE_SERVICE_KEY env var'); process.exit(1) }

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateReviewPageSlugs() {
  console.log('Updating reviews with missing page_slugs...')
  
  // Update reviews with sort_order > 23 that don't have page_slugs set
  const { data, error } = await supabase
    .from('reviews')
    .update({ page_slugs: ['homepage'] })
    .gt('sort_order', 23)
    .is('page_slugs', null)

  if (error) {
    console.error('Error updating reviews:', error)
  } else {
    console.log('Successfully updated reviews with page_slugs')
  }
  
  // Also check for reviews that have empty page_slugs array
  const { data: data2, error: error2 } = await supabase
    .from('reviews')
    .update({ page_slugs: ['homepage'] })
    .gt('sort_order', 23)
    .eq('page_slugs', '[]')

  if (error2) {
    console.error('Error updating empty page_slugs:', error2)
  } else {
    console.log('Updated reviews with empty page_slugs')
  }
  
  // List all reviews to verify
  const { data: allReviews, error: listError } = await supabase
    .from('reviews')
    .select('id, author_name, sort_order, page_slugs')
    .order('sort_order')

  if (listError) {
    console.error('Error listing reviews:', listError)
  } else {
    console.log('\nAll reviews:')
    allReviews.forEach(review => {
      console.log(`${review.sort_order}: ${review.author_name} - page_slugs: ${JSON.stringify(review.page_slugs)}`)
    })
  }
}

updateReviewPageSlugs().then(() => {
  console.log('Done!')
  process.exit(0)
}).catch(err => {
  console.error('Error:', err)
  process.exit(1)
})