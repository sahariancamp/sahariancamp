import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sahariancamp.com'
  
  const routes = [
    '',
    '/about',
    '/activities',
    '/tents',
    '/gallery',
    '/booking',
    '/contact',
    '/faq',
    '/location',
    '/weather',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
 
  return routes
}
