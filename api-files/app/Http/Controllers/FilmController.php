<?php

namespace App\Http\Controllers;

use App\Http\Resources\FilmResource;
use App\Models\Film;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Handles film listing and detail retrieval.
 */
class FilmController extends Controller
{
    /**
     * GET /api/films
     * Returns all films ordered by release date.
     * Optional query param: ?genre=Neo-Noir+Thriller
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $films = Film::query()
            ->when(
                $request->query('genre'),
                fn ($query, $genre) => $query->where('genre', $genre)
            )
            ->orderBy('release_date')
            ->get();

        return FilmResource::collection($films);
    }

    /**
     * GET /api/films/{slug}
     * Returns a single film by URL slug.
     */
    public function show(string $slug): FilmResource|JsonResponse
    {
        $film = Film::where('slug', $slug)->first();

        if (! $film) {
            return response()->json(
                ['message' => 'Film not found.'],
                404
            );
        }

        return new FilmResource($film);
    }
}
