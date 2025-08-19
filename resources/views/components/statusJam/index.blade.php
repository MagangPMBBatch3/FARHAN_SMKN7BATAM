<x-layouts.main title="Data Jam Per Tanggal">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Jam Per Tanggal</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="search" 
                placeholder=" Cari ID atau Nama..." class="border p-2 rounded w-64" oninput="search()">
            <button onclick="openAddModal()" class="bg-blue-500 text-white px-4 py-2 rounded">
                Tambah Data
            </button>
        </div>

        <div class="mb-4">
            <button class="px-4 py-2 bg-blue-500 text-white rounded-t" onclick="showTab('aktif')" id="tabAktif">
                Data Aktif
            </button>
            <button onclick="showTab('arsip')" id="tabArsip" class="px-4 py-2 bg-gray-300 text-black rounded-t">
                Data Arsip
            </button>
        </div>

        <!-- Tabel Aktif -->
        <div id="tableAktif">
            <table class="w-full border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">User Profile Id</th>
                        <th class="p-2 border">Proyek Id</th>
                        <th class="p-2 border">Tanggal</th>
                        <th class="p-2 border">Jam</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataTanggal"></tbody>
            </table>
        </div>

        <!-- Tabel Arsip -->
        <div id="tableArsip" class="hidden">
            <table class="w-full border">
                <thead class="bg-gray-200">
                    <tr>
                    <th class="p-2 border">ID</th>
                        <th class="p-2 border">User Profile Id</th>
                        <th class="p-2 border">Proyek Id</th>
                        <th class="p-2 border">Tanggal</th>
                        <th class="p-2 border">Jam</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataTanggalArsip"></tbody>
            </table>
        </div>

        @include('components.tanggal.modal-add')
        @include('components.tanggal.modal-edit')

        <script src="{{ asset('js/tanggal/tanggal.js') }}"></script>
        <script src="{{ asset('js/tanggal/tanggal-create.js') }}"></script>
        <script src="{{ asset('js/tanggal/tanggal-edit.js') }}"></script>

        <script>
            function showTab(tab) {
                const tabAktif = document.getElementById('tabAktif');
                const tabArsip = document.getElementById('tabArsip');
                const tableAktif = document.getElementById('tableAktif');
                const tableArsip = document.getElementById('tableArsip');

                if (tab === 'aktif') {
                    tabAktif.classList.add('bg-blue-500', 'text-white');
                    tabAktif.classList.remove('bg-gray-300', 'text-black');
                    tabArsip.classList.remove('bg-blue-500', 'text-white');
                    tabArsip.classList.add('bg-gray-300', 'text-black');
                    tableAktif.classList.remove('hidden');
                    tableArsip.classList.add('hidden');
                } else {
                    tabArsip.classList.add('bg-blue-500', 'text-white');
                    tabArsip.classList.remove('bg-gray-300', 'text-black');
                    tabAktif.classList.remove('bg-blue-500', 'text-white');
                    tabAktif.classList.add('bg-gray-300', 'text-black');
                    tableArsip.classList.remove('hidden');
                    tableAktif.classList.add('hidden');
                }

                loadData();
            }

            document.addEventListener("DOMContentLoaded", () => {
                loadData("aktif");
            });
        </script>
    </div>
</x-layouts.main>