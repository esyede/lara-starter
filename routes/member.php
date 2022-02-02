<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'member-api'], function () {
});

Route::get('/member/logout', 'MainController@logout')->name('logout.member');
Route::get('/member/{any?}', 'MainController@index')->where('any', '.*');
