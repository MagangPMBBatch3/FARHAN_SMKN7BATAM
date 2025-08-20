function openEditModal(id, proyekId, userId) {
    document.getElementById('modalEdit').classList.remove('hidden');
    document.getElementById('editId').value = id;

    const queryUsers = `
        query {
            allUserProfiles {
                id
                nama_lengkap
            }
        }
    `;

    fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryUsers })
    })
    .then(res => res.json())
    .then(data => {
        const selectUser = document.getElementById('editUser');
        selectUser.innerHTML = `<option value="">-- Pilih User --</option>`;

        let foundUser = false;
        data.data.allUserProfiles.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = u.nama_lengkap;

            if (String(u.id) === String(userId)) {
                opt.selected = true;
                foundUser = true;
            }
            selectUser.appendChild(opt);
        });

        if (!foundUser && userId) {
            const opt = document.createElement('option');
            opt.value = userId;
            opt.textContent = "User sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            selectUser.appendChild(opt);
        }
    });

    const queryProyek = `
        query {
            allProyeks {
                id
                nama
            }
        }
    `;

    fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryProyek })
    })
    .then(res => res.json())
    .then(data => {
        const selectProyek = document.getElementById('editProyek');
        selectProyek.innerHTML = `<option value="">-- Pilih Proyek --</option>`;

        let foundProyek = false;
        data.data.allProyeks.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nama;

            if (String(p.id) === String(proyekId)) {
                opt.selected = true;
                foundProyek = true;
            }
            selectProyek.appendChild(opt);
        });

        if (!foundProyek && proyekId) {
            const opt = document.createElement('option');
            opt.value = proyekId;
            opt.textContent = "Proyek sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            selectProyek.appendChild(opt);
        }
    });
}


function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
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