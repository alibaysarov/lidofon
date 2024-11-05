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
        info("evt data", [$event->viewerId, $event->type]);
        $this->historyServiceImpl->addToHistory($event->viewerId, $event->type);
        info("history updated add edit event");
    }
}
