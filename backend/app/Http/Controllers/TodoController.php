<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use JWTAuth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = $this->getAuthenticatedUser2();
        $todos = [];
        if ($user) {
            $todos = Todo::where('user_id', $user->id)->get();
//            $todos = Todo::all();
        }

        return response()->json(['mainTodos' => $todos]);
    }

    public function getAuthenticatedUser2()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return null; // response()->json(['user_not_found'], 404);
            }
//        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
//            return response()->json(['token_expired'], $e->getStatusCode());
//        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
//            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return null; // response()->json(['token_absent'], $e->getStatusCode());
        }

        // the token is valid and we have found the user via the sub claim
//        return response()->json(compact('user'));
        return $user;
    }
    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
//        return $user;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request...
        $this->validate($request, [
            'mainTodo.text' => 'required|max:255',
            'mainTodo.done' => 'required|boolean',
        ]);
        $todo = new Todo;
        $todo->text = $request->input('mainTodo.text');
        $todo->done = $request->input('mainTodo.done', false);
        $todo->user_id = $this->getAuthenticatedUser()->id;
        $todo->save();

        return response()->json(['mainTodo' => $todo]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->validate($request, [
            'mainTodo.text' => 'required|max:255',
            'mainTodo.done' => 'required|boolean',
        ]);

        $todo = Todo::find($id);
        $todo->text = $request->input('mainTodo.text');
        $todo->done = $request->input('mainTodo.done');
        $todo->save();

        return response()->json(['mainTodo' => $todo]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Todo::destroy($id);

        return response()->json(['mainTodo' => ['id' => $id]]);
    }
}
