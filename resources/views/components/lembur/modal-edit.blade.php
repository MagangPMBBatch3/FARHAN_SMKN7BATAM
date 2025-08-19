<div id="modalEditLembur" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Edit Lembur</h2>
            <form id="formEditLembur" onsubmit="updateLembur(); return false;">
                @csrf
                <input type="hidden" id="editLemburId" name="id">

                <div class="mb-4">
                    <label for="editLemburUser" class="block mb-1">Pilih User</label>
                    <select id="editLemburUser" name="users_profile_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih User --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="editLemburProyek" class="block mb-1">Pilih Proyek</label>
                    <select id="editLemburProyek" name="proyek_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih Proyek --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="editLemburTanggal" class="block mb-1">Tanggal</label>
                    <input type="date" id="editLemburTanggal" name="tanggal" class="border p-2 w-full rounded" required>
                </div>

                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeEditLemburModal()" class="bg-gray-400 text-white px-4 py-2 rounded">
                        Batal
                    </button>
                    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
