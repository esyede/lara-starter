<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Admin;

class AuthController extends Controller
{
    public function loginForm(Request $request)
    {
        return view('auth.admin_login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'     => 'required|string|email',
            'password'  => 'required|string'
        ]);

        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            return redirect()->route('admin');
        }

        return redirect()->back()->with('alert-error', 'Email atau kata sandi salah');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        return redirect()->route('login.admin');
    }
}
