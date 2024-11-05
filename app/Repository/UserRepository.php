<?php

namespace App\Repository;

use App\DTO\FilterUserDto;
use App\DTO\RegisterUserDto;
use App\Filter\UserFilter;
use App\Models\User;
use \Illuminate\Database\Eloquent\Collection;

interface UserRepository
{
    public function getPagedAndFilteredUsers(UserFilter $userFilter,string $page);

    public function getOneUser(string $id): User|null;

    public function findUserByEmail(string $email): Collection;

    public function createUser(RegisterUserDto $registerUserDto): User;

    public function updateUser(string $id, array $data): User;

    public function softDeleteUser(string $id): void;

    public function restoreUser(string $id): User;

    public function hardDeleteUser(string $id): void;

}
