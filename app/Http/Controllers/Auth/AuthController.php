<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $request->validated();

        try {

            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'message' => 'User registered successfully'
            ], 201);

        }
        catch(\Exception $ex) {
            return response()->json([
                'error' => 'Failed due to this error: '.$ex->getMessage()
            ], 401);
        }
    }

    public function login()
    {

    }

    public function openHomepage()
    {
        return 'Homepage';
    }

}
