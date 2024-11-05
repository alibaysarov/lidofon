<?php

namespace App\Listeners;

use App\Events\ProfileViewedEvent;
use App\Repository\Impl\HistoryRepositoryImpl;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ProfileViewListener
{
    /**
     * Create the event listener.
     */
    public function __construct(
        protected HistoryRepositoryImpl $historyRepositoryImpl
    )
    {
    }

    /**
     * Handle the event.
     */
    public function handle(ProfileViewedEvent $event): void
    {
        $this->historyRepositoryImpl->addToHistory($event->viewerId, $event->type);
    }
}
