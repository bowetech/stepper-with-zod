<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class HostOnboardingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('become-a-host');
    }

}