<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transforms a Film model into a clean JSON API response.
 */
class FilmResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'genre'        => $this->genre,
            'logline'      => $this->logline,
            'synopsis'     => $this->synopsis,
            'director'     => $this->director,
            'cast'         => $this->cast,
            'release_date' => $this->release_date?->format('Y-m-d'),
            'trailer_url'  => $this->trailer_url,
            'poster_image' => $this->poster_image,
        ];
    }
}
