<div class="bg-white p-4 shadow rounded mb-4 flex justify-between items-center">
    <h1 class="text-xl font-extrabold">{{ $pageTitle ?? 'Dashboard' }}</h1>
    @php
        $fotoPath = Auth::user()->foto && file_exists(public_path(Auth::user()->foto))
            ? asset(Auth::user()->foto)
            : asset('/image/default.png');
    @endphp    
    <div class="flex items-center gap-3">
        <span>Halo, {{ Auth::user()->name }}</span>
        <img 
            src="{{ $fotoPath }}" 
            alt="Foto Profil" 
            class="w-10 h-10 rounded-full object-cover border"
        >
    </div>
</div>
