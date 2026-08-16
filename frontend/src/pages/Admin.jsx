// frontend/src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaUser, FaSignOutAlt,
  FaCog, FaChartBar, FaMapMarkerAlt, FaBuilding, FaStar,
  FaCompass, FaHome, FaUsers, FaImage, FaCheckCircle,
  FaTimesCircle, FaDownload, FaUpload, FaCloudUploadAlt,
  FaTimes, FaLeaf, FaTree, FaUmbrellaBeach, FaPalette,
  FaDharmachakra, FaSpa, FaUtensils, FaMountain, FaShip,
  FaPaw, FaGlobeAsia, FaLandmark, FaWater
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ReviewManagementModal from '../components/admin/ReviewManagementModal';

// Category icons mapping
const categoryIcons = {
  'Wildlife': <FaPaw className="text-emerald-500" />,
  'Bird Watching': <FaLeaf className="text-blue-500" />,
  'Eco Tourism': <FaLeaf className="text-green-500" />,
  'Art Gallery': <FaPalette className="text-purple-500" />,
  'Spiritual': <FaDharmachakra className="text-orange-500" />,
  'Wellness': <FaSpa className="text-teal-500" />,
  'Culinary': <FaUtensils className="text-red-500" />,
  'Luxury Travel': <FaShip className="text-amber-500" />,
  'Water & Mountain': <FaMountain className="text-indigo-500" />,
  'Adventure': <FaCompass className="text-red-500" />,
  'Heritage': <FaLandmark className="text-amber-600" />,
  'Nature': <FaLeaf className="text-green-500" />,
  'Religious': <FaDharmachakra className="text-purple-500" />,
  'Beach': <FaUmbrellaBeach className="text-cyan-500" />,
  'Hill Station': <FaMountain className="text-blue-500" />
};

const Admin = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [modalType, setModalType] = useState('experience');
  
  // Review Management States
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Load all data from MongoDB
  const loadAllData = async () => {
    setLoading(true);
    try {
      // Fetch experiences from MongoDB
      const expResponse = await api.get('/experiences?limit=200');
      let experiences = [];
      if (expResponse.data && expResponse.data.success) {
        experiences = expResponse.data.experiences || [];
      }

      // Fetch states from MongoDB
      const stateResponse = await api.get('/states');
      let states = [];
      if (stateResponse.data && stateResponse.data.success) {
        states = stateResponse.data.states || [];
      }

      // Combine both
      const combined = [
        ...states.map(s => ({
          id: s._id || s.id,
          name: s.name,
          category: 'State',
          description: s.description || '',
          state: s.name,
          location: s.capital || '',
          image: s.imageUrl || '',
          rating: 0,
          reviewCount: 0,
          type: 'state',
          capital: s.capital,
          region: s.region,
          stateCode: s.stateCode,
          famousFor: s.famousFor || [],
          language: s.language || [],
          population: s.population,
          area: s.area
        })),
        ...experiences.map(d => ({
          id: d._id || d.id,
          name: d.name,
          category: d.category || 'Experience',
          description: d.description || '',
          state: d.state || 'India',
          location: d.location || d.state || 'India',
          image: d.image || '',
          images: d.images || [],
          rating: d.rating || 0,
          reviewCount: d.reviewCount || 0,
          type: 'experience',
          bestTimeToVisit: d.bestTimeToVisit || '',
          entryFee: d.entryFee || 'Free',
          timings: d.timings || 'Open all days',
          nearbyAttractions: d.nearbyAttractions || [],
          isVerified: d.isVerified || false,
          isPopular: d.isPopular || false,
          highlights: d.highlights || []
        }))
      ];

      setAllData(combined);
      setFilteredData(combined);
      console.log(`📊 Loaded ${combined.length} items from MongoDB`);
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
      setAllData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadAllData();
    }
  }, [isAuthenticated, isAdmin]);

  // Filter data by search
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredData(allData.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredData(allData);
    }
  }, [searchTerm, allData]);

  // Get category counts
  const categoryCounts = {};
  allData.forEach(item => {
    const cat = item.category || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const totalItems = allData.length;
  const totalCategories = Object.keys(categoryCounts).length;

  // Handle Add
  const handleAdd = (type) => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'state') {
      setFormData({
        name: '',
        capital: '',
        region: '',
        description: '',
        stateCode: '',
        famousFor: [],
        language: [],
        population: '',
        area: '',
        imageUrl: '',
        type: 'state'
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        state: '',
        location: '',
        image: '',
        images: [],
        rating: 0,
        reviewCount: 0,
        bestTimeToVisit: '',
        entryFee: '',
        timings: '',
        nearbyAttractions: [],
        isVerified: true,
        isPopular: false,
        highlights: [],
        type: 'experience'
      });
    }
    setShowModal(true);
  };

  // Handle Edit
  const handleEdit = (item) => {
    setModalType(item.type || 'experience');
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    
    try {
      if (item.type === 'state') {
        await api.delete(`/states/${item.id}`);
        toast.success(`State "${item.name}" deleted successfully!`);
      } else {
        await api.delete(`/experiences/${item.id}`);
        toast.success(`Experience "${item.name}" deleted successfully!`);
      }
      loadAllData();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete item');
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      const submitData = { ...formData };
      delete submitData.id;
      delete submitData.type;
      delete submitData._id;

      if (modalType === 'state') {
        if (editingItem) {
          response = await api.put(`/states/${editingItem.id}`, submitData);
        } else {
          response = await api.post('/states', submitData);
        }
      } else {
        if (editingItem) {
          response = await api.put(`/experiences/${editingItem.id}`, submitData);
        } else {
          response = await api.post('/experiences', submitData);
        }
      }

      if (response.data && response.data.success) {
        toast.success(editingItem ? 'Updated successfully!' : 'Created successfully!');
        setShowModal(false);
        loadAllData();
      } else {
        toast.error(response.data?.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  // Handle View Reviews
  const handleViewReviews = (item) => {
    setSelectedExperience(item);
    setShowReviewModal(true);
  };

  // Handle Review Update
  const handleReviewUpdate = () => {
    loadAllData();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Toaster position="top-right" />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen bg-white shadow-lg fixed left-0 top-16 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user?.username?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-bold text-gray-800">{user?.username}</p>
                <p className="text-xs text-gray-500 truncate max-w-[140px]">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('dashboard'); setSearchTerm(''); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeTab === 'dashboard' ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaChartBar size={18} />
                <span>Dashboard</span>
                <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded-full">{totalItems}</span>
              </button>
              
              <button
                onClick={() => { setActiveTab('items'); setSearchTerm(''); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeTab === 'items' ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaCompass size={18} />
                <span>All Items</span>
                <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded-full">{totalItems}</span>
              </button>

              <div className="border-t border-gray-200 my-2 pt-2">
                <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Add New</p>
              </div>

              <button
                onClick={() => handleAdd('state')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-600 hover:bg-gray-50"
              >
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Add State</span>
              </button>
              
              <button
                onClick={() => handleAdd('experience')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-600 hover:bg-gray-50"
              >
                <FaPlus className="text-orange-500" />
                <span>Add Experience</span>
              </button>

              <div className="border-t border-gray-200 my-2 pt-2">
                <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
              </div>

              {Object.keys(categoryCounts).sort().map(cat => (
                <button
                  key={cat}
                  onClick={() => { 
                    setActiveTab('items'); 
                    setSearchTerm(cat);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-600 hover:bg-gray-50"
                >
                  <span className="text-lg">{categoryIcons[cat] || '📍'}</span>
                  <span className="text-sm">{cat}</span>
                  <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded-full">{categoryCounts[cat]}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-red-600 hover:bg-red-50">
                <FaSignOutAlt size={18} />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'items' && `All Items (${filteredData.length})`}
              </h1>
              <p className="text-gray-500">
                {activeTab === 'dashboard' ? `Total: ${totalItems} items across ${totalCategories} categories` : 
                 `${filteredData.length} items found`}
              </p>
            </div>
          </div>

          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {Object.keys(categoryCounts).sort().map(cat => (
                  <div key={cat} className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500 hover:shadow-lg transition cursor-pointer"
                    onClick={() => { setActiveTab('items'); setSearchTerm(cat); }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">{cat}</p>
                        <p className="text-2xl font-bold text-gray-800">{categoryCounts[cat]}</p>
                      </div>
                      <div className="text-2xl">{categoryIcons[cat] || '📍'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Items Table */}
          {activeTab === 'items' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex gap-4">
                <input
                  type="text"
                  placeholder="Search by name, category, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button onClick={() => setSearchTerm('')} className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Clear
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviews</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No items found</td>
                      </tr>
                    ) : (
                      filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'state' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                              {item.type || 'Experience'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {categoryIcons[item.category] || '📍'} {item.category || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{item.state || 'India'}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar 
                                    key={i} 
                                    className={`text-xs ${i < Math.round(item.rating || 0) ? 'text-yellow-400' : 'text-gray-200'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {(item.rating || 0).toFixed(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {item.reviewCount || 0} reviews
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEdit(item)} 
                                className="text-orange-600 hover:text-orange-800" 
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => handleDelete(item)} 
                                className="text-red-600 hover:text-red-800" 
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                              {item.type !== 'state' && (
                                <button 
                                  onClick={() => handleViewReviews(item)} 
                                  className="text-blue-600 hover:text-blue-800" 
                                  title="View Reviews"
                                >
                                  <FaEye />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingItem ? 'Edit' : 'Add New'} {modalType === 'state' ? 'State' : 'Experience'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name || ''} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                  placeholder="Enter name" 
                />
              </div>

              {/* State specific fields */}
              {modalType === 'state' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Capital *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.capital || ''} 
                        onChange={(e) => setFormData({...formData, capital: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        placeholder="Capital" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                      <select 
                        required 
                        value={formData.region || ''} 
                        onChange={(e) => setFormData({...formData, region: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="">Select Region</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="Central">Central</option>
                        <option value="North-East">North-East</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State Code</label>
                      <input 
                        type="text" 
                        value={formData.stateCode || ''} 
                        onChange={(e) => setFormData({...formData, stateCode: e.target.value.toUpperCase()})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        placeholder="e.g., RJ" 
                        maxLength="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={formData.imageUrl || ''} 
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        placeholder="https://example.com/image.jpg" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      rows="3" 
                      value={formData.description || ''} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                      placeholder="Description..." 
                    />
                  </div>
                </>
              ) : (
                // Experience specific fields
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select 
                        required 
                        value={formData.category || ''} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="">Select Category</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Bird Watching">Bird Watching</option>
                        <option value="Eco Tourism">Eco Tourism</option>
                        <option value="Art Gallery">Art Gallery</option>
                        <option value="Spiritual">Spiritual</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Culinary">Culinary</option>
                        <option value="Luxury Travel">Luxury Travel</option>
                        <option value="Water & Mountain">Water & Mountain</option>
                        <option value="Heritage">Heritage</option>
                        <option value="Nature">Nature</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Religious">Religious</option>
                        <option value="Beach">Beach</option>
                        <option value="Hill Station">Hill Station</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input 
                        type="text" 
                        value={formData.state || ''} 
                        onChange={(e) => setFormData({...formData, state: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        placeholder="State name" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      rows="3" 
                      value={formData.description || ''} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                      placeholder="Description..." 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee</label>
                      <input 
                        type="text" 
                        value={formData.entryFee || ''} 
                        onChange={(e) => setFormData({...formData, entryFee: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        placeholder="e.g., ₹100" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
                      <input 
                        type="text" 
                        value={formData.bestTimeToVisit || ''} 
                        onChange={(e) => setFormData({...formData, bestTimeToVisit: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        placeholder="e.g., October to March" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      max="5" 
                      value={formData.rating || 0} 
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})} 
                      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                      placeholder="e.g., 4.5" 
                    />
                  </div>
                </>
              )}

              {/* Image URL - Common field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image || formData.imageUrl || ''} 
                  onChange={(e) => setFormData({...formData, image: e.target.value, imageUrl: e.target.value})} 
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:shadow-lg transition font-medium" 
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Management Modal */}
      {showReviewModal && selectedExperience && (
        <ReviewManagementModal
          destination={selectedExperience}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedExperience(null);
          }}
          onUpdate={handleReviewUpdate}
        />
      )}
    </div>
  );
};

export default Admin;