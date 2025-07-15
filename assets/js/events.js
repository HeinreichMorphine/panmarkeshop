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
        `).join('');
    } else {
        // Customer view - card format
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = sortedBySold.map(product => `
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
                        <button onclick="addToCart(${product.id})" class="${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-panmark-accent hover:bg-opacity-90'} text-white px-3 py-2 rounded-md transition-colors text-sm" ${product.stock <= 0 ? 'disabled' : ''}>
                            ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
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
        `).join('');
    } else {
        // Customer view - card format
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-64 h-96 transition-transform hover:-translate-y-1 hover:shadow-lg relative">
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
                        <button onclick="addToCart(${product.id})" class="${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-panmark-accent hover:bg-opacity-90'} text-white px-3 py-2 rounded-md transition-colors text-sm" ${product.stock <= 0 ? 'disabled' : ''}>
                            ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
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
                <form onsubmit="handleAddProduct(event)" enctype="multipart/form-data">
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
                        <label class="block text-sm font-bold mb-2">Image File</label>
                        <input type="file" id="imageFile" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
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
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const newProduct = {
            id: Math.max(...products.map(p => p.id)) + 1,
            productName: document.getElementById('productName').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value),
            description: document.getElementById('description').value,
            image: e.target.result // base64 data URL
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product added successfully!');
        loadPage('products');
    };
    reader.readAsDataURL(file);
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
                <form onsubmit="handleEditProduct(event, ${productId})" enctype="multipart/form-data">
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
                        <label class="block text-sm font-bold mb-2">Image File</label>
                        <input type="file" id="imageFile" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <div class="mt-2"><img src="${product.image}" alt="Current Image" class="h-24"></div>
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
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];
    const updateProduct = (imageData) => {
        products[productIndex] = {
            ...products[productIndex],
            productName: document.getElementById('productName').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value),
            description: document.getElementById('description').value,
            image: imageData !== undefined ? imageData : products[productIndex].image
        };
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product updated successfully!');
        loadPage('products');
    };
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            updateProduct(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        updateProduct();
    }
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    
    alert('Product deleted successfully!');
    loadPage('products');
}

function changeOrderStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders'));
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        const order = orders[idx];
        const oldStatus = order.status;
        
        // If changing to cancelled, restore stock
        if (newStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
            let products = JSON.parse(localStorage.getItem('products'));
            order.items.forEach(item => {
                const productIdx = products.findIndex(p => p.id === item.id);
                if (productIdx !== -1) {
                    products[productIdx].stock += item.quantity;
                    products[productIdx].sold = Math.max(0, (products[productIdx].sold || 0) - item.quantity);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
        
        // If changing from cancelled to another status, deduct stock again
        if (oldStatus === 'Cancelled' && newStatus !== 'Cancelled') {
            let products = JSON.parse(localStorage.getItem('products'));
            order.items.forEach(item => {
                const productIdx = products.findIndex(p => p.id === item.id);
                if (productIdx !== -1) {
                    products[productIdx].stock = Math.max(0, products[productIdx].stock - item.quantity);
                    products[productIdx].sold = (products[productIdx].sold || 0) + item.quantity;
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
        
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
    const modalOverlay = document.getElementById('review-modal-overlay');
    const modalBody = document.getElementById('review-modal-body');
    modalBody.innerHTML = getProductDetailsContent(productId);
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
    loadPage('home');
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

function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Show success message
    alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
    
    // Reset form
    event.target.reset();
}

function generateSalesReport() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (orders.length === 0) {
        alert('No orders found to generate report.');
        return;
    }

    // Generate comprehensive sales report
    const reportData = generateSalesReportData(orders, products, users);
    
    // Create and download CSV file
    downloadCSV(reportData, `panmark_sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    
    alert('Sales report generated successfully! Check your downloads folder.');
}

function generateSalesReportData(orders, products, users) {
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Summary data
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    
    // Product performance analysis
    const productSales = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.id]) {
                productSales[item.id] = {
                    id: item.id,
                    name: item.productName,
                    category: item.category,
                    totalSold: 0,
                    totalRevenue: 0,
                    orders: 0
                };
            }
            productSales[item.id].totalSold += item.quantity;
            productSales[item.id].totalRevenue += item.price * item.quantity;
            productSales[item.id].orders += 1;
        });
    });

    // Customer analysis
    const customerData = {};
    orders.forEach(order => {
        if (!customerData[order.userId]) {
            customerData[order.userId] = {
                username: order.userId,
                name: order.userName || 'N/A',
                totalOrders: 0,
                totalSpent: 0,
                totalItems: 0
            };
        }
        customerData[order.userId].totalOrders += 1;
        customerData[order.userId].totalSpent += order.total;
        customerData[order.userId].totalItems += order.items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Monthly analysis
    const monthlyData = {};
    orders.forEach(order => {
        const month = new Date(order.date).toISOString().substring(0, 7); // YYYY-MM
        if (!monthlyData[month]) {
            monthlyData[month] = {
                month: month,
                orders: 0,
                revenue: 0,
                items: 0
            };
        }
        monthlyData[month].orders += 1;
        monthlyData[month].revenue += order.total;
        monthlyData[month].items += order.items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Create CSV content
    let csvContent = '';

    // Report Header
    csvContent += `Panmark Enterprise - Sales Report\n`;
    csvContent += `Generated on: ${currentDate}\n`;
    csvContent += `\n`;

    // Summary Section
    csvContent += `SUMMARY\n`;
    csvContent += `Total Orders,Total Revenue,Total Items Sold\n`;
    csvContent += `${totalOrders},$${totalRevenue.toFixed(2)},${totalItems}\n`;
    csvContent += `\n`;

    // Product Performance Section
    csvContent += `PRODUCT PERFORMANCE\n`;
    csvContent += `Product ID,Product Name,Category,Total Sold,Total Revenue,Number of Orders\n`;
    Object.values(productSales).forEach(product => {
        csvContent += `${product.id},"${product.name}","${product.category}",${product.totalSold},$${product.totalRevenue.toFixed(2)},${product.orders}\n`;
    });
    csvContent += `\n`;

    // Customer Analysis Section
    csvContent += `CUSTOMER ANALYSIS\n`;
    csvContent += `Username,Customer Name,Total Orders,Total Spent,Total Items Purchased\n`;
    Object.values(customerData).forEach(customer => {
        csvContent += `"${customer.username}","${customer.name}",${customer.totalOrders},$${customer.totalSpent.toFixed(2)},${customer.totalItems}\n`;
    });
    csvContent += `\n`;

    // Monthly Analysis Section
    csvContent += `MONTHLY ANALYSIS\n`;
    csvContent += `Month,Orders,Revenue,Items Sold\n`;
    Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month)).forEach(month => {
        csvContent += `${month.month},${month.orders},$${month.revenue.toFixed(2)},${month.items}\n`;
    });
    csvContent += `\n`;

    // Detailed Orders Section
    csvContent += `DETAILED ORDERS\n`;
    csvContent += `Order ID,Date,Customer,Status,Total,Items\n`;
    orders.forEach(order => {
        const itemsList = order.items.map(item => `${item.productName} (${item.quantity})`).join('; ');
        csvContent += `${order.id},${new Date(order.date).toLocaleDateString()},"${order.userName || order.userId}","${order.status}",$${order.total.toFixed(2)},"${itemsList}"\n`;
    });

    return csvContent;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function backupAllData() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        return;
    }

    // Get all data from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Gather all user carts
    const carts = [];
    users.forEach(user => {
        const cartKey = `cart_${user.username}`;
        const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        cart.forEach(item => {
            carts.push({
                username: user.username,
                productId: item.productId,
                quantity: item.quantity
            });
        });
    });

    if (products.length === 0 && orders.length === 0 && users.length === 0 && reviews.length === 0 && carts.length === 0) {
        alert('No data found to backup.');
        return;
    }

    // Prepare order items as a flat array
    const orderItems = [];
    orders.forEach(order => {
        (order.items || []).forEach(item => {
            orderItems.push({
                orderId: order.id,
                ...item
            });
        });
    });

    // Prepare data for each sheet
    const wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Panmark Enterprise Backup",
        CreatedDate: new Date()
    };
    // Products
    const wsProducts = XLSX.utils.json_to_sheet(products);
    XLSX.utils.book_append_sheet(wb, wsProducts, 'products');
    // Users
    const wsUsers = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, wsUsers, 'users');
    // Orders
    const wsOrders = XLSX.utils.json_to_sheet(orders);
    XLSX.utils.book_append_sheet(wb, wsOrders, 'orders');
    // Order Items
    const wsOrderItems = XLSX.utils.json_to_sheet(orderItems);
    XLSX.utils.book_append_sheet(wb, wsOrderItems, 'order_items');
    // Reviews
    const wsReviews = XLSX.utils.json_to_sheet(reviews);
    XLSX.utils.book_append_sheet(wb, wsReviews, 'reviews');
    // Carts
    const wsCarts = XLSX.utils.json_to_sheet(carts);
    XLSX.utils.book_append_sheet(wb, wsCarts, 'carts');

    // Export to Excel file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    a.download = `panmark_complete_backup_${timestamp}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Complete data backup generated as Excel file (.xlsx). Only Excel files are supported for full backup/restore.');
}

function generateBackupData(products, orders, users, reviews) {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    
    let csvContent = '';

    // Backup Header
    csvContent += `Panmark Enterprise - Complete Data Backup\n`;
    csvContent += `Generated on: ${currentDate} at ${currentTime}\n`;
    csvContent += `\n`;

    // Products Data
    csvContent += `PRODUCTS DATA\n`;
    csvContent += `Product ID,Product Name,Description,Category,Price,Stock,Sold,Image URL\n`;
    products.forEach(product => {
        csvContent += `${product.id},"${product.productName}","${product.description}","${product.category}",${product.price},${product.stock},${product.sold || 0},"${product.image}"\n`;
    });
    csvContent += `\n`;

    // Users Data
    csvContent += `USERS DATA\n`;
    csvContent += `Username,Password,Name,Address,Phone,Role,Customer ID\n`;
    users.forEach(user => {
        csvContent += `"${user.username}","${user.password}","${user.name || ''}","${user.address || ''}","${user.phone || ''}","${user.role}","${user.cusid || ''}"\n`;
    });
    csvContent += `\n`;

    // Orders Data
    csvContent += `ORDERS DATA\n`;
    csvContent += `Order ID,Customer ID,User ID,User Name,Address,Phone,Admin ID,Total Amount,Status,Date\n`;
    orders.forEach(order => {
        csvContent += `${order.id},"${order.cusid || ''}","${order.userId}","${order.userName || ''}","${order.address || ''}","${order.phone || ''}","${order.adminId || ''}",${order.total},"${order.status}","${order.date}"\n`;
    });
    csvContent += `\n`;

    // Order Items Data
    csvContent += `ORDER ITEMS DATA\n`;
    csvContent += `Order ID,Product ID,Product Name,Category,Price,Quantity,Image URL\n`;
    orders.forEach(order => {
        order.items.forEach(item => {
            csvContent += `${order.id},${item.id},"${item.productName}","${item.category}",${item.price},${item.quantity},"${item.image}"\n`;
        });
    });
    csvContent += `\n`;

    // Reviews Data
    csvContent += `REVIEWS DATA\n`;
    csvContent += `Review ID,Product ID,Product Name,User ID,User Name,Rating,Comment,Date\n`;
    reviews.forEach(review => {
        const product = products.find(p => p.id === review.productId);
        csvContent += `${review.id || 'N/A'},${review.productId},"${product ? product.productName : 'N/A'}","${review.userId}","${review.userName || ''}",${review.rating},"${review.comment}","${review.date}"\n`;
    });
    csvContent += `\n`;

    // System Statistics
    csvContent += `SYSTEM STATISTICS\n`;
    csvContent += `Metric,Value\n`;
    csvContent += `Total Products,${products.length}\n`;
    csvContent += `Total Users,${users.length}\n`;
    csvContent += `Total Orders,${orders.length}\n`;
    csvContent += `Total Reviews,${reviews.length}\n`;
    csvContent += `Total Revenue,$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}\n`;
    csvContent += `Total Items Sold,${orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}\n`;
    csvContent += `Admin Users,${users.filter(u => u.role === 'admin').length}\n`;
    csvContent += `Customer Users,${users.filter(u => u.role === 'customer').length}\n`;
    csvContent += `Books Category Products,${products.filter(p => p.category === 'Books').length}\n`;
    csvContent += `Stationery Category Products,${products.filter(p => p.category === 'Stationery').length}\n`;
    csvContent += `Pending Orders,${orders.filter(o => o.status === 'Pending').length}\n`;
    csvContent += `Processed Orders,${orders.filter(o => o.status === 'Processed').length}\n`;
    csvContent += `Shipping Orders,${orders.filter(o => o.status === 'Shipping').length}\n`;
    csvContent += `Delivered Orders,${orders.filter(o => o.status === 'Delivered').length}\n`;
    csvContent += `Cancelled Orders,${orders.filter(o => o.status === 'Cancelled').length}\n`;
    csvContent += `\n`;

    // Data Export Information
    csvContent += `BACKUP INFORMATION\n`;
    csvContent += `Field,Description\n`;
    csvContent += `Backup Date,${currentDate}\n`;
    csvContent += `Backup Time,${currentTime}\n`;
    csvContent += `Data Format,CSV (Excel Compatible)\n`;
    csvContent += `Encoding,UTF-8\n`;
    csvContent += `Total Sections,6\n`;
    csvContent += `Sections Included,Products,Users,Orders,Order Items,Reviews,System Statistics\n`;
    csvContent += `File Purpose,Complete system data backup for Panmark Enterprise\n`;
    csvContent += `Restore Method,Import data sections into corresponding database tables\n`;

    return csvContent;
} 