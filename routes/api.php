<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function() {
    Route::post('login', 'login')->name('login');
    Route::post('register', 'register')->name('register');
});

Route::middleware('auth:sanctum')->group(function() {

    Route::controller(AuthController::class)->group(function() {
        Route::get('home', 'openHomepage')->name('home');
        Route::post('logout', 'logout')->name('logout');
    });

    Route::prefix('feedbacks')->as('feedbacks.')->controller(FeedbackController::class)->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('store', 'store')->name('store');
        Route::get('show/{id}', 'show')->name('show');

        // Route::get('my', 'openMyFeedbacks')->name('my');

        Route::get('categories', 'categories')->name('categories');
    });

    Route::prefix('feedbacks/comments')->controller(CommentController::class)->group(function() {
        Route::get('/{feedbackId}', 'loadFeedbackComments')->name('index');
        Route::post('store', 'store')->name('store');
    });

    Route::get('/users', [UserController::class, 'loadUsers'])->name('users');


});

Route::middleware('auth:sanctum')->get('/auth-check', function (Request $request) {
    return response()->json(['authenticated' => auth()->check()]);
});
