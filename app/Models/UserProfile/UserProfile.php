<?php

namespace App\Models\UserProfile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProfile extends Model
{
    use SoftDeletes;

    protected $table = 'users_profile';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'nrp',
        'alamat',
        'foto',
        'bagian_id',
        'level_id',
        'status_id',
    ];

    protected $casts = [
        'deleted_at' => 'datetime',
    ];
    protected static function booted()
    {
        static::addGlobalScope('not_deleted', function ($builder) {
            $builder->whereNull('deleted_at');
        });
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id', 'id');
    }

    public function bagian()
    {
        return $this->belongsTo(\App\Models\Bagian\Bagians::class);
    }

    public function level()
    {
        return $this->belongsTo(\App\Models\Level\Level::class);
    }

    public function status()
    {
        return $this->belongsTo(\App\Models\Status\Statuses::class);
    }
}
