<div id="modalAddLevel" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Tambah Level</h2>
            <form id="formAddLevel" onsubmit="createLevel(); return false;">
                @csrf
                <div class="mb-4">
                    <label for="addLevelNama" class="block mb-1">Nama Level</label>
                    <input type="text" id="addLevelNama" name="nama" class="border p-2 w-full rounded" required>
                </div>
                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeAddLevelModal()" class="bg-gray-400 text-white px-4 py-2 rounded">
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