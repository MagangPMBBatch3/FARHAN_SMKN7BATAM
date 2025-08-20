<?php

namespace App\GraphQL\Keterangan\Queries;

use App\Models\Keterangan\Keterangan;

class KeteranganQuery
{
    public function byNama($_, array $args)
    {
        return Keterangan::whereHas('bagian', function($q) use ($args) {
                $q->where('nama', 'like', $args['nama']);
            })
            ->orWhereHas('proyek', function($q) use ($args) {
                $q->where('nama', 'like', $args['nama']);
            })
            ->get();
    }

    public function allArsip($_, array $args)
    {
        return Keterangan::onlyTrashed()->get();
    }
}
