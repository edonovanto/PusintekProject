<?php

use App\Http\Controllers\BarangController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/barangs',[BarangController::class,'index']);

Route::post('/barang',[BarangController::class,'store']);

Route::get('/barangs/{id}',[BarangController::class,'show']);

Route::put('/barangs/{id}/update',[BarangController::class,'update']);

Route::delete('/barangs/{id}',[BarangController::class,'destroy']);
