<?php

namespace App\GraphQL\Proyek\Queries;

use App\Models\Proyek\Proyek;
class ProyekQuery
{
    public function allArsip($_, array $args)
    {
        return Proyek::onlyTrashed()->get();
    }
}