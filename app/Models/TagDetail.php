<?php

namespace App\Models;

use Eloquent;

class TagDetail extends Eloquent
{
    protected $guarded = ['id'];

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
