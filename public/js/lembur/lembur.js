async function loadLemburData() {
    const queryAktif = `
      query {
        allLembur {
          id
          users_profile_id
          proyek_id
          tanggal
          proyek{
            nama
          }
          userProfile {
            id
            nama_lengkap
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
    renderLemburTable(dataAktif?.data?.allLembur || [], 'dataLembur', true);

    const queryArsip = `
      query {
        allLemburArsip {
            id
            users_profile_id
            proyek_id
            tanggal
        }
      }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();
    renderLemburTable(dataArsip?.data?.allLemburArsip || [], 'dataLemburArsip', false);
}


function renderLemburTable(lemburs, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!lemburs.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    lemburs.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditLemburModal(${item.id}, '${item.userProfile ? item.userProfile.nama_lengkap : ''}')" 
                    class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveLembur(${item.id})" 
                    class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreLembur(${item.id})" 
                    class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteLembur(${item.id})" 
                    class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
        }

        const userName = item.userProfile ? item.userProfile.nama_lengkap : "User tidak tersedia";
        const proyekName = item.proyek 
            ? item.proyek.nama 
            : `<span class="text-red-500">Proyek tidak tersedia</span>`;

        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${userName}</td>
                <td class="border p-2">${proyekName}</td>
                <td class="border p-2">${item.tanggal}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}


async function archiveLembur(id) {
    if(!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
    mutation {
    deleteLembur(id: ${id}){id}
    }
    `;
    await fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ query: mutation})
  });
  loadLemburData();
    
}

async function restoreLembur(id) {
    if (!confirm('Kembalikan dari arsip')) return;
    const mutation =`
    mutation {
    restoreLembur(id: ${id}){id}}
    `;
    await fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ query: mutation})
  });
  loadLemburData();
}

async function forceDeleteLembur(id) {
    if(!confirm('Hapus permanen? Data tidak bisa dikembalikan')) return;
    const mutation = `
    mutation{
    forceDeleteLembur(id: ${id}){id}}`;
    await fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ query: mutation})
  });
  loadLemburData();
}

async function searchLembur() {
    const keyword = document.getElementById('searchLembur').value.trim();
    if (!keyword) {
        loadLemburData();
        return;
    }

    let query = '';

    if (!isNaN(keyword)) {
        query = `
        {
            lembur(id: ${keyword}) {
                id
          users_profile_id
          proyek_id
          tanggal
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderLemburTable(data.data.lembur ? [data.data.lembur] : [], 'dataLembur', true);

    } else {
        query = `
        {
            LemburByNama(nama: "%${keyword}%") {
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
        renderLemburTable(data.data.LemburByNama, 'dataLembur', true);
    }
}


document.addEventListener('DOMContentLoaded', loadLemburData);
