<?php

namespace App\Service;

interface HistoryService
{
    public function addToHistory(string $id,string $type):void;
}
