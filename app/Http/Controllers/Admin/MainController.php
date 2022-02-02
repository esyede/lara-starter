<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function index(Request $request)
    {
        if (! auth('admin')->check()) {
            return redirect()->route('login.admin');
        }

        return view('layouts.admin');
    }
}
