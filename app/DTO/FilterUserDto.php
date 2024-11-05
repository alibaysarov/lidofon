<?php

namespace App\DTO;

use Spatie\LaravelData\Data;

class FilterUserDto extends Data
{
    public function __construct(
        public string $name = "",
        public string $sort_name = "asc",
        public string $sort_last_name = "asc",
    )
    {
    }
}
