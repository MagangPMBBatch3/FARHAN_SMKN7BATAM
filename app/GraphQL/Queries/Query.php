<?php

namespace App\GraphQL\Queries;

use App\Models\Proyek\Proyek;

class Query
{
    public function getProyeks($_, array $args)
    {
        $query = Proyek::query();

        if (!empty($args['search'])) {
            $query->where('id', 'like', '%' . $args['search'] . '%')
                  ->orWhere('nama', 'like', '%' . $args['search'] . '%')
                  ->orWhere('kode', 'like', '%' . $args['search'] . '%')
                  ->orWhere('nama_sekolah', 'like', '%' . $args['search'] . '%');
        }

        return $query->get();
    }
}
