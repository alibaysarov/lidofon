<?php

namespace App\DTO;

use Spatie\LaravelData\Data;

class LoginUserDto extends Data
{
    public function __construct(
        public string $email,
        public string $password,
    )
    {
    }
}
