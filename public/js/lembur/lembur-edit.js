function openEditLemburModal(lembur) {
    document.getElementById('modalEditLembur').classList.remove('hidden');

    document.getElementById('editLemburId').value = lembur.id;
    document.getElementById('editLemburTanggal').value = lembur.tanggal;

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
        const selectUser = document.getElementById('editLemburUser');
        selectUser.innerHTML = `<option value="">-- Pilih User --</option>`;

        let foundUser = false;
        data.data.allUserProfiles.forEach(user => {
            const opt = document.createElement('option');
            opt.value = user.id;
            opt.textContent = user.nama_lengkap;

            if (user.id == lembur.users_profile_id) {
                opt.selected = true;
                foundUser = true;
            }
            selectUser.appendChild(opt);
        });

        if (!foundUser && lembur.users_profile_id) {
            const opt = document.createElement('option');
            opt.value = lembur.users_profile_id;
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
        const selectProyek = document.getElementById('editLemburProyek');
        selectProyek.innerHTML = `<option value="">-- Pilih Proyek --</option>`;

        let foundProyek = false;
        data.data.allProyeks.forEach(proyek => {
            const opt = document.createElement('option');
            opt.value = proyek.id;
            opt.textContent = proyek.nama;

            if (proyek.id == lembur.proyek_id) {
                opt.selected = true;
                foundProyek = true;
            }
            selectProyek.appendChild(opt);
        });

        if (!foundProyek && lembur.proyek_id) {
            const opt = document.createElement('option');
            opt.value = lembur.proyek_id;
            opt.textContent = "Proyek sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            selectProyek.appendChild(opt);
        }
    });
}
