import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Capture token from URL (both hash and query params)
const url = new URL(window.location.href);
let tokenFromQuery = url.searchParams.get('token');

// If not in query params, check hash fragment
if (!tokenFromQuery && window.location.hash) {
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  tokenFromQuery = hashParams.get('token');
}

if (tokenFromQuery) {
  console.log('Captured token from URL:', tokenFromQuery.substring(0, 20) + '...');
  localStorage.setItem('verdure_token', tokenFromQuery);
  // Clean up URL by removing token
  const cleanUrl = window.location.origin + window.location.pathname + window.location.hash.split('?')[0];
  window.history.replaceState({}, document.title, cleanUrl);
} else {
  console.log('No token found in URL');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
