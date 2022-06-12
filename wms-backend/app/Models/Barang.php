<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $table = "barangs";

    protected $fillable = [
        'name',
        'image_url',
        'buying_price',
        'selling_price',
        'stock',
        'created_at',
        'updated_at'
    ];
}
