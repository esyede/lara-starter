<?php

namespace App\Models;

use Eloquent;

class Agent extends Eloquent
{
    protected $guarded = ['id'];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
