<x-layouts.main title="Data Bagian">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2x1 font-bold mb-4">Data Bagian</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="search" placeholder="Cari Id atau Nama..."
                class="border p-2 rounded w-64" oninput="searchBagian()">
            <button onclick="openAddModal()" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah Data</button>
        </div>
        <div class="h-96 overflow-y-auto">
         <table class="w-full border">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">Nama</th>
                    <th class="p-2 border">Aksi</th>
                </tr>
            </thead>
            <tbody id="dataBagian"></tbody>
         </table>
        </div>
    </div>

    @include('components.bagian.modal-add')
    @include('components.bagian.modal-edit')

    <script src="{{ asset('js/bagian/bagian.js') }}"></script>
    <script src="{{ asset('js/bagian/bagian-create.js') }}"></script>
    <script src="{{ asset('js/bagian/bagian-edit.js') }}"></script>
</x-layouts.main>
