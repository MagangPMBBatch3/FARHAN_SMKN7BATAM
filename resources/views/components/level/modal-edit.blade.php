<div id="modalEditLevel" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Edit Bagian</h2>
            <form id="formEditLevel" onsubmit="updateLevel(); return false;">
                @csrf
                <input type="hidden" id="editLevelId" name="id">
                <div class="mb-4">
                    <label for="editLevelNama" class="block mb-1">Nama Bagian</label>
                    <input type="text" id="editLevelNama" name="nama" class="border p-2 w-full rounded" required>
                </div>
                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeEditLevelModal()" class="bg-gray-400 text-white px-4 py-2 rounded">
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