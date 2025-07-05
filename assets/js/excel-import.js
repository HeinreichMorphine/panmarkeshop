// Panmark Enterprise - Excel Import Utility
// Handles CSV and Excel file imports with data validation

class ExcelImportUtility {
    constructor(database) {
        this.db = database;
    }

    // Main import function
    async importFromFile(file, dataType = 'products') {
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
                        reject(new Error('Excel files require additional library. Please use CSV format.'));
                        return;
                    } else {
                        reject(new Error('Unsupported file format. Please use CSV or Excel files.'));
                        return;
                    }
                    
                    const processedData = this.processImportedData(data, dataType);
                    this.db.importData({ [dataType]: processedData });
                    
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
        let users = this.db.getUsers();
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
        const data = this.db.getData(dataType);
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

    // Get CSV template for data type
    getCSVTemplate(dataType) {
        const templates = {
            products: 'id,productName,category,price,stock,description,image,sold',
            users: 'username,password,role,name,address,phone,cusid',
            orders: 'id,userId,userName,items,total,status,date',
            reviews: 'id,productId,userId,userName,rating,comment,date'
        };
        
        return templates[dataType] || '';
    }

    // Validate imported data
    validateData(data, dataType) {
        const errors = [];
        
        data.forEach((row, index) => {
            switch (dataType) {
                case 'products':
                    if (!row.productName) errors.push(`Row ${index + 1}: Missing product name`);
                    if (!row.price || row.price <= 0) errors.push(`Row ${index + 1}: Invalid price`);
                    break;
                case 'users':
                    if (!row.username) errors.push(`Row ${index + 1}: Missing username`);
                    break;
                case 'orders':
                    if (!row.userId) errors.push(`Row ${index + 1}: Missing user ID`);
                    if (!row.total || row.total <= 0) errors.push(`Row ${index + 1}: Invalid total`);
                    break;
                case 'reviews':
                    if (!row.productId) errors.push(`Row ${index + 1}: Missing product ID`);
                    if (!row.userId) errors.push(`Row ${index + 1}: Missing user ID`);
                    if (!row.rating || row.rating < 1 || row.rating > 5) errors.push(`Row ${index + 1}: Invalid rating`);
                    break;
            }
        });
        
        return errors;
    }
}

// Create global Excel import utility instance
window.excelImport = new ExcelImportUtility(window.db); 