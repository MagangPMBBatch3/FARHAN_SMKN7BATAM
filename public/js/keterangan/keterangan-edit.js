// OPEN MODAL
async function openEditKeteranganModal(id, bagianId, proyekId, tanggal) {
    document.getElementById('modalEdit').classList.remove('hidden');
    const form = document.getElementById('formEdit');
    form.dataset.id = id;

    await loadBagianOptionsEdit(bagianId);
    await loadProyekOptionsEdit(proyekId);

    document.getElementById('editTanggal').value = tanggal;
}

// CLOSE MODAL
function closeEditModal() {
    const modal = document.getElementById('modalEdit');
    const form = document.getElementById('formEdit');
    modal.classList.add('hidden');
    form.reset();
    delete form.dataset.id;
}

// LOAD BAGIAN OPTIONS
async function loadBagianOptionsEdit(selectedId) {
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
    const result = await res.json();

    const select = document.getElementById('editBagian');
    select.innerHTML = `<option value="">-- Pilih Bagian --</option>`;

    if (result.data?.allBagian) {
        result.data.allBagian.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.nama;
            if (String(b.id) === String(selectedId)) {
                opt.selected = true;
            }
            select.appendChild(opt);
        });
    }
}

// LOAD PROYEK OPTIONS
async function loadProyekOptionsEdit(selectedId) {
    const query = `
        query {
            allProyeks {
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
    const result = await res.json();

    const select = document.getElementById('editProyek');
    select.innerHTML = `<option value="">-- Pilih Proyek --</option>`;

    if (result.data?.allProyeks) {
        result.data.allProyeks.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nama;
            if (String(p.id) === String(selectedId)) {
                opt.selected = true;
            }
            select.appendChild(opt);
        });
    }
}


async function editKeterangan() {
    const id = document.getElementById('formEdit').dataset.id;
    const bagian = document.getElementById('editBagian').value;
    const proyek = document.getElementById('editProyek').value;
    const tanggal = document.getElementById('editTanggal').value;

    if (!bagian || !proyek || !tanggal) {
        return alert("Semua field wajib diisi!");
    }

    const mutation = `
        mutation {
            updateKeterangan(
                id: ${id}, 
                input: {
                    bagian_id: ${bagian}, 
                    proyek_id: ${proyek},
                    tanggal: "${tanggal}"
                }
            ) {
                id
                bagian { nama }
                proyek { nama }
                tanggal
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });

    closeEditModal();
    loadData();
}
