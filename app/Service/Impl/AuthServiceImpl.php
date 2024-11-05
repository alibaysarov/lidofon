<?php

namespace App\Service\Impl;

use App\DTO\LoginUserDto;
use App\DTO\RegisterUserDto;
use App\Models\User;
use App\Repository\Impl\UserRepositoryImpl;
use App\Service\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthServiceImpl implements AuthService
{

    public function __construct(
        protected UserRepositoryImpl $userRepository,
    )
    {
    }

    public function login(LoginUserDto $loginUserDto): JsonResponse
    {

        if (!$token = Auth::attempt($loginUserDto->all())) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function register(RegisterUserDto $registerUserDto): JsonResponse
    {
        $user = $this->userRepository->createUser($registerUserDto);
        $token = JWTAuth::fromUser($user);
        return response()->json(['token' => $token], 201);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out'], 302);
    }
}
