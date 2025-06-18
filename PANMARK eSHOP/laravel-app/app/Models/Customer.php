<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_id',
        'address',
        'preferences',
    ];

    protected $casts = [
        'preferences' => 'array',
    ];

    /**
     * Get the user that owns the customer.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the cart for the customer.
     */
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    /**
     * Get the orders for the customer.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the reviews for the customer.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Add product to cart
     */
    public function addToCart(Product $product)
    {
        $cart = $this->cart()->firstOrCreate();
        $cart->addProduct($product);
        
        return $cart;
    }

    /**
     * Place order
     */
    public function placeOrder()
    {
        $cart = $this->cart;
        
        if (!$cart || $cart->items->isEmpty()) {
            throw new \Exception('Cart is empty');
        }

        $order = Order::create([
            'customer_id' => $this->id,
            'order_date' => now(),
            'status' => 'pending',
            'total_amount' => $cart->getTotal(),
        ]);

        // Add cart items to order
        foreach ($cart->items as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]);

            // Update product stock and purchase count
            $product = $item->product;
            $product->decrement('stock', $item->quantity);
            $product->increment('purchase_count', $item->quantity);
        }

        // Clear cart
        $cart->items()->delete();

        return $order;
    }

    /**
     * Add review to product
     */
    public function addReview(Product $product, array $reviewData)
    {
        $review = Review::create([
            'customer_id' => $this->id,
            'product_id' => $product->id,
            'rating' => $reviewData['rating'],
            'comment' => $reviewData['comment'],
        ]);

        return $review;
    }
} 