<?php

namespace App\GraphQL\ProyekUser\Mutations;

use App\Models\ProyekUser\ProyekUser;

class ProyekUserMutation {
    public function restore($_, array $args) {
        $data = ProyekUser::withTrashed()->findOrFail($args['id']);
        $data->restore();
        return $data;
    }

    public function forceDelete($_, array $args) {
        $data = ProyekUser::withTrashed()->findOrFail($args['id']);
        $data->forceDelete();
        return $data;
    }
}

