<?php

namespace App\GraphQL\ModeJamKerja\Queries;

use App\Models\ModeJamKerja\ModeJamKerja;

class ModeJamKerjaQuery
{
    public function byNama($_, array $args)
{
    return ModeJamKerja::where('nama', 'like', '%' . $args['nama'] . '%')->get();
}



    public function allArsip($_, array $args)
    {
        return ModeJamKerja::onlyTrashed()->get();
    }
}
