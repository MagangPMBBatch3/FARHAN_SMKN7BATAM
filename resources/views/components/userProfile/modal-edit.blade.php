<div id="editModal" class="hidden">
    <div class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div class="bg-white rounded-lg shadow-lg w-[48rem] p-6">
            <h2 class="text-lg font-bold mb-4">Edit User Profile</h2>
            <form id="formEditUserProfile" onsubmit="updateUserProfile(); return false;">
            <input type="hidden" id="editId" name="editId">
    <input type="hidden" id="currentFoto" name="currentFoto">
                @csrf
                <meta name="csrf-token" content="{{ csrf_token() }}">


                <div class="grid grid-cols-2 gap-4">
                    <!-- User Profile -->
                    <div>
                        <label for="editUsersProfile" class="block mb-1">User</label>
                        <select id="editUsersProfile" name="users_profile_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>

                    <!-- Nama Lengkap -->
                    <div>
                        <label for="editNama" class="block mb-1">Nama Lengkap</label>
                        <input type="text" id="editNama" name="nama_lengkap"
                               class="border p-2 bg-gray-100 w-full rounded" readonly>
                    </div>

                    <!-- Email & NRP -->
                    <div class="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label for="editEmail" class="block mb-1">Email</label>
                            <input type="text" id="editEmail" name="email"
                                   class="border p-2 bg-gray-100 w-full rounded" readonly>
                        </div>
                        <div>
                            <label for="editNrp" class="block mb-1">NRP</label>
                            <input type="text" id="editNrp" name="nrp"
                                   class="border p-2 w-full rounded text-gray-600" required placeholder="Masukan NRP">
                        </div>
                    </div>

                    <!-- Alamat & Foto -->
                    <div class="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label for="editAlamat" class="block mb-1">Alamat</label>
                            <input type="text" id="editAlamat" name="alamat"
                                   class="border p-2 w-full rounded" required placeholder="Masukan Alamat">
                        </div>
                        <div>
                            <label for="editFoto" class="block mb-1">Foto</label>
                            <input type="file" id="editFoto" name="foto"
                                   class="border p-2 w-full rounded text-gray-600" placeholder="Masukan Foto">
                        </div>
                    </div>

                    <!-- Status -->
                    <div>
                        <label for="editStatus" class="block mb-1">Status</label>
                        <select id="editStatus" name="status_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>

                    <!-- Bagian -->
                    <div>
                        <label for="editBagian" class="block mb-1">Bagian</label>
                        <select id="editBagian" name="bagian_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>

                    <!-- Level -->
                    <div>
                        <label for="editLevel" class="block mb-1">Level</label>
                        <select id="editLevel" name="level_id" class="border p-2 w-full rounded" required>
                        </select>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end gap-2 mt-6">
                    <button type="button" onclick="closeEditModal()"
                            class="bg-gray-400 text-white px-4 py-2 rounded">
                        Batal
                    </button>
                    <button type="submit"
                            class="bg-blue-500 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
