<?php

namespace App\Http\Controllers;

use App\Filter\UserFilter;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserFilterRequest;
use App\Service\Impl\UserServiceImpl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        protected UserServiceImpl $userService
    )
    {
    }

    public function allUsers(UserFilterRequest $request): JsonResponse
    {
        $request->validated();
        $filters = new UserFilter($request);
        return $this->userService->getAll($filters, $request->all()['page'] ?? "1");
    }

    public function getOne(string $id): JsonResponse
    {
        return $this->userService->getOne($id);
    }

    public function update(string $id, UpdateUserRequest $request): JsonResponse
    {
        $request->validated();
        return $this->userService->update($id, $request->toDto());
    }

    public function softDelete(string $id): JsonResponse
    {
        try {
            $this->selfDeleteValidation($id);
            $this->userService->softDelete($id);
            return response()->json(["message" => "user deleted to trash"]);
        } catch (\Exception $exception) {
            info("Error while deleting to trash", [$exception->getMessage()]);
            return response()->json(["message" => "Error while deleting to trash"], 500);
        }

    }

    public function restore(string $id): JsonResponse
    {
        try {
            $this->userService->restore($id);
            return response()->json(["message" => "user restored from trash"]);
        } catch (\Exception $exception) {
            info("Error while restoring from trash", [$exception->getMessage()]);
            return response()->json(["message" => "Error while restoring from trash"], 500);
        }
    }

    public function hardDelete(string $id): JsonResponse
    {
        try {
            $this->selfDeleteValidation($id);
            $this->userService->hardDelete($id);
            return response()->json(["message" => "user deleted completely"]);
        } catch (\Exception $exception) {
            info("Error while deleting user", [$exception->getMessage()]);
            return response()->json(["message" => "Error while deleting user"], 500);
        }
    }

    private function selfDeleteValidation(string $id)
    {
        $userId = auth()->id();
        if ($userId === $id) {
            return response()->json(["message" => "You can't delete yourself"], 422);
        }
        return;
    }
}
