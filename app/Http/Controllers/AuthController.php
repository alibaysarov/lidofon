<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Service\Impl\AuthServiceImpl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected AuthServiceImpl $authService
    )
    {
    }

    public function login(LoginUserRequest $request): JsonResponse
    {
        $request->validated();
        try {
            return $this->authService->login($request->toDto());
        } catch (\Throwable $exception) {
            info("error while register", [$exception]);
            return response()->json(["status" => "error", "message" => "user login failed"], 500);
        }
    }

    public function getMe(): JsonResponse
    {
        try {
            return response()->json(auth()->user()?->toDto());
        } catch (\Throwable $exception) {
            return response()->json(["status" => "error", "message" => "user login failed"], 500);
        }
    }

    public function register(RegisterUserRequest $request): JsonResponse
    {
        $request->validated();
        try {
            return $this->authService->register($request->toDto());
        } catch (\Throwable $exception) {
            info("error while register", [$exception]);
            return response()->json(["status" => "error", "message" => "user registration  failed"], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            return $this->authService->logout();
        } catch (\Throwable $exception) {
            info("error while register", [$exception]);
            return response()->json(["status" => "error", "message" => "user logout  failed"], 500);
        }
    }
}
