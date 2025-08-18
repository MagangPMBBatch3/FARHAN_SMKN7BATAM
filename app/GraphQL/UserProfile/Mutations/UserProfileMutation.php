<?php

namespace App\GraphQL\UserProfile\Mutations;

use App\Models\UserProfile\UserProfile;

class UserProfileMutation {
    public function restore($_, array $args)
    {
        $UserProfile = UserProfile::withTrashed()->findOrFail($args['id']);
        $UserProfile->restore();
        return $UserProfile;
    }
    public function forceDelete($_, array $args)
    {
        $UserProfile = UserProfile::withTrashed()->findOrFail($args['id']);
        $UserProfile->forceDelete();
        return $UserProfile;
    }
}