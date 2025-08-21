# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected routes require an Authorization header:

```
Authorization: Bearer <jwt-token>
```

## Endpoints

### Authentication Routes

#### Register User

- **POST** `/auth/register`
- **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response:**

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token"
}
```

#### Login User

- **POST** `/auth/login`
- **Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile

- **GET** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

#### Update User Profile

- **PUT** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

### Product Routes

#### Get All Products

- **GET** `/products`
- **Query Parameters:**
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 12)
  - `search` (string): Search term
  - `category` (string): Filter by category
  - `minPrice` (number): Minimum price
  - `maxPrice` (number): Maximum price
  - `sort` (string): Sort by (price, name, createdAt)

#### Get Single Product

- **GET** `/products/:id`

#### Create Product (Admin Only)

- **POST** `/products`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**

```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "electronics",
  "stock": 50,
  "images": ["image1.jpg", "image2.jpg"]
}
```

#### Update Product (Admin Only)

- **PUT** `/products/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Delete Product (Admin Only)

- **DELETE** `/products/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

### Order Routes

#### Get User Orders

- **GET** `/orders`
- **Headers:** `Authorization: Bearer <token>`

#### Create New Order

- **POST** `/orders`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "orderItems": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "US"
  },
  "paymentMethod": "stripe",
  "totalPrice": 199.98
}
```

#### Get Single Order

- **GET** `/orders/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Update Order Status (Admin Only)

- **PUT** `/orders/:id/status`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**

```json
{
  "status": "delivered"
}
```

### Cart Routes

#### Get User Cart

- **GET** `/cart`
- **Headers:** `Authorization: Bearer <token>`

#### Add Item to Cart

- **POST** `/cart`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "product": "product_id",
  "quantity": 1
}
```

#### Update Cart Item

- **PUT** `/cart/:productId`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "quantity": 3
}
```

#### Remove Item from Cart

- **DELETE** `/cart/:productId`
- **Headers:** `Authorization: Bearer <token>`

### Wishlist Routes

#### Get User Wishlist

- **GET** `/wishlist`
- **Headers:** `Authorization: Bearer <token>`

#### Add Item to Wishlist

- **POST** `/wishlist`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "product": "product_id"
}
```

#### Remove Item from Wishlist

- **DELETE** `/wishlist/:productId`
- **Headers:** `Authorization: Bearer <token>`

### Review Routes

#### Get Product Reviews

- **GET** `/reviews/product/:productId`

#### Create Review

- **POST** `/reviews`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "product": "product_id",
  "rating": 5,
  "comment": "Great product!"
}
```

### Admin Routes

#### Get All Users (Admin Only)

- **GET** `/admin/users`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Get All Orders (Admin Only)

- **GET** `/admin/orders`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Get Dashboard Statistics (Admin Only)

- **GET** `/admin/stats`
- **Headers:** `Authorization: Bearer <admin-token>`

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information" // Only in development
}
```

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error
