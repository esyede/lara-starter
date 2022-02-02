<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'admin-api', 'middleware' => ['auth:admin']], function () {
});

Route::get('/admin/login', 'AuthController@loginForm')->name('login.admin');
Route::post('/admin/login', 'AuthController@login');
Route::get('/admin/logout', 'AuthController@logout')->name('logout.admin');
Route::get('/admin/{any?}', 'MainController@index')->where('any', '.*')->name('admin');
