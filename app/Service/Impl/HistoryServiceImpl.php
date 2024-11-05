<?php

namespace App\Service\Impl;

use App\Repository\Impl\HistoryRepositoryImpl;
use App\Service\HistoryService;

class HistoryServiceImpl implements HistoryService
{
    public function __construct(
        protected HistoryRepositoryImpl $historyRepository
    )
    {
    }

    public function addToHistory(string $id, string $type): void
    {
        info("service data is ",[$id,$type]);
        $this->historyRepository->addToHistory($id, $type);
    }
}
