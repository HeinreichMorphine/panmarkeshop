// Panmark Enterprise - Main Application Logic

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Robust check for GitHub Pages: initialize if users or products are missing or empty
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (!Array.isArray(users) || users.length === 0) {
            initializeMockUsers();
        }
    } catch (e) {
        initializeMockUsers();
    }
    try {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        if (!Array.isArray(products) || products.length === 0) {
            initializeMockProducts();
        }
    } catch (e) {
        initializeMockProducts();
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify([]));
    }
    initializeApp();
    loadPage('home');
});

// Mock data initialization
function initializeApp() {
    updateCartCount();
    updateUserSection();
    updateNavigation();
}

// Mock users data
function initializeMockUsers() {
    const users = [
        {
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            name: 'Administrator',
            address: '123 Admin St, City, Country',
            phone: '+1234567890',
            cusid: 'ADMIN'
        },
        {
            username: 'john_doe',
            password: 'password123',
            role: 'customer',
            name: 'John Doe',
            address: '456 Customer Ave, Town, Country',
            phone: '+1987654321',
            cusid: 'CUS0001'
        }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

// Mock products data
function initializeMockProducts() {
    const products = [
        // Books Category
        {
            id: 1,
            productName: "The Great Gatsby",
            category: "Books",
            price: 12.99,
            stock: 25,
            description: "A classic American novel by F. Scott Fitzgerald about the Jazz Age.",
            image: "assets/images/books/The_Great_Gatsby_Cover_1925_Retouched.jpg",
            sold: 0
        },
        {
            id: 2,
            productName: "To Kill a Mockingbird",
            category: "Books",
            price: 14.99,
            stock: 30,
            description: "Harper Lee's masterpiece about racial injustice in the American South.",
            image: "assets/images/books/800px-To_Kill_a_Mockingbird_(first_edition_cover).jpg",
            sold: 0
        },
        {
            id: 3,
            productName: "1984",
            category: "Books",
            price: 11.99,
            stock: 20,
            description: "George Orwell's dystopian novel about totalitarian surveillance.",
            image: "assets/images/books/1984_first_edition_cover.jpg",
            sold: 0
        },
        {
            id: 4,
            productName: "Pride and Prejudice",
            category: "Books",
            price: 9.99,
            stock: 35,
            description: "Jane Austen's romantic novel about love and social class.",
            image: "assets/images/books/pride-and-prejudice-71.jpg",
            sold: 0
        },
        {
            id: 5,
            productName: "The Hobbit",
            category: "Books",
            price: 15.99,
            stock: 28,
            description: "J.R.R. Tolkien's fantasy novel about Bilbo Baggins' adventure.",
            image: "assets/images/books/The_hobbit.jpg",
            sold: 0
        },
        {
            id: 6,
            productName: "Lord of the Flies",
            category: "Books",
            price: 10.99,
            stock: 22,
            description: "William Golding's novel about human nature and civilization.",
            image: "assets/images/books/9780399501487_mph_Lord_of_the_Flies.jpg",
            sold: 0
        },
        {
            id: 7,
            productName: "Animal Farm",
            category: "Books",
            price: 8.99,
            stock: 40,
            description: "George Orwell's allegorical novella about political corruption.",
            image: "assets/images/books/anima_farm.jpg",
            sold: 0
        },
        {
            id: 8,
            productName: "The Catcher in the Rye",
            category: "Books",
            price: 13.99,
            stock: 18,
            description: "J.D. Salinger's novel about teenage alienation and loss.",
            image: "assets/images/books/the-catcher-in-the-rye-by-j-d-salinger-9780241950432-3827174637612.jpg",
            sold: 0
        },
        {
            id: 9,
            productName: "Brave New World",
            category: "Books",
            price: 12.99,
            stock: 24,
            description: "Aldous Huxley's dystopian novel about a futuristic society.",
            image: "assets/images/books/Brave_New_World.jpg",
            sold: 0
        },
        {
            id: 10,
            productName: "Fahrenheit 451",
            category: "Books",
            price: 11.99,
            stock: 26,
            description: "Ray Bradbury's novel about censorship and book burning.",
            image: "assets/images/books/451_farreh.jpg",
            sold: 0
        },
       // Stationery Category
        {
            id: 11,
            productName: "Faber Castell Pen Pack",
            category: "Stationery",
            price: 3.40,
            stock: 50,
            description: "Pack of smooth-writing ballpoint pens.",
            image: "assets/images/stationery/ballpen.jpg",
            sold: 0
        },
        {
            id: 12,
            productName: "M&G 2B Pencil Pack",
            category: "Stationery",
            price: 7.50,
            stock: 40,
            description: "Set of high-quality pencils for writing and drawing.",
            image: "assets/images/stationery/pencil.jpg",
            sold: 0
        },
        {
            id: 13,
            productName: "Faber Castell Eraser",
            category: "Stationery",
            price: 1.05,
            stock: 100,
            description: "Soft eraser for clean erasing.",
            image: "assets/images/stationery/eraser.jpg",
            sold: 0
        },
        {
            id: 14,
            productName: "Paper Wirebound Notebook",
            category: "Stationery",
            price: 12.00,
            stock: 30,
            description: "Plain beige B6 notebook, 80 sheets, wirebound.",
            image: "assets/images/stationery/notebook.jpg",
            sold: 0
        },
        {
            id: 15,
            productName: "High Class Plastic Straight Ruler 15cm",
            category: "Stationery",
            price: 0.80,
            stock: 60,
            description: "Durable 6-inch (15cm) plastic ruler.",
            image: "assets/images/stationery/ruler.jpg",
            sold: 0
        },
        {
            id: 16,
            productName: "Stabilo Boss Original Highlighter Pen",
            category: "Stationery",
            price: 3.50,
            stock: 45,
            description: "Bright, long-lasting highlighter pen.",
            image: "assets/images/stationery/highlight.jpg",
            sold: 0
        },
        {
            id: 17,
            productName: "Artline 500A Whiteboard Marker Medium",
            category: "Stationery",
            price: 4.00,
            stock: 35,
            description: "Medium tip whiteboard marker, Artline 500A.",
            image: "assets/images/stationery/marker.jpg",
            sold: 0
        },
        {
            id: 18,
            productName: "HD10 ASTAR Stapler",
            category: "Stationery",
            price: 3.60,
            stock: 25,
            description: "Compact and durable stapler, model HD10 - ASTAR.",
            image: "assets/images/stationery/stapler.jpg",
            sold: 0
        },
        {
            id: 19,
            productName: "Max Staples No.3-1M",
            category: "Stationery",
            price: 2.00,
            stock: 80,
            description: "Max brand staples, No.3-1M size.",
            image: "assets/images/stationery/staples.jpg",
            sold: 0
        },
        {
            id: 20,
            productName: "A4 Paper IK Yellows 80gsm",
            category: "Stationery",
            price: 16.49,
            stock: 20,
            description: "A4 size, 80gsm, 500 sheets per ream, IK Yellows.",
            image: "assets/images/stationery/a4.jpg",
            sold: 0
        },
        {
            id: 21,
            productName: "3M Post-it Super Sticky Notes (Multi-Pad)",
            category: "Stationery",
            price: 7.90,
            stock: 55,
            description: "3M Post-it Super Sticky Notes, assorted colors, 3x3 inches.",
            image: "assets/images/stationery/sticky.jpg",
            sold: 0
        }
    ];
    localStorage.setItem('products', JSON.stringify(products));
}

// Navigation function
function navigateTo(page) {
    loadPage(page);
}

// Load page content
function loadPage(page) {
    const mainContent = document.getElementById('main-content');
    
    // Handle product-details with id parameter
    if (page.startsWith('product-details')) {
        const productId = page.includes('?id=') ? page.split('?id=')[1] : null;
        mainContent.innerHTML = getProductDetailsContent(productId);
        return;
    }
    
    switch(page) {
        case 'home':
            mainContent.innerHTML = getHomePageContent();
            break;
        case 'login':
            mainContent.innerHTML = getLoginPageContent();
            break;
        case 'products':
            mainContent.innerHTML = getProductsPageContent();
            break;
        case 'cart':
            mainContent.innerHTML = getCartPageContent();
            break;
        case 'orders':
            mainContent.innerHTML = getOrdersPageContent();
            break;
        case 'admin-dashboard':
            mainContent.innerHTML = getAdminDashboardContent();
            break;
        case 'customer-dashboard':
            mainContent.innerHTML = getCustomerDashboardContent();
            break;
        case 'customer-guide':
            mainContent.innerHTML = getCustomerGuideContent();
            break;
        case 'contact':
            mainContent.innerHTML = getContactContent();
            break;
        case 'reviews':
            mainContent.innerHTML = getReviewsPageContent();
            break;
        default:
            mainContent.innerHTML = getHomePageContent();
    }
}

// Authentication functions
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserSection();
        updateNavigation();
        
        if (user.role === 'admin') {
            loadPage('admin-dashboard');
        } else {
            loadPage('home');
        }
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    updateUserSection();
    updateNavigation();
    loadPage('home');
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function updateUserSection() {
    const userSection = document.getElementById('user-section');
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        userSection.innerHTML = `
            <span class="text-panmark-accent">Welcome, ${currentUser.name}</span>
            <a href="#" onclick="logout()" class="hover:text-panmark-accent transition-colors ml-4">Logout</a>
        `;
    } else {
        userSection.innerHTML = `
            <a href="#" onclick="navigateTo('login')" class="hover:text-panmark-accent transition-colors">Login</a>
        `;
    }
}

function updateNavigation() {
    const currentUser = getCurrentUser();
    const navContainer = document.querySelector('nav .flex.items-center.space-x-6');
    
    if (currentUser) {
        if (currentUser.role === 'admin') {
            // Admin navigation (no Contact tab, but Reviews tab is present)
            navContainer.innerHTML = `
                <a href="#" onclick="navigateTo('home')" class="hover:text-panmark-accent transition-colors">Dashboard</a>
                <a href="#" onclick="navigateTo('products')" class="hover:text-panmark-accent transition-colors">Manage Products</a>
                <a href="#" onclick="navigateTo('orders')" class="hover:text-panmark-accent transition-colors">All Orders</a>
                <a href="#" onclick="navigateTo('reviews')" class="hover:text-panmark-accent transition-colors">Reviews</a>
                <a href="#" onclick="navigateTo('admin-dashboard')" class="hover:text-panmark-accent transition-colors">Admin Panel</a>
                <div id="user-section">
                    <span class="text-panmark-accent">Welcome, ${currentUser.name}</span>
                    <a href="#" onclick="logout()" class="hover:text-panmark-accent transition-colors ml-4">Logout</a>
                </div>
            `;
        } else {
            // Customer navigation
            navContainer.innerHTML = `
                <a href="#" onclick="navigateTo('home')" class="hover:text-panmark-accent transition-colors">Home</a>
                <a href="#" onclick="navigateTo('products')" class="hover:text-panmark-accent transition-colors">Products</a>
                <a href="#" onclick="navigateTo('cart')" class="hover:text-panmark-accent transition-colors">
                    Cart <span id="cart-count" class="bg-panmark-accent text-white px-2 py-1 rounded-full text-xs">0</span>
                </a>
                <a href="#" onclick="navigateTo('customer-guide')" class="hover:text-panmark-accent transition-colors">Help</a>
                <a href="#" onclick="navigateTo('contact')" class="hover:text-panmark-accent transition-colors">Contact</a>
                <a href="#" onclick="navigateTo('reviews')" class="hover:text-panmark-accent transition-colors">Reviews</a>
                <a href="#" onclick="navigateTo('customer-dashboard')" class="hover:text-panmark-accent transition-colors">My Account</a>
                <div id="user-section">
                    <span class="text-panmark-accent">Welcome, ${currentUser.name}</span>
                    <a href="#" onclick="logout()" class="hover:text-panmark-accent transition-colors ml-4">Logout</a>
                </div>
            `;
            updateCartCount();
        }
    } else {
        // Guest navigation
        navContainer.innerHTML = `
            <a href="#" onclick="navigateTo('home')" class="hover:text-panmark-accent transition-colors">Home</a>
            <a href="#" onclick="navigateTo('products')" class="hover:text-panmark-accent transition-colors">Products</a>
            <a href="#" onclick="navigateTo('cart')" class="hover:text-panmark-accent transition-colors">
                Cart <span id="cart-count" class="bg-panmark-accent text-white px-2 py-1 rounded-full text-xs">0</span>
            </a>
            <a href="#" onclick="navigateTo('customer-guide')" class="hover:text-panmark-accent transition-colors">Help</a>
            <a href="#" onclick="navigateTo('contact')" class="hover:text-panmark-accent transition-colors">Contact</a>
            <a href="#" onclick="navigateTo('reviews')" class="hover:text-panmark-accent transition-colors">Reviews</a>
            <div id="user-section">
                <a href="#" onclick="navigateTo('login')" class="hover:text-panmark-accent transition-colors">Login</a>
            </div>
        `;
        updateCartCount();
    }
}

// Cart functions
function addToCart(productId, quantity = 1) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to add items to cart');
        return;
    }
    if (currentUser.role === 'admin') {
        alert('Admins cannot add items to cart.');
        return;
    }
    
    // Check stock availability
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
        alert('Product not found');
        return;
    }
    
    if (product.stock <= 0) {
        alert('This item is out of stock');
        return;
    }
    
    if (product.stock < quantity) {
        alert(`Only ${product.stock} items available in stock`);
        return;
    }
    
    const cartKey = `cart_${currentUser.username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    const existingItem = cart.find(item => item.productId === parseInt(productId));
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
            alert(`Cannot add more items. Only ${product.stock} items available in stock`);
            return;
        }
        existingItem.quantity = newQuantity;
    } else {
        cart.push({
            productId: parseInt(productId),
            quantity: quantity
        });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(productId) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const cartKey = `cart_${currentUser.username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    cart = cart.filter(item => item.productId !== parseInt(productId));
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
    loadPage('cart');
}

function updateCartCount() {
    const currentUser = getCurrentUser();
    const cartCount = document.getElementById('cart-count');
    
    if (currentUser && currentUser.role === 'customer') {
        const cartKey = `cart_${currentUser.username}`;
        const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    } else {
        cartCount.textContent = '0';
    }
}

function getCartItems() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const cartKey = `cart_${currentUser.username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const products = JSON.parse(localStorage.getItem('products'));
    
    return cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...product,
            quantity: item.quantity
        };
    });
}

// Order functions
function showPaymentModal(onPay) {
    // Remove existing modal if present
    const existing = document.getElementById('payment-modal-overlay');
    if (existing) existing.remove();
    // Modal HTML
    const modal = document.createElement('div');
    modal.id = 'payment-modal-overlay';
    modal.className = 'fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
        <button id="close-payment-modal" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">&times;</button>
        <h2 class="text-2xl font-bold mb-4 text-panmark-dark">Choose Payment Method</h2>
        <form id="payment-method-form">
          <div class="mb-4">
            <label class="block mb-2 font-semibold">Select a payment method:</label>
            <div class="space-y-2">
              <label class="flex items-center"><input type="radio" name="payment-method" value="FPX" required class="mr-2">FPX (Online Banking)</label>
              <label class="flex items-center"><input type="radio" name="payment-method" value="Credit/Debit Card" class="mr-2">Credit/Debit Card</label>
              <label class="flex items-center"><input type="radio" name="payment-method" value="GrabPay" class="mr-2">GrabPay</label>
              <label class="flex items-center"><input type="radio" name="payment-method" value="Touch 'n Go" class="mr-2">Touch 'n Go</label>
            </div>
          </div>
          <button type="submit" class="w-full bg-panmark-accent text-white py-2 rounded-md hover:bg-opacity-90 transition-colors font-semibold">Pay Now</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-payment-modal').onclick = () => modal.remove();
    document.getElementById('payment-method-form').onsubmit = function(e) {
        e.preventDefault();
        const method = document.querySelector('input[name="payment-method"]:checked').value;
        modal.remove();
        onPay(method);
    };
}

function showWhatsAppNotification() {
    // Remove existing notification if present
    const existing = document.getElementById('wa-notification');
    if (existing) existing.remove();
    const notif = document.createElement('div');
    notif.id = 'wa-notification';
    notif.className = 'fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    notif.innerHTML = '<b>Receipt sent!</b> Your receipt has been sent to your WhatsApp.';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
}

function createOrder() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert('Cart is empty');
        return;
    }
    // Discount config
    const BOOK_DISCOUNT_PERCENT = 10; // 10% off all books
    const PEN_BULK_MIN = 5; // Minimum quantity for pen discount
    const PEN_BULK_DISCOUNT = 1; // $1 off per pen if 5 or more
    // Calculate discounts
    let bookDiscount = 0;
    let penBulkDiscount = 0;
    const discountedItems = cartItems.map(item => {
        let discount = 0;
        // Book discount
        if (item.category === 'Books') {
            discount = (item.price * item.quantity) * (BOOK_DISCOUNT_PERCENT / 100);
            bookDiscount += discount;
        }
        // Bulk pen discount
        if (item.category === 'Stationery' && /pen/i.test(item.productName) && item.quantity >= PEN_BULK_MIN) {
            discount += PEN_BULK_DISCOUNT * item.quantity;
            penBulkDiscount += PEN_BULK_DISCOUNT * item.quantity;
        }
        return { ...item, discount };
    });
    const total = discountedItems.reduce((sum, item) => sum + (item.price * item.quantity - item.discount), 0);
    // Show payment modal
    showPaymentModal(function(paymentMethod) {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const users = JSON.parse(localStorage.getItem('users'));
        const userInfo = users.find(u => u.username === currentUser.username);
        const newOrder = {
            id: Date.now(),
            cusid: userInfo ? userInfo.cusid : '',
            userId: currentUser.username,
            userName: currentUser.name,
            address: userInfo ? userInfo.address : '',
            phone: userInfo ? userInfo.phone : '',
            adminId: 'admin',
            items: discountedItems,
            total: total,
            status: 'Pending',
            date: new Date().toISOString(),
            paymentMethod: paymentMethod,
            discounts: {
                bookDiscount: bookDiscount,
                penBulkDiscount: penBulkDiscount
            }
        };
        // Increment sold count for each product and decrement stock
        let products = JSON.parse(localStorage.getItem('products'));
        cartItems.forEach(item => {
            const idx = products.findIndex(p => p.id === item.id);
            if (idx !== -1) {
                products[idx].sold = (products[idx].sold || 0) + item.quantity;
                products[idx].stock = (products[idx].stock || 0) - item.quantity;
            }
        });
        localStorage.setItem('products', JSON.stringify(products));
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        // Clear cart
        const cartKey = `cart_${currentUser.username}`;
        localStorage.removeItem(cartKey);
        updateCartCount();
        showWhatsAppNotification();
        setTimeout(() => loadPage('orders'), 1200);
    });
}

// Review functions
function addReview(productId, rating, comment) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    const newReview = {
        id: Date.now(),
        productId: parseInt(productId),
        userId: currentUser.username,
        userName: currentUser.name,
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toISOString()
    };
    
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function getProductReviews(productId) {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    return reviews.filter(review => review.productId === parseInt(productId));
}

// Page content functions
function getHomePageContent() {
    return `
        <div class="text-center">
            <div class="bg-panmark-secondary text-white p-12 rounded-lg mb-8">
                <h1 class="text-4xl font-bold mb-4">Welcome to Panmark Enterprise</h1>
                <p class="text-xl mb-6">Your premier destination for quality stationery and books</p>
                <a href="#" onclick="navigateTo('products')" class="bg-panmark-accent text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                    Browse Products
                </a>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Books</h2>
                    <p class="text-gray-600 mb-4">Discover our collection of classic and contemporary literature</p>
                    <a href="#" onclick="navigateTo('products')" class="text-panmark-accent hover:underline">View Books →</a>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Stationery</h2>
                    <p class="text-gray-600 mb-4">Premium writing instruments and office supplies</p>
                    <a href="#" onclick="navigateTo('products')" class="text-panmark-accent hover:underline">View Stationery →</a>
                </div>
            </div>
        </div>
    `;
}

function getLoginPageContent() {
    return `
        <div class="max-w-md mx-auto">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-panmark-dark mb-6 text-center">Login</h2>
                <form onsubmit="handleLogin(event)">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input type="text" id="username" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-panmark-accent" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-panmark-accent" required>
                    </div>
                    <button type="submit" class="w-full bg-panmark-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">
                        Login
                    </button>
                </form>
                <div class="mt-4 text-center text-sm text-gray-600">
                    <p>Demo Accounts:</p>
                    <p>Admin: admin / admin123</p>
                    <p>Customer: john_doe / password123</p>
                </div>
            </div>
        </div>
    `;
}

function getProductsPageContent() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const categories = [...new Set(products.map(p => p.category))];
  
    return `
      <div>
        <h1 class="text-3xl font-bold text-panmark-dark mb-6">Products</h1>
  
        <!-- Category Filters -->
        <div class="mb-6 flex flex-wrap gap-4">
          <button onclick="filterProducts('all')" class="filter-btn bg-panmark-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            All Products
          </button>
          ${categories.map(category => `
            <button onclick="filterProducts('${category}')" class="filter-btn bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-panmark-secondary hover:text-white transition-colors">
              ${category}
            </button>
          `).join('')}
        </div>
  
        <!-- Search Bar -->
        <div class="mb-4">
          <input type="text" id="search-input" placeholder="Search products..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-panmark-accent"
            onkeyup="searchProducts()">
        </div>
  
        <!-- Product Grid -->
        <div id="products-grid" class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          ${products.map(product => `
            <div class="group w-[220px] min-h-[360px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-lg">
              
              <!-- Image -->
              <div class="h-[180px] flex items-center justify-center mb-4">
                <img src="${product.image}" alt="${product.productName}" class="max-h-full max-w-full object-contain" />
              </div>
  
              <!-- Title -->
              <h3 class="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">${product.productName}</h3>
  
              <!-- Category -->
              <p class="text-xs text-gray-500 mb-1">${product.category}</p>
  
              <!-- Price -->
              <p class="text-lg font-bold text-panmark-accent mb-2">$${product.price}</p>
  
              <!-- Stock + Sold -->
              <div class="flex justify-between text-xs text-gray-600 mb-2">
                <span>Stock: <b>${product.stock}</b></span>
                <span>Sold: <b>${product.sold || 0}</b></span>
              </div>
  
              <!-- Buttons (show on hover) -->
              <div class="hidden group-hover:flex gap-2 mt-auto">
                <button onclick="navigateTo('product-details?id=${product.id}')" class="flex-1 bg-panmark-secondary text-white px-2 py-1 rounded-md text-xs hover:bg-opacity-90">
                  View
                </button>
                <button onclick="addToCart(${product.id})" class="flex-1 ${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-panmark-accent hover:bg-opacity-90'} text-white px-2 py-1 rounded-md text-xs" ${product.stock <= 0 ? 'disabled' : ''}>
                  ${product.stock <= 0 ? 'Out of Stock' : 'Add'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  

function getCartPageContent() {
    const cartItems = getCartItems();
    
    if (cartItems.length === 0) {
        return `
            <div class="text-center">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Your Cart is Empty</h2>
                <p class="text-gray-600 mb-6">Add some products to get started!</p>
                <a href="#" onclick="navigateTo('products')" class="bg-panmark-accent text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                    Browse Products
                </a>
            </div>
        `;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return `
        <div>
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Shopping Cart</h1>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                ${cartItems.map(item => `
                    <div class="flex items-center p-6 border-b">
                        <img src="${item.image}" alt="${item.productName}" class="w-20 h-20 object-contain rounded">
                        <div class="flex-1 ml-4">
                            <h3 class="text-lg font-semibold text-panmark-dark">${item.productName}</h3>
                            <p class="text-gray-600">${item.category}</p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-2">
                                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                                        class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                                    -
                                </button>
                                <span class="w-8 text-center">${item.quantity}</span>
                                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                                        class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                                    +
                                </button>
                            </div>
                            <p class="text-panmark-accent font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
                            <button onclick="removeFromCart(${item.id})" 
                                    class="text-red-500 hover:text-red-700">
                                Remove
                            </button>
                        </div>
                    </div>
                `).join('')}
                
                <div class="p-6 bg-gray-50">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xl font-bold">Total:</span>
                        <span class="text-2xl font-bold text-panmark-accent">$${total.toFixed(2)}</span>
                    </div>
                    <button onclick="createOrder()" 
                            class="w-full bg-panmark-accent text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getOrdersPageContent() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return '<div class="text-center"><h2 class="text-2xl text-red-600">Please login to view orders</h2></div>';
    }
    
    const orders = JSON.parse(localStorage.getItem('orders'));
    const userOrders = currentUser.role === 'admin' ? orders : orders.filter(order => order.userId === currentUser.username);
    
    if (userOrders.length === 0) {
        return `
            <div class="text-center">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">No Orders Found</h2>
                <p class="text-gray-600">You haven't placed any orders yet.</p>
            </div>
        `;
    }
    
    return `
        <div>
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Order History</h1>
            
            <div class="space-y-6">
                ${userOrders.map(order => `
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-panmark-dark">Order #${order.id}</h3>
                                <p class="text-gray-600">${new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-panmark-accent font-bold text-xl">$${order.total.toFixed(2)}</p>
                                <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                    ${order.status}
                                </span>
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            ${order.items.map(item => `
                                <div class="flex justify-between items-center py-2 border-b">
                                    <div class="flex items-center">
                                        <img src="${item.image}" alt="${item.productName}" class="w-20 h-20 object-contain rounded">
                                        <div class="ml-3">
                                            <p class="font-semibold">${item.productName}</p>
                                            <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                                        </div>
                                    </div>
                                    <p class="text-panmark-accent font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getAdminDashboardContent() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        return '<div class="text-center"><h2 class="text-2xl text-red-600">Access denied</h2></div>';
    }
    
    const products = JSON.parse(localStorage.getItem('products'));
    const orders = JSON.parse(localStorage.getItem('orders'));
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    
    return `
        <div>
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Admin Dashboard</h1>
            
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-panmark-dark mb-2">Total Products</h3>
                    <p class="text-3xl font-bold text-panmark-accent">${products.length}</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-panmark-dark mb-2">Total Orders</h3>
                    <p class="text-3xl font-bold text-panmark-accent">${orders.length}</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-panmark-dark mb-2">Total Reviews</h3>
                    <p class="text-3xl font-bold text-panmark-accent">${reviews.length}</p>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Quick Actions</h2>
                <div class="space-y-3">
                    <a href="#" onclick="navigateTo('products')" class="block bg-panmark-secondary text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center">
                        Manage Products
                    </a>
                    <a href="#" onclick="navigateTo('orders')" class="block bg-panmark-accent text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center">
                        View All Orders
                    </a>
                    <button onclick="generateSalesReport()" class="block w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center font-bold">
                        Generate Sales Report
                    </button>
                    <button onclick="backupAllData()" class="block w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center font-bold">
                        Backup All Data
                    </button>
                    <button onclick="resetFakeDB()" class="block w-full bg-red-600 text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors text-center font-bold mt-2">
                        Reset Fake DB
                    </button>
                    <!-- Import Products Quick Action -->
                    <div class="flex flex-col gap-2 pt-2">
                        <input type="file" id="import-file" accept=".csv,.xlsx,.xls" class="block w-full border border-gray-300 rounded-md px-2 py-1" />
                        <button onclick="handleImportProducts()" class="block w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center font-bold">Import Products</button>
                        <div id="import-status" class="mt-1 text-sm"></div>
                    </div>
                    <!-- Import Backup Data Quick Action -->
                    <div class="flex flex-col gap-2 pt-2 border-t border-gray-200">
                        <label class="block text-sm font-bold text-panmark-dark mb-1">Import Backup Data</label>
                        <input type="file" id="backup-import-file" accept=".csv,.xlsx,.xls" class="block w-full border border-gray-300 rounded-md px-2 py-1 text-sm" />
                        <button onclick="handleImportBackupData()" class="block w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center font-bold text-sm">
                            Import Backup Data
                        </button>
                        <div id="backup-import-status" class="mt-1 text-xs text-gray-600"></div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-panmark-dark mb-6">Product Management</h2>
                <button onclick="showAddProductForm()" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors mb-4">
                    Add New Product
                </button>
                
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="px-4 py-2 text-left">ID</th>
                                <th class="px-4 py-2 text-left">Name</th>
                                <th class="px-4 py-2 text-left">Category</th>
                                <th class="px-4 py-2 text-left">Price</th>
                                <th class="px-4 py-2 text-left">Stock</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(product => `
                                <tr class="border-b">
                                    <td class="px-4 py-2">${product.id}</td>
                                    <td class="px-4 py-2">${product.productName}</td>
                                    <td class="px-4 py-2">${product.category}</td>
                                    <td class="px-4 py-2">$${product.price}</td>
                                    <td class="px-4 py-2">${product.stock}</td>
                                    <td class="px-4 py-2">
                                        <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                        <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getCustomerDashboardContent() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'customer') {
        return '<div class="text-center"><h2 class="text-2xl text-red-600">Access denied</h2></div>';
    }

    return `
        <div>
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Customer Dashboard</h1>
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Profile Information</h2>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold mb-2">Username</label>
                        <p class="text-gray-700">${currentUser.username}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Name</label>
                        <p class="text-gray-700">${currentUser.name}</p>
                    </div>
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-bold text-panmark-dark mb-4">Quick Actions</h3>
                    <div class="space-y-3">
                        <a href="#" onclick="navigateTo('products')" class="block bg-panmark-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center">
                            Browse Products
                        </a>
                        <a href="#" onclick="navigateTo('cart')" class="block bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center">
                            View Cart
                        </a>
                        <a href="#" onclick="navigateTo('orders')" class="block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center">
                            Order History
                        </a>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-bold text-panmark-dark mb-4">Edit Personal Info</h3>
                    <form onsubmit="handleEditPersonalInfo(event)">
                        <div class="mb-3">
                            <label class="block text-sm font-bold mb-1">Username</label>
                            <input type="text" id="edit-username" value="${currentUser.username}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required readonly>
                        </div>
                        <div class="mb-3">
                            <label class="block text-sm font-bold mb-1">Password</label>
                            <input type="password" id="edit-password" value="${currentUser.password || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div class="mb-3">
                            <label class="block text-sm font-bold mb-1">Name</label>
                            <input type="text" id="edit-name" value="${currentUser.name || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div class="mb-3">
                            <label class="block text-sm font-bold mb-1">Phone Number</label>
                            <input type="text" id="edit-phone" value="${currentUser.phone || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-1">Address</label>
                            <input type="text" id="edit-address" value="${currentUser.address || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <button type="submit" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors w-full">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Event handlers
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (login(username, password)) {
        alert('Login successful!');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function handleAddReview(event, productId) {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        alert('Admins cannot submit reviews.');
        return;
    }
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    
    addReview(productId, rating, comment);
    alert('Review added successfully!');
    loadPage('product-details?id=' + productId);
}

function filterProducts(category) {
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col aspect-[2/3]">
            <div class="flex-[2] flex items-center justify-center bg-white">
                <img src="${product.image}" alt="${product.productName}" class="w-full h-full object-contain" />
            </div>
            <div class="flex-[1] flex flex-col justify-end p-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.productName}</h3>
                <p class="text-panmark-accent font-bold text-xl mb-2">$${product.price}</p>
                <p class="text-gray-600 text-sm mb-3">${product.category}</p>
                <div class="flex space-x-2 mb-4">
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Stock: <b>${product.stock}</b></span>
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Sold: <b>${product.sold || 0}</b></span>
                </div>
                <div class="flex space-x-2 mt-2">
                    <button onclick="navigateTo('product-details?id=${product.id}')" class="flex-1 bg-panmark-secondary text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">View Details</button>
                    <button onclick="addToCart(${product.id})" class="${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-panmark-accent hover:bg-opacity-90'} text-white px-3 py-2 rounded-md transition-colors text-sm" ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = products.filter(p => 
        p.productName.toLowerCase().includes(searchTerm) || 
        p.category.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col aspect-[2/3]">
            <div class="flex-[2] flex items-center justify-center bg-white">
                <img src="${product.image}" alt="${product.productName}" class="w-full h-full object-contain" />
            </div>
            <div class="flex-[1] flex flex-col justify-end p-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.productName}</h3>
                <p class="text-panmark-accent font-bold text-xl mb-2">$${product.price}</p>
                <p class="text-gray-600 text-sm mb-3">${product.category}</p>
                <div class="flex space-x-2 mb-4">
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Stock: <b>${product.stock}</b></span>
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Sold: <b>${product.sold || 0}</b></span>
                </div>
                <div class="flex space-x-2 mt-2">
                    <button onclick="navigateTo('product-details?id=${product.id}')" class="flex-1 bg-panmark-secondary text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">View Details</button>
                    <button onclick="addToCart(${product.id})" class="${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-panmark-accent hover:bg-opacity-90'} text-white px-3 py-2 rounded-md transition-colors text-sm" ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const cartKey = `cart_${currentUser.username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartCount();
        loadPage('cart');
    }
}

function generateCusId() {
    // Generate a unique customer ID like CUS0001
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let maxId = 0;
    users.forEach(u => {
        if (u.cusid) {
            const num = parseInt(u.cusid.replace('CUS', ''));
            if (!isNaN(num) && num > maxId) maxId = num;
        }
    });
    return 'CUS' + String(maxId + 1).padStart(4, '0');
}

function resetFakeDB() {
    localStorage.clear();
    initializeApp();
    location.reload();
}

// Add a placeholder reviews page if it does not exist
if (typeof getReviewsPageContent !== 'function') {
    function getReviewsPageContent() {
        const currentUser = getCurrentUser();
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // Only show own reviews for customers
        if (currentUser && currentUser.role === 'customer') {
            reviews = reviews.filter(review => review.userId === currentUser.username);
        }
        return `
            <div class="max-w-4xl mx-auto">
                <h1 class="text-3xl font-bold text-panmark-dark mb-6">Product Reviews</h1>
                <div class="space-y-6">
                    ${reviews.length === 0 ? `<p class='text-gray-600'>No reviews yet.</p>` : reviews.map(review => {
                        const product = products.find(p => p.id === review.productId);
                        const isAuthor = currentUser && (review.userId === currentUser.username);
                        const reviewer = users.find(u => u.username === review.userId);
                        return `
                            <div class="bg-white rounded-lg shadow-md p-4 relative">
                                <div class="flex items-center mb-2">
                                    <img src="${product ? product.image : ''}" alt="${product ? product.productName : ''}" class="w-16 h-16 object-contain rounded mr-4">
                                    <div>
                                        <p class="font-semibold">${product ? product.productName : 'Unknown Product'}</p>
                                        <p class="text-sm text-gray-600">by ${review.userName || review.userId}</p>
                                        <div class="flex text-yellow-400">
                                            ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                                        </div>
                                        ${currentUser && currentUser.role === 'admin' && reviewer ? `
                                            <div class="mt-1 text-xs text-gray-700">
                                                <span class="font-bold">Reviewer Name:</span> ${reviewer.name || reviewer.username}<br>
                                                <span class="font-bold">Phone:</span> ${reviewer.phone || '-'}
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-2">${review.comment}</p>
                                <p class="text-xs text-gray-500">${new Date(review.date).toLocaleDateString()}</p>
                                ${isAuthor ? `
                                    <div class='absolute top-2 right-2 flex space-x-2'>
                                        <button onclick="showEditReviewModal(${review.id})" class="text-blue-600 hover:text-blue-800 text-xs font-bold">Edit</button>
                                        <button onclick="deleteReview(${review.id})" class="text-red-600 hover:text-red-800 text-xs font-bold">Delete</button>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                <div id="edit-review-modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 hidden">
                    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                        <button onclick="closeEditReviewModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">&times;</button>
                        <h2 class="text-2xl font-bold text-panmark-dark mb-4">Edit Review</h2>
                        <form id="edit-review-form">
                            <input type="hidden" id="edit-review-id">
                            <div class="mb-4">
                                <label class="block text-sm font-bold mb-2">Rating</label>
                                <select id="edit-review-rating" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                                    <option value="">Select rating</option>
                                    <option value="5">5 stars</option>
                                    <option value="4">4 stars</option>
                                    <option value="3">3 stars</option>
                                    <option value="2">2 stars</option>
                                    <option value="1">1 star</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-bold mb-2">Comment</label>
                                <textarea id="edit-review-comment" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
                            </div>
                            <button type="submit" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

// Edit Review Modal Handlers
function showEditReviewModal(reviewId) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return;
    document.getElementById('edit-review-id').value = review.id;
    document.getElementById('edit-review-rating').value = review.rating;
    document.getElementById('edit-review-comment').value = review.comment;
    document.getElementById('edit-review-modal').classList.remove('hidden');
    document.getElementById('edit-review-form').onsubmit = function(e) {
        e.preventDefault();
        saveEditedReview();
    };
}
function closeEditReviewModal() {
    document.getElementById('edit-review-modal').classList.add('hidden');
}
function saveEditedReview() {
    const reviewId = parseInt(document.getElementById('edit-review-id').value);
    const rating = parseInt(document.getElementById('edit-review-rating').value);
    const comment = document.getElementById('edit-review-comment').value;
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const idx = reviews.findIndex(r => r.id === reviewId);
    if (idx !== -1) {
        reviews[idx].rating = rating;
        reviews[idx].comment = comment;
        reviews[idx].date = new Date().toISOString();
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
    closeEditReviewModal();
    loadPage('reviews');
}
// Delete Review Handler
function deleteReview(reviewId) {
    if (!confirm('Are you sure you want to delete this review?')) return;
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadPage('reviews');
}

// Ensure navigation to reviews page works
const oldLoadPage = loadPage;
loadPage = function(page) {
    if (page === 'reviews') {
        document.getElementById('main-content').innerHTML = getReviewsPageContent();
    } else {
        oldLoadPage(page);
    }
};

// Add this function to handle product import
async function handleImportProducts() {
    const fileInput = document.getElementById('import-file');
    const statusDiv = document.getElementById('import-status');
    if (!fileInput.files.length) {
        statusDiv.textContent = 'Please select a file.';
        return;
    }
    const file = fileInput.files[0];
    statusDiv.textContent = 'Importing...';
    try {
        if (file.name.endsWith('.csv')) {
            const result = await window.excelImport.importFromFile(file, 'products');
            statusDiv.textContent = result.message;
            loadPage('admin-dashboard');
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            if (typeof XLSX === 'undefined') {
                statusDiv.textContent = 'Excel import requires SheetJS. Please add SheetJS to your project.';
                return;
            }
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                const processed = window.excelImport.processImportedData(json, 'products');
                window.db.importData({ products: processed });
                statusDiv.textContent = `Successfully imported ${processed.length} products from Excel.`;
                loadPage('admin-dashboard');
            };
            reader.readAsArrayBuffer(file);
        } else {
            statusDiv.textContent = 'Unsupported file type.';
        }
    } catch (err) {
        statusDiv.textContent = 'Import failed: ' + err.message;
    }
}

// Add this function to handle backup data import
async function handleImportBackupData() {
    const fileInput = document.getElementById('backup-import-file');
    const statusDiv = document.getElementById('backup-import-status');
    
    if (!fileInput.files.length) {
        statusDiv.textContent = 'Please select a backup file.';
        return;
    }
    
    const file = fileInput.files[0];
    statusDiv.textContent = 'Importing backup data...';
    
    try {
        if (file.name.endsWith('.csv')) {
            // For CSV files, we'll need to parse multiple sections or use a specific format
            statusDiv.textContent = 'CSV backup import requires specific format. Please use Excel format for full backup.';
            return;
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            // Handle Excel backup import - always import all data types
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    // Import all data types from different sheets
                    const importResults = {};
                    let totalImported = 0;
                    
                    // Check for each data type sheet
                    const dataTypes = ['products', 'users', 'orders', 'reviews'];
                    for (const type of dataTypes) {
                        if (workbook.SheetNames.includes(type)) {
                            const worksheet = workbook.Sheets[type];
                            const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                            const processed = window.excelImport.processImportedData(json, type);
                            importResults[type] = processed;
                            totalImported += processed.length;
                        }
                    }
                    
                    // Import all found data
                    if (Object.keys(importResults).length > 0) {
                        window.db.importData(importResults);
                        statusDiv.textContent = `Successfully imported backup data: ${totalImported} total records across ${Object.keys(importResults).length} data types.`;
                        alert('Backup import successful! All data has been restored.');
                    } else {
                        statusDiv.textContent = 'No valid data sheets found in backup file.';
                    }
                    
                    loadPage('admin-dashboard');
                } catch (error) {
                    statusDiv.textContent = 'Backup import failed: ' + error.message;
                }
            };
            reader.onerror = () => {
                statusDiv.textContent = 'Failed to read backup file.';
            };
            reader.readAsArrayBuffer(file);
        } else {
            statusDiv.textContent = 'Unsupported backup file type. Please use Excel files (.xlsx, .xls).';
        }
    } catch (err) {
        statusDiv.textContent = 'Backup import failed: ' + err.message;
    }
} 
