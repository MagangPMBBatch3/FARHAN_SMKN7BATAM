<div id="modalAdd" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Tambah Jam Per Tanggal</h2>
            <form id="formAdd" onsubmit="create(); return false;">
                @csrf
                <div class="mb-4">
                    <label for="addUser" class="block mb-1">Pilih User</label>
                    <select id="addUser" name="users_profile_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih User --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="addProyek" class="block mb-1">Pilih Proyek</label>
                    <select id="addProyek" name="proyek_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih Proyek --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="addTanggal" class="block mb-1">Tanggal</label>
                    <input type="date" id="addTanggal" name="tanggal" class="border p-2 w-full rounded" required>
                </div>

                <div class="mb-4">
                    <label for="addJam" class="block mb-1">Jam</label>
                    <input type="time" id="addJam" name="jam" class="border p-2 w-full rounded" required>
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
