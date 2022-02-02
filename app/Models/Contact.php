<?php

namespace App\Models;

use Eloquent;

class Contact extends Eloquent
{
    protected $guarded = ['id'];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
