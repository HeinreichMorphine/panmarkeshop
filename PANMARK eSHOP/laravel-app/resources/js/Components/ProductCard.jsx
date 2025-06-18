import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            router.post('/cart/add', { product_id: product.id });
        }
    };

    const handleViewDetails = () => {
        if (onViewDetails) {
            onViewDetails(product);
        } else {
            router.get(`/products/${product.id}`);
        }
    };

    return (
        <div 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #DCD7C9',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className="w-full h-48 flex items-center justify-center"
                style={{ backgroundColor: '#DCD7C9' }}
            >
                {product.image_url ? (
                    <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-4xl" style={{ color: '#A27B5C' }}>
                        📦
                    </div>
                )}
            </div>
            
            <div className="p-4">
                <h3 
                    className="text-lg font-bold mb-2"
                    style={{ color: '#2C3639' }}
                >
                    {product.name}
                </h3>
                
                <p 
                    className="text-sm mb-2"
                    style={{ color: '#A27B5C' }}
                >
                    {product.category}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                    <span 
                        className="text-xl font-bold"
                        style={{ color: '#A27B5C' }}
                    >
                        ${parseFloat(product.price).toFixed(2)}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <span 
                                key={i}
                                className="text-sm"
                                style={{ 
                                    color: i < Math.floor(product.average_rating || 0) ? '#A27B5C' : '#DCD7C9' 
                                }}
                            >
                                ⭐
                            </span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                            ({product.review_count || 0})
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                    <span 
                        className="text-sm"
                        style={{ color: '#3F4E4F' }}
                    >
                        Stock: {product.stock}
                    </span>
                    <span 
                        className="text-sm"
                        style={{ color: '#3F4E4F' }}
                    >
                        Sold: {product.purchase_count || 0}
                    </span>
                </div>
                
                <div className="flex space-x-2">
                    <button
                        onClick={handleViewDetails}
                        className="flex-1 py-2 px-3 text-sm font-medium rounded transition-colors duration-200"
                        style={{
                            backgroundColor: '#3F4E4F',
                            color: '#ffffff',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#2C3639';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#3F4E4F';
                        }}
                    >
                        View Details
                    </button>
                    
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className="flex-1 py-2 px-3 text-sm font-medium rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: product.stock > 0 ? '#A27B5C' : '#DCD7C9',
                            color: '#ffffff',
                        }}
                        onMouseEnter={(e) => {
                            if (product.stock > 0) {
                                e.target.style.backgroundColor = '#8b6b4a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (product.stock > 0) {
                                e.target.style.backgroundColor = '#A27B5C';
                            }
                        }}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
} 