import { createClient } from 'next-sanity'
export const client = createClient({
  projectId: "bvqvtkuu",
 dataset: "production",
  apiVersion: "2024-02-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
