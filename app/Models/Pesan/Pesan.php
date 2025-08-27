<?php

namespace App\Models\Pesan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

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
class PesanSent implements ShouldBroadcast
{
    public $pesan;

    public function __construct($pesan)
    {
        $this->pesan = $pesan;
    }

    public function broadcastOn()
    {
        // Private channel per penerima
        return new PrivateChannel('chat.' . $this->pesan->penerima);
    }
}
