<div id="modalAdd" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Tambah User</h2>
            <form id="formAdd" onsubmit="create(); return false;">
                @csrf
                <div class="mb-4">
                    <label for="addNama" class="block mb-1">Nama User</label>
                    <input type="text" id="addNama" name="nama" class="border p-2 w-full rounded" required>
                </div>
                <div class="mb-4">
                    <label for="addEmail" class="block mb-1">Email User</label>
                    <input type="text" id="addEmail" name="email" class="border p-2 w-full rounded" required>
                </div>
                <div class="mb-4">
                    <label for="addPassword" class="block mb-1">Password User</label>
                    <input type="text" id="addPassword" name="email" class="border p-2 w-full rounded" required>
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