// API configuration for different environments

// Get the base API URL based on environment
export const getApiBaseUrl = (): string => {
  // For production (Netlify)
  if (import.meta.env.PROD) {
    // Use Netlify functions in production
    return '/.netlify/functions';
  }
  
  // For development (local)
  return 'http://localhost:3000/api';
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};
