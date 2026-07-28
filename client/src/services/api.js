import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateWebsite = async (prompt, theme = 'modern', category = 'general') => {
  try {
    const response = await api.post('/generate', {
      prompt: prompt.trim(),
      theme,
      category,
    });

    if (!response.data.html) {
      throw new Error('No HTML generated');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || error.response.data.message || 'Server error');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to generate website');
    }
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Server is not available');
  }
};

export default api;