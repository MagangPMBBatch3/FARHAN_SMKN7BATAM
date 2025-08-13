<?php 

namespace App\GraphQL\JenisPesan\Mutations;

use App\Models\JenisPesan\JenisPesan;

class JenisPesanMutation {

    public function restore($_, array $args)
    {
        $status = JenisPesan::withTrashed()->findOrFail($args['id']);
        $status->restore();
        return $status;
    }

    public function forceDelete($_, array $args)
    {
        $status = JenisPesan::withTrashed()->findOrFail($args['id']);
        $status->forceDelete();
        return $status;
    }
}