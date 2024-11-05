<?php

namespace App\Repository\Impl;

use App\DTO\FilterUserDto;
use App\DTO\RegisterUserDto;
use App\DTO\UserDto;
use App\Filter\UserFilter;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Database\Eloquent\Collection;

class UserRepositoryImpl implements UserRepository
{

    public function getPagedAndFilteredUsers(UserFilter $userFilter, string $page)
    {
        return User::withTrashed()
            ->newQuery()
            ->filter($userFilter)
            ->paginate(10, ['*'], 'page', $page);
    }

    public function getOneUser(string $id): User|null
    {
        return User::query()->where("id", $id)->first();
    }

    public function findUserByEmail(string $email): Collection
    {
        return User::query()->where("email", "=", $email)->get();
    }

    public function createUser(RegisterUserDto $registerUserDto): User
    {
        return User::create([
            'name' => $registerUserDto->name,
            'last_name' => $registerUserDto->last_name,
            'email' => $registerUserDto->email,
            'password' => Hash::make($registerUserDto->password),
        ]);
    }

    public function updateUser(string $id, array $data): User
    {
        $user = User::query()->findOrFail($id);
        $user->update($data);
        $user->save();
        return $user;
    }

    public function softDeleteUser(string $id): void
    {
        User::find($id)->delete();
    }

    public function restoreUser(string $id): User
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();
        return $user;
    }


    public function hardDeleteUser(string $id): void
    {
        User::withTrashed()->findOrFail($id)->forceDelete();
    }
}
