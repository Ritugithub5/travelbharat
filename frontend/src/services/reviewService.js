// frontend/src/services/reviewService.js
import api from './api';

export const reviewAPI = {
  // Get reviews for an experience (changed from destination to experience)
  getDestinationReviews: (experienceId, page = 1, limit = 10, sort = 'newest') =>
    api.get(`/reviews/experience/${experienceId}?page=${page}&limit=${limit}&sort=${sort}`)
      .then(res => res.data),
  
  // Create a review
  createReview: (data) =>
    api.post('/reviews', data).then(res => res.data),
  
  // Delete a review (Admin only)
  deleteReview: (id) =>
    api.delete(`/reviews/${id}`).then(res => res.data),
  
  // Verify a review (Admin only)
  verifyReview: (id) =>
    api.put(`/reviews/${id}/verify`).then(res => res.data),
  
  // Mark review as helpful
  markHelpful: (id) =>
    api.post(`/reviews/${id}/helpful`).then(res => res.data),
  
  // Report a review
  reportReview: (id, reason) =>
    api.post(`/reviews/${id}/report`, { reason }).then(res => res.data),
};