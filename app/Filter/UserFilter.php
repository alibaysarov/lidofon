<?php

namespace App\Filter;

use App\Filter\QueryFilter;

class UserFilter extends QueryFilter
{

    public function name($value)
    {
        $searchString = "%" . trim($value) . "%";
        return $this->builder->where('name', 'like', $searchString)
            ->orWhere('last_name', 'like', $searchString);
    }

    public function sort_name($value)
    {
        return $this->builder->orderBy("name", $value);
    }

    public function sort_last_name($value)
    {
        return $this->builder->orderBy("last_name", $value);
    }

}
