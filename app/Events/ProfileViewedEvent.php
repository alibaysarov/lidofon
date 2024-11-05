<?php

namespace App\Events;

use App\Enum\EventType;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProfileViewedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $viewerId;
    public string $type;

    public function __construct($viewerId)
    {
        $this->viewerId = $viewerId;
        $this->type = EventType::PAGE_VISIT->value;
    }


    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
