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
        $user = $this->getAuthenticatedUser();
        $mainTodos = Todo::where('user_id', $user->id)->get();

        return response()->json(compact('mainTodos'));
    }

    // we expect to have user token, else throw
    private function getAuthenticatedUser()
    {
        return JWTAuth::parseToken()->authenticate();
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

        $user = $this->getAuthenticatedUser();

        $mainTodos = new Todo;
        $mainTodos->text = $request->input('mainTodo.text');
        $mainTodos->done = $request->input('mainTodo.done', false);
        $mainTodos->user_id = $user->id;
        $mainTodos->save();

        return response()->json(compact('mainTodos'));
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
        // validate
        $this->validate($request, [
            'mainTodo.text' => 'required|max:255',
            'mainTodo.done' => 'required|boolean',
        ]);

        $user = $this->getAuthenticatedUser();

        $todo = Todo::where('id', $id)
            ->where('user_id', $user->id)
            ->first();
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
