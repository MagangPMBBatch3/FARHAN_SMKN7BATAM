<?php

namespace App\GraphQL\JamPerTanggal\Queries;

use App\Models\JamPerTanggal\JamPerTanggal;
class JamPerTanggalQuery{
    public function allArsip($_, array $args){
        return JamPerTanggal::onlyTrashed()->get();
    }
}