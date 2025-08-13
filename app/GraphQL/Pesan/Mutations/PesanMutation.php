<?php 

namespace App\GraphQL\Pesan\Mutations;

use App\Models\Pesan\Pesan;

class PesanMutation {

    public function restore($_, array $args)
    {
        $status = Pesan::withTrashed()->findOrFail($args['id']);
        $status->restore();
        return $status;
    }

    public function forceDelete($_, array $args)
    {
        $status = Pesan::withTrashed()->findOrFail($args['id']);
        $status->forceDelete();
        return $status;
    }
}