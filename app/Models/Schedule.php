<?php

namespace App\Models;

use Eloquent;

class Schedule extends Eloquent
{
    protected $guarded = ['id'];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
