<?php

namespace App\Http\Controllers\Member;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function index(Request $request)
    {
        return view('layouts.member');
    }

    public function logout(Request $request)
    {
        auth()->logout();

        return redirect()->route('login');
    }
}
