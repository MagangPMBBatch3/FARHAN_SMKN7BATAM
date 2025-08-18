<!DOCTYPE html>
<html>
<head>
    <title>{{ $title ?? 'Dashboard' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-gray-100 flex">

    <!-- Sidebar -->
    <aside class="w-64 bg-blue-600 text-white min-h-screen flex flex-col p-4 shadow-lg">
        <!-- Logo / Judul -->
        <div class="flex items-center gap-2 mb-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18m-7 5h7" />
            </svg>
            <h2 class="text-2xl font-bold">Menu</h2>
        </div>

        <!-- Menu Navigasi -->
        <nav class="flex-1">
            <ul class="space-y-1">

                <!-- Dashboard -->
                <li>
                    <a href="/dashboard" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500 transition">
                        <i data-feather="home"></i> Dashboard
                    </a>
                </li>

                <!-- Master Data -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Master Data</li>
                <li><a href="/bagian" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="grid"></i> Bagian</a></li>
                <li><a href="/level" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="layers"></i> Level</a></li>
                <li><a href="/status" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="tag"></i> Status</a></li>

                <!-- User -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Manajemen User</li>
                <li><a href="/user" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="users"></i> User</a></li>

                <!-- Proyek -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Proyek</li>
                <li><a href="/proyek" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="briefcase"></i> Proyek</a></li>
                <li><a href="/proyek-user" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="briefcase"></i> Proyek User</a></li>

                <!-- Aktivitas -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Aktivitas</li>
                <li><a href="/aktivitas" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="check-square"></i> Aktivitas</a></li>

                <!-- Jam Kerja -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Jam Kerja</li>
                <li><a href="/jam-kerja" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="clock"></i> Jam Kerja</a></li>
                <li><a href="/lembur" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="watch"></i> Lembur</a></li>
                <li><a href="/mode" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="clock"></i> Mode Kerja</a></li>
                <li><a href="/jam-per-tanggal" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="clock"></i> Jam Per Tanggal</a></li>
                <!-- Pesan -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Pesan</li>
                <li><a href="/pesan" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="message-square"></i> Pesan</a></li>
                <li><a href="/jenis-pesan" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="message-square"></i> Jenis Pesan</a></li>

                <!-- Keterangan -->
                <li class="mt-4 text-xs uppercase text-gray-300 font-semibold">Lainnya</li>
                <li><a href="/keterangan" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="info"></i> Keterangan</a></li>
            </ul>
        </nav>

        <!-- Logout -->
        <div class="mt-6 border-t border-blue-400 pt-4">
            <form action="/logout" method="POST">
                @csrf
                <button type="submit" class="flex bg-red-500 items-center gap-3 w-full text-left p-2 rounded hover:bg-red-900 transition">
                    <i data-feather="log-out"></i> Logout
                </button>
            </form>
        </div>
    </aside>

    <!-- Konten -->
    <div class="flex-1 p-6">
        @include('components.level.navbar')
        {{ $slot }}
    </div>

    <script>
        feather.replace();
    </script>

</body>
</html>
