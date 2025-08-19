<?php

use App\Http\Controllers\AktivitasController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\AuthController;
use App\Http\Controllers\BagianController;
use App\Http\Controllers\LevelController;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
route::get('/', [AuthController::class, 'showLogin'])->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/bagian', [BagianController::class, 'index'])->name('bagian.index');

    Route::get('/level', [LevelController::class, 'index'])->name('level.index');
    Route::get('/aktivitas', [AktivitasController::class, 'index'])->name('aktivitas.index');
    Route::get('/user', [AuthController::class, 'user'])->name('user.index');
    Route::get('/proyek', [AuthController::class, 'proyek'])->name('proyek.index');
    Route::get('/status', [AuthController::class, 'status'])->name('status.index');
    Route::get('/mode', [AuthController::class, 'mode'])->name('mode.index');
    Route::get('/jam-kerja', [AuthController::class, 'jam'])->name('jam.index');
    Route::get('/lembur', [AuthController::class, 'lembur'])->name('lembur.index');
    Route::get('/pesan', [AuthController::class, 'pesan'])->name('pesan.index');
    Route::get('/keterangan', [AuthController::class, 'keterangan'])->name('keterangan.index');
    Route::get('/jenis-pesan', [AuthController::class, 'jenis'])->name('jenis.index');
    Route::get('/proyek-user', [AuthController::class, 'proyekUser'])->name('proyekUser.index');
    Route::get('/jam-per-tanggal', [AuthController::class, 'tanggal'])->name('tanggal.index');
    Route::get('/user-profile', [AuthController::class, 'userProfile'])->name('userProfile.index');
    Route::get('/status-jam-kerja', [AuthController::class, 'statusJam'])->name('statusJam.index');

});
