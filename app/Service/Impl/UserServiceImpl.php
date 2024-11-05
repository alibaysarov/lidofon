<?php

namespace App\Service\Impl;

use App\DTO\FilterUserDto;
use App\DTO\UpdateUserDto;
use App\Events\ProfileViewedEvent;
use App\Events\UserUpdatedEvent;
use App\Filter\UserFilter;
use App\Http\Requests\UserFilterRequest;
use App\Models\User;
use App\Repository\Impl\UserRepositoryImpl;
use App\Service\UserService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class UserServiceImpl implements UserService
{
    public function __construct(
        protected UserRepositoryImpl $userRepository
    )
    {
    }

    public function getAll(UserFilter $userFilter, string $page): JsonResponse
    {
        try {
            $cacheKey = 'users.' . md5(serialize($userFilter->filters()));
            $cacheTTL = 60;

            $users = Cache::remember($cacheKey, $cacheTTL, function () use ($userFilter, $page) {
                return $this->userRepository->getPagedAndFilteredUsers($userFilter, $page);
            });
            $totalPages = $users->lastPage();
            $users = $users->map(fn(User $user) => $user->toDto());
            return response()->json(["users" => $users, "total_pages" => $totalPages], 200);
        } catch (\Exception $e) {
            info("error while fetching users", [$e]);
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function getOne(string $id): JsonResponse
    {
        try {
            $cacheKey = "users.single.{$id}";
            $cacheTTL = 60;
            $user = Cache::remember($cacheKey, $cacheTTL, function () use ($id) {
                return $this->userRepository->getOneUser($id);
            })->first();
            ProfileViewedEvent::dispatch(auth()->id());
            return response()->json($user->toDto(), 200);
        } catch (\Exception $e) {
            info("error while fetching single user", [$e]);
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function update(string $id, UpdateUserDto $updateUserDto): JsonResponse
    {
        try {
            if ($this->hasOtherUserWithEmail($id, $updateUserDto->email)) {
                return response()->json(["error" => "Email already in use"], 422);
            }
            $user = $this->userRepository->updateUser($id, $updateUserDto->all())->toDto();
            $this->clearUserListCaches();
            Cache::forget("users.single.{$id}");
            UserUpdatedEvent::dispatch(auth()->id());
            return response()->json($user, 200);
        } catch (\Exception $e) {
            info("error while updating single user", [$e->getMessage(), $e]);
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function softDelete(string $id): void
    {
        $this->userRepository->softDeleteUser($id);
        Cache::forget('users');
        Cache::forget("users.single.{$id}");
    }

    public function hardDelete(string $id): void
    {
        $this->userRepository->hardDeleteUser($id);
        Cache::forget('users');
        Cache::forget("users.single.{$id}");
    }

    public function restore(string $id): void
    {
        $this->userRepository->restoreUser($id);
        Cache::forget('users');
        Cache::forget("users.single.{$id}");
    }

    private function hasOtherUserWithEmail(string $userId, string $email): bool
    {
        $userEmail = $this->userRepository->getOneUser($userId)?->email;
        $isNewEmail = $userEmail !== $email;
        return $isNewEmail && $this->userRepository->findUserByEmail($email)->count() > 0;
    }

    private function clearUserListCaches(): void
    {
    }
}
