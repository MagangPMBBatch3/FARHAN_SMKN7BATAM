<?php

namespace App\Models\JamKerja;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Proyek\Proyek;
use App\Models\Aktivitas\Aktivitas;
use App\Models\UserProfile\UserProfile;
use App\Models\ModeJamKerja\ModeJamKerja;
use App\Models\StatusJamKerja\StatusJamKerja;   

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

    public function Proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function Aktivitas()
    {
        return $this->belongsTo(Aktivitas::class, 'aktivitas_id');
    }

    public function UserProfile()
    {
        return $this->belongsTo(UserProfile::class, 'users_profile_id');
    }

    public function ModeJamKerja()
    {
        return $this->belongsTo(ModeJamKerja::class, 'mode_id');
    }

    public function StatusJamKerja()
    {
        return $this->belongsTo(StatusJamKerja::class, 'status_id');
    }
}
