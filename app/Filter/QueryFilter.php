<?php

namespace App\Filter;

use Illuminate\Database\Eloquent\Builder;

class QueryFilter
{
    protected $request;
    protected Builder $builder;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function apply(Builder $builder)
    {
        $this->builder = $builder;

        foreach ($this->filters() as $filter => $value) {
            if (method_exists($this, $filter)) {
                $this->$filter($value);
            }
        }

        return $this->builder;
    }

    public function filters()
    {
        return $this->request->all();
    }

}
