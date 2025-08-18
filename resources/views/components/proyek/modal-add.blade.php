<div id="modalAdd" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Tambah Proyek</h2>
            <form id="formAdd" onsubmit="create(); return false;">
                @csrf
                <div class="mb-4">
                    <label for="addKode" class="block mb-1">Kode Proyek</label>
                    <input type="text" id="addKode" name="kode" class="border p-2 w-full rounded" required>
                </div>
                <div class="mb-4">
                    <label for="addNama" class="block mb-1">Nama Proyek</label>
                    <input type="text" id="addNama" name="nama" class="border p-2 w-full rounded" required>
                </div>
                <div class="mb-4">
                    <label for="addTanggal" class="block mb-1">Tanggal Proyek</label>
                    <input type="date" id="addTanggal" name="tanggal" class="border p-2 w-full rounded" required>
                </div>
                <div class="mb-4">
                    <label for="addNamaSekolah" class="block mb-1">Nama Sekolah Proyek</label>
                    <input type="text" id="addNamaSekolah" name="nama_sekolah" class="border p-2 w-full rounded" required>
                </div>
                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeAddModal()" class="bg-gray-400 text-white px-4 py-2 rounded">
                        Batal
                    </button>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>