<?php 

namespace App\GraphQL\StatusJamKerja\Mutations;

use App\Models\StatusJamKerja\StatusJamKerja;

class StatusJamKerjaMutation {

    public function restore($_, array $args)
    {
        $status = StatusJamKerja::withTrashed()->findOrFail($args['id']);
        $status->restore();
        return $status;
    }

    public function forceDelete($_, array $args)
    {
        $status = StatusJamKerja::withTrashed()->findOrFail($args['id']);
        $status->forceDelete();
        return $status;
    }
}