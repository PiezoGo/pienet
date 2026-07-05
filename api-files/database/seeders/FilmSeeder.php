<?php

namespace Database\Seeders;

use App\Models\Film;
use Illuminate\Database\Seeder;

/**
 * Seeds the films table with all NOCTURNE HOUSE launch titles.
 */
class FilmSeeder extends Seeder
{
    public function run(): void
    {
        $films = [
            [
                'title'        => 'VANTAGE',
                'slug'         => 'vantage',
                'genre'        => 'Sci-Fi Thriller',
                'logline'      => "A satellite engineer discovers the signal she's tracking isn't coming from space — it's coming from next year.",
                'synopsis'     => "When ISCO systems engineer Dr. Petra Voss intercepts a distress signal originating from a frequency that shouldn't physically exist, she dismisses it as instrumentation error. But the signal knows her name. It contains files dated fourteen months ahead. As Petra chases the source across classified relay stations and black-site server rooms, she begins to understand: the signal isn't a warning. It's a confession — transmitted backwards through time by someone who knows exactly how everything ends.",
                'director'     => 'Saoirse Webb',
                'cast'         => ['Elena Marsh', 'Tobias Reyes', 'Priya Anand'],
                'release_date' => '2026-09-12',
                'trailer_url'  => null,
                'poster_image' => '/images/vantage.jpg',
            ],
            [
                'title'        => 'THE LONG SILENCE',
                'slug'         => 'the-long-silence',
                'genre'        => 'Prestige Drama',
                'logline'      => "Two estranged brothers return to their late father's vineyard and discover the inheritance isn't the land — it's the secret buried under it.",
                'synopsis'     => "Théodore and Luca Marchetti haven't spoken in eleven years. Their father's death forces them back to the family estate in Burgundy — and into the cellar beneath the oldest vines, where their father kept records he never showed anyone. What they find doesn't answer why he kept them apart. It explains why he never could bring them together. A film about inheritance, silence, and what love looks like when it has no language.",
                'director'     => 'Clara Fontaine',
                'cast'         => ['Marcus Doyle', 'Simone Achterberg'],
                'release_date' => '2026-10-03',
                'trailer_url'  => null,
                'poster_image' => '/images/the-long-silence.jpg',
            ],
            [
                'title'        => 'RED HOUR',
                'slug'         => 'red-hour',
                'genre'        => 'Neo-Noir Crime',
                'logline'      => "For one hour every year, the city's oldest debts come due — and a retired fixer is pulled back for one last collection.",
                'synopsis'     => "The Red Hour is not metaphor. It is protocol — an unwritten law observed by every organisation that has operated in this city for three generations. For sixty minutes beginning at midnight on the winter solstice, all outstanding obligations must be settled. No extensions. No appeals. Nadia Cole walked away from the collection business four years ago. She should have walked further. When the client is the city itself, retirement is not a concept it respects.",
                'director'     => 'Bertrand Kael',
                'cast'         => ['Naomi Cole', 'Dashiell Kwan'],
                'release_date' => '2026-11-21',
                'trailer_url'  => null,
                'poster_image' => '/images/red-hour.jpg',
            ],
            [
                'title'        => 'PAPER MOONS',
                'slug'         => 'paper-moons',
                'genre'        => 'Animated Family',
                'logline'      => "A paper airplane folded from a wish note learns to fly further than anyone intended.",
                'synopsis'     => "On the last day before the old school closes, eight-year-old Maren writes a wish on a scrap of paper and folds it into a plane. She throws it from the top of the fire escape, expecting nothing. The plane does not come down. Over the course of one extraordinary summer, it finds its way to every person who needed what Maren wished for — and carries something back to her in return. A film about how far a small kindness can travel.",
                'director'     => 'Yuki Tanigawa',
                'cast'         => ['Ruth Okafor', 'Milo Fenn'],
                'release_date' => '2026-12-18',
                'trailer_url'  => null,
                'poster_image' => '/images/paper-moons.jpg',
            ],
            [
                'title'        => 'ECHO CHAMBER',
                'slug'         => 'echo-chamber',
                'genre'        => 'Psychological Horror',
                'logline'      => "A soundproofing engineer starts hearing conversations that haven't happened yet — in rooms that don't exist yet either.",
                'synopsis'     => "Specialist acoustic consultant Wren Ashby is contracted to soundproof the sixth floor of a new residential tower before occupants move in. The floor is empty. Unfinished. No one is scheduled to be there. On the third day of work, Wren begins hearing conversations through the walls — arguments, confessions, a child asking the same question on a loop. The dates on the conversations are all three months ahead. The rooms the voices come from aren't on any blueprint. Wren has forty-eight hours before the first residents arrive. The voices have already moved in.",
                'director'     => 'Ines Calder',
                'cast'         => ['Ines Calder', 'Wren Ashby'],
                'release_date' => '2027-01-30',
                'trailer_url'  => null,
                'poster_image' => '/images/echo-chamber.jpg',
            ],
            [
                'title'        => 'UNTITLED NOCTURNE PROJECT',
                'slug'         => 'untitled-nocturne-project',
                'genre'        => 'Teaser',
                'logline'      => 'Logline withheld.',
                'synopsis'     => 'Details withheld pending announcement. A new project from NOCTURNE HOUSE. Coming.',
                'director'     => 'To be announced',
                'cast'         => [],
                'release_date' => null,
                'trailer_url'  => null,
                'poster_image' => '/images/untitled-nocturne.jpg',
            ],
        ];

        foreach ($films as $film) {
            Film::updateOrCreate(['slug' => $film['slug']], $film);
        }

        $this->command->info('✅ Seeded ' . count($films) . ' NOCTURNE HOUSE films.');
    }
}
