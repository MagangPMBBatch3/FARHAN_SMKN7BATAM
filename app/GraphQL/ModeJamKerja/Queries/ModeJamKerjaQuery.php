<?php

namespace App\GraphQL\ModeJamKerja\Queries;

use App\Models\ModeJamKerja\ModeJamKerja;

class ModeJamKerjaQuery
{
    public function byNama($_, array $args)
    {
        return ModeJamKerja::whereHas('bagian', function($q) use ($args) {
                $q->where('nama', 'like', $args['nama']);
            })
            ->orWhereHas('proyek', function($q) use ($args) {
                $q->where('nama', 'like', $args['nama']);
            })
            ->get();
    }

    public function allArsip($_, array $args)
    {
        return ModeJamKerja::onlyTrashed()->get();
    }
}
