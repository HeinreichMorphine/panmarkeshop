# Panmark Enterprise – Sequence and Activity Flows (with Function Details)

This document lists the main user flows for both the **Customer** and **Admin** pages, with detailed steps and the main functions involved in each step. Use this as a reference for creating sequence and activity diagrams.

---

## Customer Flows

### **Registration**
1. User clicks "Login" in navigation. (`navigateTo('login')`, `getLoginPageContent()`)
2. User clicks "Register" link. (`showRegisterModal()`)
3. User fills registration form with personal details. (form with username, password, name, address, phone)
4. System validates and creates new user account. (`handleRegister(event)`)
5. User is automatically logged in and redirected to home. (`loadPage('home')`)

### **Login**
1. User navigates to Login page. (`getLoginPageContent()`)
2. User enters username and password.
3. System validates credentials. (`handleLogin(event)` → `login(username, password)`)
4. On success, user is redirected to the Customer Dashboard. (`navigateTo('customer-dashboard')`, `getCustomerDashboardContent()`)

### **Browse Products**
1. User selects "Browse Products" from dashboard or homepage. (`navigateTo('products')`)
2. System displays product categories and product list. (`getProductsPageContent()`)
3. User can filter by category. (`filterProducts(category)`)
4. User can search products. (`searchProducts()`)
5. User can view product details in modal. (`showProductDetailsModal(productId)`)
6. User can navigate to detailed product page. (`navigateTo('product-details?id=...')`, `getProductDetailsContent(productId)`)

### **Add to Cart (with Stock Validation)**
1. User clicks "Add to Cart" on a product. (`addToCart(productId, quantity)`, called from button click)
2. System checks stock availability. (`addToCart()` stock validation logic)
3. If out of stock, system shows error message.
4. If in stock, system updates the cart in localStorage. (`addToCart()` logic)
5. Cart count is updated in the UI. (`updateCartCount()`)

### **View Cart**
1. User navigates to Cart page. (`navigateTo('cart')`, `getCartPageContent()`)
2. System displays items in the cart. (`getCartItems()`)
3. User can update quantity or remove items. (`updateCartQuantity(productId, newQuantity)`, `removeFromCart(productId)`)

### **Checkout / Place Order**
1. User clicks "Checkout" in the cart. (button triggers `createOrder()`)
2. System shows payment method selection modal. (`showPaymentModal(onPay)`)
3. User selects payment method and confirms. (modal form submission)
4. System creates a new order and clears the cart. (`createOrder()`)
5. System shows WhatsApp notification. (`showWhatsAppNotification()`)
6. User is redirected to orders page. (`loadPage('orders')`)

### **View Order History**
1. User navigates to Orders page. (`navigateTo('orders')`, `getOrdersPageContent()`)
2. System displays list of past orders. (`getOrdersPageContent()`)
3. User can view order details and status.

### **Edit Personal Info**
1. User goes to Customer Dashboard. (`navigateTo('customer-dashboard')`, `getCustomerDashboardContent()`)
2. User edits profile fields and submits form. (`handleEditPersonalInfo(event)`)
3. System updates user info in localStorage. (`handleEditPersonalInfo(event)` logic)

### **Add Product Review**
1. User views a product they purchased. (`navigateTo('product-details?id=...')`, `getProductDetailsContent(productId)`)
2. User submits a review (rating and comment). (`handleAddReview(event, productId)`)
3. System saves review and updates product reviews. (`addReview(productId, rating, comment)`, `getProductReviews(productId)`)

### **Add Review from Order History**
1. User navigates to Orders page. (`navigateTo('orders')`, `getOrdersPageContent()`)
2. User clicks "Add Review" on received order items. (`showAddReviewModal(productId, orderId)`)
3. User submits review in modal. (`handleModalAddReview(event, productId, orderId)`)
4. System saves review and updates product reviews. (`addReview(productId, rating, comment)`)

### **View Reviews**
1. User navigates to Reviews page. (`navigateTo('reviews')`, `getReviewsPageContent()`)
2. System displays all product reviews. (`getReviewsPageContent()`)
3. User can edit their own reviews. (`showEditReviewModal(reviewId)`, `saveEditedReview()`)
4. User can delete their own reviews. (`deleteReview(reviewId)`)

### **Customer Guide**
1. User clicks "Help" in navigation. (`navigateTo('customer-guide')`, `getCustomerGuideContent()`)
2. System displays comprehensive user guide. (`getCustomerGuideContent()`)

### **Contact**
1. User clicks "Contact" in navigation. (`navigateTo('contact')`, `getContactContent()`)
2. System displays contact information. (`getContactContent()`)
3. User can submit contact form. (`handleContactForm(event)`)

---

## Admin Flows

### **Login**
1. Admin navigates to Login page. (`getLoginPageContent()`)
2. Admin enters credentials.
3. System validates and redirects to Admin Dashboard. (`handleLogin(event)` → `login(username, password)`, `navigateTo('admin-dashboard')`, `getAdminDashboardContent()`)

### **View Dashboard**
1. Admin sees business overview (products, orders, reviews). (`getAdminDashboardContent()`)
2. Admin can access quick actions (manage products, view orders, generate reports, backup/import data). (UI buttons trigger respective functions)

### **Manage Products**
1. Admin navigates to Product Management. (`navigateTo('products')`, `getProductsPageContent()`)
2. Admin can add new products with image upload. (`showAddProductForm()`, `handleAddProduct(event)`)
3. Admin can edit existing products. (`editProduct(productId)`, `handleEditProduct(event, productId)`)
4. Admin can delete products. (`deleteProduct(productId)`)
5. Admin can update product stock directly. (`updateProductStock(productId, delta)`)
6. System updates product list in localStorage. (logic in above functions)

### **Product Image Upload**
1. Admin adds/edits product and selects image file. (file input in form)
2. System reads file and converts to base64. (`FileReader.readAsDataURL()`)
3. System stores image as data URL in localStorage. (`handleAddProduct()`, `handleEditProduct()`)

### **View All Orders**
1. Admin navigates to Orders page. (`navigateTo('orders')`, `getOrdersPageContent()`)
2. System displays all customer orders. (`getOrdersPageContent()`)
3. Admin can update order status. (`changeOrderStatus(orderId, newStatus)`, `markOrderReceived(orderId)`)

### **Generate Sales Report**
1. Admin clicks "Generate Sales Report". (`generateSalesReport()`)
2. System compiles and displays/downloads report data. (`generateSalesReportData(orders, products, users)`, `downloadCSV(content, filename)`)

### **Backup All Data**
1. Admin clicks "Backup All Data". (`backupAllData()`)
2. System exports products, orders, users, and reviews to a file. (`generateBackupData(products, orders, users, reviews)`, `downloadCSV(content, filename)`)

### **Import Backup Data**
1. Admin selects a backup file and clicks "Import Backup Data". (UI triggers `handleImportBackupData()`)
2. System reads file and updates localStorage with imported data. (`handleImportBackupData()` logic)

### **Import Products**
1. Admin selects product file and clicks "Import Products". (UI triggers `handleImportProducts()`)
2. System reads Excel/CSV file and imports products. (`handleImportProducts()` logic)

### **Reset Fake DB**
1. Admin clicks "Reset Fake DB". (`resetFakeDB()`)
2. System clears all data and re-initializes with mock data. (`resetFakeDB()`, `initializeApp()`, `initializeMockUsers()`, `initializeMockProducts()`)

### **Manage Reviews**
1. Admin navigates to Reviews page. (`navigateTo('reviews')`, `getReviewsPageContent()`)
2. System displays all product reviews. (`getReviewsPageContent()`)
3. Admin can view reviewer details. (admin-specific view in reviews)
4. Admin can delete any review. (`deleteReview(reviewId)`)

---

## Guest Flows

### **Browse Products (Guest)**
1. Guest navigates to Products page. (`navigateTo('products')`, `getProductsPageContent()`)
2. System displays products with limited functionality. (`getProductsPageContent()`)
3. Guest can view product details. (`showProductDetailsModal(productId)`)
4. Guest is prompted to login when trying to add to cart. (`promptLoginOrRegister()`)

### **View Cart (Guest)**
1. Guest navigates to Cart page. (`navigateTo('cart')`, `getCartPageContent()`)
2. System shows login prompt. (`getCartPageContent()` guest view)

---

## Common Features

### **Navigation**
- Dynamic navigation updates based on user role. (`updateNavigation()`)
- Cart count display. (`updateCartCount()`)
- User section updates. (`updateUserSection()`)

### **Stock Management**
- Stock validation in add to cart. (`addToCart()` stock checks)
- Out of stock button styling. (conditional CSS classes)
- Stock updates on order completion. (`createOrder()` stock reduction)

### **Modal System**
- Product details modal. (`showProductDetailsModal(productId)`)
- Review modal. (`showAddReviewModal(productId, orderId)`)
- Registration modal. (`showRegisterModal()`)
- Payment method modal. (`showPaymentModal(onPay)`)
- Modal close functionality. (`closeReviewModal()`, `closeEditReviewModal()`)

### **Search and Filter**
- Product search functionality. (`searchProducts()`)
- Category filtering. (`filterProducts(category)`)
- Hot selling product highlighting. (hot selling logic in product display)

### **Pagination**
- Product navigation (previous/next). (pagination buttons in product details)

---

*Use these flows and function details as the basis for your sequence and activity diagrams.* 