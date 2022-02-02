<?php

namespace App\Models;

use Eloquent;

class WebhookEvent extends Eloquent
{
    protected $guarded = ['id'];

    public function webhook()
    {
        return $this->belongsTo(Webhook::class);
    }
}
