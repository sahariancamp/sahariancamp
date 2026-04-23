import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
console.log('Current API URL:', API_URL);

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export async function fetchTents() {
  try {
    const response = await api.get('/tents');
    return response.data;
  } catch (error) {
    console.error('Error fetching tents:', error);
    throw error;
  }
}

export async function fetchActivities() {
  try {
    const response = await api.get('/activities');
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

export async function fetchGallery() {
  try {
    const response = await api.get('/gallery');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
}

export async function createBooking(data: any) {
  try {
    const response = await api.post('/bookings', data);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export default api;
