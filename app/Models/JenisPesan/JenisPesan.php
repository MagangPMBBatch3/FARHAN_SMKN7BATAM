<?php

namespace App\Models\JenisPesan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisPesan extends Model
{
    use SoftDeletes;

    protected $table = 'jenis_pesan';

    protected $fillable = [
        'nama',
    ];

    public function pesan()
    {
        return $this->hasMany(JenisPesan::class, 'jenis_id', 'id');
    }
}
