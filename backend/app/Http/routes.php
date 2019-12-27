<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$api = app('Dingo\Api\Routing\Router');
// src: https://stackoverflow.com/questions/29217937/how-to-route-to-a-static-folder-in-laravel
Route::get('/', function () {
    return File::get(public_path() . '/dist/index.html'); // serve ember
});

$api->version('v1', function($api) {
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, PATCH, DELETE');

    // API
    $api->group(['namespace'=>'App\Http\Controllers'],function($api){
        $api->resource('mainTodos', "TodoController");
    });

    // API
    $api->group(['namespace'=>'App\Http\Controllers'],function($api) {
        // Auth
        $api->post('auth/login', 'Auth\AuthController@authenticate');
//        $api->post('auth/logout', 'Auth\AuthController@logout');

    });
});
