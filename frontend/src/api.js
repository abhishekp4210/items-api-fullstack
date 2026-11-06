// Smart API Base Resolver:
// Uses /api reverse proxy on localhost, tunnels, Vercel, and Netlify to eliminate browser CORS errors.
// Falls back to direct AWS HTTP API Gateway URL when needed.
const isProxied =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
   window.location.hostname.includes('localhost.run') ||
   window.location.hostname.includes('localtunnel.me') ||
   window.location.hostname.includes('pinggy.link') ||
   window.location.hostname.includes('vercel.app') ||
   window.location.hostname.includes('netlify.app'));

const API_BASE = isProxied
  ? '/api'
  : 'https://c9v6vv37jd.execute-api.ap-south-1.amazonaws.com';

export async function createItem(payload) {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getItem(id) {
  const res = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}
