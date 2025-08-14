<?php

namespace App\GraphQL\JamPerTanggalMutations;

use App\Models\JamPerTanggal\JamPerTanggal;

class JamPerTanggalMutation
{
    public function restore($_, array $args)
    {
        $data = JamPerTanggal::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args)
    {
        $data = JamPerTanggal::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}
