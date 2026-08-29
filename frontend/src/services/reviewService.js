// frontend/src/services/reviewService.js
import api from './api';

export const reviewAPI = {
  // Get reviews for an experience
  getExperienceReviews: async (experienceId) => {
    const response = await api.get(`/experiences/${experienceId}/reviews`);
    return response.data;
  },

  // Create a new review
  createReview: async (data) => {
    const response = await api.post(`/experiences/${data.experienceId}/reviews`, data);
    return response.data;
  },

  // Update a review
  updateReview: async (reviewId, data) => {
    const response = await api.put(`/reviews/${reviewId}`, data);
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  // Verify a review (admin only)
  verifyReview: async (reviewId) => {
    const response = await api.patch(`/reviews/${reviewId}/verify`);
    return response.data;
  }
};
