async function loadData() {
    const queryAktif = `
      query {
        allKeterangan {
            id
            bagian_id
            proyek_id
            tanggal
            bagian {
                nama
            }
            proyek{
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
    renderKeteranganTable(dataAktif?.data?.allKeterangan || [], 'dataKeterangan', true);

    const queryArsip = `
      query {
        allKeteranganArsip {
            id
            bagian_id
            proyek_id
            tanggal
            bagian {
                nama
            }
            proyek{
                nama
            }
        }
      }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();
    renderKeteranganTable(dataArsip?.data?.allKeteranganArsip || [], 'dataKeteranganArsip', false);
}
async function openAddKeteranganModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
    await loadBagianOptions(); 
    await loadProyekOptions(); 
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
async function loadProyekOptions() {
    const query = `
        query {
            allProyeks{
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
    const select = document.getElementById('addProyek');
    select.innerHTML = `<option value="">-- Pilih Proyek --</option>`;

    if (result.data && result.data.allProyeks) {
        result.data.allProyeks.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.nama;
            select.appendChild(opt);
        });
    }
}

async function addKeterangan() {
    const Bagian = document.getElementById('addBagian').value;
    const Proyek = document.getElementById('addProyek').value;
    const Tanggal = document.getElementById('addTanggal').value;

    if (!Bagian || !Proyek || !Tanggal) {
        return alert("Semua field wajib diisi!");
    }

    const mutation = `
        mutation {
            createKeterangan(input: {
                bagian_id: ${Bagian},
                proyek_id: ${Proyek},
                tanggal: "${Tanggal}"
            }) {
                id
                proyek{
                    nama
                }
                bagian{
                    nama
                }
                tanggal
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
