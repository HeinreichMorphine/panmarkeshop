<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'price',
        'stock',
        'purchase_count',
        'description',
        'image_url',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
        'purchase_count' => 'integer',
    ];

    /**
     * Get the reviews for the product.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the cart items for the product.
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get the order items for the product.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get hot selling products
     */
    public static function getHotSelling($limit = 10)
    {
        return self::orderBy('purchase_count', 'desc')
                   ->limit($limit)
                   ->get();
    }

    /**
     * Get products by category
     */
    public static function getByCategory($category)
    {
        return self::where('category', $category)->get();
    }

    /**
     * Get products with filters
     */
    public static function getWithFilters($filters = [])
    {
        $query = self::query();

        if (isset($filters['category']) && $filters['category']) {
            $query->where('category', $filters['category']);
        }

        if (isset($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (isset($filters['sort'])) {
            switch ($filters['sort']) {
                case 'name':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name-desc':
                    $query->orderBy('name', 'desc');
                    break;
                case 'price':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'popularity':
                    $query->orderBy('purchase_count', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->get();
    }

    /**
     * Check if product is in stock
     */
    public function isInStock()
    {
        return $this->stock > 0;
    }

    /**
     * Get average rating
     */
    public function getAverageRating()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Get review count
     */
    public function getReviewCount()
    {
        return $this->reviews()->count();
    }
} 