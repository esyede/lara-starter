<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'member@gmail.com',
            'password' => bcrypt('password'),
            'name' => 'Member',
            'role' => 'member',
        ]);
    }
}
