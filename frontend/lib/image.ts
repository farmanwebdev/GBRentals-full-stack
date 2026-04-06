export function normalizeImageUrl(url?: string) {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
    return `${apiBase}${url}`;
  }
  return url;
}

export function isLocalBackendImage(url?: string) {
  return Boolean(url && (url.startsWith('http://localhost') || url.startsWith('https://localhost')));
}
