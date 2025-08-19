<?php

namespace App\GraphQL\Aktivitas\Queries;

use App\Models\Aktivitas\Aktivitas;
class AktivitasQuery{
    public function allArsip($_, array $args){
        return Aktivitas::onlyTrashed()->get();
    }
}