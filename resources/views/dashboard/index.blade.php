<x-layouts.main title="Dashboard">
    <x-slot name="pageTitle">Dashboard</x-slot>

    <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-500">Ringkasan data sistem dan aktivitas terbaru</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm text-gray-500">Total User</h3>
                <i data-feather="users" class="text-blue-500"></i>
            </div>
            <p class="text-2xl font-bold">1,245</p>
            <div class="w-full bg-gray-200 h-2 rounded mt-2">
                <div class="bg-blue-500 h-2 rounded" style="width: 75%"></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm text-gray-500">Proyek Aktif</h3>
                <i data-feather="briefcase" class="text-green-500"></i>
            </div>
            <p class="text-2xl font-bold">87</p>
            <div class="w-full bg-gray-200 h-2 rounded mt-2">
                <div class="bg-green-500 h-2 rounded" style="width: 50%"></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm text-gray-500">Pendapatan Bulan Ini</h3>
                <i data-feather="dollar-sign" class="text-yellow-500"></i>
            </div>
            <p class="text-2xl font-bold">Rp 24,5 jt</p>
            <div class="w-full bg-gray-200 h-2 rounded mt-2">
                <div class="bg-yellow-500 h-2 rounded" style="width: 65%"></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm text-gray-500">Tugas Selesai</h3>
                <i data-feather="check-square" class="text-red-500"></i>
            </div>
            <p class="text-2xl font-bold">432</p>
            <div class="w-full bg-gray-200 h-2 rounded mt-2">
                <div class="bg-red-500 h-2 rounded" style="width: 80%"></div>
            </div>
        </div>
    </div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-xl shadow col-span-2">
        <h3 class="text-lg font-semibold mb-4">Pertumbuhan Jumlah Proyek</h3>
        <canvas id="lineChart" height="120"></canvas>
    </div>

    <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-lg font-semibold mb-4">Jumlah Proyek Per Bulan</h3>
        <canvas id="barChart" height="120"></canvas>
    </div>
</div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow col-span-2">
            <h3 class="text-lg font-semibold mb-4">Proyek Terbaru</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-600 text-sm">
                            <th class="p-3">#</th>
                            <th class="p-3">Nama Proyek</th>
                            <th class="p-3">Tanggal</th>
                            <th class="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr class="border-b hover:bg-gray-50">
                            <td class="p-3">1</td>
                            <td class="p-3">Sistem Absensi</td>
                            <td class="p-3">2025-08-10</td>
                            <td class="p-3"><span class="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Aktif</span></td>
                        </tr>
                        <tr class="border-b hover:bg-gray-50">
                            <td class="p-3">2</td>
                            <td class="p-3">E-Commerce</td>
                            <td class="p-3">2025-08-14</td>
                            <td class="p-3"><span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">Pending</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="p-3">3</td>
                            <td class="p-3">Dashboard Admin</td>
                            <td class="p-3">2025-08-18</td>
                            <td class="p-3"><span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">Selesai</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="text-lg font-semibold mb-4">Notifikasi</h3>
            <ul class="space-y-3 text-sm">
                <li class="flex items-center gap-3">
                    <i data-feather="bell" class="text-blue-500"></i>
                    <span>3 user baru mendaftar</span>
                </li>
                <li class="flex items-center gap-3">
                    <i data-feather="alert-circle" class="text-yellow-500"></i>
                    <span>Pembayaran proyek tertunda</span>
                </li>
                <li class="flex items-center gap-3">
                    <i data-feather="message-square" class="text-green-500"></i>
                    <span>Ada 5 pesan baru</span>
                </li>
                <li class="flex items-center gap-3">
                    <i data-feather="check-circle" class="text-red-500"></i>
                    <span>Tugas mingguan selesai</span>
                </li>
            </ul>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [{
                label: 'Jumlah Proyek',
                data: [5, 9, 12, 15, 20, 24],
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37,99,235,0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [{
                label: 'Jumlah Proyek',
                data: [5, 9, 12, 15, 20, 24],
                backgroundColor: '#10B981'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    feather.replace();
</script>
</x-layouts.main>
