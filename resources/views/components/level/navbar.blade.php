<div class="bg-white p-4 shadow rounded mb-4 flex justify-between items-center">
    <h1 class="text-xl font-extrabold">{{ $pageTitle ?? 'Dashboard' }}</h1>
    <span>Halo, {{ Auth::user()->name }}</span>
</div>