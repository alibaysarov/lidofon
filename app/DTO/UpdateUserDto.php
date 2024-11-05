<?php

namespace App\DTO;

use Spatie\LaravelData\Data;

class UpdateUserDto extends Data
{
    public function __construct(
        public string $name,
        public string $last_name,
        public string $email,
    )
    {
    }
}
