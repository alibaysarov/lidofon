<?php

namespace App\Repository\Impl;

use App\Models\History;
use App\Repository\HistoryRepository;

class HistoryRepositoryImpl implements HistoryRepository
{

    public function addToHistory(string $id, string $type): void
    {
        $history = new History([
            "user_id" => $id,
            "action" => $type
        ]);
        $history->save();
    }
}
