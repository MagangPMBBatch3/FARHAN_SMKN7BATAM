<?php

namespace App\GraphQL\JamKerja\Queries;

use App\Models\JamKerja\JamKerja;
class JamKerjaQuery{
    public function allArsip($_, array $args){
        return JamKerja::onlyTrashed()->get();
    }
    public function search($_, array $args)
{
    $keyword = $args['keyword'];

    return \App\Models\JamKerja\JamKerja::with(['userProfile', 'Proyek', 'Aktivitas'])
        ->whereHas('userProfile', fn($q) => $q->where('nama_lengkap', 'like', "%{$keyword}%"))
        ->orWhereHas('Proyek', fn($q) => $q->where('nama', 'like', "%{$keyword}%"))
        ->orWhereHas('Aktivitas', fn($q) => $q->where('nama', 'like', "%{$keyword}%"))
        ->orWhere('kode_proyek', 'like', "%{$keyword}%")
        ->orWhere('no_wbs', 'like', "%{$keyword}%")
        ->get();
}

}