<?php 
namespace App\GraphQL\Proyek\Queries;

use App\Models\Proyek\Proyek;

class ProyekQuery
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