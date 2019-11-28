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
//Route::get('{data?}', function() {
//    // Serve the "index.html" file that controls the whole frontend.
//    return View::file('app/index.html');
//})->where('data', '.*');
Route::get('/', function () {
    return View::file('app/index.html');
    return view('welcome');
});

$api->version('v1',function($api) {
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, PATCH, DELETE');

    // API
    $api->group(['namespace'=>'App\Http\Controllers'],function($api){
        $api->resource('todos', "TodoController");
    });
});
