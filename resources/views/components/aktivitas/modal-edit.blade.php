<div id="modalEditAktivitas" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-lg font-bold mb-4">Edit Aktivitas</h2>
            <form id="formEditAktivitas" onsubmit="updateAktivitas(); return false;">
                @csrf
                <input type="hidden" id="editAktivitasId" name="id">

                <div class="mb-4">
                    <label for="editAktivitasNama" class="block mb-1">Nama Aktivitas</label>
                    <input type="text" id="editAktivitasNama" name="nama" 
                           class="border p-2 w-full rounded" required>
                </div>

                <div class="mb-4">
                    <label for="editAktivitasBagian" class="block mb-1">Bagian</label>
                    <select id="editAktivitasBagian" name="bagian_id" 
                            class="border p-2 w-full rounded" required>
                        <option value="">-- Pilih Bagian --</option>
                    </select>
                </div>

                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closeEditAktivitas()" 
                            class="bg-gray-400 text-white px-4 py-2 rounded">
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
