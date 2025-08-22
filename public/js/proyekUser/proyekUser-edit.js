let cacheUserProfiles = null;
let cacheProyeks = null;

async function openEditModal(id, proyekId, userId) {
    document.getElementById('modalEdit').classList.remove('hidden');
    document.getElementById('editId').value = id;

    try {
        if (!cacheUserProfiles || !cacheProyeks) {
            const query = `
                query {
                    allUserProfiles { id, nama_lengkap }
                    allProyeks { id, nama }
                }
            `;
            const res = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();

            cacheUserProfiles = data.data.allUserProfiles;
            cacheProyeks = data.data.allProyeks;
        }

        const selectUser = document.getElementById('editUser');
        selectUser.innerHTML = '';
        const userFragment = document.createDocumentFragment();
        let foundUser = false;

        cacheUserProfiles.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = u.nama_lengkap;
            if (String(u.id) === String(userId)) {
                opt.selected = true;
                foundUser = true;
            }
            userFragment.appendChild(opt);
        });

        if (!foundUser && userId) {
            const opt = document.createElement('option');
            opt.value = userId;
            opt.textContent = "User sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            userFragment.appendChild(opt);
        }
        selectUser.appendChild(userFragment);
        selectUser.insertAdjacentHTML('afterbegin', `<option value="">-- Pilih User --</option>`);

        const selectProyek = document.getElementById('editProyek');
        selectProyek.innerHTML = '';
        const proyekFragment = document.createDocumentFragment();
        let foundProyek = false;

        cacheProyeks.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nama;
            if (String(p.id) === String(proyekId)) {
                opt.selected = true;
                foundProyek = true;
            }
            proyekFragment.appendChild(opt);
        });

        if (!foundProyek && proyekId) {
            const opt = document.createElement('option');
            opt.value = proyekId;
            opt.textContent = "Proyek sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            proyekFragment.appendChild(opt);
        }
        selectProyek.appendChild(proyekFragment);
        selectProyek.insertAdjacentHTML('afterbegin', `<option value="">-- Pilih Proyek --</option>`);

    } catch (err) {
        console.error(err);
        alert("Gagal memuat data user/proyek");
    }
}



function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
    document.getElementById('editUser').value = '';
    document.getElementById('editProyek').value = '';
}

async function update() {
    const id = document.getElementById('editId').value;
    const Proyek = document.getElementById('editProyek').value;
    const User = document.getElementById('editUser').value;
    if (!Proyek) return alert('Gagal Mendapatkan Proyek')
    if (!User) return alert("User tidak boleh kosong");
    const mutation = `
    mutation {
        updateProyekUser(id: ${id}, input: { proyek_id: ${Proyek}, users_profile_id: ${User}}) {
            id
            proyek_id
            users_profile_id
        }
    }
      
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    closeEditModal();
    loadProyekUserData();
}