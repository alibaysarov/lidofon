<?php

namespace App\Service;

use App\DTO\LoginUserDto;
use App\DTO\RegisterUserDto;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Http\JsonResponse;

interface AuthService
{
    public function login(LoginUserDto $loginUserDto): JsonResponse;

    public function register(RegisterUserDto $registerUserDto): JsonResponse;

    public function logout(): JsonResponse;
}
