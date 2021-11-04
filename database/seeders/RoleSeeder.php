<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Director permissions
        $permissions = Permission::all();

        Role::updateOrCreate(['name' => 'Administrator', 'slug' => 'admin', 'deletable' => false])
            ->permissions()
            ->sync($permissions->pluck('id'));

        // Employee permissions
        $permissions = Permission::where('slug', 'dashboard')
            ->orWhere('slug', 'evaluation.index')
            ->get();

        Role::updateOrCreate(['name' => 'Member', 'slug' => 'member', 'deletable' => false])
            ->permissions()
            ->sync($permissions->pluck('id'));
    }
}
