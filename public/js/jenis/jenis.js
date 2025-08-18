async function loadJenisData() {
    const queryAktif = `
      query {
        allJenisPesan {
          id
          nama
          deleted_at
        }
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();
    const aktifData = (dataAktif?.data?.allJenisPesan || []).filter(j => !j.deleted_at);
    renderJenisTable(aktifData, 'dataJenis', true);

    const arsipData = (dataAktif?.data?.allJenisPesan || []).filter(j => j.deleted_at);
    renderJenisTable(arsipData, 'dataJenisArsip', false);
}

function renderJenisTable(jenisList, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!jenisList.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    jenisList.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditJenisModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveJenis(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreJenis(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteJenis(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
        }

        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.nama}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}

async function archiveJenis(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
    mutation {
      deleteJenisPesan(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJenisData();
}

async function restoreJenis(id) {
    if (!confirm('Kembalikan dari arsip?')) return;
    const mutation = `
    mutation {
      restoreJenisPesan(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJenisData();
}

async function forceDeleteJenis(id) {
    if (!confirm('Hapus permanen? Data tidak bisa dikembalikan')) return;
    const mutation = `
    mutation {
      forceDeleteJenisPesan(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJenisData();
}

async function searchJenis() {
    const keyword = document.getElementById('searchJenis').value.trim();
    if (!keyword) {
        loadJenisData();
        return;
    }

    let query = '';

    if (!isNaN(keyword)) {
        query = `
        {
            jenisPesan(id: ${keyword}) {
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
        const data = await res.json();
        renderJenisTable(data.data.jenisPesan ? [data.data.jenisPesan] : [], 'dataJenis', true);

    } else {
        const queryAll = `
        {
            allJenisPesan {
                id
                nama
                deleted_at
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: queryAll })
        });
        const data = await res.json();
        const filtered = (data.data.allJenisPesan || []).filter(j => j.nama.toLowerCase().includes(keyword.toLowerCase()));
        renderJenisTable(filtered, 'dataJenis', true);
    }
}

document.addEventListener('DOMContentLoaded', loadJenisData);
