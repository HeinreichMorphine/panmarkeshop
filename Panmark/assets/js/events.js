// Event handlers for Panmark Enterprise

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
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    
    addReview(productId, rating, comment);
    alert('Review added successfully!');
    loadPage('product-details?id=' + productId);
}

function filterProducts(category) {
    const currentUser = getCurrentUser();
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    // Hot selling logic (top 3 sold from filtered products)
    const sortedBySold = [...filteredProducts].sort((a, b) => (b.sold || 0) - (a.sold || 0));
    const hotIds = sortedBySold.slice(0, 3).map(p => p.id);
    
    if (currentUser && currentUser.role === 'admin') {
        // Admin view - table format
        const productsGrid = document.querySelector('tbody');
        productsGrid.innerHTML = filteredProducts.map(product => `
            <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-3">
                    <img src="${product.image}" alt="${product.productName}" class="${product.category === 'Books' ? 'w-full aspect-[2/3] object-cover' : 'w-full aspect-[4/3] object-contain'}">
                </td>
                <td class="px-4 py-3">
                    <div>
                        <p class="font-semibold text-panmark-dark">${product.productName}</p>
                        <p class="text-sm text-gray-600">${product.description.substring(0, 50)}...</p>
                    </div>
                </td>
                <td class="px-4 py-3">
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                        ${product.category}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <span class="text-panmark-accent font-bold">$${product.price}</span>
                </td>
                <td class="px-4 py-3">
                    <span class="${product.stock < 10 ? 'text-red-600' : 'text-green-600'} font-semibold">
                        ${product.stock}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 text-sm">
                            Edit
                        </button>
                        <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800 text-sm">
                            Delete
                        </button>
                        <button onclick="navigateTo('product-details?id=${product.id}')" class="text-green-600 hover:text-green-800 text-sm">
                            View
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } else {
        // Customer view - card format
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = sortedBySold.map(product => `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden relative ${product.category === 'Stationery' ? 'flex flex-col h-full' : ''}">
                ${hotIds.includes(product.id) ? `<span class='absolute top-2 right-2 bg-panmark-accent text-white text-xs px-2 py-1 rounded-full z-10'>🔥 Hot Selling</span>` : ''}
                <img src="${product.image}" alt="${product.productName}" class="${product.category === 'Books' ? 'w-full aspect-[2/3] object-cover' : 'w-full aspect-[4/3] object-contain'} ${product.category === 'Stationery' ? 'flex-shrink-0' : ''}">
                <div class="${product.category === 'Stationery' ? 'flex flex-col justify-end flex-1 p-4' : 'p-4'}">
                    <h3 class="text-lg font-semibold text-panmark-dark mb-2">${product.productName}</h3>
                    <p class="text-panmark-accent font-bold text-xl mb-2">$${product.price}</p>
                    <p class="text-gray-600 text-sm mb-1">${product.category}</p>
                    <div class="flex flex-wrap gap-2 mb-2 text-xs">
                        <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Stock: <b>${product.stock}</b></span>
                        <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Sold: <b>${product.sold || 0}</b></span>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="showProductDetailsModal(${product.id})" class="flex-1 bg-panmark-secondary text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">View Details</button>
                        <button onclick="addToCart(${product.id})" class="bg-panmark-accent text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function searchProducts() {
    const currentUser = getCurrentUser();
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = products.filter(p => 
        p.productName.toLowerCase().includes(searchTerm) || 
        p.category.toLowerCase().includes(searchTerm)
    );
    
    if (currentUser && currentUser.role === 'admin') {
        // Admin view - table format
        const productsGrid = document.querySelector('tbody');
        productsGrid.innerHTML = filteredProducts.map(product => `
            <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-3">
                    <img src="${product.image}" alt="${product.productName}" class="${product.category === 'Books' ? 'w-full aspect-[2/3] object-cover' : 'w-full aspect-[4/3] object-contain'}">
                </td>
                <td class="px-4 py-3">
                    <div>
                        <p class="font-semibold text-panmark-dark">${product.productName}</p>
                        <p class="text-sm text-gray-600">${product.description.substring(0, 50)}...</p>
                    </div>
                </td>
                <td class="px-4 py-3">
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                        ${product.category}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <span class="text-panmark-accent font-bold">$${product.price}</span>
                </td>
                <td class="px-4 py-3">
                    <span class="${product.stock < 10 ? 'text-red-600' : 'text-green-600'} font-semibold">
                        ${product.stock}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 text-sm">
                            Edit
                        </button>
                        <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800 text-sm">
                            Delete
                        </button>
                        <button onclick="navigateTo('product-details?id=${product.id}')" class="text-green-600 hover:text-green-800 text-sm">
                            View
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } else {
        // Customer view - card format
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${product.image}" alt="${product.productName}" class="${product.category === 'Books' ? 'w-full aspect-[2/3] object-cover' : 'w-full aspect-[4/3] object-contain'}">
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-panmark-dark mb-2">${product.productName}</h3>
                    <p class="text-panmark-accent font-bold text-xl mb-2">$${product.price}</p>
                    <p class="text-gray-600 text-sm mb-3">${product.category}</p>
                    <div class="flex space-x-2">
                        <button onclick="navigateTo('product-details?id=${product.id}')" 
                                class="flex-1 bg-panmark-secondary text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">
                            View Details
                        </button>
                        <button onclick="addToCart(${product.id})" 
                                class="bg-panmark-accent text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
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

// Admin functions
function showAddProductForm() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Add New Product</h1>
            <div class="bg-white rounded-lg shadow-md p-6">
                <form onsubmit="handleAddProduct(event)">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold mb-2">Product Name</label>
                            <input type="text" id="productName" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Category</label>
                            <select id="category" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                                <option value="">Select category</option>
                                <option value="Books">Books</option>
                                <option value="Stationery">Stationery</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Price</label>
                            <input type="number" id="price" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Stock</label>
                            <input type="number" id="stock" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-bold mb-2">Description</label>
                        <textarea id="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-bold mb-2">Image URL</label>
                        <input type="url" id="image" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    </div>
                    <div class="mt-6 flex space-x-4">
                        <button type="submit" class="bg-panmark-accent text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                            Add Product
                        </button>
                        <button type="button" onclick="loadPage('products')" class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleAddProduct(event) {
    event.preventDefault();
    
    const products = JSON.parse(localStorage.getItem('products'));
    const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        productName: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    alert('Product added successfully!');
    loadPage('products');
}

function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found');
        return;
    }
    
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold text-panmark-dark mb-6">Edit Product</h1>
            <div class="bg-white rounded-lg shadow-md p-6">
                <form onsubmit="handleEditProduct(event, ${productId})">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold mb-2">Product Name</label>
                            <input type="text" id="productName" value="${product.productName}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Category</label>
                            <select id="category" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                                <option value="Books" ${product.category === 'Books' ? 'selected' : ''}>Books</option>
                                <option value="Stationery" ${product.category === 'Stationery' ? 'selected' : ''}>Stationery</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Price</label>
                            <input type="number" id="price" step="0.01" value="${product.price}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Stock</label>
                            <input type="number" id="stock" value="${product.stock}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-bold mb-2">Description</label>
                        <textarea id="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>${product.description}</textarea>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-bold mb-2">Image URL</label>
                        <input type="url" id="image" value="${product.image}" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    </div>
                    <div class="mt-6 flex space-x-4">
                        <button type="submit" class="bg-panmark-accent text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                            Update Product
                        </button>
                        <button type="button" onclick="loadPage('products')" class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleEditProduct(event, productId) {
    event.preventDefault();
    
    const products = JSON.parse(localStorage.getItem('products'));
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        alert('Product not found');
        return;
    }
    
    products[productIndex] = {
        ...products[productIndex],
        productName: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };
    
    localStorage.setItem('products', JSON.stringify(products));
    
    alert('Product updated successfully!');
    loadPage('products');
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    
    alert('Product deleted successfully!');
    loadPage('products');
}

function changeOrderStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders'));
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders[idx].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Order status updated!');
        loadPage('orders');
    }
}

function updateProductStock(productId, delta) {
    const products = JSON.parse(localStorage.getItem('products'));
    const idx = products.findIndex(p => p.id === productId);
    if (idx !== -1) {
        let newStock = products[idx].stock + delta;
        if (newStock < 0) newStock = 0;
        products[idx].stock = newStock;
        localStorage.setItem('products', JSON.stringify(products));
        loadPage('products');
    }
}

function markOrderReceived(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders'));
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders[idx].status = 'Received';
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Order marked as received! You can now add reviews.');
        loadPage('orders');
    }
}

function showAddReviewModal(productId, orderId) {
    // Show modal with review form for the product
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const modalOverlay = document.getElementById('review-modal-overlay');
    const modalBody = document.getElementById('review-modal-body');
    modalBody.innerHTML = `
        <h2 class="text-2xl font-bold text-panmark-dark mb-4">Add Review for <span class="text-panmark-accent">${product.productName}</span></h2>
        <form onsubmit="handleModalAddReview(event, ${productId}, ${orderId})">
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2">Rating</label>
                <select id="modal-rating" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
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
                <textarea id="modal-comment" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
            </div>
            <button type="submit" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Submit Review
            </button>
        </form>
    `;
    modalOverlay.style.display = 'flex';
}

function closeReviewModal() {
    document.getElementById('review-modal-overlay').style.display = 'none';
}

function handleModalAddReview(event, productId, orderId) {
    event.preventDefault();
    const rating = document.getElementById('modal-rating').value;
    const comment = document.getElementById('modal-comment').value;
    addReview(productId, rating, comment);
    alert('Review added successfully!');
    closeReviewModal();
    loadPage('orders');
}

function showProductDetailsModal(productId) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    const productReviews = reviews.filter(r => r.productId === productId);
    const currentUser = getCurrentUser();
    const modalOverlay = document.getElementById('review-modal-overlay');
    const modalBody = document.getElementById('review-modal-body');
    modalBody.innerHTML = `
        <button onclick="closeReviewModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">&times;</button>
        <div class="flex flex-col md:flex-row gap-6">
            <img src="${product.image}" alt="${product.productName}" class="${product.category === 'Books' ? 'w-full aspect-[2/3] object-cover' : 'w-full aspect-[4/3] object-contain'}">
            <div class="flex-1">
                <h2 class="text-2xl font-bold text-panmark-dark mb-2">${product.productName}</h2>
                <p class="text-panmark-accent font-bold text-xl mb-2">$${product.price}</p>
                <p class="text-gray-600 mb-2">${product.description}</p>
                <div class="flex flex-wrap gap-2 mb-2 text-xs">
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Stock: <b>${product.stock}</b></span>
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Sold: <b>${product.sold || 0}</b></span>
                    <span class="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">Category: <b>${product.category}</b></span>
                </div>
                ${currentUser && currentUser.role === 'customer' ? `
                    <div class="flex gap-2 mb-2">
                        <input type="number" id="modal-quantity" value="1" min="1" max="${product.stock}" class="w-20 px-2 py-1 border border-gray-300 rounded-md">
                        <button onclick="addToCart(${product.id}, parseInt(document.getElementById('modal-quantity').value))" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Add to Cart</button>
                    </div>
                ` : ''}
            </div>
        </div>
        <div class="mt-6">
            <h3 class="text-xl font-bold text-panmark-dark mb-4">Reviews</h3>
            ${productReviews.length > 0 ? productReviews.map(review => `
                <div class="border-b py-3">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-semibold">${review.userName}</span>
                        <span class="text-yellow-400">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                    </div>
                    <p class="text-gray-600">${review.comment}</p>
                    <p class="text-xs text-gray-400 mt-1">${new Date(review.date).toLocaleDateString()}</p>
                </div>
            `).join('') : '<p class="text-gray-500">No reviews yet</p>'}
        </div>
    `;
    modalOverlay.style.display = 'flex';
}

function promptLoginOrRegister() {
    alert('Please log in or register to add items to your cart.');
    navigateTo('login');
}

function showRegisterModal() {
    const modalOverlay = document.getElementById('review-modal-overlay');
    const modalBody = document.getElementById('review-modal-body');
    modalBody.innerHTML = `
        <button onclick="closeReviewModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">&times;</button>
        <h2 class="text-2xl font-bold text-panmark-dark mb-4">Register</h2>
        <form onsubmit="handleRegister(event)">
            <div class="mb-3">
                <label class="block text-sm font-bold mb-1">Username</label>
                <input type="text" id="register-username" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            </div>
            <div class="mb-3">
                <label class="block text-sm font-bold mb-1">Password</label>
                <input type="password" id="register-password" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            </div>
            <div class="mb-3">
                <label class="block text-sm font-bold mb-1">Name</label>
                <input type="text" id="register-name" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            </div>
            <div class="mb-3">
                <label class="block text-sm font-bold mb-1">Address</label>
                <input type="text" id="register-address" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-bold mb-1">Phone</label>
                <input type="text" id="register-phone" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            </div>
            <button type="submit" class="bg-panmark-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors w-full">Register</button>
        </form>
    `;
    modalOverlay.style.display = 'flex';
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const name = document.getElementById('register-name').value.trim();
    const address = document.getElementById('register-address').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    let users = JSON.parse(localStorage.getItem('users'));
    if (users.some(u => u.username === username)) {
        alert('Username already exists. Please choose another.');
        return;
    }
    const newUser = {
        username,
        password,
        name,
        address,
        phone,
        role: 'customer',
        cusid: typeof generateCusId === 'function' ? generateCusId() : 'CUS' + String(users.length + 1).padStart(4, '0')
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    alert('Registration successful! You are now logged in.');
    closeReviewModal();
    updateUserSection();
    updateNavigation();
    loadPage('customer-dashboard');
}

function handleEditPersonalInfo(event) {
    event.preventDefault();
    const username = document.getElementById('edit-username').value.trim();
    const password = document.getElementById('edit-password').value;
    const name = document.getElementById('edit-name').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const address = document.getElementById('edit-address').value.trim();
    let users = JSON.parse(localStorage.getItem('users'));
    const idx = users.findIndex(u => u.username === username);
    if (idx !== -1) {
        users[idx].password = password;
        users[idx].name = name;
        users[idx].phone = phone;
        users[idx].address = address;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[idx]));
        alert('Profile updated successfully!');
        loadPage('customer-dashboard');
    }
} 