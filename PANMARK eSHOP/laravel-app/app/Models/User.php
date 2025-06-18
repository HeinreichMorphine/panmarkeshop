<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'phone_number',
        'user_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the admin record associated with the user.
     */
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    /**
     * Get the customer record associated with the user.
     */
    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    /**
     * Check if user is an admin
     */
    public function isAdmin()
    {
        return $this->user_type === 'admin';
    }

    /**
     * Check if user is a customer
     */
    public function isCustomer()
    {
        return $this->user_type === 'customer';
    }
} 