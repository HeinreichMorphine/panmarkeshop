# Panmark Enterprise

## Installation & Setup Guide

### Prerequisites

* [XAMPP](https://www.apachefriends.org/) or any local web server (compatible with Windows, macOS, or Linux)
* A modern web browser (e.g., Chrome, Firefox, Microsoft Edge)
* [Tailwind CSS](https://tailwindcss.com/) (included in the project via CDN or precompiled build)

### Installation Steps

1. **Download the Repository**

   * Clone the repository or download the ZIP file and extract it to your local machine.

2. **Move to the Web Server Directory**

   * Place the `panmark` directory inside your local server's root directory (e.g., `htdocs` for XAMPP).

3. **Start the Web Server**

   * Launch XAMPP (or another chosen web server) and start the Apache service.

4. **Access the Application**

   * Open a browser and navigate to `http://localhost/panmark/public/index.html`.

### Important Notes

* This project does not require a backend or database server. All application data is stored using the browser's localStorage.
* Use the **Reset Fake DB** button located in the Admin Dashboard to reinitialize demo data.
* Demo User Credentials:

  * **Admin:** `admin` / `admin123`
  * **Customer:** `john_doe` / `password123`

---

## Project Overview

**Panmark Enterprise** is a demonstration e-commerce platform developed for the purpose of a Web Engineering course assignment. It simulates the functionality of a retail website for a stationery and book business using only front-end technologies.

### Key Objectives

* Simulate a full e-commerce workflow without a real backend
* Apply modern web development practices using HTML, CSS (Tailwind), and JavaScript
* Use localStorage to mimic persistent backend storage

---

## Technology Stack

| Component        | Technology                                 |
| ---------------- | ------------------------------------------ |
| Folder Structure | Laravel-inspired (Blade-style HTML layout) |
| UI Framework     | Tailwind CSS v4                            |
| Color Palette    | `#2C3639`, `#3F4E4F`, `#A27B5C`, `#DCD7C9` |
| Logic & State    | Vanilla JavaScript + localStorage          |
| Hosting          | XAMPP (`C:\xampp\htdocs\Panmark`)          |

---

## System Users

### Administrator

* **Username:** `admin`
* **Password:** `admin123`
* **Role:** Administrator
* **Permissions:** Full access to product management, order review, and review moderation.

### Customer

* **Username:** `john_doe`
* **Password:** `password123`
* **Role:** Customer
* **Permissions:** Browse products, manage shopping cart, place orders, and submit reviews.

---

## Features

### Authentication

* Login/Logout functionality
* Role-based user interface (Admin and Customer)
* Session state managed using localStorage

### Product Management

* 20 sample products (10 books and 10 stationery items)
* Product filtering by category
* Search functionality
* Detailed product view with description and images
* Stock quantity tracking

### Shopping Cart

* Add/remove items to cart
* Quantity adjustment
* Total cost calculation
* Persistent cart per user session

### Order Management

* Customer view: personal order history
* Admin view: all orders placed by all customers
* Order details including products, total amount, and order status (Pending, Processed, Shipping, Delivered, Cancelled, Received)

### Review System

* Customer-submitted reviews with 1–5 star ratings
* Display of reviews per product
* Admin capabilities for review moderation

### Data Management & Backup

* Export all system data to Excel/CSV format
* Import backup data from Excel/CSV files
* Support for individual data types (products, users, orders, reviews)
* Full system backup and restore capabilities
* Data validation and error handling during import

### Dashboards

**Admin Dashboard**

* Product CRUD operations
* View and manage customer orders
* Review moderation
* Sales summary (basic reporting)
* **Backup and Restore functionality**
  - Export all data to Excel/CSV format
  - Import backup data from Excel/CSV files
  - Support for individual data types (products, users, orders, reviews)
  - Full system backup/restore capabilities

**Customer Dashboard**

* Profile information display
* Access to cart and orders
* Navigation shortcuts

---

## Project Structure

```
Panmark/
├── public/
│   └── index.html              # Main application entry point
├── assets/
│   ├── css/
│   │   └── style.css           # Custom CSS styles
│   └── js/
│       ├── main.js             # Core application logic and initialization
│       ├── pages.js            # Page rendering functions
│       └── events.js           # JavaScript event handlers
├── README.md                   # Project documentation
├── PROJECT_STRUCTURE.md        # File breakdown and data model description
└── deploy.bat                  # Script for local deployment on Windows
```

---

## Data Handling

### Local Storage Data Model

* **Products**

  * Fields: `id`, `productName`, `category`, `price`, `stock`, `description`, `image`

* **Users**

  * Sample users with roles defined in `main.js`
  * Fields: `id`, `username`, `password`, `role`

* **Orders**

  * Fields: `id`, `userId`, `items`, `total`, `status` (Pending, Processed, Shipping, Delivered, Cancelled, Received), `date`

* **Reviews**

  * Fields: `id`, `productId`, `userId`, `userName`, `rating`, `comment`, `date`

---

## Application Architecture

* **Single Page Application (SPA)** model
* Dynamic content loading via JavaScript
* URL-independent routing (handled internally through `navigateTo()` and `loadPage()`)
* All pages rendered using JavaScript template functions
* Data persistence and session handling through localStorage
* JavaScript-driven event binding for user interaction and UI updates

---

## UI/UX Guidelines

| Color     | Use Case                       |
| --------- | ------------------------------ |
| `#2C3639` | Primary navigation background  |
| `#3F4E4F` | Buttons, modals, sidebars      |
| `#A27B5C` | Highlight elements, pricing    |
| `#DCD7C9` | Background, input forms, cards |

### Interface Features

* Responsive layout supporting all screen sizes
* Clean and consistent visual hierarchy
* Interactive feedback on user actions
* Clear navigation and accessibility

---

## Development Notes

* To restore demo data, use the "Reset Fake DB" option in the Admin Dashboard
* All data initialization scripts and mock content are located in `main.js`
* Product images are stored in `/assets/images/` and should be referenced with a relative path
* For debugging and testing, browser DevTools (Console and Application tabs) can be used to inspect storage and DOM

---

## Additional Resources

* Refer to `PROJECT_STRUCTURE.md` for a complete breakdown of the application's internal structure and component functions.
* Comments are included throughout the codebase for easier navigation and customization.

---

**Panmark Enterprise**
*Simulating a modern retail experience in a front-end-only architecture.*

Let me know if you would like this exported as a PDF, DOCX, or formatted for GitHub Pages/README usage.
