<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UserController;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');


Route::group(['prefix' => 'auth'], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::get('me', 'getMe');
        Route::post('logout', 'logout');
    });
});
Route::middleware('auth:api')->group(function () {
    Route::get('auth/me',[AuthController::class,'getMe']);
    Route::group(['prefix' => 'users'], function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('all', [UserController::class, 'allUsers']);
            Route::get('{id}', [UserController::class, 'getOne']);
            Route::put('/edit/{id}', [UserController::class, 'update']);
            Route::delete('/soft-delete/{id}', [UserController::class, 'softDelete']);
            Route::delete('/hard-delete/{id}', [UserController::class, 'hardDelete']);
            Route::get('/restore/{id}', [UserController::class, 'restore']);
        });
    });
});


