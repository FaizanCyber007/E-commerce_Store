# MERN Ecommerce Pro Advanced

A modern, full-stack ecommerce application built with the latest MERN stack technologies, featuring a beautiful UI/UX design, comprehensive authentication, and cloud-based architecture.

## 🚀 Features

### Frontend Features
- **Modern React 19** with Vite for blazing-fast development
- **Redux Toolkit** for efficient state management
- **Responsive Design** with TailwindCSS
- **Beautiful Animations** with Framer Motion
- **Professional Icons** with FontAwesome 6.6.0
- **Form Handling** with React Hook Form
- **Toast Notifications** with React Hot Toast
- **SEO Optimized** with React Helmet Async
- **ColorHunt Palette** (#B1F0F7, #81BFDA, #F5F0CD, #FADA7A)
- **Google Fonts** (Inter, Poppins, Roboto)

### Backend Features
- **Express 5** with modern async/await patterns
- **MongoDB Atlas** cloud database integration
- **JWT Authentication** with bcrypt encryption
- **Role-based Authorization** (Admin/User)
- **Comprehensive Security** middleware
- **Rate Limiting** for API protection
- **CORS** configured for secure cross-origin requests
- **File Upload** capabilities
- **Order Management** system
- **Review & Rating** system
- **Wishlist** functionality

### Security & Performance
- **Helmet** for security headers
- **Morgan** for request logging
- **Express Rate Limit** for DDoS protection
- **Bcrypt** for password hashing
- **JWT** for secure authentication
- **Input Validation** and sanitization
- **Error Handling** middleware
- **Production-ready** configuration

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - Latest React version
- **Vite 6.0.3** - Next-generation frontend tooling
- **Redux Toolkit 2.8.2** - State management
- **React Router Dom** - Client-side routing
- **TailwindCSS 3.4.14** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animation library
- **FontAwesome 6.6.0** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.0.1** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 8.8.4** - ODM for MongoDB
- **jsonwebtoken** - JWT implementation
- **bcryptjs** - Password hashing
- **multer** - File upload middleware
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands

## 📦 Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd mern-ecommerce-pro-adv

# Install all dependencies (consolidated at root level)
npm install --legacy-peer-deps

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit both .env files with your values

# Start both servers
npm run dev
```

## 🚀 Running the Application

### Development Mode

**Option 1: Run both servers concurrently (Recommended)**
```bash
npm run dev
```

**Option 2: Run servers separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

### Production Mode
```bash
# Build frontend
npm run build

# Start backend
npm start
```

## 📁 Project Structure

```
mern-ecommerce-pro-adv/
├── node_modules/           # All dependencies (consolidated)
├── backend/
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── seed/               # Database seeding
│   ├── .env.example       # Environment variables template
│   ├── package.json       # Backend-specific scripts
│   └── server.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── styles/        # CSS styles
│   │   └── utils/         # Utility functions
│   ├── package.json       # Frontend-specific scripts
│   └── vite.config.js     # Vite configuration
├── docs/                  # Documentation
│   ├── API.md            # API documentation
│   ├── DEPLOYMENT.md     # Deployment guide
│   └── DEVELOPMENT.md    # Development guide
├── .gitignore             # Git ignore rules
├── LICENSE               # MIT license
├── package.json          # Root package with all dependencies
└── README.md             # Project documentation
```

## 🎯 Key Benefits of Consolidated Dependencies

- ✅ **Single Install**: Run `npm install` once from root directory
- ✅ **No Folder Navigation**: All scripts work from root level
- ✅ **Dependency Management**: All packages in one place
- ✅ **Version Consistency**: No conflicts between frontend/backend
- ✅ **Faster Development**: Quick setup and start
- ✅ **Production Ready**: Optimized for deployment

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/stats` - Get dashboard statistics

## 👤 Default Admin Account

For testing purposes, use these credentials:
- **Email**: admin@example.com
- **Password**: admin123

## 🎨 Design System

### Color Palette (ColorHunt)
- **Primary**: #B1F0F7 (Light Blue)
- **Secondary**: #81BFDA (Blue)
- **Accent**: #F5F0CD (Light Yellow)
- **Warning**: #FADA7A (Yellow)

### Typography
- **Primary**: Inter (Modern, clean)
- **Secondary**: Poppins (Friendly, rounded)
- **Monospace**: Roboto (Code, technical)

### Icons
- FontAwesome 6.6.0 for consistent iconography

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting for API endpoints
- CORS protection
- Helmet for security headers
- Input validation and sanitization
- Role-based access control
- Secure cookie handling

## 📚 Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Deployment Guide](docs/DEPLOYMENT.md) - How to deploy to production
- [Development Guide](docs/DEVELOPMENT.md) - Setup and contribution guide

## 🌐 Deployment

### Environment Variables
Make sure to set these in production:
- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB Atlas connection string)
- `JWT_SECRET` (Strong, unique secret)
- `CORS_ORIGIN` (Your production domain)

### Recommended Hosting
- **Backend**: Heroku, Railway, DigitalOcean
- **Frontend**: Vercel, Netlify, DigitalOcean
- **Database**: MongoDB Atlas (already configured)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Acknowledgments

- ColorHunt for the beautiful color palette
- Google Fonts for typography
- FontAwesome for icons
- MongoDB Atlas for cloud database
- All the amazing open-source libraries used

---

**Happy Coding! 🚀**
