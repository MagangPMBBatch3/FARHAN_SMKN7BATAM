<?php

namespace App\Models\Aktivitas;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Bagian\Bagians;

class Aktivitas extends Model
{
    use SoftDeletes;

    protected $table = 'aktivitas';

    protected $fillable = [
        'bagian_id',
        'no_wbs',
        'nama',
    ];

    public function bagian()
    {
        return $this->belongsTo(\App\Models\Bagian\Bagians::class);
    }

}
