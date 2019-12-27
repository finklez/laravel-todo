<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UsersTableSeeder::class);
        $this->command->info('User table seeded!');

        $this->call(TodosTableSeeder::class);
        $this->command->info('Todo table seeded!');

        Model::reguard();
    }
}
