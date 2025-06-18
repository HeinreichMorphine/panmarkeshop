<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'admin_id',
        'permissions',
    ];

    protected $casts = [
        'permissions' => 'array',
    ];

    /**
     * Get the user that owns the admin.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Generate sales report
     */
    public function generateSalesReport()
    {
        $totalSales = Order::sum('total_amount');
        $totalOrders = Order::count();
        $totalProducts = Product::count();

        return [
            'total_sales' => $totalSales,
            'total_orders' => $totalOrders,
            'total_products' => $totalProducts,
            'report_date' => now(),
        ];
    }

    /**
     * Backup data
     */
    public function backupData()
    {
        $backup = [
            'products' => Product::all(),
            'orders' => Order::all(),
            'reviews' => Review::all(),
            'customers' => Customer::all(),
            'backup_date' => now(),
        ];

        // In a real application, you would save this to a file or cloud storage
        \Log::info('Data backup completed', $backup);
        
        return $backup;
    }

    /**
     * Fetch backup data
     */
    public function fetchBackup()
    {
        // In a real application, you would retrieve from backup storage
        return [
            'message' => 'Backup data fetched successfully',
            'timestamp' => now(),
        ];
    }
} 