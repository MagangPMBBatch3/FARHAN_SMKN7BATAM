<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\AuthController;
use App\Http\Controllers\BagianController;
use App\Http\Controllers\LevelController;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Bagian
    Route::get('/bagian', [BagianController::class, 'index'])->name('bagian.index');

    // Level
    Route::get('/level', [LevelController::class, 'index'])->name('level.index');
});
