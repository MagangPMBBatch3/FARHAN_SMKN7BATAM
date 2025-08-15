<?php

namespace App\Http\Controllers\AuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController {
    public function showLogin(){
        return view('auth.login');
    }
    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = \App\Models\User\User::where('email', $credentials['email'])->first();

    if ($user && $user->password === $credentials['password']) {
        Auth::login($user);
        $request->session()->regenerate();
        return redirect()->intended('/dashboard');
    }

    return back()->withErrors([
        'email' => 'Email atau password salah.'
    ]);
}

    public function dashboard()
    {
        return view('dashboard.index');
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
    public function user()
    {
        return view('components.user.index');
    }
    public function proyek()
    {
        return view('components.proyek.index');
    }
    public function status()
    {
        return view('components.status.index');
    }
    public function mode()
    {
        return view('components.mode.index');
    }
    public function jam()
    {
        return view('components.jam.index');
    }
}