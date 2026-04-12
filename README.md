# 📦 Inventory Management System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A robust, full-stack RESTful API and sleek Web Dashboard for managing inventory, tracking suppliers, monitoring stock movements, and generating dynamic business reports. 
Built with a highly scalable **Node.js/Express** backend and a beautifully minimalist **React/Vite** frontend customized with **Tailwind CSS**.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Products](#products)
  - [Suppliers](#suppliers)
  - [Stock Management](#stock-management)
  - [Transactions](#transactions)
  - [Reports](#reports)
  - [Alerts](#alerts)
- [Data Models](#-data-models)
- [Authentication & Security](#-authentication--security)
- [Error Handling](#-error-handling)
- [Testing the API](#-testing-the-api)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Modern & Minimalist UI** — A clean, responsive dashboard crafted with React and Tailwind CSS for an intuitive user experience.
- **Product Management** — Full CRUD operations with SKU-based uniqueness and effortless supplier linking.
- **Supplier Management** — Create, view, edit, and delete comprehensive supplier records.
- **Dynamic Stock In/Out** — Seamless stock movement tracking using global modals and instant quantity recalculations.
- **Transaction Logging** — Automatic end-to-end historical logging of every stock movement with timestamps.
- **Proactive Low Stock Alerts** — Automated notifications when any product's quantity falls below its preset minimum threshold.
- **Business Intelligence Reports** — Real-time inventory summaries, total financial value calculations, and comprehensive transaction logs.
- **JWT Robust Authentication** — Secure user signup/login, token-based session management, and role-based access architectures.
- **Security & Validation** — Request payloads strongly validated utilizing `express-validator`.
- **Global Error Handling** — Centralized middleware intercepts and unifies API error responses seamlessly.
- **Request Logging** — HTTP request tracking via Morgan for streamlined debugging.

---

## 🛠 Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **React + Vite** | Frontend Framework | v18 / v6 |
| **Tailwind CSS** | Styling & UI | v3.4 |
| **Axios** | HTTP Client | v1.7 |
| **Node.js** | Runtime environment | v24+ |
| **Express** | Web framework | v5.2 |
| **MongoDB** | NoSQL database | v8.2 |
| **Mongoose** | MongoDB ODM | v9.4 |
| **JSON Web Token**| Authentication | v9.0 |
| **bcryptjs** | Password hashing | v3.0 |
| **express-validator**| Input validation | v7.3 |

---

## 🏗 Architecture

The API follows a **layered architecture** pattern with clear separation of concerns:

```
Client Request
    │
    ▼
┌──────────┐
│  Routes   │  ← Defines endpoints & maps to controllers
└──────────┘
    │
    ▼
┌──────────────┐
│  Middleware   │  ← Auth verification, validation, error handling
└──────────────┘
    │
    ▼
┌──────────────┐
│  Controllers  │  ← Handles HTTP req/res, delegates to services
└──────────────┘
    │
    ▼
┌──────────────┐
│   Services    │  ← Business logic & data operations
└──────────────┘
    │
    ▼
┌──────────────┐
│   Models      │  ← Mongoose schemas & database interaction
└──────────────┘
    │
    ▼
  MongoDB
```

---

## 📁 Project Structure

```
ECFS_Hackathon/
├── client/                      # frontend React + Vite UI
│   ├── src/                     
│   │   ├── api/                 # Axios configuration
│   │   ├── components/          # Reusable JSX components
│   │   └── pages/               # React Route views (Login, Dashboard, Inventory)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/                     # backend Node.js + Express API
    ├── server.js                # Entry point
    ├── .env                     # Environment variables
    ├── package.json             
    └── src/
        ├── app.js               # Express configurations
    │
    ├── config/
    │   └── db.js                # MongoDB connection logic
    │
    ├── models/
    │   ├── User.js              # User schema (auth, roles, password hashing)
    │   ├── Product.js           # Product schema (name, SKU, price, quantity)
    │   ├── Supplier.js          # Supplier schema (name, email, phone, address)
    │   └── Transaction.js       # Transaction schema (stock in/out logs)
    │
    ├── controllers/
    │   ├── authController.js    # Register & login handlers
    │   ├── productController.js # Product CRUD handlers
    │   ├── supplierController.js# Supplier CRUD handlers
    │   ├── stockController.js   # Stock in/out handlers
    │   ├── transactionController.js # Transaction & alert handlers
    │   ├── reportController.js  # Report generation handlers
    │   └── alertController.js   # Low stock alert handler
    │
    ├── services/
    │   ├── authService.js       # Auth business logic (JWT signing, user creation)
    │   ├── productService.js    # Product CRUD operations
    │   ├── supplierService.js   # Supplier CRUD operations
    │   ├── alertService.js      # Low stock detection logic
    │   └── reportService.js     # Report aggregation logic
    │
    ├── routes/
    │   ├── authRoutes.js        # POST /register, /login
    │   ├── productRoutes.js     # CRUD /api/products
    │   ├── supplierRoutes.js    # CRUD /api/suppliers
    │   ├── stockRoutes.js       # POST /api/stock/in, /out
    │   ├── transactionRoutes.js # GET transactions, alerts
    │   ├── reportRoutes.js      # GET reports
    │   └── alertRoutes.js       # GET low-stock alerts (protected)
    │
    ├── middlewares/
    │   ├── authMiddleware.js    # JWT token verification
    │   ├── errorMiddleware.js   # Global error handler
    │   └── validateMiddleware.js# Request body validation wrapper
    │
    └── utils/
        ├── validators.js        # Express-validator rules for products
        ├── constants.js         # Status codes & message constants
        └── helpers.js           # Response helpers & async handler
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **MongoDB** v6 or higher — [Download](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** (optional, for visual DB management) — [Download](https://www.mongodb.com/products/compass)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ECFS_Hackathon.git

# Navigate to the project directory
cd ECFS_Hackathon

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_secret_key_here
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/inventory` |
| `JWT_SECRET` | Secret key for JWT signing | Any random strong string |

### Running the Servers

Because this is a dual-repo structure, you must launch the backend API and the frontend dashboard strictly in parallel.

**1. Run the Backend:**
```bash
cd backend
npm run dev
```

**2. Run the Frontend:**
```bash
cd client
npm run dev
```

Verify by opening: [http://localhost:5173](http://localhost:5173) in your browser!

---

## 📡 API Endpoints

Base URL: `http://localhost:5000`

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT token | ❌ |

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "661f...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Products

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/products` | Create a product | ❌ |
| `GET` | `/api/products` | Get all products | ❌ |
| `GET` | `/api/products/:id` | Get product by ID | ❌ |
| `PUT` | `/api/products/:id` | Update a product | ❌ |
| `DELETE` | `/api/products/:id` | Delete a product | ❌ |

#### Create Product

```http
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "sku": "WM-001",
  "price": 599,
  "quantity": 50,
  "minStock": 10,
  "supplierId": "661f..."
}
```

**Validation Rules:**
- `name` — Required, non-empty
- `sku` — Required, unique
- `price` — Required, must be ≥ 0
- `minStock` — Required, must be ≥ 0
- `supplierId` — Required, must be a valid Supplier ObjectId

#### Update Product

```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Wireless Mouse Pro",
  "price": 699,
  "minStock": 15
}
```

**Response (200):** Returns the updated product.

---

### Suppliers

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/suppliers` | Create a supplier | ❌ |
| `GET` | `/api/suppliers` | Get all suppliers | ❌ |
| `GET` | `/api/suppliers/:id` | Get supplier by ID | ❌ |
| `PUT` | `/api/suppliers/:id` | Update a supplier | ❌ |
| `DELETE` | `/api/suppliers/:id` | Delete a supplier | ❌ |

#### Create Supplier

```http
POST /api/suppliers
Content-Type: application/json

{
  "name": "ABC Electronics",
  "email": "abc@supplier.com",
  "phone": "9876543210",
  "address": "Chennai, India"
}
```

#### Update Supplier

```http
PUT /api/suppliers/:id
Content-Type: application/json

{
  "phone": "9998887776",
  "address": "Bangalore, India"
}
```

**Response (200):** Returns the updated supplier.

---

### Stock Management

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/stock/in` | Add stock (increase quantity) | ❌ |
| `POST` | `/api/stock/out` | Remove stock (decrease quantity) | ❌ |

#### Stock In

```http
POST /api/stock/in
Content-Type: application/json

{
  "productID": "661f...",
  "quantity": 20
}
```

**Response (200):** Returns updated product with new quantity.

#### Stock Out

```http
POST /api/stock/out
Content-Type: application/json

{
  "productID": "661f...",
  "quantity": 5
}
```

**Response (200):** Returns updated product. Includes `warning: "Stocks are low"` if quantity drops below `minStock`.

**Error Cases:**
- `400` — Insufficient stock (trying to remove more than available)
- `400` — Product not found

---

### Transactions

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/transactions/:productId` | Get transactions for a product | ❌ |
| `POST` | `/api/transactions` | Create a transaction manually | ❌ |
| `GET` | `/api/transactions/alerts/low-stock` | Get low stock alerts | ❌ |

> **Note:** Transactions are also created automatically when using the Stock In/Out endpoints.

---

### Reports

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/reports/summary` | Total products & total quantity | ❌ |
| `GET` | `/api/reports/low-stock` | Products below minimum stock | ❌ |
| `GET` | `/api/reports/total-value` | Total inventory value (price × qty) | ❌ |
| `GET` | `/api/reports/transactions` | Full transaction history | ❌ |

#### Inventory Summary Response (`/api/reports/summary`)

```json
{
  "totalProducts": 15,
  "totalQuantity": 1250,
  "totalValue": 125000,
  "lowStockCount": 3
}
```

#### Total Inventory Value Response

```json
{
  "totalValue": 125000
}
```

---

### Alerts

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/alerts/low-stock` | Get low stock product alerts | ✅ JWT Token |

**Headers Required:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 📊 Data Models

### User

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | ✅ | User's full name |
| `email` | String | ✅ | Unique, lowercase |
| `password` | String | ✅ | Min 6 chars, auto-hashed via bcrypt |
| `role` | String | ❌ | `admin`, `manager`, or `staff` (default: `staff`) |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

### Product

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | ✅ | Product name |
| `sku` | String | ✅ | Unique stock keeping unit |
| `price` | Number | ✅ | Must be ≥ 0 |
| `quantity` | Number | ❌ | Current stock (default: 0) |
| `minStock` | Number | ✅ | Low stock threshold |
| `supplierId` | ObjectId | ✅ | Reference to Supplier |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

### Supplier

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | ✅ | Supplier company name |
| `email` | String | ✅ | Unique email address |
| `phone` | String | ✅ | Contact number |
| `address` | String | ✅ | Physical address |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

### Transaction

| Field | Type | Required | Description |
|---|---|---|---|
| `productID` | ObjectId | ✅ | Reference to Product |
| `type` | String | ✅ | `"IN"` or `"OUT"` |
| `quantity` | Number | ✅ | Quantity moved |
| `date` | Date | Auto | Defaults to `Date.now` |

---

## 🔐 Authentication & Security

### JWT Flow

```
1. POST /api/auth/register  →  Creates user (password auto-hashed)
2. POST /api/auth/login     →  Returns JWT token (valid for 1 day)
3. GET  /api/alerts/low-stock  →  Send token in Authorization header
```

### How to use the token

Add to request headers:
```
Authorization: Bearer <your_jwt_token>
```

### Password Security

- Passwords are hashed using **bcrypt** with a salt factor of 10
- Hashing happens automatically via Mongoose `pre("save")` hook
- Plain-text passwords are never stored in the database

### Role-Based Access

The User model supports three roles:
- `admin` — Full system access
- `manager` — Management operations
- `staff` — Basic operations (default)

> Currently role-based restrictions are not enforced on specific routes. The infrastructure is in place for future implementation.

---

## ❌ Error Handling

All errors follow a consistent JSON format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

### HTTP Status Codes Used

| Code | Meaning | When |
|---|---|---|
| `200` | OK | Successful read/update |
| `201` | Created | Successful create |
| `204` | No Content | Successful delete |
| `400` | Bad Request | Validation error, invalid input |
| `401` | Unauthorized | Missing or invalid JWT token |
| `404` | Not Found | Resource doesn't exist |
| `500` | Server Error | Unexpected server failure |

### Global Error Middleware

Unhandled errors are caught by the global error middleware in `errorMiddleware.js`, ensuring the server never crashes from unhandled exceptions.

---

## 🧪 Testing the API

### Using Postman

1. Import the endpoints listed above into Postman
2. Test in this order:
   - **Register** → `POST /api/auth/register`
   - **Login** → `POST /api/auth/login` (copy the token)
   - **Create Supplier** → `POST /api/suppliers`
   - **Create Product** → `POST /api/products` (use supplier `_id`)
   - **Update Product** → `PUT /api/products/:id` (use product `_id` and new details)
   - **Update Supplier** → `PUT /api/suppliers/:id` (use supplier `_id` and new details)
   - **Stock In** → `POST /api/stock/in` (use product `_id`)
   - **Stock Out** → `POST /api/stock/out`
   - **Reports** → `GET /api/reports/summary`
   - **Alerts** → `GET /api/alerts/low-stock` (use Bearer token)

### Using curl

```bash
# Health check
curl http://localhost:5000

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'

# Get all products
curl http://localhost:5000/api/products

# Get reports
curl http://localhost:5000/api/reports/summary
```

### Using MongoDB Compass

Connect to `mongodb://localhost:27017` in Compass to visually inspect:
- `inventory.users` — Registered users
- `inventory.products` — Product catalog
- `inventory.suppliers` — Supplier directory
- `inventory.transactions` — Stock movement history

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">
  Built with ❤️ for the ECFS Hackathon 2026
</p>
