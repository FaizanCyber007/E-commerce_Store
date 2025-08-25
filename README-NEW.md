# EliteShop - Modern E-commerce Platform

A professional, full-stack e-commerce application built with the MERN stack, featuring a modern design, comprehensive admin panel, and seamless user experience.

## 🚀 Features

### Customer Features

- **Modern UI/UX**: Professional design with smooth animations and responsive layout
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add, update, and remove items with real-time updates
- **User Authentication**: Secure login/register with JWT tokens
- **User Profile**: Manage personal information and order history
- **Wishlist**: Save favorite products for later
- **Order Management**: Track order status and history
- **Blog Section**: Read company news and product updates
- **Contact Form**: Get in touch with customer support

### Admin Features

- **Professional Dashboard**: Modern admin interface with analytics
- **Product Management**: Add, edit, delete, and manage inventory
- **Order Management**: Process orders and update delivery status
- **User Management**: View and manage customer accounts
- **Blog Management**: Create and publish blog posts
- **Analytics**: View sales statistics and performance metrics

## 🛠️ Technology Stack

### Frontend

- **React 18**: Latest React with modern hooks and features
- **Redux Toolkit**: State management with RTK Query
- **React Router 6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **FontAwesome**: Professional icons
- **Vite**: Fast development and build tool

### Backend

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token authentication
- **bcrypt**: Password hashing
- **Multer**: File upload handling
- **Helmet**: Security middleware
- **CORS**: Cross-Origin Resource Sharing

## 📁 Project Structure

```
mern-ecommerce-pro-adv/
├── backend/                 # Backend application
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── seed/               # Database seeding
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin panel pages
│   │   ├── store/          # Redux store and slices
│   │   ├── styles/         # CSS styles
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── .gitignore              # Git ignore rules
├── LICENSE                 # Project license
├── package.json            # Root package.json for scripts
└── README.md               # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mern-ecommerce-pro-adv
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   cd ..
   ```

5. **Environment Setup**

   ```bash
   cd backend
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d

   # Server
   NODE_ENV=development
   PORT=5000

   # Email (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### Running the Application

#### Development Mode (Recommended)

```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Production Mode

```bash
# Build frontend
npm run build

# Start backend server
npm start
```

#### Individual Services

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

## 📊 Database Setup

### Seed Database

```bash
npm run seed
```

This will populate your database with sample:

- Products
- Categories
- Admin user
- Sample orders
- Blog posts

### Admin Access

Default admin credentials (after seeding):

- **Email**: admin@example.com
- **Password**: admin123

## 🎯 Available Scripts

| Script            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start both frontend and backend in development mode |
| `npm run server`  | Start backend server only                           |
| `npm run client`  | Start frontend development server only              |
| `npm start`       | Start backend in production mode                    |
| `npm run build`   | Build frontend for production                       |
| `npm run seed`    | Seed database with sample data                      |
| `npm run lint`    | Run ESLint on frontend code                         |
| `npm run preview` | Preview production build locally                    |

## 🔧 Configuration

### Frontend Configuration (frontend/vite.config.js)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```

### Backend Configuration (backend/src/config/index.js)

The backend uses environment variables for configuration. See `.env.example` for all available options.

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `frontend/dist` folder
3. Configure environment variables in your hosting platform

### Backend Deployment (Railway/Render/Heroku)

1. Deploy the `backend` folder
2. Set environment variables
3. Ensure MongoDB Atlas is accessible

### Full-Stack Deployment

For platforms like Railway or Render that support monorepos:

1. Configure build commands in the platform
2. Set up environment variables
3. Configure the root domain and subdomains

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support, email support@eliteshop.com or create an issue in this repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the excellent database
- Tailwind CSS team for the utility-first CSS framework
- All open-source contributors who made this project possible
