<?php

namespace App\Models\Lembur;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Proyek\Proyek;
use App\Models\userProfile\userProfile;

class Lembur extends Model
{
    use SoftDeletes;

    protected $table = 'lembur';

    protected $fillable = [
        'users_profile_id',
        'proyek_id',
        'tanggal'
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
