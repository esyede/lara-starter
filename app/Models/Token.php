<?php

namespace App\Models;

use Eloquent;

class Token extends Eloquent
{
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
