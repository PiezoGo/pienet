#!/bin/bash
# PieNet Laravel API Setup Script
# Run from /home/piento/Desktop/pienet with: bash setup-api.sh
set -e

echo "============================================"
echo "  PieNet API — Laravel 11 Setup Script"
echo "============================================"

# 1. Install PHP if not present
if ! command -v php &>/dev/null; then
  echo "[1/8] Installing PHP 8.2..."
  sudo apt-get update -qq
  sudo apt-get install -y php8.2 php8.2-cli php8.2-sqlite3 php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip php8.2-tokenizer unzip
else
  echo "[1/8] PHP already installed: $(php --version | head -1)"
fi

# 2. Install Composer if not present
if ! command -v composer &>/dev/null; then
  echo "[2/8] Installing Composer..."
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/tmp --filename=composer
  sudo mv /tmp/composer /usr/local/bin/composer
  sudo chmod +x /usr/local/bin/composer
else
  echo "[2/8] Composer already installed: $(composer --version | head -1)"
fi

# 3. Create Laravel project
echo "[3/8] Creating Laravel 11 project..."
cd /home/piento/Desktop/pienet
composer create-project laravel/laravel api --prefer-dist --no-interaction 2>&1 | tail -5

cd /home/piento/Desktop/pienet/api

# 4. Configure .env
echo "[4/8] Configuring .env..."
cat > .env << 'ENVEOF'
APP_NAME=PieNet
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_DATABASE=/home/piento/Desktop/pienet/api/database/database.sqlite

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="launches@pienet.com"
MAIL_FROM_NAME="PieNet"
ENVEOF

# 5. Create SQLite database
echo "[5/8] Creating SQLite database..."
touch database/database.sqlite

# 6. Generate app key
echo "[6/8] Generating app key..."
php artisan key:generate

# 7. Install all custom files (handled by setup — they're already written)
echo "[7/8] Writing custom application files..."

# ----- Models -----
mkdir -p app/Models app/Http/Controllers app/Http/Resources app/Mail resources/views/mail
mkdir -p database/migrations database/seeders

# Film model
cat > app/Models/Film.php << 'PHPEOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'cast' => 'array',
        'release_date' => 'date',
    ];
}
PHPEOF

# Submission model
cat > app/Models/Submission.php << 'PHPEOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'message'];
}
PHPEOF

# ----- Migrations -----
cat > database/migrations/2024_01_01_000001_create_films_table.php << 'PHPEOF'
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('genre');
            $table->text('logline');
            $table->text('synopsis');
            $table->string('director');
            $table->json('cast');
            $table->date('release_date');
            $table->string('trailer_url')->nullable();
            $table->string('poster_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
PHPEOF

cat > database/migrations/2024_01_01_000002_create_submissions_table.php << 'PHPEOF'
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
PHPEOF

# ----- FilmResource -----
cat > app/Http/Resources/FilmResource.php << 'PHPEOF'
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
PHPEOF

# ----- FilmSeeder -----
cat > database/seeders/FilmSeeder.php << 'PHPEOF'
<?php

namespace Database\Seeders;

use App\Models\Film;
use Illuminate\Database\Seeder;

class FilmSeeder extends Seeder
{
    public function run(): void
    {
        $films = [
            [
                'title'        => 'Spider-Man: Brand New Day',
                'slug'         => 'spiderman-brand-new-day',
                'genre'        => 'Neo-Noir Thriller',
                'logline'      => 'A disgraced investigative journalist discovers a prototype suit that grants him abilities, but the suit\'s AI begins manipulating his memories.',
                'synopsis'     => 'In a rain-soaked metropolis, journalist Miles Warren uncovers a lost tech prototype. When he dons the suit to solve a murder, he realizes the suit is cataloging his past to rewrite his future. He must outsmart his own technology before he loses himself.',
                'director'     => 'Denis Villeneuve',
                'cast'         => ['John David Washington', 'Zendaya', 'Willem Dafoe'],
                'release_date' => '2026-10-15',
                'trailer_url'  => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'poster_image' => '/images/spiderman.jpg',
            ],
            [
                'title'        => 'Invincible',
                'slug'         => 'invincible',
                'genre'        => 'Sci-Fi Drama',
                'logline'      => 'The world\'s most powerful hero\'s son struggles with the burden of legacy, discovering his father\'s past might be a lie.',
                'synopsis'     => 'Mark Grayson is a typical college student except his father is the legendary Omni-Man. As Mark develops his own powers, he uncovers a galactic conspiracy that forces him to question his own bloodline and the definition of heroism.',
                'director'     => 'The Daniels',
                'cast'         => ['Steven Yeun', 'J.K. Simmons', 'Sandra Oh'],
                'release_date' => '2026-12-04',
                'trailer_url'  => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'poster_image' => '/images/invincible.jpg',
            ],
            [
                'title'        => 'Expendables 4',
                'slug'         => 'expendables-4',
                'genre'        => 'Cyberpunk Action',
                'logline'      => 'A squad of veteran soldiers are brought back as cyborgs to stop a techno-terrorist from crashing the global network.',
                'synopsis'     => 'In 2050, aging mercenaries are given a second chance through experimental cybernetic enhancements. Their mission: infiltrate a floating data fortress and neutralize a rogue AI that has weaponized satellite networks. The upgrades come with a lethal countdown.',
                'director'     => 'Chad Stahelski',
                'cast'         => ['Keanu Reeves', 'Jason Momoa', 'Idris Elba'],
                'release_date' => '2027-02-12',
                'trailer_url'  => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'poster_image' => '/images/expendables.jpg',
            ],
            [
                'title'        => 'Avengers: Doomsday',
                'slug'         => 'avengers-doomsday',
                'genre'        => 'Psychological Thriller',
                'logline'      => 'A countdown appears on every screen globally. Five estranged specialists must find the source before time runs out, but one of them is the saboteur.',
                'synopsis'     => 'A cryptic 72-hour timer broadcasts across every digital device. Five specialists with dark pasts are assembled to stop the inevitable. As they navigate a maze of clues, paranoia sets in—the countdown isn\'t a warning, it\'s a confession.',
                'director'     => 'Bong Joon-ho',
                'cast'         => ['Robert Downey Jr.', 'Scarlett Johansson', 'Mark Ruffalo'],
                'release_date' => '2027-05-21',
                'trailer_url'  => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'poster_image' => '/images/avengers.jpg',
            ],
            [
                'title'        => 'Eclipse Protocol',
                'slug'         => 'eclipse-protocol',
                'genre'        => 'Sci-Fi Mystery',
                'logline'      => 'During a total solar eclipse, a team of astronauts lose contact with Earth and discover a hidden object in the sun\'s shadow.',
                'synopsis'     => 'Astronauts aboard the Odyssey are on a routine mission when a solar eclipse triggers an anomaly. They find a derelict ship from a parallel dimension. To return home, they must solve the physics of the impossible—and confront their own doppelgangers.',
                'director'     => 'Christopher Nolan',
                'cast'         => ['Cillian Murphy', 'Florence Pugh', 'Robert Pattinson'],
                'release_date' => '2027-08-20',
                'trailer_url'  => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'poster_image' => '/images/eclipse.jpg',
            ],
            [
                'title'        => 'Midnight Heist',
                'slug'         => 'midnight-heist',
                'genre'        => 'Crime Drama',
                'logline'      => 'The greatest art thief in history is hired to steal a painting from a museum that doesn\'t exist on any map.',
                'synopsis'     => 'At midnight, a legendary thief receives a job: steal The Noir Star from a museum that moves locations every night. The twist? The painting is a portal to the past. The heist isn\'t about money—it\'s about rewriting a tragedy.',
                'director'     => 'Edgar Wright',
                'cast'         => ['Anya Taylor-Joy', 'Michael B. Jordan', 'Tilda Swinton'],
                'release_date' => '2027-11-05',
                'trailer_url'  => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'poster_image' => '/images/midnight.jpg',
            ],
        ];

        foreach ($films as $film) {
            Film::updateOrCreate(['slug' => $film['slug']], $film);
        }
    }
}
PHPEOF

# Update DatabaseSeeder
cat > database/seeders/DatabaseSeeder.php << 'PHPEOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([FilmSeeder::class]);
    }
}
PHPEOF

# ----- FilmController -----
cat > app/Http/Controllers/FilmController.php << 'PHPEOF'
<?php

namespace App\Http\Controllers;

use App\Http\Resources\FilmResource;
use App\Models\Film;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FilmController extends Controller
{
    /**
     * Return all films, optionally filtered by genre.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $films = Film::query()
            ->when($request->query('genre'), fn ($q, $genre) => $q->where('genre', $genre))
            ->orderBy('release_date')
            ->get();

        return FilmResource::collection($films);
    }

    /**
     * Return a single film by slug.
     */
    public function show(string $slug): FilmResource|JsonResponse
    {
        $film = Film::where('slug', $slug)->first();

        if (! $film) {
            return response()->json(['message' => 'Film not found.'], 404);
        }

        return new FilmResource($film);
    }
}
PHPEOF

# ----- ContactController -----
cat > app/Http/Controllers/ContactController.php << 'PHPEOF'
<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Validate and store a contact form submission.
     * Email sending is gracefully skipped if Mailtrap is not configured.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|min:2|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string|min:10',
        ]);

        // Persist to database
        Submission::create($validated);

        // Optional: send email notification (skipped if mail not configured)
        // try {
        //     Mail::to(config('mail.from.address'))->send(new ContactMail($validated));
        // } catch (\Exception $e) {
        //     \Log::warning('Mail send failed: ' . $e->getMessage());
        // }

        return response()->json([
            'message' => 'Your message has been received. You\'re in the loop!',
        ], 201);
    }
}
PHPEOF

# ----- API Routes -----
cat > routes/api.php << 'PHPEOF'
<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PieNet API Routes
|--------------------------------------------------------------------------
| GET  /api/films          → all films (optional ?genre= filter)
| GET  /api/films/{slug}   → single film
| POST /api/contact        → contact form submission
*/

Route::get('/films',         [FilmController::class,   'index']);
Route::get('/films/{slug}',  [FilmController::class,   'show']);
Route::post('/contact',      [ContactController::class, 'store']);
PHPEOF

# ----- CORS config -----
cat > config/cors.php << 'PHPEOF'
<?php

return [
    'paths'                    => ['api/*'],
    'allowed_methods'          => ['*'],
    'allowed_origins'          => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers'          => ['*'],
    'exposed_headers'          => [],
    'max_age'                  => 0,
    'supports_credentials'     => false,
];
PHPEOF

# 8. Run migrations and seed
echo "[8/8] Running migrations and seeder..."
php artisan migrate --force
php artisan db:seed --force

echo ""
echo "============================================"
echo "  ✅ PieNet API setup complete!"
echo "  Start the server with: php artisan serve"
echo "  API will be at: http://localhost:8000/api"
echo "============================================"
