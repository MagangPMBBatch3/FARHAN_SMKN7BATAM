async function loadAktivitasData() {
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

function renderAktivitasTable(items, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!items.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    items.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="modalEditAktivitas(${item.id}, '${item.nama}', '${item.bagian_id}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveAktivitas(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreAktivitas(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteAktivitas(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
        }

        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.bagian ? item.bagian.nama : '-'}</td>
                <td class="border p-2">${item.no_wbs}</td>
                <td class="border p-2">${item.nama}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}

async function archiveAktivitas(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
    mutation {
        deleteAktivitas(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadAktivitasData();
}

async function restoreAktivitas(id) {
    if (!confirm('Kembalikan dari arsip?')) return;
    const mutation = `
    mutation {
        restoreAktivitas(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadAktivitasData();
}

async function forceDeleteAktivitas(id) {
    if (!confirm('Hapus permanen? Data tidak bisa dikembalikan')) return;
    const mutation = `
    mutation {
        forceDeleteAktivitas(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadAktivitasData();
}

async function searchAktivitas() {
    const keyword = document.getElementById('searchAktivitas').value.trim();
    if (!keyword) {
        loadAktivitasData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
        query {
            aktivitas(id: ${keyword}) {
                id
                bagian_id
                no_wbs
                nama
                bagian { nama }
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderAktivitasTable(data.data.aktivitas ? [data.data.aktivitas] : [], 'dataAktivitas', true);
    } else {
        query = `
        query {
            aktivitasByNama(nama: "%${keyword}%") {
                id
                bagian_id
                no_wbs
                nama
                bagian { nama }
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderAktivitasTable(data.data.aktivitasByNama || [], 'dataAktivitas', true);
    }
}

document.addEventListener('DOMContentLoaded', loadAktivitasData);
