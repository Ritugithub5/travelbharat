// frontend/src/services/contactService.js
import api from './api';

export const contactAPI = {
  // Submit contact form
  submitContact: (data) => api.post('/contact', data).then(res => res.data),
  
  // Get all contact submissions (Admin only)
  getContacts: (params) => api.get('/contact', { params }).then(res => res.data),
  
  // Get contact stats (Admin only)
  getStats: () => api.get('/contact/stats').then(res => res.data),
  
  // Get single contact (Admin only)
  getContact: (id) => api.get(`/contact/${id}`).then(res => res.data),
  
  // Update contact (Admin only)
  updateContact: (id, data) => api.put(`/contact/${id}`, data).then(res => res.data),
  
  // Delete contact (Admin only)
  deleteContact: (id) => api.delete(`/contact/${id}`).then(res => res.data),
};