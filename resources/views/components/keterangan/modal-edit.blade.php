<!-- MODAL -->
<div id="modalEdit" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Edit Keterangan</h2>
            <form id="formEdit" onsubmit="editKeterangan(); return false;">
                @csrf
                <div class="mb-4">
                    <label for="editBagian" class="block mb-1">Pilih Bagian</label>
                    <select id="editBagian" name="bagian_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih Bagian --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="editProyek" class="block mb-1">Pilih Proyek</label>
                    <select id="editProyek" name="proyek_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih Proyek --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="editTanggal" class="block mb-1">Tanggal</label>
                    <input type="date" id="editTanggal" name="tanggal" class="border p-2 w-full rounded" required>
                </div>

                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeEditModal()" class="bg-gray-400 text-white px-4 py-2 rounded">
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
