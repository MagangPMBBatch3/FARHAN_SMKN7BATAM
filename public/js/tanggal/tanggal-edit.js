function decimalToTime(decimal) {
    const h = Math.floor(decimal);
    const m = Math.round((decimal - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function timeToDecimal(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return parseFloat((h + m / 60).toFixed(2));
}

async function openEditModal(id, userId, proyekId, tanggal, jamDecimal) {
    document.getElementById('editId').value = id;
    document.getElementById('editTanggal').value = tanggal;

    document.getElementById('editJam').value = decimalToTime(parseFloat(jamDecimal));

    const userRes = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{ allUserProfiles { id nama_lengkap } }` })
    });
    const userData = await userRes.json();

    const userSelect = document.getElementById('editUser');
    userSelect.innerHTML = `<option value="">-- Pilih User --</option>`;
    userData.data.allUserProfiles.forEach(u => {
        userSelect.innerHTML += `<option value="${u.id}" ${u.id == userId ? 'selected' : ''}>${u.nama_lengkap}</option>`;
    });

    const proyekRes = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{ allProyeks { id nama } }` })
    });
    const proyekData = await proyekRes.json();

    if (!proyekData.data || !proyekData.data.allProyeks) {
        alert("Gagal ambil data Proyek. Cek schema GraphQL kamu.");
        return;
    }

    const proyekSelect = document.getElementById('editProyek');
    proyekSelect.innerHTML = `<option value="">-- Pilih Proyek --</option>`;
    proyekData.data.allProyeks.forEach(p => {
        proyekSelect.innerHTML += `<option value="${p.id}" ${p.id == proyekId ? 'selected' : ''}>${p.nama}</option>`;
    });

    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateJam() {
    const id = document.getElementById('editId').value;
    const users_profile_id = document.getElementById('editUser').value;
    const proyek_id = document.getElementById('editProyek').value;
    const tanggal = document.getElementById('editTanggal').value;

    const jamDecimal = timeToDecimal(document.getElementById('editJam').value);

    const mutation = `
        mutation {
            updateJamPerTanggal(
                id: ${id},
                input: {
                    users_profile_id: ${users_profile_id},
                    proyek_id: ${proyek_id},
                    tanggal: "${tanggal}",
                    jam: ${jamDecimal}
                }
            ) {
                id
                users_profile_id
                proyek_id
                tanggal
                jam
            }
        }
    `;

    const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });

    const data = await res.json();
    if (data.errors) {
        alert("Gagal update data!");
        console.error(data.errors);
    } else {
        alert("Data berhasil diperbarui!");
        closeEditModal();
        loadJamData();
    }
}
