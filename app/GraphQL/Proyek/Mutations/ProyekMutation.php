<?php

namespace App\GraphQL\Proyek\Mutations;

use App\Models\Proyek\Proyek;

class ProyekMutation {
    public function restore($_, array $args)
    {
        $Proyek = Proyek::withTrashed()->findOrFail($args['id']);
        $Proyek->restore();
        return $Proyek;
    }
    public function forceDelete($_, array $args)
    {
        $Proyek = Proyek::withTrashed()->findOrFail($args['id']);
        $Proyek->forceDelete();
        return $Proyek;
    }
}