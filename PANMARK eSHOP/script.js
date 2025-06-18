// Global variables
let currentUser = null;
let users = [];
let products = [];
let cart = [];
let orders = [];
let reviews = [];
let notifications = [];

// Class definitions based on Java classes
class User {
    constructor(username, password, phoneNumber) {
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    getUsername() { return this.username; }
    setUsername(username) { this.username = username; }

    getPassword() { return this.password; }
    setPassword(password) { this.password = password; }

    getPhoneNumber() { return this.phoneNumber; }
    setPhoneNumber(phoneNumber) { this.phoneNumber = phoneNumber; }
}

class Admin extends User {
    constructor(username, password, phoneNumber, adminId) {
        super(username, password, phoneNumber);
        this.adminId = adminId;
    }

    getAdminId() { return this.adminId; }
    setAdminId(adminId) { this.adminId = adminId; }

    createAdmin() {
        console.log('Admin created:', this.username);
    }

    readAdmin() {
        console.log('Admin read:', this.username);
    }

    updateAdmin() {
        console.log('Admin updated:', this.username);
    }

    deleteAdmin() {
        console.log('Admin deleted:', this.username);
    }

    viewSalesReport() {
        console.log('Sales report generated.');
        return {
            totalSales: orders.reduce((sum, order) => sum + order.totalAmount, 0),
            totalOrders: orders.length,
            totalProducts: products.length
        };
    }

    backupData() {
        console.log('Data backup completed.');
        localStorage.setItem('panmark_backup', JSON.stringify({
            products: products,
            orders: orders,
            reviews: reviews
        }));
        showMessage('Data backup completed successfully!', 'success');
    }
}

class Customer extends User {
    constructor(username, password, phoneNumber, customerId, orders = [], address = '') {
        super(username, password, phoneNumber);
        this.customerId = customerId;
        this.cart = new Cart();
        this.orders = orders;
        this.address = address;
    }

    getCustomerId() { return this.customerId; }
    setCustomerId(customerId) { this.customerId = customerId; }

    createCustomer() {
        console.log('Customer created:', this.username);
    }

    readCustomer() {
        console.log('Customer read:', this.username);
    }

    updateCustomer() {
        console.log('Customer updated:', this.username);
    }

    deleteCustomer() {
        console.log('Customer deleted:', this.username);
    }

    addToCart(product) {
        this.cart.addProduct(product);
        updateCartCount();
        showMessage(`${product.name} added to cart!`, 'success');
    }

    placeOrder() {
        if (this.cart.products.length === 0) {
            showMessage('Cart is empty!', 'error');
            return;
        }
        const order = this.cart.checkout();
        order.customerId = this.customerId;
        this.orders.push(order);
        orders.push(order);
        order.processPayment();
        updateCartCount();
        showMessage('Order placed successfully! WhatsApp notification sent.', 'success');
        saveOrders();
        saveProducts();
        saveUsers();
        loadOrders();
    }

    addReview(product, review) {
        review.setCustomerId(this.getCustomerId());
        product.addReview(review);
        reviews.push(review);
        showMessage('Review added successfully!', 'success');
    }

    getCart() { return this.cart; }
    getOrders() { return this.orders; }
}

class Product {
    constructor(id, name, category, price, stock = 10) {
        this.productId = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.purchaseCount = 0;
        this.reviews = [];
    }

    getProductId() { return this.productId; }
    getName() { return this.name; }
    getCategory() { return this.category; }
    getPrice() { return this.price; }
    getPurchaseCount() { return this.purchaseCount; }
    getStock() { return this.stock; }
    setStock(stock) { this.stock = stock; }

    viewDetails() {
        console.log(`${this.name}: $${this.price} | Category: ${this.category} | Purchased: ${this.purchaseCount}`);
        this.reviews.forEach(review => review.display());
    }

    addReview(review) {
        this.reviews.push(review);
    }

    static getListByHotSelling(products) {
        return products.sort((a, b) => b.getPurchaseCount() - a.getPurchaseCount());
    }

    static getListByCategory(products, category) {
        return products.filter(p => p.getCategory().toLowerCase() === category.toLowerCase());
    }
}

class Review {
    constructor(reviewId, comment, rating) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.rating = rating;
        this.customerId = null;
    }

    getReviewId() { return this.reviewId; }
    getComment() { return this.comment; }
    getRating() { return this.rating; }

    getCustomerId() { return this.customerId; }
    setCustomerId(customerId) { this.customerId = customerId; }

    display() {
        console.log(`Customer: ${this.customerId} | Rating: ${this.rating} | ${this.comment}`);
    }
}

class Cart {
    constructor() {
        this.cartId = Date.now();
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(product) {
        const index = this.products.findIndex(p => p.productId === product.productId);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }

    viewCart() {
        this.products.forEach(p => {
            console.log(`${p.name} - $${p.price}`);
        });
    }

    checkout() {
        const order = new Order();
        order.setProducts([...this.products]);
        this.products.forEach(product => {
            product.purchaseCount++;
            product.stock--;
        });
        this.products = [];
        return order;
    }

    getTotal() {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }
}

class Order {
    constructor() {
        this.orderId = Date.now();
        this.orderDate = new Date().toLocaleDateString();
        this.totalAmount = 0;
        this.status = 'Pending';
        this.productList = [];
        this.customerId = null;
    }

    setProducts(products) {
        this.productList = products;
        this.calculateTotal();
    }

    calculateTotal() {
        this.totalAmount = this.productList.reduce((sum, p) => sum + p.price, 0);
    }

    processPayment() {
        this.status = 'Paid';
        console.log('Payment successful. WhatsApp notification sent.');
    }

    getTotalAmount() { return this.totalAmount; }
    getProductList() { return this.productList; }
}

class Database {
    static backup() {
        const data = {
            users: users,
            products: products,
            orders: orders,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('panmark_backup', JSON.stringify(data));
        return 'Data backed up successfully';
    }

    static fetchBackup() {
        const backup = localStorage.getItem('panmark_backup');
        if (backup) {
            const data = JSON.parse(backup);
            users = data.users || [];
            products = data.products || [];
            orders = data.orders || [];
            return 'Backup restored successfully';
        }
        return 'No backup found';
    }
}

class Notification {
    constructor(id, type, title, message, userId = null, isRead = false) {
        this.id = id;
        this.type = type; // 'stock-update', 'order-update', 'general'
        this.title = title;
        this.message = message;
        this.userId = userId; // null for all users, specific ID for individual users
        this.isRead = isRead;
        this.timestamp = new Date().toISOString();
    }

    markAsRead() {
        this.isRead = true;
    }

    getTimeAgo() {
        const now = new Date();
        const created = new Date(this.timestamp);
        const diffInMinutes = Math.floor((now - created) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
}

// Initialize sample data
function initializeSampleData() {
    // Sample products - Books and Stationery only, 5 items each
    products = [
        // Books (5 items)
        new Product(1, 'Programming Fundamentals', 'Books', 45.99, 15),
        new Product(2, 'Business Management', 'Books', 38.50, 12),
        new Product(3, 'English Literature', 'Books', 32.75, 20),
        new Product(4, 'Mathematics Textbook', 'Books', 28.99, 18),
        new Product(5, 'Science Encyclopedia', 'Books', 55.00, 8),
        
        // Stationery (5 items)
        new Product(6, 'Premium Fountain Pen', 'Stationery', 29.99, 50),
        new Product(7, 'Leather Notebook', 'Stationery', 19.99, 30),
        new Product(8, 'Mechanical Pencil Set', 'Stationery', 12.99, 40),
        new Product(9, 'Colorful Markers', 'Stationery', 8.99, 35),
        new Product(10, 'Desk Organizer', 'Stationery', 22.75, 15)
    ];

    // Sample reviews
    reviews = [
        new Review(1, 'Excellent programming book, very comprehensive!', 5),
        new Review(2, 'Great quality fountain pen, writes smoothly', 4),
        new Review(3, 'Good notebook, durable leather cover', 4),
        new Review(4, 'Perfect for students, clear explanations', 5)
    ];

    // Add reviews to products
    products[0].addReview(reviews[0]);
    products[5].addReview(reviews[1]);
    products[6].addReview(reviews[2]);
    products[1].addReview(reviews[3]);
}

// DOM manipulation functions
function showPage(pageId) {
    // Redirect admin users away from cart page
    if (pageId === 'cart' && currentUser instanceof Admin) {
        showMessage('Admins cannot access the shopping cart. Redirecting to products page.', 'warning');
        pageId = 'products';
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Add active class to nav link
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Load page-specific content
    switch (pageId) {
        case 'products':
            loadProducts();
            break;
        case 'cart':
            loadCart();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'admin':
            loadAdminDashboard();
            break;
    }
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    let filteredProducts = [...products];

    // Apply category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter && categoryFilter.value) {
        filteredProducts = Product.getListByCategory(filteredProducts, categoryFilter.value);
    }

    // Apply sort filter
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'popularity':
                filteredProducts = Product.getListByHotSelling(filteredProducts);
                break;
        }
    }

    productsGrid.innerHTML = filteredProducts.map(product => {
        const isAdmin = currentUser instanceof Admin;
        
        return `
            <div class="product-card">
                <div class="product-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-stock">Stock: ${product.stock} | Purchased: ${product.purchaseCount}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-sm" onclick="viewProductDetails(${product.productId})">
                            <i class="fas fa-eye"></i> View
                        </button>
                        ${isAdmin ? `
                            <button class="btn btn-warning btn-sm" onclick="showEditStockModal(${product.productId})">
                                <i class="fas fa-edit"></i> Edit Stock
                            </button>
                            <button class="btn btn-info btn-sm" onclick="showEditDetailsModal(${product.productId})">
                                <i class="fas fa-cog"></i> Edit Details
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="showDeleteProductModal(${product.productId})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        ` : `
                            <button class="btn btn-secondary btn-sm" onclick="addToCart(${product.productId})">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                            <button class="btn btn-success btn-sm" onclick="showAddReviewForm(${product.productId})">
                                <i class="fas fa-star"></i> Add Review
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!currentUser) {
        cartItems.innerHTML = '<p>Please login to view your cart.</p>';
        cartTotal.textContent = '0.00';
        checkoutBtn.disabled = true;
        return;
    }

    if (currentUser instanceof Admin) {
        cartItems.innerHTML = '<p>Admins cannot access the shopping cart. Please use a customer account for shopping.</p>';
        cartTotal.textContent = '0.00';
        checkoutBtn.disabled = true;
        return;
    }

    const userCart = currentUser.getCart();
    
    if (userCart.products.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0.00';
        checkoutBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = userCart.products.map(product => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">$${product.price.toFixed(2)}</div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.productId})">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `).join('');

    cartTotal.textContent = userCart.getTotal().toFixed(2);
    checkoutBtn.disabled = false;
}

function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    const ordersHeading = document.getElementById('orders-heading');
    if (!ordersList) return;

    if (!currentUser) {
        if (ordersHeading) ordersHeading.textContent = 'My Orders';
        ordersList.innerHTML = '<p>Please login to view your orders.</p>';
        return;
    }

    let userOrders;
    if (currentUser instanceof Admin) {
        userOrders = orders;
        if (ordersHeading) ordersHeading.textContent = 'All Customer Orders';
    } else if (currentUser instanceof Customer) {
        userOrders = orders.filter(o => o.customerId === currentUser.customerId);
        if (ordersHeading) ordersHeading.textContent = 'My Orders';
    } else {
        userOrders = [];
        if (ordersHeading) ordersHeading.textContent = 'My Orders';
    }

    if (userOrders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }

    ordersList.innerHTML = userOrders.map(order => {
        // Find customer details for admin view
        let customerDetails = '';
        if (currentUser instanceof Admin) {
            const customer = users.find(u => u.customerId === order.customerId);
            if (customer) {
                customerDetails = `
                    <div class="customer-details">
                        <div class="customer-info">
                            <strong>Customer:</strong> ${customer.username}<br>
                            <strong>Phone:</strong> ${customer.phoneNumber}<br>
                            <strong>Address:</strong> ${customer.address || 'Not provided'}
                        </div>
                    </div>
                `;
            } else {
                customerDetails = `
                    <div class="customer-details">
                        <div class="customer-info">
                            <strong>Customer ID:</strong> ${order.customerId || 'Unknown'}<br>
                            <em>Customer details not found</em>
                        </div>
                    </div>
                `;
            }
        }

        return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.orderId}</div>
                    <div class="order-status ${order.status.toLowerCase()}">${order.status}</div>
                    ${(currentUser instanceof Admin) ? `<div class="order-customer" style="font-weight:bold;color:#A27B5C;">Customer ID: ${order.customerId ? order.customerId : 'Unknown'}</div>` : ''}
                </div>
                ${customerDetails}
                <div class="order-products">
                    ${order.productList.map(product => `
                        <div class="order-product">
                            <span>${product.name}</span>
                            <span>$${product.price.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">Total: $${order.totalAmount.toFixed(2)}</div>
            </div>
        `;
    }).join('');
}

function loadAdminDashboard() {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Access denied. Admin privileges required.', 'error');
        showPage('home');
        return;
    }

    const salesReport = currentUser.viewSalesReport();
    document.getElementById('total-sales').textContent = salesReport.totalSales.toFixed(2);
    document.getElementById('total-orders').textContent = salesReport.totalOrders;
    document.getElementById('total-products').textContent = salesReport.totalProducts;

    // Update category statistics
    const stats = getCategoryStatistics();
    document.getElementById('books-count').textContent = stats.books;
    document.getElementById('stationery-count').textContent = stats.stationery;

    // User Profile Management Section
    let userMgmtSection = document.getElementById('user-mgmt-section');
    if (!userMgmtSection) {
        userMgmtSection = document.createElement('div');
        userMgmtSection.id = 'user-mgmt-section';
        userMgmtSection.innerHTML = `
            <h3 style="margin-top:2rem;">User Profile Management</h3>
            <div id="user-list"></div>
            <div id="edit-user-modal" class="modal" style="display:none;">
                <div class="modal-content" style="max-width:400px;">
                    <span class="close" onclick="closeModal('edit-user-modal')">&times;</span>
                    <h4>Edit User Profile</h4>
                    <form id="edit-user-form">
                        <input type="hidden" id="edit-user-id">
                        <label>Username:</label>
                        <input type="text" id="edit-username" required><br>
                        <label>Phone:</label>
                        <input type="text" id="edit-phone" required><br>
                        <label>Password:</label>
                        <input type="password" id="edit-password" required><br>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        `;
        document.querySelector('.admin-card').appendChild(userMgmtSection);
    }
    renderUserList();
}

function renderUserList() {
    const userListDiv = document.getElementById('user-list');
    if (!userListDiv) return;
    const customerUsers = users.filter(u => u.customerId);
    if (customerUsers.length === 0) {
        userListDiv.innerHTML = '<p>No customers found.</p>';
        return;
    }
    userListDiv.innerHTML = customerUsers.map(u => `
        <div class="user-card" style="border:1px solid #ccc; border-radius:6px; padding:1rem; margin:0.5rem 0; display:flex; align-items:center; justify-content:space-between;">
            <div>
                <strong>${u.username}</strong> <span style="color:#A27B5C;">(ID: ${u.customerId})</span><br>
                <span>Phone: ${u.phoneNumber}</span>
            </div>
            <div>
                <button class="btn btn-secondary" onclick="showEditUserModal('${u.customerId}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${u.customerId}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function showEditUserModal(customerId) {
    const user = users.find(u => u.customerId === customerId);
    if (!user) return;
    document.getElementById('edit-user-id').value = user.customerId;
    document.getElementById('edit-username').value = user.username;
    document.getElementById('edit-phone').value = user.phoneNumber;
    document.getElementById('edit-password').value = user.password;
    document.getElementById('edit-user-modal').style.display = 'block';
}

// Product functions
function viewProductDetails(productId) {
    const product = products.find(p => p.productId === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-detail-content');

    content.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Purchase Count:</strong> ${product.purchaseCount}</p>
        
        <h4>Reviews (${product.reviews.length})</h4>
        ${product.reviews.length > 0 ? product.reviews.map(review => `
            <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 5px;">
                <p><strong>Customer:</strong> ${review.customerId || 'Anonymous'}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(review.rating)}</p>
                <p><strong>Comment:</strong> ${review.comment}</p>
            </div>
        `).join('') : '<p>No reviews yet.</p>'}
        
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="addToCart(${product.productId})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button class="btn btn-secondary" onclick="showAddReviewForm(${product.productId})">
                <i class="fas fa-star"></i> Add Review
            </button>
        </div>
    `;

    modal.style.display = 'block';
}

function addToCart(productId) {
    if (!currentUser) {
        showMessage('Please login to add items to cart.', 'error');
        return;
    }

    if (currentUser instanceof Admin) {
        showMessage('Admins cannot add items to cart. Please use a customer account.', 'error');
        return;
    }

    const product = products.find(p => p.productId === productId);
    if (!product) {
        showMessage('Product not found.', 'error');
        return;
    }

    if (product.stock <= 0) {
        showMessage('This product is out of stock.', 'error');
        return;
    }

    if (!currentUser.cart) {
        currentUser.cart = new Cart();
    }

    currentUser.cart.addProduct(product);
    saveCurrentUser();
    updateCartCount();
    showMessage(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    if (!currentUser || !(currentUser instanceof Customer)) return;

    const userCart = currentUser.getCart();
    const product = userCart.products.find(p => p.productId === productId);
    if (product) {
        userCart.removeProduct(product);
        loadCart();
        updateCartCount();
        showMessage('Product removed from cart!', 'success');
    }
}

// Cart functions
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        if (!currentUser || currentUser instanceof Admin) {
            cartCount.textContent = '0';
            cartCount.style.display = 'none';
        } else {
            const count = currentUser.cart ? currentUser.cart.products.length : 0;
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }
}

function checkout() {
    if (!currentUser || !currentUser.cart || currentUser.cart.products.length === 0) {
        showMessage('Please login and add items to cart first.', 'error');
        return;
    }

    const order = new Order();
    order.setProducts(currentUser.cart.products);
    order.customerId = currentUser.customerId;
    order.status = 'Pending';
    
    // Update product stock
    order.productList.forEach(product => {
        const originalProduct = products.find(p => p.productId === product.productId);
        if (originalProduct) {
            const oldStock = originalProduct.stock;
            originalProduct.stock -= 1;
            originalProduct.purchaseCount += 1;
            
            // Create stock update notification
            notifyStockUpdate(originalProduct, oldStock, originalProduct.stock);
        }
    });

    orders.push(order);
    
    // Add order to customer's order history
    if (currentUser instanceof Customer) {
        currentUser.orders.push(order);
    }
    
    // Create order status notification
    notifyOrderStatusUpdate(order, 'Pending');
    
    // Clear cart
    currentUser.cart = new Cart();
    
    // Save data
    saveOrders();
    saveProducts();
    saveCurrentUser();
    syncCustomerOrders();
    
    // Update UI
    updateCartCount();
    loadCart();
    
    showMessage('Order placed successfully! Check your notifications for updates.', 'success');
}

// Admin functions
function generateSalesReport() {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can generate sales reports.', 'error');
        return;
    }

    const report = currentUser.viewSalesReport();
    document.getElementById('total-sales').textContent = report.totalSales.toFixed(2);
    document.getElementById('total-orders').textContent = report.totalOrders;
    document.getElementById('total-products').textContent = report.totalProducts;
    
    // Add category statistics
    const booksCount = products.filter(p => p.category === 'Books').length;
    const stationeryCount = products.filter(p => p.category === 'Stationery').length;
    
    showMessage(`Sales Report Generated! Books: ${booksCount}/5, Stationery: ${stationeryCount}/5`, 'success');
}

function getCategoryStatistics() {
    const booksCount = products.filter(p => p.category === 'Books').length;
    const stationeryCount = products.filter(p => p.category === 'Stationery').length;
    
    return {
        books: booksCount,
        stationery: stationeryCount,
        booksMax: 5,
        stationeryMax: 5
    };
}

function backupData() {
    if (!currentUser || !(currentUser instanceof Admin)) return;
    currentUser.backupData();
}

function fetchBackup() {
    if (!currentUser || !(currentUser instanceof Admin)) return;
    Database.fetchBackup();
    loadProducts();
    loadOrders();
}

// Authentication functions
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.style.display = 'block';
}

function showRegisterModal() {
    const modal = document.getElementById('register-modal');
    modal.style.display = 'block';
}

function saveCurrentUser() {
    if (currentUser) {
        localStorage.setItem('panmark_current_user', JSON.stringify({
            username: currentUser.username,
            password: currentUser.password,
            phoneNumber: currentUser.phoneNumber,
            address: currentUser.address || '',
            customerId: currentUser.customerId || null,
            adminId: currentUser.adminId || null,
            type: currentUser instanceof Admin ? 'admin' : 'customer'
        }));
    } else {
        localStorage.removeItem('panmark_current_user');
    }
}

function loadCurrentUser() {
    const data = localStorage.getItem('panmark_current_user');
    if (data) {
        const u = JSON.parse(data);
        if (u.type === 'admin') {
            currentUser = new Admin(u.username, u.password, u.phoneNumber, u.adminId);
        } else {
            currentUser = new Customer(u.username, u.password, u.phoneNumber, u.customerId, u.orders || [], u.address || '');
        }
    } else {
        currentUser = null;
    }
}

function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    // No phone number required for login

    // Try to find user in users array
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user.customerId ? new Customer(user.username, user.password, user.phoneNumber, user.customerId, user.orders || [], user.address || '') : new User(user.username, user.password, user.phoneNumber);
        saveCurrentUser();
        syncCustomerOrders();
        showMessage('Login successful!', 'success');
    } else if (username === 'admin' && password === 'admin123') {
        currentUser = new Admin(username, password, '', 'ADM001');
        saveCurrentUser();
        showMessage('Admin login successful!', 'success');
    } else {
        showMessage('Invalid credentials!', 'error');
        return;
    }

    updateUIAfterLogin();
    closeModal('login-modal');
}

function register(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('register-phone').value;
    const address = document.getElementById('register-address').value;
    // User type field removed; always register as customer

    // Check if username already exists
    if (users.some(u => u.username === username)) {
        showMessage('Username already exists!', 'error');
        return;
    }

    const newUser = new Customer(username, password, phone, 'CUST' + Date.now(), [], address);
    users.push(newUser);
    saveUsers();
    currentUser = newUser;
    saveCurrentUser();
    showMessage('Registration successful!', 'success');
    updateUIAfterLogin();
    closeModal('register-modal');
}

function logout() {
    currentUser = null;
    saveCurrentUser();
    updateUIAfterLogout();
    showMessage('Logged out successfully!', 'success');
    showPage('home');
}

function updateUIAfterLogin() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
    const adminLink = document.getElementById('admin-link');
    const cartLink = document.getElementById('cart-link');
    const notificationsBtn = document.getElementById('notifications-btn');

    if (currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        notificationsBtn.style.display = 'inline-block';
        
        if (currentUser instanceof Admin) {
            adminLink.style.display = 'inline-block';
            cartLink.style.display = 'none'; // Hide cart for admin
        } else {
            adminLink.style.display = 'none';
            cartLink.style.display = 'inline-block'; // Show cart for customers
        }
        
        userInfo.textContent = `Welcome, ${currentUser.username}!`;
        userInfo.style.display = 'inline-block';
        
        updateCartCount();
        updateNotificationCount();
    }
}

function updateUIAfterLogout() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
    const adminLink = document.getElementById('admin-link');
    const cartLink = document.getElementById('cart-link');
    const notificationsBtn = document.getElementById('notifications-btn');

    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    notificationsBtn.style.display = 'none';
    adminLink.style.display = 'none';
    cartLink.style.display = 'inline-block'; // Show cart for non-logged users
    userInfo.style.display = 'none';
    
    updateCartCount();
    updateNotificationCount();
}

// Utility functions
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Show the Add Review modal for a product
function showAddReviewForm(productId) {
    if (!currentUser || !(currentUser instanceof Customer)) {
        showMessage('Please login as a customer to add a review.', 'error');
        return;
    }
    document.getElementById('review-product-id').value = productId;
    document.getElementById('review-rating').value = '';
    document.getElementById('review-comment').value = '';
    document.getElementById('review-modal').style.display = 'block';
}

// Handle review form submission
function submitReview(event) {
    event.preventDefault();
    if (!currentUser || !(currentUser instanceof Customer)) {
        showMessage('Please login as a customer to add a review.', 'error');
        return;
    }
    const productId = parseInt(document.getElementById('review-product-id').value);
    const rating = parseInt(document.getElementById('review-rating').value);
    const comment = document.getElementById('review-comment').value.trim();
    if (!rating || !comment) {
        showMessage('Please provide both a rating and a comment.', 'error');
        return;
    }
    const product = products.find(p => p.productId === productId);
    if (!product) {
        showMessage('Product not found!', 'error');
        return;
    }
    const reviewId = Date.now();
    const review = new Review(reviewId, comment, rating);
    currentUser.addReview(product, review);
    closeModal('review-modal');
    viewProductDetails(productId); // Refresh product details modal
}

// Load users from localStorage
function loadUsers() {
    const usersData = localStorage.getItem('panmark_users');
    if (usersData) {
        users = JSON.parse(usersData).map(u => {
            if (u.customerId) {
                // Restore as Customer, including orders array and address
                const c = new Customer(u.username, u.password, u.phoneNumber, u.customerId, u.orders || [], u.address || '');
                return c;
            }
            // Fallback to User
            return new User(u.username, u.password, u.phoneNumber);
        });
    } else {
        users = [];
    }
}

// Save users to localStorage
function saveUsers() {
    // Save orders array and address for each user (especially customers)
    const usersToSave = users.map(u => {
        if (u instanceof Customer) {
            return {
                username: u.username,
                password: u.password,
                phoneNumber: u.phoneNumber,
                customerId: u.customerId,
                orders: u.orders || [],
                address: u.address || ''
            };
        } else if (u instanceof Admin) {
            return {
                username: u.username,
                password: u.password,
                phoneNumber: u.phoneNumber,
                adminId: u.adminId
            };
        } else {
            return {
                username: u.username,
                password: u.password,
                phoneNumber: u.phoneNumber
            };
        }
    });
    localStorage.setItem('panmark_users', JSON.stringify(usersToSave));
}

// Show all registered accounts (for admin/debug)
function showRegisteredAccounts() {
    let msg = 'Registered Accounts:\n';
    users.forEach(u => {
        msg += `Username: ${u.username}, Type: ${u.customerId ? 'Customer' : 'User'}\n`;
    });
    alert(msg);
}

// Show the Add Product modal for a product
function showAddProductForm() {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can add products.', 'error');
        return;
    }
    document.getElementById('add-product-name').value = '';
    document.getElementById('add-product-category').value = '';
    document.getElementById('add-product-price').value = '';
    document.getElementById('add-product-stock').value = '';
    document.getElementById('add-product-modal').style.display = 'block';
}

function showEditProductForm() {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can edit products.', 'error');
        return;
    }

    const select = document.getElementById('edit-product-select');
    select.innerHTML = '<option value="">Select a product</option>' +
        products.map(p => `<option value="${p.productId}">${p.name} (${p.category})</option>`).join('');
    
    document.getElementById('edit-product-modal').style.display = 'block';
}

function loadEditProductFields(productId) {
    const product = products.find(p => p.productId == productId);
    if (!product) return;
    document.getElementById('edit-product-name').value = product.name;
    document.getElementById('edit-product-category').value = product.category;
    document.getElementById('edit-product-price').value = product.price;
    document.getElementById('edit-product-stock').value = product.stock;
}

function showEditStockModal(productId) {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can edit stock.', 'error');
        return;
    }

    const product = products.find(p => p.productId === productId);
    if (!product) {
        showMessage('Product not found.', 'error');
        return;
    }

    document.getElementById('edit-stock-product-name').value = product.name;
    document.getElementById('edit-stock-current').value = product.stock;
    document.getElementById('edit-stock-new').value = product.stock;
    document.getElementById('edit-stock-product-id').value = productId;
    
    document.getElementById('edit-stock-modal').style.display = 'block';
}

function showEditDetailsModal(productId) {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can edit product details.', 'error');
        return;
    }

    const product = products.find(p => p.productId === productId);
    if (!product) {
        showMessage('Product not found.', 'error');
        return;
    }

    document.getElementById('edit-details-name').value = product.name;
    document.getElementById('edit-details-category').value = product.category;
    document.getElementById('edit-details-price').value = product.price;
    document.getElementById('edit-details-product-id').value = productId;
    
    document.getElementById('edit-details-modal').style.display = 'block';
}

function showDeleteProductModal(productId) {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can delete products.', 'error');
        return;
    }

    const product = products.find(p => p.productId === productId);
    if (!product) {
        showMessage('Product not found.', 'error');
        return;
    }

    // Populate the delete confirmation modal
    document.getElementById('delete-product-name').textContent = product.name;
    document.getElementById('delete-product-category').textContent = product.category;
    document.getElementById('delete-product-price').textContent = product.price.toFixed(2);
    document.getElementById('delete-product-stock').textContent = product.stock;
    
    // Store the product ID for deletion
    document.getElementById('delete-product-modal').setAttribute('data-product-id', productId);
    
    document.getElementById('delete-product-modal').style.display = 'block';
}

function confirmDeleteProduct() {
    const productId = parseInt(document.getElementById('delete-product-modal').getAttribute('data-product-id'));
    
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can delete products.', 'error');
        return;
    }

    const product = products.find(p => p.productId === productId);
    if (!product) {
        showMessage('Product not found.', 'error');
        return;
    }

    // Remove product from products array
    const productIndex = products.findIndex(p => p.productId === productId);
    if (productIndex !== -1) {
        const deletedProduct = products[productIndex];
        products.splice(productIndex, 1);
        
        // Create notification about product deletion
        createNotification('general', 'Product Deleted', `Product "${deletedProduct.name}" has been deleted from the inventory.`);
        
        // Save changes
        saveProducts();
        loadProducts();
        
        // Close modal
        closeModal('delete-product-modal');
        
        showMessage(`Product "${deletedProduct.name}" has been deleted successfully.`, 'success');
    } else {
        showMessage('Error deleting product.', 'error');
    }
}

function addProduct(event) {
    event.preventDefault();
    
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can add products.', 'error');
        return;
    }

    const name = document.getElementById('add-product-name').value;
    const category = document.getElementById('add-product-category').value;
    const price = parseFloat(document.getElementById('add-product-price').value);
    const stock = parseInt(document.getElementById('add-product-stock').value);

    if (name && category && price >= 0 && stock >= 0) {
        // Check if category already has 5 items
        const categoryCount = products.filter(p => p.category === category).length;
        if (categoryCount >= 5) {
            showMessage(`Cannot add more products to ${category} category. Maximum 5 items allowed per category.`, 'error');
            return;
        }

        const newProductId = Math.max(...products.map(p => p.productId), 0) + 1;
        const newProduct = new Product(newProductId, name, category, price, stock);
        products.push(newProduct);
        
        // Create stock notification for new product
        notifyStockUpdate(newProduct, 0, stock);
        
        saveProducts();
        loadProducts();
        closeModal('add-product-modal');
        document.getElementById('add-product-form').reset();
        showMessage('Product added successfully!', 'success');
    } else {
        showMessage('Please fill all fields correctly.', 'error');
    }
}

function editProduct(event) {
    event.preventDefault();
    
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can edit products.', 'error');
        return;
    }

    const productId = parseInt(document.getElementById('edit-product-select').value);
    const name = document.getElementById('edit-product-name').value;
    const category = document.getElementById('edit-product-category').value;
    const price = parseFloat(document.getElementById('edit-product-price').value);
    const stock = parseInt(document.getElementById('edit-product-stock').value);

    const product = products.find(p => p.productId === productId);
    if (product && name && category && price >= 0 && stock >= 0) {
        const oldStock = product.stock;
        product.name = name;
        product.category = category;
        product.price = price;
        product.stock = stock;
        
        // Create stock notification if stock changed
        if (oldStock !== stock) {
            notifyStockUpdate(product, oldStock, stock);
        }
        
        saveProducts();
        loadProducts();
        closeModal('edit-product-modal');
        document.getElementById('edit-product-form').reset();
        showMessage('Product updated successfully!', 'success');
    } else {
        showMessage('Please fill all fields correctly.', 'error');
    }
}

function editStock(event) {
    event.preventDefault();
    
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can edit stock.', 'error');
        return;
    }

    const productId = parseInt(document.getElementById('edit-stock-product-id').value);
    const newStock = parseInt(document.getElementById('edit-stock-new').value);

    const product = products.find(p => p.productId === productId);
    if (product && newStock >= 0) {
        const oldStock = product.stock;
        product.stock = newStock;
        
        // Create stock notification
        notifyStockUpdate(product, oldStock, newStock);
        
        saveProducts();
        loadProducts();
        closeModal('edit-stock-modal');
        document.getElementById('edit-stock-form').reset();
        showMessage(`Stock updated successfully! ${product.name} stock changed from ${oldStock} to ${newStock}.`, 'success');
    } else {
        showMessage('Please enter a valid stock quantity.', 'error');
    }
}

function editDetails(event) {
    event.preventDefault();
    
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can edit product details.', 'error');
        return;
    }

    const productId = parseInt(document.getElementById('edit-details-product-id').value);
    const name = document.getElementById('edit-details-name').value;
    const category = document.getElementById('edit-details-category').value;
    const price = parseFloat(document.getElementById('edit-details-price').value);

    const product = products.find(p => p.productId === productId);
    if (product && name && category && price >= 0) {
        product.name = name;
        product.category = category;
        product.price = price;
        
        saveProducts();
        loadProducts();
        closeModal('edit-details-modal');
        document.getElementById('edit-details-form').reset();
        showMessage('Product details updated successfully!', 'success');
    } else {
        showMessage('Please fill all fields correctly.', 'error');
    }
}

function saveProducts() {
    localStorage.setItem('panmark_products', JSON.stringify(products));
}

function loadProductsFromStorage() {
    const data = localStorage.getItem('panmark_products');
    if (data) {
        const arr = JSON.parse(data);
        products = arr.map(p => {
            const prod = new Product(p.productId, p.name, p.category, p.price, p.stock);
            prod.purchaseCount = p.purchaseCount || 0;
            prod.reviews = p.reviews || [];
            return prod;
        });
    }
}

function saveOrders() {
    localStorage.setItem('panmark_orders', JSON.stringify(orders));
}

function loadOrdersFromStorage() {
    const data = localStorage.getItem('panmark_orders');
    if (data) {
        const arr = JSON.parse(data);
        orders = arr.map(o => {
            const order = new Order();
            order.orderId = o.orderId;
            order.orderDate = o.orderDate;
            order.totalAmount = o.totalAmount;
            order.status = o.status;
            order.productList = o.productList;
            return order;
        });
    }
}

function syncCustomerOrders() {
    if (currentUser && currentUser instanceof Customer) {
        // Sync both ways: update currentUser.orders from global orders, and update users[]
        currentUser.orders = orders.filter(o => o.customerId === currentUser.customerId);
        // Also update the user in users[]
        const idx = users.findIndex(u => u.customerId === currentUser.customerId);
        if (idx !== -1) {
            users[idx].orders = currentUser.orders;
            saveUsers();
        }
    }
}

function migrateOrdersForCustomerId() {
    // Try to assign customerId to old orders based on username if possible
    orders.forEach(order => {
        if (!order.customerId && order.productList && users.length > 0) {
            // Try to find a user who has this order in their orders array
            for (const user of users) {
                if (user.orders && Array.isArray(user.orders)) {
                    if (user.orders.some(o => o.orderId === order.orderId)) {
                        order.customerId = user.customerId || 'Unknown';
                        break;
                    }
                }
            }
            // If still not found, set to 'Unknown'
            if (!order.customerId) {
                order.customerId = 'Unknown';
            }
        }
    });
    saveOrders();
}

function resetShopData() {
    // Reset all product stock to initial values (e.g., 50 for demo, or 10 if not specified)
    products.forEach(product => {
        if (product.name === 'Premium Fountain Pen') product.stock = 50;
        else if (product.name === 'Leather Notebook') product.stock = 30;
        else if (product.name === 'Wireless Mouse') product.stock = 25;
        else if (product.name === 'Desk Lamp') product.stock = 20;
        else if (product.name === 'Coffee Mug') product.stock = 40;
        else if (product.name === 'Bluetooth Headphones') product.stock = 15;
        else if (product.name === 'Plant Pot') product.stock = 35;
        else if (product.name === 'Programming Book') product.stock = 10;
        else product.stock = 10;
        product.purchaseCount = 0;
    });
    // Clear all orders
    orders = [];
    saveProducts();
    saveOrders();
    syncCustomerOrders();
    loadProducts();
    loadOrders();
    showMessage('Shop data has been reset.', 'success');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage
    loadUsers();
    loadProductsFromStorage();
    loadOrdersFromStorage();
    loadNotificationsFromStorage();
    
    // Initialize sample data if empty
    if (products.length === 0) {
        initializeSampleData();
        saveProducts();
    }
    
    if (users.length === 0) {
        // Create default admin account
        const admin = new Admin('admin', 'admin123', '0123456789', 1);
        users.push(admin);
        saveUsers();
    }
    
    // Load current user if exists
    loadCurrentUser();
    
    // Navigation event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Modal event listeners
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
    document.getElementById('register-btn').addEventListener('click', showRegisterModal);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('notifications-btn').addEventListener('click', function() {
        loadNotifications();
        document.getElementById('notifications-modal').style.display = 'block';
    });
    
    // Form event listeners
    document.getElementById('login-form').addEventListener('submit', login);
    document.getElementById('register-form').addEventListener('submit', register);
    document.getElementById('add-product-form').addEventListener('submit', addProduct);
    document.getElementById('edit-product-form').addEventListener('submit', editProduct);
    document.getElementById('edit-stock-form').addEventListener('submit', editStock);
    document.getElementById('edit-details-form').addEventListener('submit', editDetails);
    document.getElementById('review-form').addEventListener('submit', submitReview);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    
    // Filter event listeners
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', loadProducts);
    }
    
    // Edit product select change event
    const editProductSelect = document.getElementById('edit-product-select');
    if (editProductSelect) {
        editProductSelect.addEventListener('change', function() {
            loadEditProductFields(this.value);
        });
    }
    
    // Close modal event listeners
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Update notification count on load
    updateNotificationCount();
    
    // Load initial page
    showPage('home');
    migrateOrdersForCustomerId();
    syncCustomerOrders();
    if (currentUser) {
        updateUIAfterLogin();
    }
    
    // Add reset button for admin
    if (document.getElementById('admin-link')) {
        const adminCard = document.querySelector('.admin-card');
        if (adminCard && !document.getElementById('reset-shop-btn')) {
            const resetBtn = document.createElement('button');
            resetBtn.id = 'reset-shop-btn';
            resetBtn.className = 'btn btn-danger';
            resetBtn.textContent = 'Reset Shop Data';
            resetBtn.style.marginTop = '1rem';
            resetBtn.onclick = function() {
                if (confirm('Are you sure you want to reset all item stock and orders?')) {
                    resetShopData();
                }
            };
            adminCard.appendChild(resetBtn);
        }
    }
});

function deleteUser(customerId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const idx = users.findIndex(u => u.customerId === customerId);
    if (idx !== -1) {
        users.splice(idx, 1);
        saveUsers();
        showMessage('User deleted.', 'success');
        renderUserList();
    }
}

// Notification Management Functions
function createNotification(type, title, message, userId = null) {
    const notificationId = Date.now();
    const notification = new Notification(notificationId, type, title, message, userId);
    notifications.push(notification);
    saveNotifications();
    updateNotificationCount();
    return notification;
}

function getNotificationsForUser(userId) {
    return notifications.filter(n => n.userId === null || n.userId === userId);
}

function getUnreadNotificationCount(userId) {
    const userNotifications = getNotificationsForUser(userId);
    return userNotifications.filter(n => !n.isRead).length;
}

function updateNotificationCount() {
    const notificationCount = document.getElementById('notification-count');
    if (currentUser && notificationCount) {
        const count = getUnreadNotificationCount(currentUser.customerId || currentUser.adminId);
        notificationCount.textContent = count;
        notificationCount.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    if (!notificationsList || !currentUser) return;

    const userNotifications = getNotificationsForUser(currentUser.customerId || currentUser.adminId);
    
    if (userNotifications.length === 0) {
        notificationsList.innerHTML = '<p>No notifications yet.</p>';
        return;
    }

    notificationsList.innerHTML = userNotifications.map(notification => `
        <div class="notification-item ${notification.type} ${!notification.isRead ? 'unread' : ''}" onclick="markNotificationAsRead(${notification.id})">
            <div class="notification-header">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-time">${notification.getTimeAgo()}</div>
            </div>
            <div class="notification-message">${notification.message}</div>
        </div>
    `).join('');
}

function markNotificationAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.markAsRead();
        saveNotifications();
        updateNotificationCount();
        loadNotifications();
    }
}

function markAllNotificationsAsRead() {
    const userId = currentUser?.customerId || currentUser?.adminId;
    notifications.forEach(notification => {
        if ((notification.userId === null || notification.userId === userId) && !notification.isRead) {
            notification.markAsRead();
        }
    });
    saveNotifications();
    updateNotificationCount();
    loadNotifications();
}

function clearAllNotifications() {
    const userId = currentUser?.customerId || currentUser?.adminId;
    notifications = notifications.filter(notification => 
        notification.userId !== null && notification.userId !== userId
    );
    saveNotifications();
    updateNotificationCount();
    loadNotifications();
}

function saveNotifications() {
    localStorage.setItem('panmark_notifications', JSON.stringify(notifications));
}

function loadNotificationsFromStorage() {
    const data = localStorage.getItem('panmark_notifications');
    if (data) {
        const arr = JSON.parse(data);
        notifications = arr.map(n => {
            const notification = new Notification(n.id, n.type, n.title, n.message, n.userId, n.isRead);
            notification.timestamp = n.timestamp;
            return notification;
        });
    }
}

// Auto-create notifications for stock updates and order status changes
function notifyStockUpdate(product, oldStock, newStock) {
    const title = 'Stock Update';
    const message = `Stock for "${product.name}" has been updated from ${oldStock} to ${newStock} units.`;
    createNotification('stock-update', title, message);
}

function notifyOrderStatusUpdate(order, newStatus) {
    const title = 'Order Status Update';
    const message = `Your order #${order.orderId} status has been updated to: ${newStatus}`;
    createNotification('order-update', title, message, order.customerId);
}

function showDeleteProductForm() {
    if (!currentUser || !(currentUser instanceof Admin)) {
        showMessage('Only admins can delete products.', 'error');
        return;
    }

    if (products.length === 0) {
        showMessage('No products available to delete.', 'info');
        return;
    }

    // Show the products page with delete functionality
    showPage('products');
    showMessage('Click the "Delete" button on any product to remove it from inventory.', 'info');
} 