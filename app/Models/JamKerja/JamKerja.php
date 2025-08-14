<?php

namespace App\Models\JamKerja;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Proyek\Proyek;
use App\Models\Aktivitas\Aktivitas;

class JamKerja extends Model
{
    use SoftDeletes;

    protected $table = 'jam_kerja';

    protected $fillable = [
        'users_profile_id',
        'no_wbs',
        'kode_proyek',
        'proyek_id',
        'aktivitas_id',
        'tanggal',
        'jumlah_jam',
        'keterangan',
        'status_id',
        'mode_id'
    ];

    public function proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function aktivitas()
    {
        return $this->belongsTo(Aktivitas::class, 'aktivitas_id');
    }
}
