<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'todos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['text', 'done'];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'done' => false,
    ];

}
