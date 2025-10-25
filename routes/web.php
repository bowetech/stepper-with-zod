<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConnectFollowersController;
use App\Http\Controllers\HostOnboardingController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/admin/users', [UsersController::class, 'index'])->name('users.home');
    Route::post('/admin/users', [UsersController::class, 'store'])->name('users.store');
    Route::get('/admin/users/create', [UsersController::class, 'create'])->name('users.create');
    Route::get('/admin/users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit');
    Route::get('/admin/users/{user}', [UsersController::class, 'show'])->name('users.show');
    Route::put('/admin/users/{user}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('/admin/users/{user?}', [UsersController::class, 'destroy'])->name('users.destroy');

    Route::resource('permissions', PermissionController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('categories', CategoryController::class);
    Route::get('/social/connect', [ConnectFollowersController::class, 'index'])->name('followers.index');
    Route::post('/social/connect/{id}', [ConnectFollowersController::class, 'store'])->name('followers.store');
    Route::delete('/social/connect/{id}', [ConnectFollowersController::class, 'destroy'])->name('followers.destroy');

    Route::get('/become-a-host', [HostOnboardingController::class, 'index']);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';