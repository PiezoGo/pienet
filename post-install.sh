#!/bin/bash
# ============================================================
# PieNet — Post-Laravel-Install Setup Script
# Run AFTER "composer create-project laravel/laravel api"
# Usage: bash post-install.sh
# ============================================================
set -e

API="/home/piento/Desktop/pienet/api"
FILES="/home/piento/Desktop/pienet/api-files"

echo "============================================================"
echo "  PieNet API — Post-Install Configuration"
echo "============================================================"

# Verify api directory exists
if [ ! -f "$API/artisan" ]; then
  echo "❌ Error: Laravel project not found at $API"
  echo "   Run: cd /home/piento/Desktop/pienet && composer create-project laravel/laravel api"
  exit 1
fi

echo "[1/6] Copying custom files into Laravel project..."
# Models
cp -f "$FILES/app/Models/Film.php"        "$API/app/Models/"
cp -f "$FILES/app/Models/Submission.php"  "$API/app/Models/"

# Controllers & Resources
cp -f "$FILES/app/Http/Controllers/FilmController.php"    "$API/app/Http/Controllers/"
cp -f "$FILES/app/Http/Controllers/ContactController.php" "$API/app/Http/Controllers/"
cp -f "$FILES/app/Http/Resources/FilmResource.php"         "$API/app/Http/Resources/"

# Routes
cp -f "$FILES/routes/api.php"  "$API/routes/"

# Config (CORS)
cp -f "$FILES/config/cors.php" "$API/config/"

# Migrations
cp -f "$FILES/database/migrations/"*.php "$API/database/migrations/"

# Seeders
cp -f "$FILES/database/seeders/FilmSeeder.php"    "$API/database/seeders/"
cp -f "$FILES/database/seeders/DatabaseSeeder.php" "$API/database/seeders/"

echo "[2/6] Writing .env configuration..."
cat > "$API/.env" << 'ENVEOF'
APP_NAME=PieNet
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_DATABASE=/home/piento/Desktop/pienet/api/database/database.sqlite

BROADCAST_DRIVER=log
CACHE_DRIVER=file
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

echo "[3/6] Creating SQLite database file..."
touch "$API/database/database.sqlite"

echo "[4/6] Generating application key..."
cd "$API" && php artisan key:generate

echo "[5/6] Running database migrations..."
php artisan migrate --force

echo "[6/6] Seeding films database..."
php artisan db:seed --force

echo ""
echo "============================================================"
echo "  ✅ PieNet API is ready!"
echo ""
echo "  Start the API server with:"
echo "  cd /home/piento/Desktop/pienet/api && php artisan serve"
echo ""
echo "  API URL: http://localhost:8000/api"
echo "  Films:   http://localhost:8000/api/films"
echo "============================================================"
