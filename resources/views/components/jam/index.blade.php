<x-layouts.main title="Data Jam Kerja">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2x1 font-bold mb-4">Data Jam Kerja</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchJam" placeholder="Cari ID atau No WBS..." 
                   class="border p-2 rounded w-64" oninput="searchJam()">
            <button onclick="openAddJamModal()" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah Data</button>
        </div>

        <div class="mb-4">
            <button class="px-4 py-2 bg-blue-500 text-white rounded-t" onclick="showTab('aktif')" id="tabAktif">Data Aktif</button>
            <button onclick="showTab('arsip')" id="tabArsip" class="px-4 py-2 bg-gray-300 text-black rounded-t">Data Arsip</button>
        </div>

        {{-- Tabel Aktif --}}
        <div id="tableAktif">
            <table class="w-full border text-sm">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">User Profile ID</th>
                        <th class="p-2 border">No WBS</th>
                        <th class="p-2 border">Kode Proyek</th>
                        <th class="p-2 border">Proyek ID</th>
                        <th class="p-2 border">Aktivitas ID</th>
                        <th class="p-2 border">Tanggal</th>
                        <th class="p-2 border">Jumlah Jam</th>
                        <th class="p-2 border">Keterangan</th>
                        <th class="p-2 border">Status ID</th>
                        <th class="p-2 border">Mode ID</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataJam"></tbody>
            </table>
        </div>

        {{-- Tabel Arsip --}}
        <div id="tableArsip" class="hidden">
            <table class="w-full border text-sm">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">User Profile ID</th>
                        <th class="p-2 border">No WBS</th>
                        <th class="p-2 border">Kode Proyek</th>
                        <th class="p-2 border">Proyek ID</th>
                        <th class="p-2 border">Aktivitas ID</th>
                        <th class="p-2 border">Tanggal</th>
                        <th class="p-2 border">Jumlah Jam</th>
                        <th class="p-2 border">Keterangan</th>
                        <th class="p-2 border">Status ID</th>
                        <th class="p-2 border">Mode ID</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataJamArsip"></tbody>
            </table>
        </div>

        @include('components.jam.modal-add')
        @include('components.jam.modal-edit')

        <script src="{{ asset('js/jam/jam.js') }}"></script>
        <script src="{{ asset('js/jam/Jam-create.js') }}"></script>
        <script src="{{ asset('js/jam/Jam-edit.js') }}"></script>

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

                loadJamData();
            }
        </script>
    </div>
</x-layouts.main>
