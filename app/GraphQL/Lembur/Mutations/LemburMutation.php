<?php

namespace App\GraphQL\Lembur\Mutations;

use App\Models\Lembur\Lembur;

class LemburMutation
{
    public function restore($_, array $args)
    {
        $data = Lembur::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args)
    {
        $data = Lembur::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}
