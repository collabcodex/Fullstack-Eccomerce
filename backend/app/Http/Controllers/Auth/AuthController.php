<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required|min:3",
            "email" => "required|email",
            "password" => "required|string|min:8",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        };

        return $this->createNewToken($token);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required|alpha_dash|unique:users,username|min:3",
            "name" => "required|min:3",
            "email" => "required",
            "password" => "required|min:8",
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        };

        $user = User::create(array_merge(
            $validator->validated(),
            ["password" => bcrypt($request->password)],
        ));

        return response()->json([
            "message" => "Register sukes",
            "user" => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function userProfile()
    {
        // if (auth()->guard('api')->user() === false) 
        // {
        //     return response()->json([
        //         "message" => "Unauthenticated"
        //     ], 401);
        // }
        return response()->json(auth()->guard('api')->user());
    }

    // public function refresh()
    // {
    //     return $this->createNewToken(auth()->guard('api')->refresh());
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        auth()->guard('api')->logout();

        return response()->json([
            "message" => "Berhasil logout",
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'token' => $token,
            'type' => 'bearer',
            'expired' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {

    }
}