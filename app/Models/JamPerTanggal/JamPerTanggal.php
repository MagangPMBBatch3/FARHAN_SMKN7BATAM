<?php

namespace App\Models\JamPerTanggal;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Proyek\Proyek;
use App\Models\userProfile\userProfile;

class JamPerTanggal extends Model
{
    use SoftDeletes;

    protected $table = 'jam_per_tanggal';

    protected $fillable = [
        'users_profile_id',
        'proyek_id',
        'tanggal',
        'jam'
    ];

    public function proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }
    public function userProfile()
    {
        return $this->belongsTo(userProfile::class, 'users_profile_id');
    }
}
