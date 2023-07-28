// sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: '2q5exs4w',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
export async function getProducts() {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)
  return products
}

export async function getBanner() {
  const query = '*[_type == "banner"]'
  const banner = await client.fetch(query)
  return banner[0]
}

export async function getProduct({slug}) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {product, products}
}
