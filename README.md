# 📦 Inventory Management System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A production-ready, full-stack inventory management system with a powerful RESTful API backend and a modern, responsive web dashboard. Manage products, suppliers, stock movements, and generate comprehensive business reports with real-time analytics.

Built with **React/Vite** frontend, **Node.js/Express** backend, and **MongoDB Atlas** cloud database.

---

## 🎯 Live Demo

- **Frontend:** [https://inventory-dashboard.vercel.app](https://inventory-dashboard.vercel.app)
- **Backend API:** [https://inventory-api-production.up.railway.app](https://inventory-api-production.up.railway.app)

**Test Credentials:**
```
Email: admin@test.com
Password: password123
Role: Admin
```

---

## ✨ Features

### Core Functionality
- **Product Management** — Full CRUD operations with SKU-based uniqueness and supplier linking
- **Supplier Management** — Create, view, edit, and delete comprehensive supplier records
- **Dynamic Stock Management** — Seamless stock in/out tracking with instant quantity recalculations
- **Transaction Logging** — Automatic historical logging of every stock movement with timestamps
- **Proactive Low Stock Alerts** — Automated notifications when products fall below minimum threshold

### Advanced Features
- **Business Intelligence Reports** — Real-time inventory summaries, financial value calculations, and transaction logs
- **Trend Analysis Dashboard** — Multiple chart types (Line, Bar, Area), date range filtering, and CSV export
- **Role-Based Access Control (RBAC)** — Three-tier role system (Admin, Manager, Staff) with granular permissions
- **Session Timeout Management** — 15-minute idle timeout with 2-minute warning modal and "Stay Logged In" option
- **Auto-Dismissing Messages** — Status messages automatically disappear after 3 seconds with smooth animations

### Security & Performance
- **JWT Authentication** — Secure token-based session management with 1-day expiration
- **Password Hashing** — bcryptjs with salt factor of 10 for maximum security
- **Request Validation** — express-validator for comprehensive input validation
- **Global Error Handling** — Centralized middleware for consistent error responses
- **CORS Protection** — Configured for secure cross-origin requests
- **MongoDB Atlas** — Cloud-based database with automatic backups and high availability

### UI/UX Excellence
- **Modern & Minimalist Design** — Clean, responsive dashboard with intuitive navigation
- **Smooth Animations** — Framer Motion for professional transitions and interactions
- **Responsive Layout** — Mobile-first design that works on all devices
- **Dark Mode Ready** — CSS variables for easy theme customization
- **Accessibility** — Semantic HTML and ARIA labels for screen readers

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React + Vite | 18 / 6 | UI framework & build tool |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS framework |
| **HTTP Client** | Axios | 1.7 | API communication |
| **Animations** | Framer Motion | 10.16 | Smooth transitions |
| **Charts** | Recharts | 2.10 | Data visualization |
| **Icons** | Lucide React | 0.263 | Icon library |
| **Backend** | Node.js + Express | 24+ / 5.2 | Server runtime & framework |
| **Database** | MongoDB + Mongoose | 8.2 / 9.4 | NoSQL database & ODM |
| **Authentication** | JWT + bcryptjs | 9.0 / 3.0 | Token auth & password hashing |
| **Validation** | express-validator | 7.0 | Request validation |
| **Logging** | Morgan | 1.10 | HTTP request logging |
| **Environment** | dotenv | 16.0 | Environment variable management |

---

## 🏗 Architecture

The system follows a **layered architecture** pattern with clear separation of concerns:

```
Client Request
    │
    ▼
┌──────────────────────────────────────────┐
│  Frontend (React/Vite)                   │
│  - Pages, Components, API Client         │
└──────────────────────────────────────────┘
    │
    ▼ (HTTP/REST)
┌──────────────────────────────────────────┐
│  Backend (Express.js)                    │
│  ├─ Routes (API endpoints)               │
│  ├─ Middleware (Auth, Validation, CORS)  │
│  ├─ Controllers (Request handlers)       │
│  ├─ Services (Business logic)            │
│  └─ Models (Mongoose schemas)            │
└──────────────────────────────────────────┘
    │
    ▼ (MongoDB Protocol)
┌──────────────────────────────────────────┐
│  MongoDB Atlas (Cloud Database)          │
│  - Users, Products, Suppliers            │
│  - Transactions, Inventory Data          │
└──────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
inventory-management-api/
│
├── client/                          # React + Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js             # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── SessionTimeoutModal.jsx
│   │   │   ├── TrendAnalysis.jsx
│   │   │   ├── StockModal.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   └── TransactionModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Authentication
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── Dashboard.jsx        # Main dashboard with metrics
│   │   │   ├── Inventory.jsx        # Product management
│   │   │   ├── Suppliers.jsx        # Supplier management
│   │   │   ├── Transactions.jsx     # Transaction history
│   │   │   ├── Alerts.jsx           # Low stock alerts
│   │   │   ├── ProductDetail.jsx    # Product detail page
│   │   │   ├── SupplierDetail.jsx   # Supplier detail page
│   │   │   └── Users.jsx            # User management (Admin only)
│   │   ├── App.jsx                  # Main app with routing & session timeout
│   │   ├── App.css                  # Global styles & animations
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.production              # Production environment variables
│
└── backend/                         # Node.js + Express API
    ├── server.js                    # Entry point
    ├── .env                         # Environment variables
    ├── package.json
    │
    ├── src/
    │   ├── app.js                   # Express app configuration
    │   │
    │   ├── config/
    │   │   └── db.js                # MongoDB connection
    │   │
    │   ├── models/
    │   │   ├── User.js              # User schema with role & password hashing
    │   │   ├── Product.js           # Product schema with SKU & supplier ref
    │   │   ├── Supplier.js          # Supplier schema
    │   │   └── Transaction.js       # Transaction schema for stock movements
    │   │
    │   ├── controllers/
    │   │   ├── authController.js    # Register & login handlers
    │   │   ├── userController.js    # User management (Admin only)
    │   │   ├── productController.js # Product CRUD handlers
    │   │   ├── supplierController.js# Supplier CRUD handlers
    │   │   ├── stockController.js   # Stock in/out handlers
    │   │   ├── transactionController.js # Transaction handlers
    │   │   ├── reportController.js  # Report generation
    │   │   └── alertController.js   # Low stock alert handler
    │   │
    │   ├── services/
    │   │   ├── authService.js       # Auth business logic
    │   │   ├── productService.js    # Product operations
    │   │   ├── supplierService.js   # Supplier operations
    │   │   ├── alertService.js      # Low stock detection
    │   │   └── reportService.js     # Report aggregation
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.js        # /api/auth endpoints
    │   │   ├── userRoutes.js        # /api/users endpoints (Admin)
    │   │   ├── productRoutes.js     # /api/products endpoints
    │   │   ├── supplierRoutes.js    # /api/suppliers endpoints
    │   │   ├── stockRoutes.js       # /api/stock endpoints
    │   │   ├── transactionRoutes.js # /api/transactions endpoints
    │   │   ├── reportRoutes.js      # /api/reports endpoints
    │   │   └── alertRoutes.js       # /api/alerts endpoints
    │   │
    │   ├── middlewares/
    │   │   ├── authMiddleware.js    # JWT verification
    │   │   ├── authorizeMiddleware.js # Role-based authorization
    │   │   ├── errorMiddleware.js   # Global error handler
    │   │   └── validateMiddleware.js# Request validation wrapper
    │   │
    │   └── utils/
    │       ├── validators.js        # express-validator rules
    │       ├── constants.js         # Status codes & messages
    │       └── helpers.js           # Response helpers
    │
    └── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **MongoDB Atlas** account — [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** for version control — [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management-api.git
cd inventory-management-api
```

#### 2. Set Up Backend

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here_min_32_chars
NODE_ENV=development
```

**MongoDB Atlas Setup:**
- Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a database user with read/write permissions
- Get your connection string and replace `<username>`, `<password>`, and cluster name
- Database name: `inventory`

#### 3. Set Up Frontend

```bash
cd ../client
npm install
```

Create `.env.production` file in client directory:

```env
VITE_API_URL=http://localhost:5000
```

For production, replace with your deployed backend URL.

#### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login & get JWT token | ❌ |

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "staff"
}
```

**Role Options:** `staff` (default), `manager`, `admin`

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
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "661f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

---

### Products

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `POST` | `/products` | Create product | ❌ | Admin/Manager |
| `GET` | `/products` | Get all products | ❌ | — |
| `GET` | `/products/:id` | Get product by ID | ❌ | — |
| `PUT` | `/products/:id` | Update product | ❌ | Admin/Manager |
| `DELETE` | `/products/:id` | Delete product | ❌ | Admin |

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

**Validation:**
- `name` — Required, non-empty
- `sku` — Required, unique
- `price` — Required, must be ≥ 0
- `minStock` — Required, must be ≥ 0
- `supplierId` — Required, valid ObjectId

---

### Suppliers

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `POST` | `/suppliers` | Create supplier | ❌ | Admin/Manager |
| `GET` | `/suppliers` | Get all suppliers | ❌ | — |
| `GET` | `/suppliers/:id` | Get supplier by ID | ❌ | — |
| `PUT` | `/suppliers/:id` | Update supplier | ❌ | Admin/Manager |
| `DELETE` | `/suppliers/:id` | Delete supplier | ❌ | Admin |

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

---

### Stock Management

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `POST` | `/stock/in` | Add stock | ❌ | All Roles |
| `POST` | `/stock/out` | Remove stock | ❌ | Admin/Manager |

#### Stock In
```http
POST /api/stock/in
Content-Type: application/json

{
  "productID": "661f...",
  "quantity": 20
}
```

**Response (200):** Updated product with new quantity

#### Stock Out
```http
POST /api/stock/out
Content-Type: application/json

{
  "productID": "661f...",
  "quantity": 5
}
```

**Response (200):** Updated product. Includes warning if quantity drops below minStock.

---

### Transactions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/transactions/:productId` | Get product transactions | ❌ |
| `POST` | `/transactions` | Create transaction | ❌ |
| `GET` | `/transactions/alerts/low-stock` | Get low stock alerts | ❌ |

---

### Reports

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reports/summary` | Inventory summary | ❌ |
| `GET` | `/reports/low-stock` | Low stock products | ❌ |
| `GET` | `/reports/total-value` | Total inventory value | ❌ |
| `GET` | `/reports/transactions` | Transaction history | ❌ |

#### Inventory Summary Response
```json
{
  "totalProducts": 15,
  "totalQuantity": 1250,
  "totalValue": 125000,
  "lowStockCount": 3
}
```

---

### Alerts

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/alerts/low-stock` | Get low stock alerts | ✅ JWT | All Roles |

**Headers Required:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

### Users (Admin Only)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/users` | Get all users | ✅ JWT | Admin |
| `POST` | `/users` | Create user | ✅ JWT | Admin |
| `PUT` | `/users/:id` | Update user role | ✅ JWT | Admin |
| `DELETE` | `/users/:id` | Delete user | ✅ JWT | Admin |

---

## 📊 Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, min 6 chars, auto-hashed),
  role: String (admin, manager, staff - default: staff),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Product
```javascript
{
  name: String (required),
  sku: String (required, unique),
  price: Number (required, ≥ 0),
  quantity: Number (default: 0),
  minStock: Number (required, ≥ 0),
  supplierId: ObjectId (required, ref: Supplier),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Supplier
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  address: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Transaction
```javascript
{
  productID: ObjectId (required, ref: Product),
  type: String (IN or OUT, required),
  quantity: Number (required),
  date: Date (default: now)
}
```

---

## 🔐 Authentication & Security

### JWT Authentication Flow

```
1. User registers/logs in
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT token (valid 1 day)
   ↓
4. Frontend stores token in localStorage
   ↓
5. Frontend sends token in Authorization header for protected routes
   ↓
6. Backend verifies token and processes request
```

### How to Use Token

Add to request headers:
```
Authorization: Bearer <your_jwt_token>
```

### Password Security

- Passwords hashed using **bcryptjs** with salt factor of 10
- Hashing happens automatically via Mongoose `pre("save")` hook
- Plain-text passwords never stored in database

### Role-Based Access Control (RBAC)

**Three-Tier Role System:**

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access - create, edit, delete all resources, manage users |
| **Manager** | Management operations - create/edit products & suppliers, stock out, transactions |
| **Staff** | Basic operations - view products & suppliers, stock in only |

**Frontend Implementation:**
- Role-based button visibility (Add Product, Edit, Delete, Stock Out)
- Sidebar navigation filtering based on user role
- Role badge display in header with color coding
- Protected routes with RequireRole component
- Users management page (Admin only)

**Backend Implementation:**
- Role included in JWT token
- Authorization middleware on protected endpoints
- Granular permission checks on CRUD operations
- User management endpoints (Admin only)

---

## ⏱ Session Timeout & Warning System

- **15-minute idle timeout** — Automatic logout after 15 minutes of inactivity
- **2-minute warning modal** — User receives warning at 13-minute mark
- **Countdown timer** — Visual countdown display in warning modal
- **Stay Logged In button** — Extends session by another 15 minutes
- **Smooth animations** — Pulsing alert icon and color-coded countdown
- **Activity tracking** — Resets timeout on user interactions (clicks, keyboard input)
- **Idle logout message** — Displays message on login page when session expires

---

## 📈 Trend Analysis Dashboard

- **Multiple chart types** — Line, Bar, and Area charts for flexible visualization
- **Date range filtering** — Quick filters (7/30/90 days) + custom date range picker
- **CSV export** — Download trend data with proper date formatting (dates wrapped in quotes)
- **Interactive tooltips** — Hover to view detailed data points
- **Loading & empty states** — Professional UI for data loading and no-data scenarios
- **Stock distribution chart** — Visual breakdown of inventory by product
- **Responsive layout** — Side-by-side grid layout on desktop, stacked on mobile

---

## 💬 Auto-Dismissing Messages

- **3-second auto-dismiss** — Status messages automatically disappear after 3 seconds
- **Smooth animations** — Slide-down entrance (0.3s), slide-up exit (0.3s at 2.7s mark)
- **Message types** — Success (green), Error (red), Warning (orange) variants
- **Better visibility** — Enhanced styling with borders, padding, and color coding
- **All pages covered** — Inventory, Suppliers, Dashboard, Transactions pages
- **CSS keyframe animations** — Smooth slideDown and slideUp transitions

---

## ❌ Error Handling

All errors follow a consistent JSON format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

### HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| `200` | OK | Successful read/update |
| `201` | Created | Successful create |
| `204` | No Content | Successful delete |
| `400` | Bad Request | Validation error, invalid input |
| `401` | Unauthorized | Missing or invalid JWT token |
| `403` | Forbidden | Insufficient permissions for role |
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
   - **Update Product** → `PUT /api/products/:id`
   - **Stock In** → `POST /api/stock/in`
   - **Stock Out** → `POST /api/stock/out`
   - **Reports** → `GET /api/reports/summary`
   - **Alerts** → `GET /api/alerts/low-stock` (use Bearer token)

### Using curl

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@test.com","password":"password123","role":"admin"}'

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

Connect to your MongoDB Atlas cluster to visually inspect:
- `inventory.users` — Registered users
- `inventory.products` — Product catalog
- `inventory.suppliers` — Supplier directory
- `inventory.transactions` — Stock movement history

---

## 🚀 Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Set **Root Directory** to `client`
6. Add environment variable: `VITE_API_URL=<your-backend-url>`
7. Click **Deploy**

### Deploy Backend to Railway

1. Push code to GitHub
2. Go to [railway.app/dashboard](https://railway.app/dashboard)
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Set **Root Directory** to `backend`
6. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=<your-mongodb-uri>`
   - `JWT_SECRET=<your-secret>`
   - `NODE_ENV=production`
7. Click **Deploy**

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here_min_32_chars
NODE_ENV=production
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://your-backend-url.com
```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📚 Project Features Summary

### ✅ Completed Features

- [x] User authentication (Register/Login)
- [x] JWT token-based session management
- [x] Role-based access control (Admin, Manager, Staff)
- [x] Product CRUD operations
- [x] Supplier CRUD operations
- [x] Stock in/out management
- [x] Transaction logging
- [x] Low stock alerts
- [x] Business reports (Summary, Low Stock, Total Value, Transactions)
- [x] Session timeout with warning modal
- [x] Trend analysis with multiple chart types
- [x] CSV export functionality
- [x] Auto-dismissing status messages
- [x] Responsive design (Mobile, Tablet, Desktop)
- [x] Global error handling
- [x] Request validation
- [x] CORS protection
- [x] MongoDB Atlas integration
- [x] Production-ready deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by real-world inventory management needs
- Community-driven development

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

---

<p align="center">
  Built with ❤️ for efficient inventory management
</p>

<p align="center">
  <strong>Frontend:</strong> React + Vite + Tailwind CSS<br>
  <strong>Backend:</strong> Node.js + Express + MongoDB<br>
  <strong>Deployment:</strong> Vercel + Railway + MongoDB Atlas
</p>
