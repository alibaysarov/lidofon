<?php

namespace App\DTO;

use Spatie\LaravelData\Data;

class UserDto extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $last_name,
        public string $email,
        public bool   $inTrash = false
    )
    {
    }
}
