// Page content functions for Panmark Enterprise

function getHomePageContent() {
    const currentUser = getCurrentUser();
    
    if (currentUser && currentUser.role === 'admin') {
        // Admin Homepage - Dashboard Overview
        const products = JSON.parse(localStorage.getItem('products'));
        const orders = JSON.parse(localStorage.getItem('orders'));
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        
        return `
            <div class="text-center">
                <div class="bg-panmark-secondary text-white p-12 rounded-lg mb-8">
                    <h1 class="text-4xl font-bold mb-4">Admin Dashboard</h1>
                    <p class="text-xl mb-6">Welcome back, ${currentUser.name}. Here's your business overview.</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-panmark-accent">
                        <h3 class="text-lg font-semibold text-panmark-dark mb-2">Total Products</h3>
                        <p class="text-3xl font-bold text-panmark-accent">${products.length}</p>
                        <p class="text-sm text-gray-600 mt-2">Active products in catalog</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <h3 class="text-lg font-semibold text-panmark-dark mb-2">Total Orders</h3>
                        <p class="text-3xl font-bold text-green-600">${orders.length}</p>
                        <p class="text-sm text-gray-600 mt-2">Orders from all customers</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <h3 class="text-lg font-semibold text-panmark-dark mb-2">Total Reviews</h3>
                        <p class="text-3xl font-bold text-blue-600">${reviews.length}</p>
                        <p class="text-sm text-gray-600 mt-2">Customer reviews received</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-1 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-2xl font-bold text-panmark-dark mb-4">Recent Activity</h2>
                        <div class="space-y-3 text-left">
                            <div class="flex justify-between items-center py-2 border-b">
                                <span class="text-gray-600">Latest Order</span>
                                <span class="font-semibold">#${orders.length > 0 ? orders[orders.length - 1].id : 'N/A'}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b">
                                <span class="text-gray-600">Low Stock Items</span>
                                <span class="font-semibold text-red-600">${products.filter(p => p.stock < 10).length}</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="text-gray-600">Pending Orders</span>
                                <span class="font-semibold text-orange-600">${orders.filter(o => o.status === 'Pending').length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Customer/Guest Homepage - Shopping Experience
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
                        <a href="#" onclick="navigateTo('products'); setTimeout(() => filterProducts('Books'), 100);" class="text-panmark-accent hover:underline">View Books →</a>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-2xl font-bold text-panmark-dark mb-4">Stationery</h2>
                        <p class="text-gray-600 mb-4">Premium writing instruments and office supplies</p>
                        <a href="#" onclick="navigateTo('products'); setTimeout(() => filterProducts('Stationery'), 100);" class="text-panmark-accent hover:underline">View Stationery →</a>
                    </div>
                </div>
                
                ${currentUser ? `
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-2xl font-bold text-panmark-dark mb-4">Welcome back, ${currentUser.name}!</h2>
                        <p class="text-gray-600 mb-4">Continue your shopping experience or check your recent orders.</p>
                        <div class="flex justify-center space-x-4">
                            <a href="#" onclick="navigateTo('customer-dashboard')" class="bg-panmark-accent text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                My Account
                            </a>
                            <a href="#" onclick="navigateTo('cart')" class="bg-panmark-secondary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                View Cart
                            </a>
                            <a href="#" onclick="navigateTo('orders')" class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                View Orders
                            </a>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
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
                <div class="mt-4 text-center">
                    <button onclick="showRegisterModal()" class="text-panmark-accent hover:underline">Don't have an account? Register</button>
                </div>
            </div>
        </div>
    `;
}

function getProductsPageContent() {
    const currentUser = getCurrentUser();
    const products = JSON.parse(localStorage.getItem('products'));
    const categories = [...new Set(products.map(p => p.category))];
    
    // Sort products by sold count descending
    const sortedProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0));
    // Find top 3 hot selling products by sold count
    const hotIds = sortedProducts.slice(0, 3).map(p => p.id);

    if (currentUser && currentUser.role === 'admin') {
        // Admin Products Page - Management Interface
        return `
            <div>
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-panmark-dark">Product Management</h1>
                    <button onclick="showAddProductForm()" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                        Add New Product
                    </button>
                </div>
                
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
                
                <div class="mb-4">
                    <input type="text" id="search-input" placeholder="Search products..." 
                           class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-panmark-accent"
                           onkeyup="searchProducts()">
                </div>
                
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="overflow-x-auto max-w-4xl mx-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="px-2 py-2 text-left">Image</th>
                                    <th class="px-2 py-2 text-left">Name</th>
                                    <th class="px-2 py-2 text-left">Category</th>
                                    <th class="px-2 py-2 text-left">Price</th>
                                    <th class="px-2 py-2 text-left">Stock</th>
                                    <th class="px-2 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${products.map(product => `
                                    <tr class="border-b hover:bg-gray-50">
                                        <td class="px-2 py-2">
                                            <img src="${product.image}" alt="${product.productName}" class="w-20 h-20 object-contain rounded" />
                                        </td>
                                        <td class="px-2 py-2">
                                            <div>
                                                <p class="font-semibold text-panmark-dark text-sm">${product.productName}</p>
                                                <p class="text-xs text-gray-600">${product.description.substring(0, 40)}...</p>
                                            </div>
                                        </td>
                                        <td class="px-2 py-2">
                                            <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                                                ${product.category}
                                            </span>
                                        </td>
                                        <td class="px-2 py-2">
                                            <span class="text-panmark-accent font-bold">$${product.price}</span>
                                        </td>
                                        <td class="px-2 py-2">
                                            <div class="flex items-center space-x-1">
                                                <button onclick="updateProductStock(${product.id}, -1)" class="bg-gray-200 text-xs px-2 rounded hover:bg-gray-300">−</button>
                                                <span class="${product.stock < 10 ? 'text-red-600' : 'text-green-600'} font-semibold min-w-[2ch] text-center">${product.stock}</span>
                                                <button onclick="updateProductStock(${product.id}, 1)" class="bg-gray-200 text-xs px-2 rounded hover:bg-gray-300">+</button>
                                            </div>
                                        </td>
                                        <td class="px-2 py-2">
                                            <div class="flex space-x-1">
                                                <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                                                <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
                                                <button onclick="navigateTo('product-details?id=${product.id}')" class="text-green-600 hover:text-green-800 text-xs">View</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Customer/Guest Products Page - Shopping Interface
        return `
            <div>
                <h1 class="text-3xl font-bold text-panmark-dark mb-6">Products</h1>
                
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
                
                <div class="mb-4">
                    <input type="text" id="search-input" placeholder="Search products..." 
                           class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-panmark-accent"
                           onkeyup="searchProducts()">
                </div>
                
                <div id="products-grid" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${sortedProducts.map(product => `
                        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-64 h-96 transition-transform hover:-translate-y-1 hover:shadow-lg relative">
                            ${hotIds.includes(product.id) ? `<span class='absolute top-2 right-2 bg-panmark-accent text-white text-xs px-2 py-1 rounded-full z-10'>Hot Selling</span>` : ''}
                            <div class="h-40 flex items-center justify-center bg-white pt-4">
                                <img src="${product.image}" alt="${product.productName}" class="max-h-full max-w-full object-contain" />
                            </div>
                            <div class="flex-1 flex flex-col justify-between p-4">
                                <div>
                                    <h3 class="text-base font-semibold text-panmark-dark line-clamp-2 mb-1">${product.productName}</h3>
                                    <p class="text-panmark-accent font-bold text-lg mb-1">$${product.price}</p>
                                    <p class="text-gray-600 text-xs mb-2">${product.category}</p>
                                <div class="flex flex-wrap gap-2 mb-2 text-xs">
                                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Stock: <b>${product.stock}</b></span>
                                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Sold: <b>${product.sold || 0}</b></span>
                                    </div>
                                </div>
                                <div class="flex space-x-2 mt-2">
                                    <button onclick="showProductDetailsModal(${product.id})" class="flex-1 bg-panmark-secondary text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">View Details</button>
                                    <button onclick="${currentUser ? `addToCart(${product.id})` : `promptLoginOrRegister()`}" class="bg-panmark-accent text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

function getProductDetailsContent(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === parseInt(productId));
    const reviews = getProductReviews(productId);
    
    if (!product) {
        return '<div class="text-center"><h2 class="text-2xl text-red-600">Product not found</h2></div>';
    }
    // Find index for pagination
    // const currentIndex = products.findIndex(p => p.id === parseInt(productId));
    // const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
    // const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;
    
    return `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div class="bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh] w-full max-w-3xl mx-auto p-8 flex flex-col relative">
                <button onclick="closeReviewModal()" class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold">&times;</button>
                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="lg:w-1/2 flex items-center justify-center bg-white p-4">
                        <img src="${product.image}" alt="${product.productName}" class="w-full max-w-xs max-h-[28rem] object-contain rounded-xl shadow-md">
                    </div>
                    <div class="lg:w-1/2 flex flex-col justify-between p-4 space-y-6 min-w-[250px]">
                        <div>
                            <h1 class="text-3xl font-extrabold text-panmark-dark mb-4 leading-tight">${product.productName}</h1>
                            <p class="text-panmark-accent font-bold text-2xl mb-4">$${product.price}</p>
                            <p class="text-gray-700 text-lg mb-6">${product.description}</p>
                            <div class="flex flex-wrap gap-4 mb-6">
                                <span class="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base">Stock: <b>${product.stock}</b></span>
                                <span class="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base">Category: <b>${product.category}</b></span>
                            </div>
                            <div class="flex flex-col sm:flex-row items-center gap-3 mb-6">
                                <input type="number" id="quantity" value="1" min="1" max="${product.stock}" 
                                       class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-panmark-accent">
                                <button onclick="addToCart(${product.id}, parseInt(document.getElementById('quantity').value))" 
                                        class="bg-panmark-accent text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-8 overflow-y-auto">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Reviews</h2>
                    ${reviews.length > 0 ? reviews.map(review => `
                        <div class="border-b py-4">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-semibold text-lg">${review.userName}</h3>
                                <div class="flex text-yellow-400 text-lg">
                                    ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                                </div>
                            </div>
                            <p class="text-gray-700 text-base">${review.comment}</p>
                            <p class="text-sm text-gray-400 mt-2">${new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    `).join('') : '<p class="text-gray-500 text-lg">No reviews yet</p>'}
                </div>
            </div>
        </div>
    `;
}

function getCartPageContent() {
    const currentUser = getCurrentUser && typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    // Not logged in
    if (!currentUser) {
        return `
            <div class="text-center py-10">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Please Login</h2>
                <p class="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
                <a href="#" onclick="navigateTo('login')" class="bg-panmark-accent text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                    Login
                </a>
            </div>
        `;
    }

    // Admin user
    if (currentUser.role === 'admin') {
        return `
            <div class="text-center py-10">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Admin Access</h2>
                <p class="text-gray-600 mb-6">Shopping cart is not available for admin users.</p>
                <div class="space-y-3">
                    <a href="#" onclick="navigateTo('admin-dashboard')" class="block bg-panmark-accent text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                        Go to Admin Dashboard
                    </a>
                    <a href="#" onclick="navigateTo('products')" class="block bg-panmark-secondary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                        Manage Products
                    </a>
                </div>
            </div>
        `;
    }

    // Customer cart logic (with discounts)
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        return `
            <div class="text-center py-10">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Your Cart is Empty</h2>
                <p class="text-gray-600 mb-6">Add some products to get started!</p>
                <a href="#" onclick="navigateTo('products')" class="bg-panmark-accent text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                    Browse Products
                </a>
            </div>
        `;
    }
   
    // --- Helper function for calculating item-specific discounts ---
    const calculateItemDiscountDetails = (item) => {
        let discountAmount = 0;
        let discountLabels = [];
        if (item.category === 'Books') {
            discountAmount += (item.price * item.quantity) * 0.10;
            discountLabels.push('10% off Books');
        }
        if (item.category === 'Stationery' && (/pen/i.test(item.productName) || /pencil/i.test(item.productName)) && item.quantity >= 5) {
            discountAmount += 1 * item.quantity;
            discountLabels.push('Bulk RM1.00 off each');
        }
        const originalItemTotal = item.price * item.quantity;
        const discountedItemTotal = originalItemTotal - discountAmount;
        const discountedUnitPrice = item.quantity > 0 ? (discountedItemTotal / item.quantity) : item.price;
        return {
            originalItemTotal,
            discountAmount,
            discountedItemTotal,
            discountedUnitPrice,
            discountLabels: discountLabels.join(', ')
        };
    };

    let totalOriginalCartValue = 0;
    let totalCartDiscount = 0;
    cartItems.forEach(item => {
        const { originalItemTotal, discountAmount } = calculateItemDiscountDetails(item);
        totalOriginalCartValue += originalItemTotal;
        totalCartDiscount += discountAmount;
    });
    const finalCartTotal = totalOriginalCartValue - totalCartDiscount;
   
    return `
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Shopping Cart</h1>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                ${cartItems.map(item => {
                    const { originalItemTotal, discountAmount, discountedItemTotal, discountedUnitPrice, discountLabels } = calculateItemDiscountDetails(item);
                    return `
                        <div class="flex flex-col sm:flex-row items-center p-4 sm:p-6 border-b last:border-b-0">
                            <img src="${item.image}" alt="${item.productName}" class="w-24 h-24 object-contain rounded mb-4 sm:mb-0 sm:mr-4">
                            <div class="flex-1 text-center sm:text-left">
                            <h3 class="text-lg font-semibold text-panmark-dark">${item.productName}</h3>
                            <p class="text-gray-600">${item.category}</p>
                                <div class="text-xs text-gray-500 mt-1">
                                    <span>Unit Price:
                                        ${discountAmount > 0 ?
                                            `<s>RM${item.price.toFixed(2)}</s> <b class='text-green-700'>RM${discountedUnitPrice.toFixed(2)}</b>`
                                            : `<b>RM${item.price.toFixed(2)}</b>`}
                                    </span>
                                    ${discountAmount > 0 ?
                                        `<br><span>Discount Applied: <b class='text-green-700'>-RM${discountAmount.toFixed(2)}</b> <span class='text-green-600'>(${discountLabels})</span></span>`
                                        : ''}
                        </div>
                            </div>
                            <div class="flex items-center space-x-4 mt-4 sm:mt-0">
                            <div class="flex items-center space-x-2">
                                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})"
                                            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                                            ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                                    <span class="w-8 text-center font-medium">${item.quantity}</span>
                                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})"
                                            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">+</button>
                            </div>
                                <p class="text-panmark-accent font-bold text-lg">RM${discountedItemTotal.toFixed(2)}</p>
                                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 transition-colors">Remove</button>
                        </div>
                    </div>
                    `;
                }).join('')}
                <div class="p-6 bg-gray-50 border-t">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xl font-bold text-gray-700">Subtotal:</span>
                        <span class="text-xl font-bold text-gray-700">RM${totalOriginalCartValue.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xl font-bold text-gray-700">Total Discount:</span>
                        <span class="text-xl font-bold text-green-700">-RM${totalCartDiscount.toFixed(2)}</span>
                </div>
                    <div class="flex justify-between items-center mb-4 border-t pt-4 mt-4">
                        <span class="text-2xl font-bold text-panmark-dark">Grand Total:</span>
                        <span class="text-3xl font-bold text-panmark-accent">RM${finalCartTotal.toFixed(2)}</span>
                    </div>
                    <button onclick="createOrder()" class="w-full bg-panmark-accent text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors text-lg font-semibold">Checkout</button>
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
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    
    if (userOrders.length === 0) {
        return `
            <div class="text-center">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">No Orders Found</h2>
                <p class="text-gray-600">${currentUser.role === 'admin' ? 'No orders have been placed yet.' : 'You haven\'t placed any orders yet.'}</p>
            </div>
        `;
    }
    
    return `
        <div>
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">
                ${currentUser.role === 'admin' ? 'All Orders' : 'My Orders'}
            </h1>
            
            <div class="space-y-6">
                ${userOrders.map(order => `
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-panmark-dark">Order #${order.id}</h3>
                                <p class="text-gray-600">${new Date(order.date).toLocaleDateString()}</p>
                                ${currentUser.role === 'admin' ? `
                                    <p class="text-sm text-gray-500">Customer: <b>${order.userId}</b></p>
                                    <p class="text-sm text-gray-500">Name: ${order.userName || ''}</p>
                                    <p class="text-sm text-gray-500">Address: ${order.address || '-'}</p>
                                    <p class="text-sm text-gray-500">Phone: ${order.phone || '-'}</p>
                                ` : ''}
                            </div>
                            <div class="text-right">
                                <p class="text-panmark-accent font-bold text-xl">$${order.total.toFixed(2)}</p>
                                <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mb-2">
                                    ${order.status}
                                </span>
                                ${currentUser.role === 'admin' ? `
                                    <div class="mt-2">
                                        <select onchange="changeOrderStatus(${order.id}, this.value)" class="border border-gray-300 rounded px-2 py-1" ${order.status === 'Cancelled' || order.status === 'Received' ? 'disabled' : ''}>
                                            ${['Pending','Processed','Shipped','Delivered','Cancelled','Received'].map(status => `
                                                <option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                ` : ''}
                                ${currentUser.role === 'customer' && order.status === 'Shipped' ? `
                                    <div class="mt-2">
                                        <button onclick="markOrderReceived(${order.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Mark as Received</button>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            ${order.items.map(item => {
                                let reviewExists = reviews.some(r => r.productId === item.id && r.userId === currentUser.username);
                                return `
                                    <div class="flex justify-between items-center py-2 border-b">
                                        <div class="flex items-center">
                                            <img src="${item.image}" alt="${item.productName}" class="w-20 h-20 object-contain rounded">
                                            <div class="ml-3">
                                                <p class="font-semibold">${item.productName}</p>
                                                <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-panmark-accent font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
                                            ${currentUser.role === 'customer' && order.status === 'Received' && !reviewExists ? `
                                                <button onclick="showAddReviewModal(${item.id}, ${order.id})" class="ml-2 bg-panmark-accent text-white px-3 py-1 rounded hover:bg-opacity-90">Add Review</button>
                                            ` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
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
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Admin Panel</h1>
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
                    <!-- Import Backup Data Quick Action -->
                    <div class="flex flex-col gap-2 pt-2 border-t border-gray-200">
                        <label class="block text-sm font-bold text-panmark-dark mb-1">Import Backup Data <span class='text-xs text-gray-500'>(Excel .xlsx only)</span></label>
                        <input type="file" id="backup-import-file" accept=".xlsx,.xls" class="block w-full border border-gray-300 rounded-md px-2 py-1 text-sm" />
                        <button onclick="handleImportBackupData()" class="block w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-center font-bold text-sm">
                            Import Backup Data (Excel Only)
                        </button>
                        <div id="backup-import-status" class="mt-1 text-xs text-gray-600">Only Excel files (.xlsx) are supported for full backup/restore.</div>
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

function getCustomerGuideContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Customer User Guide</h1>
            
            <div class="space-y-8">
                <!-- Getting Started -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Getting Started</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Account Registration</h3>
                            <p class="text-gray-600">To create an account, click "Login" in the navigation bar, then select "Register". You will need to provide your full name, complete address, and contact phone number for account verification.</p>
                        </div>
                    </div>
                </div>

                <!-- Product Browsing -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Product Browsing</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Product Categories</h3>
                            <p class="text-gray-600">Browse our extensive collection by category: <strong>Books</strong> featuring classic literature and contemporary novels, and <strong>Stationery</strong> including premium writing instruments and office supplies.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Product Search</h3>
                            <p class="text-gray-600">Utilize the search functionality to locate specific products by name or category for efficient browsing.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Product Information</h3>
                            <p class="text-gray-600">Select "View Details" to access comprehensive product information, customer reviews, and add items to your shopping cart.</p>
                        </div>
                    </div>
                </div>

                <!-- Shopping Cart -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Shopping Cart Management</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Adding Products</h3>
                            <p class="text-gray-600">Select "Add to Cart" on any product listing. Quantity specifications are available on the detailed product page.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Cart Management</h3>
                            <p class="text-gray-600">Access your shopping cart to modify quantities, remove items, or proceed to the checkout process.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Order Processing</h3>
                            <p class="text-gray-600">Select "Checkout" to finalize your purchase. Orders are processed immediately upon confirmation.</p>
                        </div>
                    </div>
                </div>

                <!-- Order Management -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Order Management</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Order History</h3>
                            <p class="text-gray-600">Access your complete order history through "My Account" → "Order History" to review all previous transactions.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Order Status Tracking</h3>
                            <p class="text-gray-600">Monitor your order progression through the following stages: <strong>Pending</strong> → <strong>Processed</strong> → <strong>Shipped</strong> → <strong>Delivered</strong></p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Order Confirmation</h3>
                            <p class="text-gray-600">Upon shipment, you may confirm receipt of your order, which enables the review submission feature.</p>
                        </div>
                    </div>
                </div>

                <!-- Product Reviews -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Product Reviews</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Review Submission</h3>
                            <p class="text-gray-600">Following order receipt, you may submit product reviews with ratings from 1-5 stars and detailed comments.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Review Access</h3>
                            <p class="text-gray-600">Access customer reviews on product detail pages to assist in purchasing decisions.</p>
                        </div>
                    </div>
                </div>

                <!-- Account Management -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Account Management</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Profile Information</h3>
                            <p class="text-gray-600">Update your personal information including name, address, and contact details through the "My Account" section.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-panmark-accent mb-2">Security Settings</h3>
                            <p class="text-gray-600">Modify your account password at any time through the account settings for enhanced security.</p>
                        </div>
                    </div>
                </div>

                <!-- Best Practices -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold text-panmark-dark mb-4">Best Practices</h2>
                    <ul class="list-disc list-inside space-y-2 text-gray-600">
                        <li>Utilize the search functionality for efficient product discovery</li>
                        <li>Verify product availability before adding items to your cart</li>
                        <li>Review customer feedback to make informed purchasing decisions</li>
                        <li>Maintain current contact information for seamless order processing</li>
                        <li>Use category filters to streamline your product browsing experience</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function getContactContent() {
    return `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Contact Us</h1>
            
            <!-- Contact Information -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-panmark-dark mb-4">Get in Touch</h2>
                
                <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                        <div class="text-panmark-accent text-xl">Phone</div>
                        <div>
                            <h3 class="font-semibold text-panmark-dark">Phone</h3>
                            <p class="text-gray-600">019-615 6835</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-3">
                        <div class="text-panmark-accent text-xl">Address</div>
                        <div>
                            <h3 class="font-semibold text-panmark-dark">Address</h3>
                            <p class="text-gray-600">14, Jalan Haji Md Yasin<br>77000 Jasin, Melaka<br>Malaysia</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-3">
                        <div class="text-panmark-accent text-xl">Hours</div>
                        <div>
                            <h3 class="font-semibold text-panmark-dark">Business Hours</h3>
                            <p class="text-gray-600">Monday - Friday: 9:30 AM - 5:30 PM<br>Saturday: 9:30 AM - 5:30 PM<br>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
} 