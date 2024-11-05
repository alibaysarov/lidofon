<?php

namespace App\Service;

use App\DTO\FilterUserDto;
use App\DTO\UpdateUserDto;
use App\Filter\UserFilter;
use Illuminate\Http\JsonResponse;

interface UserService
{
    public function getAll(UserFilter $userFilter,string $page): JsonResponse;

    public function getOne(string $id): JsonResponse;

    public function update(string $id, UpdateUserDto $updateUserDto): JsonResponse;

    public function softDelete(string $id): void;

    public function hardDelete(string $id): void;

    public function restore(string $id): void;

}
