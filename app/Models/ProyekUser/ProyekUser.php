<?php

namespace App\Models\ProyekUser;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Proyek\Proyek;
use App\Models\UserProfile\UserProfile;

class ProyekUser extends Model
{
    use SoftDeletes;

    protected $table = 'proyek_user';

    protected $fillable = [
        'proyek_id',
        'users_profile_id'
    ];

    public function proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function user_profile()
    {
        return $this->belongsTo(UserProfile::class, 'users_profile_id');
    }
}
