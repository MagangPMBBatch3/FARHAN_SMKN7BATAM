<?php

namespace App\GraphQL\ModeJamKerja\Mutations;
use App\Models\ModeJamKerja\ModeJamKerja;

class ModeJamKerjaMutation
{
    public function restore($_, array $args)
    {
        $data = ModeJamKerja::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args)
    {
        $data = ModeJamKerja::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}
