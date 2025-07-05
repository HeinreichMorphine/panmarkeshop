// Panmark Enterprise - Optimized Database Layer
// This module provides efficient data management with caching, indexing, and optimized queries

class DatabaseManager {
    constructor() {
        this.cache = new Map();
        this.indexes = new Map();
        this.initialized = false;
        this.init();
    }

    // Initialize database with indexes and caching
    init() {
        if (this.initialized) return;
        
        // Initialize storage if empty
        this.ensureStorage();
        
        // Build indexes for efficient queries
        this.buildIndexes();
        
        // Load data into cache
        this.loadCache();
        
        this.initialized = true;
    }

    // Ensure all required storage keys exist
    ensureStorage() {
        const requiredKeys = ['products', 'users', 'orders', 'reviews'];
        requiredKeys.forEach(key => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify([]));
            }
        });
    }

    // Build indexes for fast lookups
    buildIndexes() {
        // Product indexes
        const products = this.getProducts();
        const productIndex = new Map();
        const categoryIndex = new Map();
        const priceIndex = new Map();

        products.forEach(product => {
            // ID index
            productIndex.set(product.id, product);
            
            // Category index
            if (!categoryIndex.has(product.category)) {
                categoryIndex.set(product.category, []);
            }
            categoryIndex.get(product.category).push(product);
            
            // Price range index
            const priceRange = Math.floor(product.price / 10) * 10;
            if (!priceIndex.has(priceRange)) {
                priceIndex.set(priceRange, []);
            }
            priceIndex.get(priceRange).push(product);
        });

        this.indexes.set('products', productIndex);
        this.indexes.set('categories', categoryIndex);
        this.indexes.set('prices', priceIndex);

        // User indexes
        const users = this.getUsers();
        const userIndex = new Map();
        const roleIndex = new Map();

        users.forEach(user => {
            userIndex.set(user.username, user);
            
            if (!roleIndex.has(user.role)) {
                roleIndex.set(user.role, []);
            }
            roleIndex.get(user.role).push(user);
        });

        this.indexes.set('users', userIndex);
        this.indexes.set('roles', roleIndex);

        // Order indexes
        const orders = this.getOrders();
        const orderIndex = new Map();
        const userOrderIndex = new Map();

        orders.forEach(order => {
            orderIndex.set(order.id, order);
            
            if (!userOrderIndex.has(order.userId)) {
                userOrderIndex.set(order.userId, []);
            }
            userOrderIndex.get(order.userId).push(order);
        });

        this.indexes.set('orders', orderIndex);
        this.indexes.set('userOrders', userOrderIndex);

        // Review indexes
        const reviews = this.getReviews();
        const reviewIndex = new Map();
        const productReviewIndex = new Map();
        const userReviewIndex = new Map();

        reviews.forEach(review => {
            reviewIndex.set(review.id, review);
            
            if (!productReviewIndex.has(review.productId)) {
                productReviewIndex.set(review.productId, []);
            }
            productReviewIndex.get(review.productId).push(review);
            
            if (!userReviewIndex.has(review.userId)) {
                userReviewIndex.set(review.userId, []);
            }
            userReviewIndex.get(review.userId).push(review);
        });

        this.indexes.set('reviews', reviewIndex);
        this.indexes.set('productReviews', productReviewIndex);
        this.indexes.set('userReviews', userReviewIndex);
    }

    // Load data into cache
    loadCache() {
        this.cache.set('products', this.getProducts());
        this.cache.set('users', this.getUsers());
        this.cache.set('orders', this.getOrders());
        this.cache.set('reviews', this.getReviews());
    }

    // Generic getter with caching
    getData(key) {
        if (!this.cache.has(key)) {
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            this.cache.set(key, data);
        }
        return this.cache.get(key);
    }

    // Generic setter with cache invalidation
    setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        this.cache.set(key, data);
        this.buildIndexes(); // Rebuild indexes when data changes
    }

    // Product operations
    getProducts() {
        return this.getData('products');
    }

    getProductById(id) {
        return this.indexes.get('products').get(parseInt(id));
    }

    getProductsByCategory(category) {
        return this.indexes.get('categories').get(category) || [];
    }

    getProductsByPriceRange(minPrice, maxPrice) {
        const products = this.getProducts();
        return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        const products = this.getProducts();
        return products.filter(p => 
            p.productName.toLowerCase().includes(searchTerm) || 
            p.category.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    updateProductStock(productId, quantity) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index].stock = Math.max(0, products[index].stock - quantity);
            products[index].sold = (products[index].sold || 0) + quantity;
            this.setData('products', products);
            return true;
        }
        return false;
    }

    // User operations
    getUsers() {
        return this.getData('users');
    }

    getUserByUsername(username) {
        return this.indexes.get('users').get(username);
    }

    authenticateUser(username, password) {
        const user = this.getUserByUsername(username);
        return user && user.password === password ? user : null;
    }

    getUsersByRole(role) {
        return this.indexes.get('roles').get(role) || [];
    }

    // Order operations
    getOrders() {
        return this.getData('orders');
    }

    getOrderById(id) {
        return this.indexes.get('orders').get(parseInt(id));
    }

    getOrdersByUser(userId) {
        return this.indexes.get('userOrders').get(userId) || [];
    }

    createOrder(orderData) {
        const orders = this.getOrders();
        const newOrder = {
            id: Date.now(),
            ...orderData,
            date: new Date().toISOString()
        };
        orders.push(newOrder);
        this.setData('orders', orders);
        return newOrder;
    }

    // Review operations
    getReviews() {
        return this.getData('reviews');
    }

    getReviewById(id) {
        return this.indexes.get('reviews').get(parseInt(id));
    }

    getReviewsByProduct(productId) {
        return this.indexes.get('productReviews').get(parseInt(productId)) || [];
    }

    getReviewsByUser(userId) {
        return this.indexes.get('userReviews').get(userId) || [];
    }

    addReview(reviewData) {
        const reviews = this.getReviews();
        const newReview = {
            id: Date.now(),
            ...reviewData,
            date: new Date().toISOString()
        };
        reviews.push(newReview);
        this.setData('reviews', reviews);
        return newReview;
    }

    updateReview(reviewId, updates) {
        const reviews = this.getReviews();
        const index = reviews.findIndex(r => r.id === parseInt(reviewId));
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...updates, date: new Date().toISOString() };
            this.setData('reviews', reviews);
            return true;
        }
        return false;
    }

    deleteReview(reviewId) {
        const reviews = this.getReviews();
        const filteredReviews = reviews.filter(r => r.id !== parseInt(reviewId));
        if (filteredReviews.length !== reviews.length) {
            this.setData('reviews', filteredReviews);
            return true;
        }
        return false;
    }

    // Cart operations (optimized)
    getCart(userId) {
        const cartKey = `cart_${userId}`;
        return JSON.parse(localStorage.getItem(cartKey) || '[]');
    }

    setCart(userId, cart) {
        const cartKey = `cart_${userId}`;
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    addToCart(userId, productId, quantity = 1) {
        const cart = this.getCart(userId);
        const existingItem = cart.find(item => item.productId === parseInt(productId));
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: parseInt(productId),
                quantity: quantity
            });
        }
        
        this.setCart(userId, cart);
        return cart;
    }

    removeFromCart(userId, productId) {
        const cart = this.getCart(userId);
        const filteredCart = cart.filter(item => item.productId !== parseInt(productId));
        this.setCart(userId, filteredCart);
        return filteredCart;
    }

    updateCartQuantity(userId, productId, quantity) {
        const cart = this.getCart(userId);
        const item = cart.find(item => item.productId === parseInt(productId));
        
        if (item) {
            if (quantity <= 0) {
                return this.removeFromCart(userId, productId);
            } else {
                item.quantity = quantity;
                this.setCart(userId, cart);
                return cart;
            }
        }
        return cart;
    }

    getCartItems(userId) {
        const cart = this.getCart(userId);
        return cart.map(item => {
            const product = this.getProductById(item.productId);
            return product ? { ...product, quantity: item.quantity } : null;
        }).filter(Boolean);
    }

    clearCart(userId) {
        this.setCart(userId, []);
    }

    // Statistics and analytics
    getProductStats() {
        const products = this.getProducts();
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
        const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
        const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
        
        return {
            totalProducts,
            totalStock,
            totalSold,
            totalValue,
            averagePrice: totalProducts > 0 ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts : 0
        };
    }

    getOrderStats() {
        const orders = this.getOrders();
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        
        return {
            totalOrders,
            totalRevenue,
            pendingOrders,
            averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
        };
    }

    getTopSellingProducts(limit = 5) {
        const products = this.getProducts();
        return products
            .sort((a, b) => (b.sold || 0) - (a.sold || 0))
            .slice(0, limit);
    }

    getLowStockProducts(threshold = 10) {
        const products = this.getProducts();
        return products.filter(p => p.stock <= threshold);
    }

    // Reset database
    reset() {
        localStorage.clear();
        this.cache.clear();
        this.indexes.clear();
        this.initialized = false;
        this.init();
    }

    // Export/Import functionality
    exportData() {
        return {
            products: this.getProducts(),
            users: this.getUsers(),
            orders: this.getOrders(),
            reviews: this.getReviews()
        };
    }

    importData(data) {
        if (data.products) this.setData('products', data.products);
        if (data.users) this.setData('users', data.users);
        if (data.orders) this.setData('orders', data.orders);
        if (data.reviews) this.setData('reviews', data.reviews);
    }

    // Excel/CSV Import functionality
    async importFromExcel(file, dataType = 'products') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    let data;
                    
                    if (file.name.endsWith('.csv')) {
                        data = this.parseCSV(content);
                    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                        // For Excel files, we'll need to use a library like SheetJS
                        // For now, we'll show how to handle CSV
                        reject(new Error('Excel files require additional library. Please use CSV format.'));
                        return;
                    } else {
                        reject(new Error('Unsupported file format. Please use CSV or Excel files.'));
                        return;
                    }
                    
                    const processedData = this.processImportedData(data, dataType);
                    this.importData({ [dataType]: processedData });
                    
                    resolve({
                        success: true,
                        message: `Successfully imported ${processedData.length} ${dataType}`,
                        data: processedData
                    });
                    
                } catch (error) {
                    reject(new Error(`Import failed: ${error.message}`));
                }
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    // Parse CSV content
    parseCSV(content) {
        const lines = content.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = this.parseCSVLine(lines[i]);
                const row = {};
                
                headers.forEach((header, index) => {
                    row[header] = values[index] ? values[index].trim().replace(/"/g, '') : '';
                });
                
                data.push(row);
            }
        }
        
        return data;
    }

    // Parse CSV line with proper handling of quoted values
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current);
        return values;
    }

    // Process imported data based on type
    processImportedData(data, dataType) {
        switch (dataType) {
            case 'products':
                return this.processProductData(data);
            case 'users':
                return this.processUserData(data);
            case 'orders':
                return this.processOrderData(data);
            case 'reviews':
                return this.processReviewData(data);
            default:
                throw new Error(`Unknown data type: ${dataType}`);
        }
    }

    // Process product data
    processProductData(data) {
        return data.map((row, index) => ({
            id: parseInt(row.id) || Date.now() + index,
            productName: row.productName || row.name || row.title || '',
            category: row.category || 'Uncategorized',
            price: parseFloat(row.price) || 0,
            stock: parseInt(row.stock) || 0,
            description: row.description || row.desc || '',
            image: row.image || row.imageUrl || '',
            sold: parseInt(row.sold) || 0
        })).filter(product => product.productName && product.price > 0);
    }

    // Process user data
    processUserData(data) {
        return data.map((row, index) => ({
            username: row.username || row.user || '',
            password: row.password || 'default123',
            role: row.role || 'customer',
            name: row.name || row.fullName || row.username || '',
            address: row.address || '',
            phone: row.phone || row.phoneNumber || '',
            cusid: row.cusid || this.generateCusId()
        })).filter(user => user.username);
    }

    // Process order data
    processOrderData(data) {
        return data.map((row, index) => ({
            id: parseInt(row.id) || Date.now() + index,
            userId: row.userId || row.username || '',
            userName: row.userName || row.customerName || '',
            items: this.parseOrderItems(row.items || ''),
            total: parseFloat(row.total) || 0,
            status: row.status || 'Pending',
            date: row.date || new Date().toISOString()
        })).filter(order => order.userId && order.total > 0);
    }

    // Process review data
    processReviewData(data) {
        return data.map((row, index) => ({
            id: parseInt(row.id) || Date.now() + index,
            productId: parseInt(row.productId) || 0,
            userId: row.userId || row.username || '',
            userName: row.userName || row.reviewerName || '',
            rating: parseInt(row.rating) || 5,
            comment: row.comment || row.review || '',
            date: row.date || new Date().toISOString()
        })).filter(review => review.productId && review.userId);
    }

    // Parse order items from string
    parseOrderItems(itemsString) {
        try {
            if (typeof itemsString === 'string') {
                return JSON.parse(itemsString);
            }
            return itemsString || [];
        } catch {
            return [];
        }
    }

    // Generate customer ID
    generateCusId() {
        let users = this.getUsers();
        let maxId = 0;
        users.forEach(u => {
            if (u.cusid) {
                const num = parseInt(u.cusid.replace('CUS', ''));
                if (!isNaN(num) && num > maxId) maxId = num;
            }
        });
        return 'CUS' + String(maxId + 1).padStart(4, '0');
    }

    // Export to CSV
    exportToCSV(dataType) {
        const data = this.getData(dataType);
        if (!data || data.length === 0) {
            throw new Error(`No ${dataType} data to export`);
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => {
                    const value = row[header];
                    return typeof value === 'string' && value.includes(',') 
                        ? `"${value}"` 
                        : value;
                }).join(',')
            )
        ].join('\n');

        return csvContent;
    }

    // Download CSV file
    downloadCSV(dataType, filename = null) {
        try {
            const csvContent = this.exportToCSV(dataType);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || `${dataType}_export_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            return {
                success: true,
                message: `Successfully exported ${dataType} to CSV`
            };
        } catch (error) {
            throw new Error(`Export failed: ${error.message}`);
        }
    }
}

// Create global database instance
const db = new DatabaseManager();

// Export for use in other modules
window.db = db; 