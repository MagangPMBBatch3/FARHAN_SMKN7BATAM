<!DOCTYPE html>
<html>
<head>
    <title>{{ $title ?? 'Dashboard' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-gray-100 flex">
    <aside class="w-64 bg-blue-600 text-white min-h-screen flex flex-col p-4 shadow-lg">
        <div class="flex items-center gap-2 mb-8">
            <i data-feather="menu" class="w-6 h-6"></i>
            <h2 class="text-2xl font-bold">Menu</h2>
        </div>
        <nav class="flex-1">
            <ul class="space-y-1">

                <!-- Dashboard -->
                <li>
                    <a href="/dashboard" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500 transition">
                        <i data-feather="home"></i> Dashboard
                    </a>
                </li>

                <!-- Master Data Dropdown -->
                <li>
                    <button class="w-full flex justify-between items-center p-2 rounded hover:bg-blue-500 transition dropdown-btn">
                        <span class="flex items-center gap-3"><i data-feather="grid"></i> Master Data</span>
                        <i data-feather="chevron-down"></i>
                    </button>
                    <ul class="ml-6 mt-1 hidden space-y-1 dropdown-menu bg-blue-800">
                        <li><a href="/bagian" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="grid"></i> Bagian</a></li>
                        <li><a href="/level" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="layers"></i> Level</a></li>
                        <li><a href="/status" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="tag"></i> Status</a></li>
                    </ul>
                </li>

                <!-- Manajemen User Dropdown -->
                <li>
                    <button class="w-full flex justify-between items-center p-2 rounded hover:bg-blue-500 transition dropdown-btn">
                        <span class="flex items-center gap-3"><i data-feather="users"></i> Manajemen User</span>
                        <i data-feather="chevron-down"></i>
                    </button>
                    <ul class="ml-6 mt-1 hidden space-y-1 dropdown-menu bg-blue-800">
                        <li><a href="/user" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="users"></i> User</a></li>
                        <li><a href="/user-profile" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="user"></i> User Profile</a></li>
                    </ul>
                </li>

                <!-- Proyek Dropdown -->
                <li>
                    <button class="w-full flex justify-between items-center p-2 rounded hover:bg-blue-500 transition dropdown-btn">
                        <span class="flex items-center gap-3"><i data-feather="briefcase"></i> Proyek</span>
                        <i data-feather="chevron-down"></i>
                    </button>
                    <ul class="ml-6 mt-1 hidden space-y-1 dropdown-menu bg-blue-800">
                        <li><a href="/proyek" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="briefcase"></i> Proyek</a></li>
                        <li><a href="/proyek-user" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="user-check"></i> Proyek User</a></li>
                    </ul>
                </li>

                <!-- Aktivitas -->
                <li>
                    <a href="/aktivitas" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500 transition">
                        <i data-feather="check-square"></i> Aktivitas
                    </a>
                </li>

                <!-- Jam Kerja Dropdown -->
                <li>
                    <button class="w-full flex justify-between items-center p-2 rounded hover:bg-blue-500 transition dropdown-btn">
                        <span class="flex items-center gap-3"><i data-feather="clock"></i> Jam Kerja</span>
                        <i data-feather="chevron-down"></i>
                    </button>
                    <ul class="ml-6 mt-1 hidden space-y-1 dropdown-menu bg-blue-800">
                        <li><a href="/jam-kerja" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="clock"></i> Jam Kerja</a></li>
                        <li><a href="/lembur" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="watch"></i> Lembur</a></li>
                        <li><a href="/mode" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="cpu"></i> Mode Kerja</a></li>
                        <li><a href="/jam-per-tanggal" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="calendar"></i> Jam Per Tanggal</a></li>
                        <li><a href="/status-jam-kerja" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="activity"></i> Status Jam Kerja</a></li>
                    </ul>
                </li>

                <!-- Pesan Dropdown -->
                <li>
                    <button class="w-full flex justify-between items-center p-2 rounded hover:bg-blue-500 transition dropdown-btn">
                        <span class="flex items-center gap-3"><i data-feather="message-square"></i> Pesan</span>
                        <i data-feather="chevron-down"></i>
                    </button>
                    <ul class="ml-6 mt-1 hidden space-y-1 dropdown-menu bg-blue-800">
                        <li><a href="/pesan" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="message-square"></i> Pesan</a></li>
                        <li><a href="/jenis-pesan" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500"><i data-feather="message-circle"></i> Jenis Pesan</a></li>
                    </ul>
                </li>

                <!-- Keterangan -->
                <li>
                    <a href="/keterangan" class="flex items-center gap-3 p-2 rounded hover:bg-blue-500 transition">
                        <i data-feather="info"></i> Keterangan
                    </a>
                </li>
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
    <div class="flex-1 p-6">
        @include('components.level.navbar')
        {{ $slot }}
    </div>

    <script>
        feather.replace();
        document.querySelectorAll('.dropdown-btn').forEach(button => {
            button.addEventListener('click', () => {
                const menu = button.nextElementSibling;
                menu.classList.toggle('hidden');
                button.querySelector('i[data-feather="chevron-down"]').classList.toggle('rotate-180');
            });
        });
    </script>

</body>
</html>
