// frontend/src/components/reviews/ReviewForm.jsx
import React, { useState } from 'react';
import { FaStar, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

const ReviewForm = ({ experienceId, onSubmit, onCancel, initialData = null, isAdmin = false }) => {
  const [formData, setFormData] = useState({
    rating: initialData?.rating || 0,
    title: initialData?.title || '',
    comment: initialData?.comment || '',
    pros: initialData?.pros || [],
    cons: initialData?.cons || [],
    visitDate: initialData?.visitDate ? initialData.visitDate.split('T')[0] : '',
    images: initialData?.images || []
  });
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.rating === 0) {
      setError('Please select a rating');
      setLoading(false);
      return;
    }

    if (!formData.title.trim()) {
      setError('Please enter a title');
      setLoading(false);
      return;
    }

    if (!formData.comment.trim()) {
      setError('Please enter your review comment');
      setLoading(false);
      return;
    }

    try {
      // Prepare data - match Review model schema
      const reviewData = {
        rating: formData.rating,
        title: formData.title.trim(),
        comment: formData.comment.trim(),
        pros: formData.pros.filter(p => p.trim()),
        cons: formData.cons.filter(c => c.trim()),
        visitDate: formData.visitDate || null,
        images: formData.images || [],
        experienceId: experienceId, // Use experienceId
        ...(initialData?._id && { reviewId: initialData._id })
      };

      console.log('📤 Submitting review data:', reviewData);

      await onSubmit(reviewData);
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const addPro = () => {
    if (newPro.trim()) {
      setFormData({ ...formData, pros: [...formData.pros, newPro.trim()] });
      setNewPro('');
    }
  };

  const removePro = (index) => {
    setFormData({ ...formData, pros: formData.pros.filter((_, i) => i !== index) });
  };

  const addCon = () => {
    if (newCon.trim()) {
      setFormData({ ...formData, cons: [...formData.cons, newCon.trim()] });
      setNewCon('');
    }
  };

  const removeCon = (index) => {
    setFormData({ ...formData, cons: formData.cons.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {isAdmin ? (initialData ? '✏️ Edit Review' : '📝 Add Review') : (initialData ? '✏️ Edit Your Review' : '✍️ Write a Review')}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none hover:scale-110 transition"
                >
                  <FaStar 
                    className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {formData.rating > 0 ? `${formData.rating} / 5` : 'Select rating'}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Summarize your experience"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            maxLength={100}
          />
        </div>

        {/* Comment */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Comment *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Share your detailed experience..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[100px]"
            maxLength={2000}
          />
        </div>

        {/* Pros */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ✅ Pros (What did you like?)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newPro}
              onChange={(e) => setNewPro(e.target.value)}
              placeholder="e.g., Beautiful scenery"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPro())}
            />
            <button
              type="button"
              onClick={addPro}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.pros.length === 0 ? (
              <span className="text-sm text-gray-400">No pros added yet</span>
            ) : (
              formData.pros.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removePro(index)}
                    className="hover:text-red-500 transition"
                  >
                    <FaMinus size={10} />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Cons */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ❌ Cons (What could be improved?)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCon}
              onChange={(e) => setNewCon(e.target.value)}
              placeholder="e.g., Crowded"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCon())}
            />
            <button
              type="button"
              onClick={addCon}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.cons.length === 0 ? (
              <span className="text-sm text-gray-400">No cons added yet</span>
            ) : (
              formData.cons.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeCon(index)}
                    className="hover:text-red-500 transition"
                  >
                    <FaMinus size={10} />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Visit Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📅 When did you visit?
          </label>
          <input
            type="date"
            value={formData.visitDate}
            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Submit Buttons */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.01] transform'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Saving Review...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">⭐</span>
                {initialData ? 'Update Review' : 'Submit Review'}
                <span className="text-xl">→</span>
              </div>
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full mt-3 py-3 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
