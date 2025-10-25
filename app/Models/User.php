<?php
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasRoles, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'active',
        'image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'following', 'followed_id', 'follower_id')
            ->withTimestamps();
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'following', 'follower_id', 'followed_id')
            ->withTimestamps();
    }

    public function scopeNotConnectedWith($query, $authId)
    {
        return $query
            ->whereDoesntHave('followers', fn($q) => $q->where('follower_id', $authId))
            ->whereDoesntHave('followings', fn($q) => $q->where('followed_id', $authId))
            ->where('id', '<>', $authId); // exclude self
    }

}
