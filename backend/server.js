// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const User = require('./src/models/User');
const State = require('./src/models/State');
const Experience = require('./src/models/Experience');
const Review = require('./src/models/Review');

// IMPORTANT: Contact routes
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();

// Allow frontend requests from:
// - localhost:3000
// - Render frontend
// - Any other frontend origin
//
// JWT is sent through Authorization header,
// so credentials/cookies are NOT required.

app.use(
  cors({
    origin: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],

    credentials: false,

    optionsSuccessStatus: 204,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

console.log('🟢 Starting TravelBharat API...');
console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('📊 MONGODB_URI exists:', !!process.env.MONGODB_URI);

mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb://localhost:27017/travelbharat_db'
  )
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((error) => {
    console.error(
      '❌ MongoDB connection error:',
      error.message
    );
  });

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format',
      });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret123'
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

const admin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required',
      });
    }

    next();
  } catch (error) {
    console.error('❌ Admin middleware error:', error);

    return res.status(403).json({
      success: false,
      message: 'Admin access denied',
    });
  }
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    console.log('📝 Register attempt:', {
      email,
      username,
    });

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || 'user',
      },
      process.env.JWT_SECRET || 'secret123',
      {
        expiresIn: '7d',
      }
    );

    console.log('✅ User registered:', email);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error(
      '❌ Register error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    console.log('🔑 Login attempt:', email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Email and password are required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || 'user',
      },
      process.env.JWT_SECRET || 'secret123',
      {
        expiresIn: '7d',
      }
    );

    console.log('✅ Login successful:', email);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error(
      '❌ Login error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL STATES
app.get('/api/states', async (req, res) => {
  try {
    const states = await State.find().sort({
      name: 1,
    });

    return res.json({
      success: true,
      states,
    });
  } catch (error) {
    console.error(
      '❌ Error fetching states:',
      error
    );

    return res.status(500).json({
      success: false,
      states: [],
      message: error.message,
    });
  }
});

// CREATE STATE - ADMIN
app.post(
  '/api/states',
  auth,
  admin,
  async (req, res) => {
    try {
      const state = new State(req.body);

      await state.save();

      return res.status(201).json({
        success: true,
        state,
      });
    } catch (error) {
      console.error(
        '❌ Error creating state:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// UPDATE STATE - ADMIN
app.put(
  '/api/states/:id',
  auth,
  admin,
  async (req, res) => {
    try {
      const state =
        await State.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!state) {
        return res.status(404).json({
          success: false,
          message: 'State not found',
        });
      }

      return res.json({
        success: true,
        state,
      });
    } catch (error) {
      console.error(
        '❌ Error updating state:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// DELETE STATE - ADMIN
app.delete(
  '/api/states/:id',
  auth,
  admin,
  async (req, res) => {
    try {
      const state =
        await State.findByIdAndDelete(
          req.params.id
        );

      if (!state) {
        return res.status(404).json({
          success: false,
          message: 'State not found',
        });
      }

      return res.json({
        success: true,
        message:
          'State deleted successfully',
      });
    } catch (error) {
      console.error(
        '❌ Error deleting state:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// GET EXPERIENCES
app.get(
  '/api/experiences',
  async (req, res) => {
    try {
      const {
        category,
        state,
        limit,
        popular,
      } = req.query;

      const query = {};

      if (category) {
        query.category = category;
      }

      if (state) {
        query.state = state;
      }

      if (popular === 'true') {
        query.isPopular = true;
      }

      let experiencesQuery =
        Experience.find(query);

      if (limit) {
        const parsedLimit =
          parseInt(limit, 10);

        if (
          !isNaN(parsedLimit) &&
          parsedLimit > 0
        ) {
          experiencesQuery =
            experiencesQuery.limit(
              parsedLimit
            );
        }
      }

      const experiences =
        await experiencesQuery.sort({
          createdAt: -1,
        });

      return res.json({
        success: true,
        experiences,
      });
    } catch (error) {
      console.error(
        '❌ Error fetching experiences:',
        error
      );

      return res.status(500).json({
        success: false,
        experiences: [],
        message: error.message,
      });
    }
  }
);

// GET SINGLE EXPERIENCE
app.get(
  '/api/experiences/:id',
  async (req, res) => {
    try {
      const experience =
        await Experience.findById(
          req.params.id
        );

      if (!experience) {
        return res.status(404).json({
          success: false,
          message:
            'Experience not found',
        });
      }

      return res.json({
        success: true,
        experience,
      });
    } catch (error) {
      console.error(
        '❌ Error fetching experience:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// CREATE EXPERIENCE - ADMIN
app.post(
  '/api/experiences',
  auth,
  admin,
  async (req, res) => {
    try {
      const experience =
        new Experience(req.body);

      await experience.save();

      return res.status(201).json({
        success: true,
        experience,
      });
    } catch (error) {
      console.error(
        '❌ Error creating experience:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// UPDATE EXPERIENCE - ADMIN
app.put(
  '/api/experiences/:id',
  auth,
  admin,
  async (req, res) => {
    try {
      const experience =
        await Experience.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!experience) {
        return res.status(404).json({
          success: false,
          message:
            'Experience not found',
        });
      }

      return res.json({
        success: true,
        experience,
      });
    } catch (error) {
      console.error(
        '❌ Error updating experience:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// DELETE EXPERIENCE - ADMIN
app.delete(
  '/api/experiences/:id',
  auth,
  admin,
  async (req, res) => {
    try {
      const experience =
        await Experience.findByIdAndDelete(
          req.params.id
        );

      if (!experience) {
        return res.status(404).json({
          success: false,
          message:
            'Experience not found',
        });
      }

      // Delete associated reviews
      await Review.deleteMany({
        experienceId: req.params.id,
      });

      return res.json({
        success: true,
        message:
          'Experience deleted successfully',
      });
    } catch (error) {
      console.error(
        '❌ Error deleting experience:',
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// IMPORTANT:
// This fixes:
//
// POST /api/contact
//
// Your frontend calls:
// api.post('/contact', formData)
//
// Because API_URL is:
// https://travelbharat-073a.onrender.com/api
//
// Final URL:
// https://travelbharat-073a.onrender.com/api/contact

app.use(
  '/api/contact',
  contactRoutes
);

// Contact endpoints:
//
// POST   /api/contact
// GET    /api/contact
// GET    /api/contact/latest
// GET    /api/contact/stats
// GET    /api/contact/:id
// PUT    /api/contact/:id
// DELETE /api/contact/:id

// GET ALL REVIEWS FOR EXPERIENCE
app.get(
  '/api/experiences/:experienceId/reviews',
  async (req, res) => {
    try {
      const {
        experienceId,
      } = req.params;

      console.log(
        `📊 GET reviews for experience: ${experienceId}`
      );

      const experience =
        await Experience.findById(
          experienceId
        );

      if (!experience) {
        return res.status(404).json({
          success: false,
          message:
            'Experience not found',
        });
      }

      const reviews =
        await Review.find({
          experienceId,
        }).sort({
          createdAt: -1,
        });

      const total = reviews.length;

      const average =
        total > 0
          ? reviews.reduce(
              (sum, review) =>
                sum + review.rating,
              0
            ) / total
          : 0;

      const ratingCounts = {};

      reviews.forEach((review) => {
        const rating =
          Math.round(review.rating);

        ratingCounts[rating] =
          (ratingCounts[rating] || 0) +
          1;
      });

      return res.json({
        success: true,
        reviews,
        stats: {
          total,
          average:
            Math.round(
              average * 10
            ) / 10,
          ratingCounts,
        },
      });
    } catch (error) {
      console.error(
        '❌ Error fetching reviews:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Error fetching reviews',
        error: error.message,
      });
    }
  }
);

app.post(
  '/api/experiences/:experienceId/reviews',
  async (req, res) => {
    try {
      const {
        experienceId,
      } = req.params;

      const {
        rating,
        title,
        comment,
        pros,
        cons,
        visitDate,
        username,
        userId,
      } = req.body;

      console.log(
        `📝 POST review for experience: ${experienceId}`
      );

      // Validate rating
      if (
        !rating ||
        rating < 1 ||
        rating > 5
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Rating between 1 and 5 is required',
        });
      }

      // Validate title
      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Title is required',
        });
      }

      // Validate comment
      if (
        !comment ||
        !comment.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Comment is required',
        });
      }

      // Check experience
      const experience =
        await Experience.findById(
          experienceId
        );

      if (!experience) {
        return res.status(404).json({
          success: false,
          message:
            'Experience not found',
        });
      }

      // Create review
      const review = new Review({
        experienceId,

        userId: userId || null,

        username:
          username || 'Anonymous',

        rating: parseInt(
          rating,
          10
        ),

        title: title.trim(),

        comment: comment.trim(),

        pros: pros || [],

        cons: cons || [],

        visitDate:
          visitDate || null,

        isVerified: false,

        createdAt: new Date(),
      });

      await review.save();

      console.log(
        `✅ Review created: ${review._id}`
      );

      await updateExperienceRating(
        experienceId
      );

      return res.status(201).json({
        success: true,
        message:
          'Review added successfully',
        review,
      });
    } catch (error) {
      console.error(
        '❌ Error creating review:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Error creating review',
        error: error.message,
      });
    }
  }
);

app.delete(
  '/api/reviews/:reviewId',
  auth,
  async (req, res) => {
    try {
      const {
        reviewId,
      } = req.params;

      console.log(
        `🗑️ DELETE review: ${reviewId}`
      );

      const review =
        await Review.findById(
          reviewId
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            'Review not found',
        });
      }

      // User can delete own review.
      // Admin can delete any review.
      if (
        review.userId &&
        review.userId.toString() !==
          req.user.id &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({
          success: false,
          message:
            'You can only delete your own reviews',
        });
      }

      const experienceId =
        review.experienceId;

      await review.deleteOne();

      await updateExperienceRating(
        experienceId
      );

      return res.json({
        success: true,
        message:
          'Review deleted successfully',
      });
    } catch (error) {
      console.error(
        '❌ Error deleting review:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Error deleting review',
        error: error.message,
      });
    }
  }
);

app.patch(
  '/api/reviews/:reviewId/verify',
  auth,
  admin,
  async (req, res) => {
    try {
      const {
        reviewId,
      } = req.params;

      console.log(
        `✅ Verifying review: ${reviewId}`
      );

      const review =
        await Review.findById(
          reviewId
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            'Review not found',
        });
      }

      review.isVerified =
        !review.isVerified;

      await review.save();

      return res.json({
        success: true,
        message: `Review ${
          review.isVerified
            ? 'verified'
            : 'unverified'
        } successfully`,
        review,
      });
    } catch (error) {
      console.error(
        '❌ Error verifying review:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Error verifying review',
        error: error.message,
      });
    }
  }
);

app.post(
  '/api/reviews/:reviewId/helpful',
  auth,
  async (req, res) => {
    try {
      const {
        reviewId,
      } = req.params;

      const userId =
        req.user.id;

      const review =
        await Review.findById(
          reviewId
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            'Review not found',
        });
      }

      const isHelpful =
        review.helpfulUsers &&
        review.helpfulUsers.some(
          (id) =>
            id.toString() ===
            userId.toString()
        );

      if (isHelpful) {
        review.helpfulUsers =
          review.helpfulUsers.filter(
            (id) =>
              id.toString() !==
              userId.toString()
          );

        review.helpfulCount =
          review.helpfulUsers.length;
      } else {
        if (
          !review.helpfulUsers
        ) {
          review.helpfulUsers = [];
        }

        review.helpfulUsers.push(
          userId
        );

        review.helpfulCount =
          review.helpfulUsers.length;
      }

      await review.save();

      return res.json({
        success: true,
        message: isHelpful
          ? 'Removed helpful mark'
          : 'Marked as helpful',
        helpfulCount:
          review.helpfulCount,
        isHelpful:
          !isHelpful,
      });
    } catch (error) {
      console.error(
        '❌ Error marking helpful:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Error marking helpful',
        error: error.message,
      });
    }
  }
);

app.post(
  '/api/reviews/:reviewId/report',
  auth,
  async (req, res) => {
    try {
      const {
        reviewId,
      } = req.params;

      const {
        reason,
      } = req.body;

      const review =
        await Review.findById(
          reviewId
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            'Review not found',
        });
      }

      review.reported = true;

      review.reportReason =
        reason ||
        'No reason provided';

      await review.save();

      return res.json({
        success: true,
        message:
          'Review reported successfully',
      });
    } catch (error) {
      console.error(
        '❌ Error reporting review:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Error reporting review',
        error: error.message,
      });
    }
  }
);

async function updateExperienceRating(
  experienceId
) {
  try {
    const reviews =
      await Review.find({
        experienceId,
      });

    const total =
      reviews.length;

    const average =
      total > 0
        ? reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / total
        : 0;

    await Experience.findByIdAndUpdate(
      experienceId,
      {
        rating:
          Math.round(
            average * 10
          ) / 10,

        reviewCount:
          total,
      }
    );

    console.log(
      `✅ Updated experience ${experienceId}: rating=${average.toFixed(
        1
      )}, count=${total}`
    );
  } catch (error) {
    console.error(
      '❌ Error updating experience rating:',
      error
    );
  }
}

app.get('/api/test', (req, res) => {
  return res.json({
    success: true,

    message:
      'TravelBharat API is working!',

    status: 'success',

    mongodb:
      mongoose.connection.readyState ===
      1
        ? 'connected'
        : 'disconnected',

    environment: {
      jwt_secret_set:
        !!process.env.JWT_SECRET,

      mongodb_uri_set:
        !!process.env.MONGODB_URI,
    },
  });
});

app.get('/api/health', (req, res) => {
  return res.json({
    success: true,

    status: 'healthy',

    mongodb:
      mongoose.connection.readyState ===
      1
        ? 'connected'
        : 'disconnected',

    database:
      mongoose.connection.name ||
      'unknown',

    timestamp:
      new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  return res.json({
    success: true,

    message:
      '🌏 Welcome to TravelBharat API',

    version: '1.0.0',

    status: '🟢 Online',

    endpoints: {
      auth: {
        register:
          'POST /api/auth/register',

        login:
          'POST /api/auth/login',
      },

      states: {
        get:
          'GET /api/states',

        create:
          'POST /api/states',

        update:
          'PUT /api/states/:id',

        delete:
          'DELETE /api/states/:id',
      },

      experiences: {
        get:
          'GET /api/experiences',

        getSingle:
          'GET /api/experiences/:id',

        create:
          'POST /api/experiences',

        update:
          'PUT /api/experiences/:id',

        delete:
          'DELETE /api/experiences/:id',
      },

      contact: {
        create:
          'POST /api/contact',

        get:
          'GET /api/contact',

        latest:
          'GET /api/contact/latest',

        stats:
          'GET /api/contact/stats',

        getSingle:
          'GET /api/contact/:id',

        update:
          'PUT /api/contact/:id',

        delete:
          'DELETE /api/contact/:id',
      },

      reviews: {
        get:
          'GET /api/experiences/:experienceId/reviews',

        create:
          'POST /api/experiences/:experienceId/reviews',

        delete:
          'DELETE /api/reviews/:reviewId',

        verify:
          'PATCH /api/reviews/:reviewId/verify',

        helpful:
          'POST /api/reviews/:reviewId/helpful',

        report:
          'POST /api/reviews/:reviewId/report',
      },

      utilities: {
        test:
          'GET /api/test',

        health:
          'GET /api/health',
      },
    },
  });
});

// IMPORTANT:
// This MUST remain at the bottom,
// after all routes.

app.use((req, res) => {
  console.log(
    `❌ 404: ${req.method} ${req.originalUrl}`
  );

  return res.status(404).json({
    success: false,

    error: 'Route not found',

    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
  });
});

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      '❌ Global server error:',
      error
    );

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({
      success: false,

      message:
        'Internal server error',

      error:
        process.env.NODE_ENV ===
        'production'
          ? undefined
          : error.message,
    });
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  '0.0.0.0',
  () => {
    console.log(
      `\n🚀 TravelBharat server running on port ${PORT}`
    );

    console.log(
      '--------------------------------------------'
    );

    console.log(
      '✅ POST   /api/auth/register'
    );

    console.log(
      '✅ POST   /api/auth/login'
    );

    console.log(
      '✅ GET    /api/states'
    );

    console.log(
      '✅ POST   /api/states (Admin)'
    );

    console.log(
      '✅ PUT    /api/states/:id (Admin)'
    );

    console.log(
      '✅ DELETE /api/states/:id (Admin)'
    );

    console.log(
      '✅ GET    /api/experiences'
    );

    console.log(
      '✅ GET    /api/experiences/:id'
    );

    console.log(
      '✅ POST   /api/experiences (Admin)'
    );

    console.log(
      '✅ PUT    /api/experiences/:id (Admin)'
    );

    console.log(
      '✅ DELETE /api/experiences/:id (Admin)'
    );

    console.log(
      '✅ POST   /api/contact'
    );

    console.log(
      '✅ GET    /api/contact'
    );

    console.log(
      '✅ GET    /api/contact/latest'
    );

    console.log(
      '✅ GET    /api/contact/stats'
    );

    console.log(
      '✅ GET    /api/contact/:id'
    );

    console.log(
      '✅ PUT    /api/contact/:id'
    );

    console.log(
      '✅ DELETE /api/contact/:id'
    );

    console.log(
      '✅ GET    /api/experiences/:experienceId/reviews'
    );

    console.log(
      '✅ POST   /api/experiences/:experienceId/reviews'
    );

    console.log(
      '✅ DELETE /api/reviews/:reviewId'
    );

    console.log(
      '✅ PATCH  /api/reviews/:reviewId/verify'
    );

    console.log(
      '✅ POST   /api/reviews/:reviewId/helpful'
    );

    console.log(
      '✅ POST   /api/reviews/:reviewId/report'
    );

    console.log(
      '✅ GET    /api/test'
    );

    console.log(
      '✅ GET    /api/health'
    );

    console.log(
      '✅ GET    /'
    );

    console.log(
      '--------------------------------------------'
    );

    console.log(
      '✅ Ready for requests!\n'
    );
  }
);

module.exports = app;
