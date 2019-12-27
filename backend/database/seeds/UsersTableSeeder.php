<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        DB::table('users')->insert([[
            'name' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => bcrypt('secret'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ],[
            'name' => 'user2',
            'email' => 'user2@gmail.com',
            'password' => bcrypt('secret'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]]);

//        factory(App\User::class, 3)->create()->each(function ($user) {
//            $user->todos()->save(factory(App\Todo::class)->make());
//        });
    }
}
