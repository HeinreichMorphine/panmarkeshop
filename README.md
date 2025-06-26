# Panmark Enterprise

## Installation & Setup Guide

### Dependencies
- [XAMPP](https://www.apachefriends.org/) or any local web server (for Windows, Mac, or Linux)
- Modern web browser (Chrome, Firefox, Edge, etc.)
- [Tailwind CSS](https://tailwindcss.com/) (already included via CDN or build in this project)

### Steps
1. **Clone or Download the Repository**
   - Download the ZIP or clone the repo to your local machine.
2. **Move to Web Server Directory**
   - Place the `panmark` folder inside your web server's root directory (e.g., `htdocs` for XAMPP).
3. **Start Your Web Server**
   - Launch XAMPP (or your chosen server) and start the Apache service.
4. **Open the App in Your Browser**
   - Go to `http://localhost/panmark/public/index.html` in your browser.

### Notes
- No database or backend setup is required. All data is stored in your browser's localStorage.
- To reset demo data, use the "Reset Fake DB" button in the admin dashboard.
- Demo accounts:
  - **Admin:** `admin` / `admin123`
  - **Customer:** `john_doe` / `password123`

---

## Overview
Panmark is a demo e-commerce platform for books and stationery, built with HTML, CSS (Tailwind), and JavaScript. It uses localStorage for data persistence and does not require a backend server.

## Features
- Product catalog with categories
- Shopping cart and order management
- Admin and customer roles
- Product reviews
- Responsive design

For more details, see `DEVELOPER_GUIDE.md` and `PROJECT_STRUCTURE.md`.

# Panmark Enterprise Webshop

A front-end mockup of a stationery and book retailer webshop system built for Web Engineering course assignment. This project simulates a fully functional e-commerce interface using only front-end technologies.

## 🎯 Project Overview

Panmark Enterprise is a **stationery and book retailer** requiring a front-end mockup of a webshop system. This project is part of a **Web Engineering course assignment** and simulates a fully functional interface using front-end tools only. The mockup does not include a real backend but simulates backend behavior using **JavaScript and localStorage**.

## 🛠 Technology Stack

| Component         | Technology                                 |
| ----------------- | ------------------------------------------ |
| Folder Structure  | Laravel-style (Blade structure only)       |
| UI Framework      | Tailwind CSS (v4)                          |
| CSS Color Palette | `#2C3639`, `#3F4E4F`, `#A27B5C`, `#DCD7C9` |
| Logic & State     | JavaScript + LocalStorage                  |
| Hosting           | XAMPP at `C:\xampp\htdocs\Panmark`         |

## 🎨 Color Palette

| Color Code | Purpose                       |
| ---------- | ----------------------------- |
| `#2C3639`  | Header background, footer     |
| `#3F4E4F`  | Sidebars, buttons, modals     |
| `#A27B5C`  | Highlight elements, price tag |
| `#DCD7C9`  | Background, cards, forms      |

## 👥 System Users

### Admin User
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin
- **Capabilities:** Manage products, view orders, view reviews

### Customer User
- **Username:** `john_doe`
- **Password:** `password123`
- **Role:** Customer
- **Capabilities:** Browse, order, review, manage cart

## 📁 Project Structure

```
/Panmark
├── /public
│   └── index.html              # Main entry point
├── /assets
│   └── /js
│       ├── main.js             # Core application logic
│       ├── pages.js            # Page content functions
│       └── events.js           # Event handlers
└── README.md                   # This file
```

## 🚀 Features

### 🔐 Authentication System
- Login/logout functionality
- Role-based access control (Admin/Customer)
- Session management using localStorage

### 🛍 Product Management
- **20 Mock Products** (10 Books + 10 Stationery items)
- Product categories with filtering
- Search functionality
- Product details with images and descriptions
- Stock management

### 🛒 Shopping Cart
- Add/remove products
- Quantity management
- Real-time cart count
- Persistent cart storage per user

### 📦 Order System
- Checkout process
- Order history
- Order status tracking
- Admin order management

### ⭐ Review System
- Product reviews with ratings (1-5 stars)
- Customer review submission
- Review display on product pages
- Admin review management

### 👨‍💼 Admin Dashboard
- Product CRUD operations
- Order management
- Review management
- Sales statistics

### 👤 Customer Dashboard
- Profile information
- Order history
- Quick access to cart and products

## 🎯 Functional Requirements

### ✅ Completed Features

1. **Login Page**
   - Simple form for login (JS-based authentication)
   - Redirects to appropriate dashboard based on role
   - Validates credentials from localStorage/mock users

2. **Homepage**
   - Welcome banner with call-to-action
   - Quick links to product categories
   - Highlights of featured products

3. **Product Listing Page**
   - Category filter (Books | Stationery)
   - Search box (by name or category)
   - Card-style product display
   - "View Details" and "Add to Cart" buttons

4. **Product Details Page**
   - Full product information
   - Add to Cart functionality
   - Customer Reviews section
   - Add Review form (for logged-in customers)

5. **Cart Page**
   - View added products
   - Remove or update quantity
   - Total price display
   - Checkout button

6. **Order Page**
   - Customer: View their own order history
   - Admin: View all orders by all users
   - Order details with items, total, and status

7. **Admin Dashboard**
   - View products, orders, and reviews
   - CRUD for products (create, read, update, delete)
   - Product management interface

8. **Customer Dashboard**
   - View profile info
   - Access to order history
   - Quick navigation to cart and products

## 🗄️ Data Management

### Mock Data Structure

**Products:**
- 20 products (10 Books + 10 Stationery)
- Fields: id, productName, category, price, stock, description, image

**Users:**
- Admin: admin/admin123
- Customer: john_doe/password123

**Orders:**
- Stored as JSON in localStorage
- Contains: id, userId, items, total, status, date

**Reviews:**
- Stored per product
- Contains: id, productId, userId, userName, rating, comment, date

## 🛠️ Developer Guide

### Project Structure
```
Panmark/
├── public/
│   └── index.html              # Main entry point HTML file
├── assets/
│   ├── css/
│   │   └── style.css           # Custom CSS styles
│   └── js/
│       ├── main.js             # Core application logic
│       ├── pages.js            # Page content functions
│       └── events.js           # Event handlers
├── README.md                   # Project documentation
├── PROJECT_STRUCTURE.md        # Detailed structure and code explanations
└── deploy.bat                  # Windows deployment script
```

### Code Organization
- **main.js**: Application initialization, mock data setup, authentication, cart/order/review logic, navigation, and state management.
- **pages.js**: Generates HTML for all pages (home, login, products, product details, cart, orders, dashboards).
- **events.js**: Handles user interactions (form submissions, filtering, search, CRUD, modals).
- **style.css**: Custom styles beyond Tailwind CSS.
- **index.html**: Loads all JS/CSS, contains the main content area for SPA rendering.

### Data Management
- **localStorage** is used to simulate a backend database for users, products, orders, and reviews.
- Data is initialized via `initializeApp()` and can be reset using the admin panel's "Reset Fake DB" button.
- Product images should be placed in `assets/images/` and referenced with a relative web path (e.g., `/Panmark/assets/images/books/book-cover.jpg`).

### SPA Architecture
- **Single Page Application (SPA)**: All navigation and page changes are handled via JavaScript without full page reloads.
- **Routing**: The `navigateTo(page)` and `loadPage(page)` functions dynamically update the main content area based on user actions.
- **Role-based UI**: Admin and customer users see different navigation, dashboards, and features.
- **State**: User session, cart, and all data are managed in localStorage and updated in real time.
- **Component-based rendering**: Each page or modal is generated by a function in `pages.js` and injected into the DOM.
- **Event-driven**: All buttons, forms, and navigation links use JS event handlers for SPA behavior.

### Development Tips
- Use the **Reset Fake DB** button in the admin panel to restore all mock data.
- To add new products or images, update the mock data in `main.js` and place images in `assets/images/`.
- For debugging, use browser DevTools to inspect localStorage and DOM updates.
- All code is written in vanilla JS and is easy to extend for new features or backend integration.

## 🧑‍💻 How the SPA Works
- The app loads a single HTML file (`index.html`).
- All navigation (home, products, cart, dashboard, etc.) is handled by JavaScript functions that update the main content area.
- No page reloads occur; only the content inside the main container changes.
- Data is persisted in localStorage, simulating a backend.
- User authentication, product management, cart, orders, and reviews are all managed on the front end.
- The UI updates instantly in response to user actions, providing a seamless SPA experience.

## 📚 For More Details
- See `PROJECT_STRUCTURE.md` for a full breakdown of files, data models, and technical implementation.
- All code is commented and organized for easy understanding and extension.

## 🎨 UI/UX Features

- **Modern Design:** Clean, professional interface
- **Consistent Branding:** Panmark color palette throughout
- **Intuitive Navigation:** Clear menu structure
- **Responsive Layout:** Works on all device sizes
- **Interactive Elements:** Hover effects and transitions
- **User Feedback:** Success/error messages and confirmations

## 📝 Notes

- This is a **front-end mockup** only
- No real backend or database
- All data is stored in browser localStorage
- Data persists between sessions but is browser-specific
- No real payment processing
- Images use placeholder URLs

## 🤝 Contributing

This is a course project, but suggestions and improvements are welcome!

## 📄 License

This project is created for educational purposes as part of a Web Engineering course assignment.

---

**Panmark Enterprise** - Your premier destination for quality stationery and books! 📚✏️ 
