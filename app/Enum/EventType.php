<?php

namespace App\Enum;
enum EventType: string
{
    case PAGE_VISIT = 'page_visit';
    case EDIT = 'edit';
    case DELETE = 'delete';
    case HARD_DELETE = 'hard_delete';
    case RESTORE = 'restore';

    public static function fromString(string $status): self
    {
        return match ($status) {
            'page_visit' => self::PAGE_VISIT,
            'edit' => self::EDIT,
            'delete' => self::DELETE,
            'hard_delete' => self::HARD_DELETE,
            'restore' => self::RESTORE,
        };
    }
}
