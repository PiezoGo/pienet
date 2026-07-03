<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Film model representing a PieNet film launch entry.
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $genre
 * @property string $logline
 * @property string $synopsis
 * @property string $director
 * @property array  $cast
 * @property \Illuminate\Support\Carbon $release_date
 * @property string|null $trailer_url
 * @property string|null $poster_image
 */
class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'genre',
        'logline',
        'synopsis',
        'director',
        'cast',
        'release_date',
        'trailer_url',
        'poster_image',
    ];

    protected $casts = [
        'cast'         => 'array',
        'release_date' => 'date',
    ];
}
