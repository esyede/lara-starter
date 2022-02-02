<?php

namespace App\Models;

use Eloquent;

class Device extends Eloquent
{
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
