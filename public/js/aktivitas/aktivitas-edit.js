async function modalEditAktivitas(id, nama, bagianId) {
    document.getElementById('editAktivitasId').value = id;
    document.getElementById('editAktivitasNama').value = nama;

    const query = `
        query {
            allBagian {
                id
                nama
            }
        }
    `;
    const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });
    const json = await res.json();
    const bagianList = json.data.allBagian;

    const select = document.getElementById('editAktivitasBagian');
    select.innerHTML = '<option value="">-- Pilih Bagian --</option>';
    bagianList.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.nama;
        if (String(b.id) === String(bagianId)) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });

    select.value = bagianId;

    document.getElementById('modalEditAktivitas').classList.remove('hidden');
}
function closeEditAktivitas(){
    document.getElementById('modalEditAktivitas').classList.add('hidden');
}

async function updateAktivitas() {
    const id = document.getElementById('editAktivitasId').value;
    const newNama = document.getElementById('editAktivitasNama').value;
    const bagianId = document.getElementById('editAktivitasBagian').value;

    if (!newNama || !bagianId) return alert("Semua field wajib diisi!");

    const mutation = `
        mutation {
            updateAktivitas(input: {
                id: ${id}, 
                nama: "${newNama}",
                bagian_id: ${bagianId}
            }) {
                id
                nama
                bagian_id
            }
        }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });

    closeEditAktivitas();
    loadData();
}