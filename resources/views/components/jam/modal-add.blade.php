<div id="modalAdd" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-[48rem] p-6">
            <h2 class="text-lg font-bold mb-4">Tambah Jam Kerja</h2>
            <form id="formAddJamKerja" onsubmit="createJamKerja(); return false;">
                @csrf

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="addUsersProfile" class="block mb-1">User</label>
                        <select id="addUsersProfile" name="users_profile_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>

                    <div>
                        <label for="addTanggal" class="block mb-1">Tanggal</label>
                        <input type="date" id="addTanggal" name="tanggal" class="border p-2 w-full rounded" required>
                    </div>

                    <div class="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label for="addProyek" class="block mb-1">Proyek</label>
                            <select id="addProyek" name="proyek_id" class="border p-2 w-full rounded" required>
                            </select>
                        </div>
                        <div>
                            <label for="addKodeProyek" class="block mb-1">Kode Proyek</label>
                            <input type="text" id="addKodeProyek" name="kode_proyek" class="border p-2 w-full rounded bg-gray-100 text-gray-600" readonly>
                        </div>
                    </div>

                    <div class="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label for="addAktivitas" class="block mb-1">Aktivitas</label>
                            <select id="addAktivitas" name="aktivitas_id" class="border p-2 w-full rounded" required>
                            </select>
                        </div>
                        <div>
                            <label for="addNoWbs" class="block mb-1">No WBS</label>
                            <input type="text" id="addNoWbs" name="no_wbs" class="border p-2 w-full rounded bg-gray-100 text-gray-600" readonly>
                        </div>
                    </div>

                    <div>
                        <label for="addJumlahJam" class="block mb-1">Jumlah Jam</label>
                        <input type="time" id="addJumlahJam" name="jumlah_jam" class="border p-2 w-full rounded" required>
                    </div>

                    <div>
                        <label for="addStatus" class="block mb-1">Status</label>
                        <select id="addStatus" name="status_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>

                    <div>
                        <label for="addMode" class="block mb-1">Mode Jam Kerja</label>
                        <select id="addMode" name="mode_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>

                    <div class="col-span-2">
                        <label for="addKeterangan" class="block mb-1">Keterangan</label>
                        <textarea id="addKeterangan" name="keterangan" class="border p-2 w-full rounded"></textarea>
                    </div>
                </div>

                <div class="flex justify-end gap-2 mt-6">
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
