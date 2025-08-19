<?php

namespace App\GraphQL\Lembur\Queries;

use App\Models\Lembur\Lembur;
class LemburQuery{
    public function allArsip($_, array $args){
        return Lembur::onlyTrashed()->get();
    }
}