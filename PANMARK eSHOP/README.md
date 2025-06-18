# PANMARK eSHOP - E-commerce Application

This project contains two implementations of the PANMARK eSHOP e-commerce application:

1. **Single Page Application (SPA)** - Built with HTML, CSS, and JavaScript
2. **Laravel Application** - Built with Laravel framework and React components

Both applications implement the same functionality based on the Java classes provided, using the specified color palette.

## Color Palette

- **Primary Dark**: `#2C3639`
- **Secondary Dark**: `#3F4E4F`
- **Accent Brown**: `#A27B5C`
- **Light Cream**: `#DCD7C9`

## 1. Single Page Application (SPA)

### Features

- **User Management**: Login/Register system with Admin and Customer roles
- **Product Catalog**: Browse products with filtering and sorting
- **Shopping Cart**: Add/remove products, view cart, checkout
- **Order Management**: View order history and order details
- **Admin Dashboard**: Sales reports, data backup, product management
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles with color palette
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### How to Run

1. Simply open `index.html` in a web browser
2. No server setup required - runs entirely in the browser

### Demo Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`
- Phone: Any phone number

**Customer Login:**
- Username: `customer`
- Password: `customer123`
- Phone: Any phone number

### Features Implemented

- **User Class**: Base user functionality with username, password, phone
- **Admin Class**: Admin-specific features like sales reports and data backup
- **Customer Class**: Customer features like cart management and order placement
- **Product Class**: Product catalog with filtering, sorting, and reviews
- **Cart Class**: Shopping cart functionality
- **Order Class**: Order processing and payment simulation
- **Review Class**: Product review system

## 2. Laravel Application

### Features

- **Full-stack Application**: Laravel backend with React frontend
- **API Integration**: RESTful API endpoints
- **Database Integration**: MySQL/PostgreSQL database support
- **Authentication**: Laravel Sanctum for API authentication
- **Admin Panel**: Comprehensive admin dashboard
- **Product Management**: CRUD operations for products
- **Order Processing**: Complete order lifecycle management

### File Structure

```
laravel-app/
├── app/
│   └── Models/
│       ├── User.php
│       ├── Admin.php
│       ├── Customer.php
│       ├── Product.php
│       ├── Cart.php
│       ├── Order.php
│       └── Review.php
├── resources/
│   ├── js/
│   │   ├── app.jsx
│   │   ├── Pages/
│   │   │   └── Dashboard.jsx
│   │   └── Components/
│   │       ├── ProductCard.jsx
│   │       └── AdminDashboard.jsx
│   └── css/
│       └── app.css
├── composer.json
├── package.json
└── vite.config.js
```

### Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16 or higher
- MySQL/PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PANMARK-eSHOP/laravel-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   - Update `.env` file with your database credentials
   - Run migrations: `php artisan migrate`
   - Seed the database: `php artisan db:seed`

6. **Build assets**
   ```bash
   npm run build
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   ```

### Laravel Models

The Laravel application includes models that mirror the Java classes:

- **User**: Base user model with authentication
- **Admin**: Admin-specific functionality and permissions
- **Customer**: Customer features and relationships
- **Product**: Product catalog with filtering and reviews
- **Cart**: Shopping cart management
- **Order**: Order processing and status management
- **Review**: Product review system

### React Components

- **ProductCard**: Displays individual products with the color palette
- **AdminDashboard**: Admin panel with sales reports and data management
- **Dashboard**: Main dashboard that adapts based on user role

## Key Features Comparison

| Feature | SPA | Laravel |
|---------|-----|---------|
| User Authentication | ✅ | ✅ |
| Product Catalog | ✅ | ✅ |
| Shopping Cart | ✅ | ✅ |
| Order Management | ✅ | ✅ |
| Admin Dashboard | ✅ | ✅ |
| Data Persistence | Local Storage | Database |
| API Integration | ❌ | ✅ |
| Real-time Updates | ❌ | ✅ |
| Scalability | Limited | High |

## Usage

### SPA Usage

1. Open `index.html` in a browser
2. Register as either Admin or Customer
3. Browse products, add to cart, and place orders
4. Admins can access the admin dashboard for reports and data management

### Laravel Usage

1. Start the Laravel development server
2. Visit `http://localhost:8000`
3. Register/login to access the application
4. Use the admin panel for comprehensive management

## Development

### Adding New Features

**For SPA:**
- Add new functions to `script.js`
- Update HTML structure in `index.html`
- Style new components in `styles.css`

**For Laravel:**
- Create new models in `app/Models/`
- Add controllers in `app/Http/Controllers/`
- Create React components in `resources/js/Components/`
- Update routes in `routes/web.php`

### Customization

Both applications use the same color palette defined in CSS variables. To change colors:

**SPA:** Update the CSS variables in `styles.css`
**Laravel:** Update the CSS variables in `resources/css/app.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both SPA and Laravel versions
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please open an issue in the repository. 