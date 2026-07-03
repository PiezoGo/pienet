<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\FilmController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PieNet API Routes
|--------------------------------------------------------------------------
|
| GET  /api/films           → All films (optional ?genre= filter)
| GET  /api/films/{slug}    → Single film by slug
| POST /api/contact         → Contact form submission
|
*/

Route::get('/films',        [FilmController::class,   'index']);
Route::get('/films/{slug}', [FilmController::class,   'show']);
Route::post('/contact',     [ContactController::class, 'store']);
