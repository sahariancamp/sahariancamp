const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Enhanced fetch wrapper with Next.js caching options
 */
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export async function fetchTents() {
  // Cache tents data, revalidate every hour
  return apiFetch('/tents', { next: { revalidate: 3600 } });
}

export async function fetchActivities() {
  // Cache activities data, revalidate every hour
  return apiFetch('/activities', { next: { revalidate: 3600 } });
}

export async function fetchGallery() {
  // Cache gallery data, revalidate every hour
  return apiFetch('/gallery', { next: { revalidate: 3600 } });
}

export async function fetchReviews() {
  // Cache reviews data, revalidate every hour
  try {
    return apiFetch('/reviews', { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function createBooking(data: any) {
  // No caching for POST requests
  return apiFetch('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store'
  });
}

export async function submitContactForm(data: any) {
  // No caching for POST requests
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store'
  });
}
