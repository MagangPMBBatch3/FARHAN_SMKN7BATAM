<?php

namespace App\GraphQL\JamPerTanggal\Mutations;

use App\Models\JamPerTanggal\JamPerTanggal;

class JamPerTanggalMutation
{
    public function restore($_, array $args)
    {
        $jam = JamPerTanggal::withTrashed()->findOrFail($args['id']);
        $jam->restore();
        return $jam;
    }

    public function forceDelete($_, array $args)
    {
        $jam = JamPerTanggal::withTrashed()->findOrFail($args['id']);
        $jam->forceDelete();
        return $jam;
    }
}
