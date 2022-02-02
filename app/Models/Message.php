<?php

namespace App\Models;

use Eloquent;

class Message extends Eloquent
{
    protected $guarded = ['id'];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function reply_for()
    {
        return $this->belongsTo(Message::class, 'reply_for');
    }
}
