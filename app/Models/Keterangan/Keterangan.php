<?php

namespace App\Models\Keterangan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Bagian\Bagians;
use App\Models\Proyek\Proyek;


class Keterangan extends Model
{
    use SoftDeletes;

    protected $table = 'keterangan';

    protected $fillable = [
        'bagian_id',
        'proyek_id',
        'tanggal'
    ];

    public function bagian()
    {
        return $this->belongsTo(Bagians::class, 'bagian_id');
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }
}
