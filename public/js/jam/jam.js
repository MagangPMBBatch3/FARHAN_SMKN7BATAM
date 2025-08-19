async function loadJamData() {
    const queryAktif = `
      query {
        allJamKerja {
          id
          users_profile_id
          no_wbs
          kode_proyek
          proyek_id
          aktivitas_id
          tanggal
          jumlah_jam
          keterangan
          status_id
          mode_id
        }
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();
    renderJamTable(dataAktif?.data?.allJamKerja || [], 'dataJam', true);

    const queryArsip = `
      query {
        allJamKerjaArsip {
          id
          users_profile_id
          no_wbs
          kode_proyek
          proyek_id
          aktivitas_id
          tanggal
          jumlah_jam
          keterangan
          status_id
          mode_id
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
    renderJamTable(dataArsip?.data?.allJamKerjaArsip || [], 'dataJamArsip', false);

}

function renderJamTable(items, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!items.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="12" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    items.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="modalEdit(${item.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveJam(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreJam(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteJam(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
        }

        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.users_profile_id}</td>
                <td class="border p-2">${item.no_wbs}</td>
                <td class="border p-2">${item.kode_proyek}</td>
                <td class="border p-2">${item.proyek_id}</td>
                <td class="border p-2">${item.aktivitas_id}</td>
                <td class="border p-2">${item.tanggal}</td>
                <td class="border p-2">${item.jumlah_jam}</td>
                <td class="border p-2">${item.keterangan ?? ''}</td>
                <td class="border p-2">${item.status_id}</td>
                <td class="border p-2">${item.mode_id}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}

async function archiveJam(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
    mutation {
        deleteJamKerja(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamData();
}

async function restoreJam(id) {
    if (!confirm('Kembalikan dari arsip?')) return;
    const mutation = `
    mutation {
        restoreJamKerja(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamData();
}

async function forceDeleteJam(id) {
    if (!confirm('Hapus permanen? Data tidak bisa dikembalikan')) return;
    const mutation = `
    mutation {
        forceDeleteJamKerja(id: ${id}) { id }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamData();
}

async function searchJam() {
    const keyword = document.getElementById('searchJam').value.trim();
    if (!keyword) {
        loadJamData();
        return;
    }

    let query = '';

    if (!isNaN(keyword)) {
        query = `
        {
            jamKerjaByNoWbs(no_wbs: "%${keyword}%") {
                id
                users_profile_id
                no_wbs
                kode_proyek
                proyek_id
                aktivitas_id
                tanggal
                jumlah_jam
                keterangan
                status_id
                mode_id
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderJamTable(data.data.jamKerjaByNoWbs ? [data.data.jamKerjaByNoWbs] : [], 'datajamKerjaByNoWbs', true);
    } else {
        query = `
        {
            jamKerjaByNoWbs(no_wbs: "%${keyword}%") {
                id
                users_profile_id
                no_wbs
                kode_proyek
                proyek_id
                aktivitas_id
                tanggal
                jumlah_jam
                keterangan
                status_id
                mode_id
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
renderJamTable(data.data.jamKerjaByNoWbs || [], 'dataJam', true);

    }
}

document.addEventListener('DOMContentLoaded', loadJamData);
