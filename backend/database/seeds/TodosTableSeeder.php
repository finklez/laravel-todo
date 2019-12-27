<?php

use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $first_user = App\User::find(1);

        DB::table('todos')->update([
            'user_id' => $first_user->id,
        ]);
    }
}
