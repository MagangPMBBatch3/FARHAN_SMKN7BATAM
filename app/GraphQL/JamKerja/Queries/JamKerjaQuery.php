<?php

namespace App\GraphQL\JamKerja\Queries;

use App\Models\JamKerja\JamKerja;
class JamKerjaQuery{
    public function allArsip($_, array $args){
        return JamKerja::onlyTrashed()->get();
    }
}