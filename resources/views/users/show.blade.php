<x-layouts.main title="Detail User">
    <div class="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <img src="{{ $user->foto ? asset('storage/'.$user->foto) : 'https://via.placeholder.com/150' }}"
                 alt="Foto {{ $user->nama_lengkap }}"
                 class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover">
            
            <div class="mt-6 md:mt-0 text-center md:text-left">
                <h2 class="text-3xl font-bold text-white">{{ $user->nama_lengkap }}</h2>
                <p class="text-gray-200">{{ $user->user->email ?? '-' }}</p>
                <span class="inline-block mt-3 px-4 py-1 bg-white/90 text-blue-700 text-sm font-semibold rounded-full shadow-sm">
                    {{ $user->level->nama ?? 'Level tidak ada' }}
                </span>
            </div>
        </div>

        <!-- common information -->
        <div class="p-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-info-circle text-blue-500 mr-2"></i> Common Information
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Info -->
                <ul class="space-y-4">
                    <li class="flex items-start">
                        <i class="fas fa-id-badge text-blue-500 w-6"></i>
                        <span class="ml-3"><span class="font-medium text-gray-700">ID:</span> {{ $user->id }}</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-id-card text-green-500 w-6"></i>
                        <span class="ml-3"><span class="font-medium text-gray-700">NRP:</span> {{ $user->nrp ?? '-' }}</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-map-marker-alt text-red-500 w-6"></i>
                        <span class="ml-3"><span class="font-medium text-gray-700">Alamat:</span> {{ $user->alamat ?? '-' }}</span>
                    </li>
                </ul>

                <!-- Right Info -->
                <ul class="space-y-4">
                    <li class="flex items-start">
                        <i class="fas fa-users text-purple-500 w-6"></i>
                        <span class="ml-3"><span class="font-medium text-gray-700">Bagian:</span> {{ $user->bagian->nama ?? '-' }}</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-briefcase text-yellow-500 w-6"></i>
                        <span class="ml-3"><span class="font-medium text-gray-700">Jabatan:</span> {{ $user->level->nama ?? '-' }}</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-teal-500 w-6"></i>
                        <span class="ml-3"><span class="font-medium text-gray-700">Status:</span> {{ $user->status->nama ?? '-' }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-8 py-6 border-t bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="{{ url('/user-profile') }}"
               class="w-full md:w-auto px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg text-center transition">
               ← Kembali
            </a>
            <div class="flex gap-3 w-full md:w-auto">
                <a href=""
                   class="flex-1 md:flex-none px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg text-center transition">
                   <i class="fas fa-edit mr-1"></i> Edit
                </a>
                <a href="#"
                   onclick="return confirm('Hapus permanen user ini?')"
                   class="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-center transition">
                   <i class="fas fa-trash mr-1"></i> Hapus
                </a>
            </div>
        </div>
    </div>
</x-layouts.main>
