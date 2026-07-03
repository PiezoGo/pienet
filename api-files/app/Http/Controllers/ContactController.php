<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

/**
 * Handles contact form submissions.
 * Validates input, persists to the DB, and optionally sends a notification email.
 */
class ContactController extends Controller
{
    /**
     * POST /api/contact
     * Validates the contact form payload and stores it in the submissions table.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'min:2', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:10'],
        ]);

        // Persist to the database
        Submission::create($validated);

        // Optional email notification — uncomment and configure Mailtrap to enable:
        // try {
        //     \Mail::to(config('mail.from.address'))
        //         ->send(new \App\Mail\ContactMail($validated));
        // } catch (\Throwable $e) {
        //     \Log::warning('Contact mail failed: ' . $e->getMessage());
        // }

        return response()->json(
            ['message' => "You're in the loop! We'll be in touch."],
            201
        );
    }
}
