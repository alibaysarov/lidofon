<?php

namespace App\Repository;

interface HistoryRepository
{
    public function addToHistory(string $id,string $type):void;
}
