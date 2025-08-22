<?php

namespace App\Models\StatusJamKerja;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StatusJamKerja extends Model
{
    use SoftDeletes;

    protected $table = 'status_jam_kerja';
    protected $primaryKey = 'id';
    protected $fillable = ['nama'];
}
