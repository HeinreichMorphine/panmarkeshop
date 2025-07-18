# Panmark Enterprise Webshop — Developer Guide

This guide is for developers working on the Panmark Enterprise SPA (Single Page Application) project. It covers the codebase structure, SPA architecture, data management, and best practices for extending and maintaining the system.

---

## Project Structure

```
Panmark/
├── public/
│   └── index.html              # Main entry point HTML file
├── assets/
│   ├── css/
│   │   └── style.css           # Custom CSS styles
│   ├── images/
│   │   ├── books/              # Book cover images
│   │   └── stationery/         # Stationery product images
│   └── js/
│       ├── main.js             # Core application logic
│       ├── pages.js            # Page content functions
│       ├── events.js           # Event handlers
│       ├── database.js         # Optimized database layer
│       └── excel-import.js     # Excel/CSV import utility
├── README.md                   # Project documentation
├── PROJECT_STRUCTURE.md        # Detailed structure and code explanations
├── DEVELOPER_GUIDE.md          # (This file)
└── deploy.bat                  # Windows deployment script
```

---

## Code Organization

- **main.js**: Application initialization, mock data setup, authentication, cart/order/review logic, navigation, and state management.
- **pages.js**: Generates HTML for all pages (home, login, products, product details, cart, orders, dashboards).
- **events.js**: Handles user interactions (form submissions, filtering, search, CRUD, modals).
- **database.js**: Optimized data management, caching, and import/export helpers.
- **excel-import.js**: Utility for importing/exporting data in CSV/Excel format, with validation and error handling.
- **style.css**: Custom styles beyond Tailwind CSS.
- **index.html**: Loads all JS/CSS, contains the main content area for SPA rendering.

---

## Data Management

- **localStorage** is used to simulate a backend database for users, products, orders, and reviews.
- **database.js** provides a robust data layer with caching, indexing, and import/export helpers.
- **excel-import.js** enables bulk data import/export and backup/restore via CSV/Excel files.
- Data is initialized via `initializeApp()` in `main.js` and can be reset using the admin panel's "Reset Fake DB" button.
- Product images should be placed in `assets/images/` and referenced with a relative web path (e.g., `/Panmark/assets/images/books/book-cover.jpg`).
- Data objects:
  - **Users:** username, password, role, name, address, phone, cusid
  - **Products:** id, productName, category, price, stock, description, image, sold
  - **Orders:** id, cusid, userId, userName, address, phone, adminId, items, total, status, date
  - **Reviews:** id, productId, userId, userName, rating, comment, date

---

## SPA Architecture

- **Single Page Application (SPA):** All navigation and page changes are handled via JavaScript without full page reloads.
- **Routing:** The `navigateTo(page)` and `loadPage(page)` functions dynamically update the main content area based on user actions.
- **Role-based UI:** Admin and customer users see different navigation, dashboards, and features.
- **State:** User session, cart, and all data are managed in localStorage and updated in real time.
- **Component-based rendering:** Each page or modal is generated by a function in `pages.js` and injected into the DOM.
- **Event-driven:** All buttons, forms, and navigation links use JS event handlers for SPA behavior.
- **Data import/export:** Use the admin dashboard or call helpers in `database.js`/`excel-import.js` for backup/restore and bulk operations.

---

## Development Workflow

### 1. **Setup**
- Place the project in your XAMPP `htdocs` directory.
- Start Apache and access the app at `http://localhost/Panmark/public/index.html`.

### 2. **Resetting Data**
- Use the **Reset Fake DB** button in the admin panel to restore all mock data.
- Or, clear localStorage and reload the app.

### 3. **Adding/Editing Products or Images**
- Add new images to `assets/images/`.
- Update the mock data in `main.js` or use the admin product management UI.
- Reference images with a relative web path (e.g., `/Panmark/assets/images/books/new-book.jpg`).

### 4. **Debugging**
- Use browser DevTools to inspect localStorage and DOM updates.
- All state is in localStorage; you can clear or edit it for testing.
- Use console logs for debugging JS logic.

### 5. **Extending the SPA**
- Add new pages by creating a function in `pages.js` and updating the router in `main.js`.
- Add new event handlers in `events.js`.
- Update navigation and UI as needed for new features.
- All code is written in vanilla JS and is easy to extend for new features or backend integration.

---

## Best Practices
- Use consistent naming and folder structure for images and assets.
- Keep all data changes in sync with localStorage.
- Use Tailwind CSS classes for UI consistency.
- Comment your code for clarity.
- Test all features after making changes, especially SPA navigation and data updates.

---

## Additional Resources
- See `PROJECT_STRUCTURE.md` for a full breakdown of files, data models, and technical implementation.
- See `README.md` for installation and user-facing documentation.
- All code is commented and organized for easy understanding and extension.

---

## UI & Product Grid Layout

### Customer/Guest Product Grid
- Uses a standard e-commerce card grid.
- Each card: fixed width (`w-64`), fixed height (`h-96`), image container (`h-40 pt-4`), modern shadow and rounded corners.
- Responsive grid: 2-4 columns depending on screen size.
- Buttons for "View Details" and "Add to Cart" always visible.
- Utilizes Tailwind CSS for all layout and spacing.

### Admin Product Management Table
- Compact table with max width (`max-w-4xl`), small images (`w-16 h-16`), and reduced padding/text size for easy editing.
- Action buttons are smaller and closer together for efficiency.

#### Customization
- To adjust card or table sizes, edit the Tailwind utility classes in `assets/js/pages.js`.
- For further UI tweaks, see the comments in the code for recommended class changes.

---

Happy coding!