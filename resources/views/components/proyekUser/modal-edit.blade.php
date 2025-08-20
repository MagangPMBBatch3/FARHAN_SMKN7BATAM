<div id="modalEdit" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex ">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Edit Proyek</h2>
            <form id="formEdit" onsubmit="update(); return false;">
                @csrf
                <input type="hidden" id="editId" name="id">
                <div class="mb-4">
                    <label for="editProyek" class="block mb-1">Pilih Proyek</label>
                    <select id="editProyek" name="proyek_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih User --</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="editUser" class="block mb-1">Pilih User</label>
                    <select id="editUser" name="users_profile_id" class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih Proyek --</option>
                    </select>
                </div>
                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeEditModal()" class="bg-gray-400 text-white px-4 py-2 rounded">
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