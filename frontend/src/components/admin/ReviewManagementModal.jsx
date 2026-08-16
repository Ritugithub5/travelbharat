// frontend/src/components/admin/ReviewManagementModal.jsx
import React, { useState, useEffect } from 'react';
import { FaStar, FaTimes, FaTrash, FaCheck, FaUser, FaCalendar, FaFlag, FaPlus, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { reviewAPI } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import ReviewForm from '../reviews/ReviewForm';

const ReviewManagementModal = ({ destination, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ average: 0, total: 0, ratingCounts: {} });
  const [showAddReview, setShowAddReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    if (destination) {
      loadReviews();
    }
  }, [destination]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const experienceId = destination.id || destination._id;
      const response = await reviewAPI.getDestinationReviews(experienceId);
      setReviews(response.reviews || []);
      setStats(response.stats || { average: 0, total: 0, ratingCounts: {} });
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Failed to load reviews: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.deleteReview(reviewId);
        toast.success('Review deleted successfully');
        loadReviews();
        if (onUpdate) onUpdate();
      } catch (error) {
        toast.error('Failed to delete review: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleVerifyReview = async (reviewId) => {
    try {
      await reviewAPI.verifyReview(reviewId);
      toast.success('Review verified successfully');
      loadReviews();
    } catch (error) {
      toast.error('Failed to verify review: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      if (editingReview) {
        await reviewAPI.updateReview(editingReview._id, reviewData);
        toast.success('Review updated successfully!');
      } else {
        const submitData = {
          ...reviewData,
          experienceId: destination.id || destination._id,
          userId: user.id,
          username: user.username
        };
        await reviewAPI.createReview(submitData);
        toast.success('Review added successfully!');
      }
      setShowAddReview(false);
      setEditingReview(null);
      loadReviews();
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save review');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowAddReview(true);
  };

  const handleCancelEdit = () => {
    setShowAddReview(false);
    setEditingReview(null);
  };

  if (!destination) return null;

  const getTimeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
        {/* Header - Fixed */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-orange-50 to-white flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Reviews for {destination.name}</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                ⭐ {stats.average?.toFixed(1) || 0} average
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                📝 {stats.total || 0} reviews
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingReview(null);
                setShowAddReview(!showAddReview);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium"
            >
              <FaPlus size={12} /> {showAddReview ? 'Cancel' : 'Add Review'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(95vh - 140px)' }}>
          {/* Add/Edit Review Form */}
          {showAddReview && (
            <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <ReviewForm
                destinationId={destination.id || destination._id}
                onSubmit={handleSubmitReview}
                onCancel={handleCancelEdit}
                initialData={editingReview}
                isAdmin={true}
              />
            </div>
          )}

          {/* Reviews List */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-gray-500">No reviews yet for this experience.</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Review" to create the first review!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                          {review.username?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">{review.username}</span>
                            {review.isVerified && (
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✅ Verified</span>
                            )}
                            {review.reported && (
                              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">⚠️ Reported</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{getTimeAgo(review.createdAt)}</span>
                            {review.visitDate && (
                              <>
                                <span>•</span>
                                <span>Visited: {new Date(review.visitDate).toLocaleDateString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`text-sm ${i < Math.round(review.rating) ? 'text-yellow-400' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{review.rating}.0</span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-800">{review.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{review.comment}</p>
                      
                      {(review.pros?.length > 0 || review.cons?.length > 0) && (
                        <div className="flex flex-wrap gap-4 mt-2">
                          {review.pros?.length > 0 && (
                            <div className="text-xs">
                              <span className="text-green-600 font-medium">✅ Pros:</span>
                              <span className="text-gray-600 ml-1">{review.pros.join(', ')}</span>
                            </div>
                          )}
                          {review.cons?.length > 0 && (
                            <div className="text-xs">
                              <span className="text-red-600 font-medium">❌ Cons:</span>
                              <span className="text-gray-600 ml-1">{review.cons.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {review.helpfulCount > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          👍 {review.helpfulCount} people found this helpful
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="Edit Review"
                      >
                        <FaEdit size={14} />
                      </button>
                      {!review.isVerified && (
                        <button
                          onClick={() => handleVerifyReview(review._id)}
                          className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition text-xs flex items-center gap-1"
                          title="Verify Review"
                        >
                          <FaCheck size={12} /> Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="Delete Review"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''} • {stats.average?.toFixed(1) || 0} ⭐ average
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagementModal;