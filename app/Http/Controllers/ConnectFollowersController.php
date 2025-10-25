<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConnectFollowersController extends Controller
{
    public function index()
    {
        $user   = Auth::user();
        $authId = $user->id;

        return Inertia::render('social/connect', [
            'followings' => $user->followings()->withCount([
                'followers as following' => function ($q) use ($authId) {
                    return $q->where('follower_id', $authId);
                },
            ])->withCasts(['following' => 'boolean'])->paginate(5),

            'followers'  => $user->followers()->withCount([
                'followers as following' => function ($q) use ($authId) {
                    return $q->where('follower_id', $authId);
                },
            ])->withCasts(['following' => 'boolean'])->paginate(),

            'suggested'  => $user->notConnectedWith($authId)->paginate(100),

            'profile'    => [
                'user' => $user,
            ],

        ]);
    }

    public function store($id)
    {

        $user = Auth::user();

        $user->followings()->attach($id);
        return redirect()->back();
    }

    public function destroy($id)
    {

        $user = Auth::user();

        $user->followings()->detach($id);
        return redirect()->back();
    }

}
