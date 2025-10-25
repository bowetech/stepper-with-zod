<?php
namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UsersController extends Controller
{

    public function edit(User $user)
    {
        $roles     = Role::get();
        $userRoles = $user->roles->pluck('name');

        return Inertia::render('users/edit', [
            'userData'  => $user,
            'roles'     => $roles,
            'userRoles' => $userRoles,
        ]);
    }

    public function index(Request $request)
    {
        // $users = User::with('roles');

        $users = User::with('roles');
        //  $users = User::query()->latest();
        $roles = Role::get();

        // sorting initialized
        $selected_filter = $request->input('selected_filter', '');
        $sort            = $request->input('sort', 'id');
        $direction       = $request->input('direction', 'asc');
        $per_page        = (int) ($request->per_page ?? config('settings.per_page'));

        if ($request->filled('search')) {
            $search = trim($request->search);
            $users->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('selected_filter') && in_array(strtolower($selected_filter), ['active', 'pending'])) {
            $users->where(strtolower($selected_filter), '=', 1);
        }

        $users->orderBy($sort, $direction);

        if ($per_page === -1) {
            $all_users = $users->latest()->get()->map(function ($user) {
                return [
                    'id'         => $user->id,
                    'name'       => $user->name,
                    'email'      => $user->email,
                    'created_at' => $user->created_at->format('d M Y'),
                ];
            });

            $users = [
                'data'     => $all_users,
                'total'    => $all_users->count(),
                'per_page' => $per_page,
                'from'     => 1,
                'to'       => $all_users->count(),
                'links'    => [],
            ];
        } else {
            // Use simplePaginate here
            $users = $users->latest()
                ->simplePaginate($per_page)
                ->withQueryString()
                ->through(function ($user) {
                    return [
                        'id'         => $user->id,
                        'name'       => $user->name,
                        'email'      => $user->email,
                        'image'      => $user->image,
                        'created_at' => $user->created_at->format('d M Y'),
                        'roles'      => $user->roles->pluck('name'), // 👈 include role names

                    ];
                });
        }

        return Inertia::render('users/index', [
            'users'   => $users,
            //  'roles'   => $roles,
            'filters' => [
                'search'    => $request->input('search', ''),
                'per_page'  => (string) $per_page,
                'sort'      => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function Tdestroy(Request $request, ?User $user = null)
    {

        // Handle single user deletion
        if ($user) {

            return redirect()->back()->with('message', "User {$user->name} TEST *** deleted successfully.");
        }

        // Handle bulk deletion
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return redirect()->back()->with('messsage', 'TEST *** No users selected for deletion.');
        }

        return redirect()->back()->with('message', count($ids) . 'TEST ***  users deleted successfully.');
    }

    public function destroy(Request $request, ?User $user = null)
    {

        // Handle single user deletion
        if (count($request->ids) === 1) {

            $user = tap(User::find($request->ids[0]))?->delete();

            return redirect()->back()->with('success', "User {$user->name} deleted successfully.");
        }

        // Handle bulk deletion
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return redirect()->back()->with('error', 'No users selected for deletion.');
        }

        User::whereIn('id', $ids)->delete();

        return redirect()->back()->with('success', count($ids) . ' users deleted successfully.');
    }

    public function create()
    {
        $roles = Role::get();

        return Inertia::render('users/user-form', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {

        sleep(1);
        $request->validate([
            'name'   => ['required', 'string', 'max:255'],
            'email'  => ['required', 'string'],
            'status' => ['required', 'string'],
            'image'  => ['required', 'image', 'max:2049'],
            // 'role'   => ['required'],
        ]);

        $file     = $request->file('image');
        $filePath = $file->store('users', 'public');

        $user = User::create([
            // 'id'  => auth()->user()->id,
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password,
            'active'   => $request->status,
            'image'    => $filePath,
            //'role'     => $request->role,
        ]);

        if ($user) {
            $user->syncRoles($request->role);
            return to_route('users.home')->with('success', 'User created successfully.');
        }

        return to_route('users.home')->with('error', 'Unable to create user. Please try again.');

    }

    public function update(Request $request, User $user)
    {

        //   dd($request);

        sleep(1);
        $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'string'],
            //  'password' => ['string'],
            // 'status' => ['required', 'string'],

            // 'image' => ['required', 'image', 'max:2049'],
        ]);

        $filePath = $user->image;

        if ($request->has('image') && $request->image !== null) {
            $file     = $request->image('image');
            $filePath = $file->store('users', 'public');
            Storage::disk('public')->delete($user->image);
        }

        if ($user) {

            $user->update([
                'name'   => $request->name,
                'email'  => $request->email,
                'active' => $request->status,
                // 'password' => $request->password && ($request->password),
                //  'image' => $filePath,

            ]);
            $user->syncRoles($request->role);
            return to_route('users.home')->with('success', 'User updated successfully.');
        }
        return to_route('users.home')->with('error', 'Unable to updated user. Please try again.');

    }

    public function show(User $user)
    {
        $roles     = Role::get();
        $userRoles = $user->roles->pluck('name');

        return Inertia::render('users/show', [
            'userData' => [
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'status'    => $user->active,
                'image_url' => $user->image ? Storage::url($user->image) : null,
                'role'      => $userRoles->count() ? $userRoles[0] : ' ',
                'roles'     => $roles,

            ],

        ]);
    }

}
