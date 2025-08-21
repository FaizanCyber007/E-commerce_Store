# Deployment Guide

This guide covers deploying the MERN Ecommerce Pro Advanced application to various platforms.

## Prerequisites

Before deployment, ensure you have:

- MongoDB Atlas account and cluster set up
- Environment variables configured
- Both frontend and backend tested locally
- Production builds tested

## Environment Variables

### Backend (.env)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Deployment Options

### 1. Heroku Deployment

#### Backend Deployment

1. Create a new Heroku app:

```bash
heroku create your-app-name-backend
```

2. Set environment variables:

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
```

3. Deploy:

```bash
git subtree push --prefix backend heroku main
```

#### Frontend Deployment (using Netlify)

1. Build the frontend:

```bash
cd frontend
npm run build
```

2. Deploy to Netlify:

- Drag and drop the `dist` folder to Netlify
- Or connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`

### 2. Railway Deployment

#### Backend

1. Connect your GitHub repository to Railway
2. Select the backend folder
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

#### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables

### 3. DigitalOcean App Platform

#### Full Stack Deployment

1. Create a new App on DigitalOcean
2. Connect your GitHub repository
3. Configure components:

**Backend Component:**

- Type: Web Service
- Source Directory: `/backend`
- Build Command: `npm install`
- Run Command: `npm start`
- Environment Variables: Set all required variables

**Frontend Component:**

- Type: Static Site
- Source Directory: `/frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### 4. AWS EC2 Manual Deployment

#### Prerequisites

- EC2 instance with Ubuntu
- Node.js and npm installed
- Nginx for reverse proxy
- PM2 for process management

#### Steps

1. Connect to your EC2 instance:

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

2. Clone your repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

3. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
npm run build
```

4. Install PM2:

```bash
sudo npm install -g pm2
```

5. Start backend with PM2:

```bash
cd backend
pm2 start server.js --name "ecommerce-backend"
pm2 startup
pm2 save
```

6. Configure Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/your-repo/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Enable and restart Nginx:

```bash
sudo systemctl enable nginx
sudo systemctl restart nginx
```

## Post-Deployment Checklist

### 1. Database Setup

- Ensure MongoDB Atlas cluster is accessible
- Verify database connection
- Run seed script if needed:

```bash
cd backend
node seed/seed.js
```

### 2. SSL Certificate (Recommended)

- Use Let's Encrypt for free SSL
- Configure Cloudflare for additional security

### 3. Monitoring and Logging

- Set up application monitoring (e.g., Sentry)
- Configure log aggregation
- Set up uptime monitoring

### 4. Performance Optimization

- Enable gzip compression
- Configure CDN for static assets
- Optimize images
- Enable caching headers

### 5. Security Checklist

- Verify all environment variables are set
- Check CORS configuration
- Enable rate limiting
- Review security headers
- Test authentication flows

## Common Issues and Solutions

### CORS Issues

- Verify CORS_ORIGIN environment variable
- Check frontend and backend URLs match
- Ensure credentials are included in requests

### MongoDB Connection Issues

- Verify MongoDB URI format
- Check IP whitelist in MongoDB Atlas
- Verify database user permissions

### Build Failures

- Check Node.js version compatibility
- Verify all dependencies are installed
- Check environment variables during build

### Performance Issues

- Enable compression in Express
- Optimize database queries
- Use CDN for static assets
- Implement proper caching strategies

## Maintenance

### Regular Updates

- Update dependencies regularly
- Monitor for security vulnerabilities
- Backup database regularly
- Monitor application performance

### Scaling Considerations

- Use load balancers for high traffic
- Consider database sharding
- Implement caching (Redis)
- Use microservices architecture for large scale
