<?php

namespace App\GraphQL\Pesan\Queries;

use App\Models\Pesan\Pesan;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class MessageQuery
{
    public function messagesBetween($root, array $args, GraphQLContext $context)
    {
        $user = $args['user'];
        $contact = $args['contact'];

        return Pesan::where(function ($q) use ($user, $contact) {
            $q->where('pengirim', $user)->where('penerima', $contact);
        })->orWhere(function ($q) use ($user, $contact) {
            $q->where('pengirim', $contact)->where('penerima', $user);
        })->orderBy('tgl_pesan', 'asc')->get();
    }
}