<?php

namespace App\GraphQL\Aktivitas\Mutations;

use App\Models\Aktivitas\Aktivitas;

class AktivitasMutation
{
    public function restore($_, array $args)
    {
        $data = Aktivitas::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args)
    {
        $data = Aktivitas::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}
