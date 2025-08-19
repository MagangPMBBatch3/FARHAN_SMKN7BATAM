async function openAddLemburModal() {
    document.getElementById('modalAddLembur').classList.remove('hidden');

    // load user
    const queryUsers = `
        query {
            allUserProfiles {
                id
                nama_lengkap
            }
        }
    `;

    const resUsers = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: queryUsers })
    });
    const dataUsers = await resUsers.json();
    const selectUser = document.getElementById('addLemburUser');
    selectUser.innerHTML = '<option value="">-- Pilih User --</option>';
    dataUsers.data.allUserProfiles.forEach(user => {
        if (user && user.nama_lengkap) {
            selectUser.innerHTML += `<option value="${user.id}">${user.nama_lengkap}</option>`;
        } else {
            selectUser.innerHTML += `<option value="" disabled class="text-red-500">User sudah dihapus</option>`;
        }
    });

    // load proyek
    const queryProyek = `
        query {
            allProyeks {
                id
                nama
            }
        }
    `;

    const resProyek = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: queryProyek })
    });
    const dataProyek = await resProyek.json();
    const selectProyek = document.getElementById('addLemburProyek');
    selectProyek.innerHTML = '<option value="">-- Pilih Proyek --</option>';
    dataProyek.data.allProyeks.forEach(proyek => {
        if (proyek && proyek.nama) {
            selectProyek.innerHTML += `<option value="${proyek.id}">${proyek.nama}</option>`;
        } else {
            selectProyek.innerHTML += `<option value="" disabled class="text-red-500">Proyek sudah dihapus</option>`;
        }
    });
}

function closeAddLemburModal() {
    document.getElementById('modalAddLembur').classList.add('hidden');
}
