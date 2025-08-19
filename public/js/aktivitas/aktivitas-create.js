async function loadData() {
    const queryAktif = `
      query {
        allAktivitas {
            id
            bagian_id
            no_wbs
            nama
            bagian {
                nama
            }
        }
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();
    renderAktivitasTable(dataAktif?.data?.allAktivitas || [], 'dataAktivitas', true);

    const queryArsip = `
      query {
        allAktivitasArsip {
            id
            bagian_id
            no_wbs
            nama
            bagian {
                nama
            }
            deleted_at
        }
      }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();
    renderAktivitasTable(dataArsip?.data?.allAktivitasArsip || [], 'dataAktivitasArsip', false);
}
async function openAddAktivitasModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
    await loadBagianOptions(); 
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('formAdd').reset();
}

async function loadBagianOptions() {
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
    });

    const result = await res.json();
    const select = document.getElementById('addBagian');
    select.innerHTML = `<option value="">-- Pilih Bagian --</option>`;

    if (result.data && result.data.allBagian) {
        result.data.allBagian.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.nama;
            select.appendChild(opt);
        });
    }
}

async function createProyek() {
    const kode = document.getElementById('addKode').value;
    const nama = document.getElementById('addNama').value;
    const bagianId = document.getElementById('addBagian').value;

    if (!kode || !nama || !bagianId) {
        return alert("Semua field wajib diisi!");
    }

    const mutation = `
        mutation {
            createAktivitas(input: {
                no_wbs: "${kode}",
                nama: "${nama}",
                bagian_id: ${bagianId}
            }) {
                id
                nama
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: mutation })
    });

    closeAddModal();
    loadData();
}
