# Backup Import Guide

## Overview
The admin panel now includes a "Import Backup Data" feature that allows you to restore all data from Excel backup files.

## How to Use

1. **Access the Admin Panel**
   - Login as admin (username: `admin`, password: `admin123`)
   - Navigate to the Admin Panel

2. **Import Backup Data**
   - In the Quick Actions section, find "Import Backup Data"
   - Select your backup file (Excel format recommended)
   - Click "Import Backup Data"
   - The system will process your file and import all data types

3. **Import Process**
   - The system automatically detects and imports all data types from your backup file
   - Status messages will show the import progress and results
   - All found data types (products, users, orders, reviews) will be imported

## File Format Requirements

### Excel Files (.xlsx, .xls) - Recommended
Use an Excel file with separate sheets for each data type:

```
Sheet: "products"
- id, productName, category, price, stock, description, image, sold

Sheet: "users"  
- username, password, role, name, address, phone, cusid

Sheet: "orders"
- id, userId, userName, items, total, status, date

Sheet: "reviews"
- id, productId, userId, userName, rating, comment, date
```

### CSV Files (.csv) - Limited Support
CSV files require a specific format for full backup import and are not recommended for complete system restoration.

## Important Notes

- **Excel files** are recommended for complete backup restoration
- The system automatically imports all data types found in the backup file
- Existing data may be overwritten during import
- Always backup your current data before importing
- The system validates data and skips invalid records

## Troubleshooting

- **"Sheet not found"**: Ensure your Excel file has the correct sheet names (products, users, orders, reviews)
- **"Import failed"**: Check that your file format matches the expected structure
- **"No valid data"**: Verify that your data contains required fields
- **"Unsupported file type"**: Use Excel files (.xlsx, .xls) for best results

## Data Validation

The system automatically validates imported data:
- Required fields must be present
- Numeric fields must contain valid numbers
- Dates should be in ISO format (YYYY-MM-DD)
- Product images should have valid URLs
- User roles must be 'admin' or 'customer'

## Backup Best Practices

1. **Regular Backups**: Create backups before major changes
2. **Test Imports**: Test backup files on a development environment first
3. **File Naming**: Use descriptive names with dates (e.g., `backup_2024-01-15.xlsx`)
4. **Data Verification**: Verify backup data integrity before relying on it
5. **Excel Format**: Use Excel format for complete system backups 