<?php

namespace App\GraphQL\ProyekUser\Queries;

use App\Models\ProyekUser\ProyekUser;
class ProyekUserQuery{
    public function allArsip($_, array $args){
        return ProyekUser::onlyTrashed()->get();
    }
    public function search($_, array $args)
    {
        $keyword = $args['keyword'];

        if (is_numeric($keyword)) {
            return ProyekUser::with(['proyek', 'user_profile'])
                ->where('id', $keyword)
                ->get();
        }

        return ProyekUser::with(['proyek', 'user_profile'])
            ->whereHas('proyek', function ($q) use ($keyword) {
                $q->where('nama', 'like', "%{$keyword}%");
            })
            ->orWhereHas('user_profile', function ($q) use ($keyword) {
                $q->where('nama_lengkap', 'like', "%{$keyword}%");
            })
            ->get();
    }
}