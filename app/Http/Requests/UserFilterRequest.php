<?php

namespace App\Http\Requests;

use App\DTO\FilterUserDto;
use App\DTO\UpdateUserDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Spatie\DataTransferObject\Validator;

class UserFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "string|nullable",
            "page" => "string|required",
            "sort_name" => "string|nullable",
            "sort_last_name" => "string|nullable",
        ];
    }

    public function toDto(): FilterUserDto
    {
        return new FilterUserDto(
            $this->name,
            $this->sort_name ?? "asc",
            $this->sort_last_name ?? "asc",
        );
    }

    protected function failedValidation(Validator|\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
