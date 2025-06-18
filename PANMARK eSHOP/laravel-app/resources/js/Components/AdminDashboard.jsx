import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSalesReport = () => {
        setIsLoading(true);
        router.get('/admin/sales-report', {}, {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleBackupData = () => {
        setIsLoading(true);
        router.post('/admin/backup', {}, {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleFetchBackup = () => {
        setIsLoading(true);
        router.post('/admin/fetch-backup', {}, {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 
                    className="text-3xl font-bold mb-4"
                    style={{ color: '#2C3639' }}
                >
                    Admin Dashboard
                </h1>
                <p 
                    className="text-lg"
                    style={{ color: '#3F4E4F' }}
                >
                    Manage your e-commerce platform
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sales Report Card */}
                <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ border: '1px solid #DCD7C9' }}
                >
                    <div className="text-center mb-4">
                        <div 
                            className="text-3xl mb-2"
                            style={{ color: '#A27B5C' }}
                        >
                            📊
                        </div>
                        <h3 
                            className="text-xl font-bold"
                            style={{ color: '#2C3639' }}
                        >
                            Sales Report
                        </h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span style={{ color: '#3F4E4F' }}>Total Sales:</span>
                            <span style={{ color: '#A27B5C', fontWeight: 'bold' }}>$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: '#3F4E4F' }}>Total Orders:</span>
                            <span style={{ color: '#A27B5C', fontWeight: 'bold' }}>0</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: '#3F4E4F' }}>Total Products:</span>
                            <span style={{ color: '#A27B5C', fontWeight: 'bold' }}>0</span>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleGenerateSalesReport}
                        disabled={isLoading}
                        className="w-full py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
                        style={{
                            backgroundColor: '#A27B5C',
                            color: '#ffffff',
                        }}
                        onMouseEnter={(e) => {
                            if (!isLoading) {
                                e.target.style.backgroundColor = '#8b6b4a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) {
                                e.target.style.backgroundColor = '#A27B5C';
                            }
                        }}
                    >
                        {isLoading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>

                {/* Data Management Card */}
                <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ border: '1px solid #DCD7C9' }}
                >
                    <div className="text-center mb-4">
                        <div 
                            className="text-3xl mb-2"
                            style={{ color: '#A27B5C' }}
                        >
                            💾
                        </div>
                        <h3 
                            className="text-xl font-bold"
                            style={{ color: '#2C3639' }}
                        >
                            Data Management
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={handleBackupData}
                            disabled={isLoading}
                            className="w-full py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
                            style={{
                                backgroundColor: '#3F4E4F',
                                color: '#ffffff',
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.target.style.backgroundColor = '#2C3639';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.target.style.backgroundColor = '#3F4E4F';
                                }
                            }}
                        >
                            {isLoading ? 'Backing up...' : 'Backup Data'}
                        </button>
                        
                        <button
                            onClick={handleFetchBackup}
                            disabled={isLoading}
                            className="w-full py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
                            style={{
                                backgroundColor: '#3F4E4F',
                                color: '#ffffff',
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.target.style.backgroundColor = '#2C3639';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.target.style.backgroundColor = '#3F4E4F';
                                }
                            }}
                        >
                            {isLoading ? 'Fetching...' : 'Fetch Backup'}
                        </button>
                    </div>
                </div>

                {/* Product Management Card */}
                <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ border: '1px solid #DCD7C9' }}
                >
                    <div className="text-center mb-4">
                        <div 
                            className="text-3xl mb-2"
                            style={{ color: '#A27B5C' }}
                        >
                            📦
                        </div>
                        <h3 
                            className="text-xl font-bold"
                            style={{ color: '#2C3639' }}
                        >
                            Product Management
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => router.get('/admin/products/create')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
                            style={{
                                backgroundColor: '#A27B5C',
                                color: '#ffffff',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#8b6b4a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#A27B5C';
                            }}
                        >
                            Add Product
                        </button>
                        
                        <button
                            onClick={() => router.get('/admin/products')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
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
                            Manage Products
                        </button>
                    </div>
                </div>

                {/* User Management Card */}
                <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ border: '1px solid #DCD7C9' }}
                >
                    <div className="text-center mb-4">
                        <div 
                            className="text-3xl mb-2"
                            style={{ color: '#A27B5C' }}
                        >
                            👥
                        </div>
                        <h3 
                            className="text-xl font-bold"
                            style={{ color: '#2C3639' }}
                        >
                            User Management
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => router.get('/admin/users')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
                            style={{
                                backgroundColor: '#A27B5C',
                                color: '#ffffff',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#8b6b4a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#A27B5C';
                            }}
                        >
                            View Users
                        </button>
                        
                        <button
                            onClick={() => router.get('/admin/users/create')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
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
                            Add User
                        </button>
                    </div>
                </div>

                {/* Order Management Card */}
                <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ border: '1px solid #DCD7C9' }}
                >
                    <div className="text-center mb-4">
                        <div 
                            className="text-3xl mb-2"
                            style={{ color: '#A27B5C' }}
                        >
                            🛒
                        </div>
                        <h3 
                            className="text-xl font-bold"
                            style={{ color: '#2C3639' }}
                        >
                            Order Management
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => router.get('/admin/orders')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
                            style={{
                                backgroundColor: '#A27B5C',
                                color: '#ffffff',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#8b6b4a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#A27B5C';
                            }}
                        >
                            View Orders
                        </button>
                        
                        <button
                            onClick={() => router.get('/admin/orders/pending')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
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
                            Pending Orders
                        </button>
                    </div>
                </div>

                {/* Analytics Card */}
                <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ border: '1px solid #DCD7C9' }}
                >
                    <div className="text-center mb-4">
                        <div 
                            className="text-3xl mb-2"
                            style={{ color: '#A27B5C' }}
                        >
                            📈
                        </div>
                        <h3 
                            className="text-xl font-bold"
                            style={{ color: '#2C3639' }}
                        >
                            Analytics
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => router.get('/admin/analytics')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
                            style={{
                                backgroundColor: '#A27B5C',
                                color: '#ffffff',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#8b6b4a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#A27B5C';
                            }}
                        >
                            View Analytics
                        </button>
                        
                        <button
                            onClick={() => router.get('/admin/analytics/export')}
                            className="w-full py-2 px-4 rounded transition-colors duration-200"
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
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 