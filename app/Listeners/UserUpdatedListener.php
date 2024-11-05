<?php

namespace App\Listeners;


use App\Events\UserUpdatedEvent;
use App\Repository\Impl\HistoryRepositoryImpl;
use App\Service\Impl\HistoryServiceImpl;

class UserUpdatedListener
{
    /**
     * Create the event listener.
     */
    public function __construct(
        protected HistoryServiceImpl $historyServiceImpl
    )
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserUpdatedEvent $event): void
    {
        $this->historyServiceImpl->addToHistory($event->viewerId, $event->type);
    }
}
