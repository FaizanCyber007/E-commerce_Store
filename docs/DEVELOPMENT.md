# Development Guide

This guide covers setting up the development environment, understanding the codebase structure, and contributing to the project.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account
- Git
- VS Code (recommended)

### Development Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd mern-ecommerce-pro-adv
```

2. **Install root dependencies:**

```bash
npm install
```

3. **Install all dependencies:**

```bash
npm run install-all
```

4. **Set up environment variables:**

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your values
```

5. **Start development servers:**

```bash
npm run dev
```

This will start both frontend (port 5174) and backend (port 5000) servers concurrently.

## Project Architecture

### Backend Architecture (MVC Pattern)

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js       # Database connection
│   │   └── index.js    # App configuration
│   ├── controllers/     # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── ...
│   ├── middleware/      # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/         # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/         # API route definitions
│   │   ├── authRoutes.js
│   │   └── ...
│   └── utils/          # Utility functions
│       └── generateToken.js
├── seed/               # Database seeding
└── server.js          # Entry point
```

### Frontend Architecture (Component-Based)

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   └── admin/     # Admin pages
│   ├── store/         # Redux store
│   │   ├── index.js
│   │   ├── userSlice.js
│   │   └── ...
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
└── vite.config.js     # Vite configuration
```

## Key Technologies

### Frontend

- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and dev server
- **Redux Toolkit**: State management with RTK Query
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router Dom**: Client-side routing
- **React Hook Form**: Form handling
- **React Hot Toast**: Toast notifications

### Backend

- **Express 5**: Web framework
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload
- **Helmet**: Security middleware
- **CORS**: Cross-origin requests
- **Rate Limiting**: API protection

## Development Workflow

### 1. Feature Development

1. **Create a feature branch:**

```bash
git checkout -b feature/feature-name
```

2. **Make your changes:**

- Follow the existing code structure
- Add proper error handling
- Include appropriate validation
- Write meaningful commit messages

3. **Test your changes:**

```bash
# Run both servers
npm run dev

# Test the application thoroughly
```

4. **Commit and push:**

```bash
git add .
git commit -m "Add feature: description"
git push origin feature/feature-name
```

### 2. Code Standards

#### JavaScript/JSX

- Use ES6+ features
- Use async/await over Promises
- Use destructuring where appropriate
- Keep functions small and focused
- Use meaningful variable names

#### React Components

- Use functional components with hooks
- Keep components small and focused
- Use prop-types for type checking (if needed)
- Follow naming conventions (PascalCase for components)

#### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first approach
- Use consistent spacing scale
- Maintain the ColorHunt palette

### 3. API Development

#### Creating New Endpoints

1. **Define the route:**

```javascript
// routes/exampleRoutes.js
const express = require("express");
const {
  getExample,
  createExample,
} = require("../controllers/exampleController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getExample);
router.post("/", authenticate, createExample);

module.exports = router;
```

2. **Create the controller:**

```javascript
// controllers/exampleController.js
const asyncHandler = require("express-async-handler");

const getExample = asyncHandler(async (req, res) => {
  // Controller logic
  res.json({ success: true, data: [] });
});

module.exports = { getExample };
```

3. **Register the route:**

```javascript
// server.js
app.use("/api/example", require("./src/routes/exampleRoutes"));
```

### 4. Frontend State Management

#### Using Redux Toolkit

1. **Create a slice:**

```javascript
// store/exampleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchExamples = createAsyncThunk(
  "example/fetchExamples",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/example");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamples.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExamples.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExamples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default exampleSlice.reducer;
```

2. **Use in components:**

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamples } from '../store/exampleSlice';

function ExampleComponent() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.example);

  useEffect(() => {
    dispatch(fetchExamples());
  }, [dispatch]);

  return (
    // Component JSX
  );
}
```

## Database Schema Design

### User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  stock: Number (default: 0),
  images: [String],
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema

```javascript
{
  user: ObjectId (ref: 'User'),
  orderItems: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  totalPrice: Number,
  orderStatus: String (enum: ['pending', 'processing', 'shipped', 'delivered']),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

### Backend Testing

- Use Jest for unit testing
- Test API endpoints with Supertest
- Mock external dependencies

### Frontend Testing

- Use React Testing Library
- Test component rendering and interactions
- Mock API calls

## Debugging

### Backend Debugging

- Use Morgan for request logging
- Use console.log or debugger statements
- Check network tab in browser dev tools
- Use Postman for API testing

### Frontend Debugging

- Use React DevTools extension
- Use Redux DevTools extension
- Check browser console for errors
- Use network tab for API debugging

## Performance Optimization

### Backend

- Use database indexes
- Implement pagination
- Use compression middleware
- Cache frequently accessed data

### Frontend

- Use React.memo for component optimization
- Implement lazy loading
- Optimize images
- Use proper loading states

## Security Best Practices

### Backend

- Validate all inputs
- Use parameterized queries
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated

### Frontend

- Sanitize user inputs
- Use HTTPS
- Implement proper error handling
- Don't expose sensitive data

## Troubleshooting Common Issues

### CORS Errors

- Check CORS_ORIGIN environment variable
- Ensure frontend URL matches CORS origin
- Verify credentials configuration

### Database Connection Issues

- Check MongoDB URI
- Verify network access in MongoDB Atlas
- Check user permissions

### Build Issues

- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify environment variables

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Follow code standards
4. Test your changes
5. Write meaningful commit messages
6. Submit a pull request
7. Respond to code review feedback

## Resources

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
