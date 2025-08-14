<?php

namespace App\GraphQL\JamKerja\Mutations;

use App\Models\JamKerja\JamKerja;

class JamKerjaMutation
{
    public function restore($_, array $args)
    {
        $data = JamKerja::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args)
    {
        $data = JamKerja::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}
