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
                        <label for="addNama" class="block mb-1">Nama lengkap</label>
                        <input type="text" id="addNama" name="nama" class="border p-2 bg-gray-100 w-full rounded"
                            readonly>
                    </div>

                    <div class="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label for="addEmail" class="block mb-1">email</label>
                            <input id="addEmail" name="email" class="border p-2 bg-gray-100 w-full rounded" readonly>
                            </input>
                        </div>
                        <div>
                            <label for="addNrp" class="block mb-1">NRP</label>
                            <input type="text" id="addNrp" name="nrp" class="border p-2 w-full rounded text-gray-600"
                                required>
                        </div>
                    </div>

                    <div class="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label for="addAlamat" class="block mb-1">Alamat</label>
                            <input id="addAlamat" name="alamat" class="border p-2 w-full rounded" required>
                            </input>
                        </div>
                        <div>
                            <label for="addFoto" class="block mb-1">Foto</label>
                            <input type="file" id="addFoto" name="foto" class="border p-2 w-full rounded text-gray-600"
                                required>
                        </div>
                    </div>

                    <div>
                        <label for="addStatus" class="block mb-1">Status</label>
                        <select id="addStatus" name="status_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>
                    <div>
                        <label for="addBagian" class="block mb-1">bagian</label>
                        <select id="addBagian" name="bagian_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>
                    <div>
                        <label for="addLevel" class="block mb-1">Level</label>
                        <select id="addLevel" name="level_id" class="border p-2 w-full rounded" required>
                        </select>
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