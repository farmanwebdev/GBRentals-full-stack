import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('gbrentals_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('gbrentals_token');
      localStorage.removeItem('gbrentals_user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register:        (data: any) => api.post('/auth/register', data),
  login:           (data: any) => api.post('/auth/login', data),
  getMe:           ()          => api.get('/auth/me'),
  updateProfile:   (data: any) => api.put('/auth/profile', data),
  changePassword:  (data: any) => api.put('/auth/password', data),
};

// ── Properties ────────────────────────────────────────────────────────────────
export const propertyAPI = {
  getAll:     (params?: any) => api.get('/properties', { params }),
  getFeatured: ()            => api.get('/properties/featured'),
  getOne:     (id: string)   => api.get(`/properties/${id}`),
  create:     (data: FormData) =>
    api.post('/properties', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:     (id: string, data: FormData) =>
    api.put(`/properties/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:     (id: string)   => api.delete(`/properties/${id}`),
};

// ── Inquiries ─────────────────────────────────────────────────────────────────
export const inquiryAPI = {
  send:    (propertyId: string, data: any) => api.post(`/inquiries/${propertyId}`, data),
  getMine: ()                              => api.get('/inquiries/my'),
  getOwner: ()                             => api.get('/inquiries/owner'),
  reply:   (id: string, reply: string)    => api.put(`/inquiries/${id}/reply`, { reply }),
};

// ── Favorites ─────────────────────────────────────────────────────────────────
export const favoriteAPI = {
  getAll:  ()                      => api.get('/favorites'),
  toggle:  (propertyId: string)    => api.post(`/favorites/${propertyId}`),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getDashboard:    ()                       => api.get('/admin/dashboard'),
  getProperties:   (status?: string)        => api.get('/admin/properties', { params: { status } }),
  approveProperty: (id: string)             => api.put(`/admin/properties/${id}/approve`),
  rejectProperty:  (id: string, reason?: string) =>
    api.put(`/admin/properties/${id}/reject`, { reason }),
  updateProperty:  (id: string, data: any) => api.put(`/admin/properties/${id}`, data),
  getUsers:        ()                       => api.get('/admin/users'),
  updateUser:      (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser:      (id: string)             => api.delete(`/admin/users/${id}`),
};

// ── Owner ─────────────────────────────────────────────────────────────────────
export const ownerAPI = {
  getDashboard:   ()                            => api.get('/owner/dashboard'),
  getProperties:  ()                            => api.get('/owner/properties'),
  updateStatus:   (id: string, status: string) =>
    api.put(`/owner/properties/${id}/status`, { status }),
};
