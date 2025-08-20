<?php

namespace App\GraphQL\Keterangan\Mutations;

use App\Models\Keterangan\Keterangan;

class KeteranganMutation
{
    public function restore($_, array $args)
    {
        $data = Keterangan::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args)
    {
        $data = Keterangan::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}
