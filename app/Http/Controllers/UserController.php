<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile\UserProfile;

class UserController extends Controller
{
    public function index()
    {
        $users = UserProfile::with(['user', 'bagian', 'level', 'status'])->get();
        return view('users.index', compact('users'));
    }

    public function show($id)
    {
        $user = UserProfile::with(['user', 'bagian', 'level', 'status'])->findOrFail($id);
        return view('users.show', compact('user'));
    }
}
