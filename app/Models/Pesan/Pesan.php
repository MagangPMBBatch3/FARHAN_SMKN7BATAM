<?php

namespace App\Models\Pesan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pesan extends Model
{
    use SoftDeletes;

    protected $table = 'pesan';

    protected $fillable = [
        'pengirim',
        'penerima',
        'isi',
        'parent_id',
        'tgl_pesan',
        'jenis_id'
    ];

    public function jenis()
{
    return $this->belongsTo(\App\Models\Pesan\JenisPesan::class, 'jenis_id', 'id');
}

}
