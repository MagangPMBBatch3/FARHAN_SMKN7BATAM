async function loadPesanData() {
    const queryAktif = `
      query {
        allPesan {
          id
          pengirim
          penerima
          isi
          parent_id
          tgl_pesan
          jenis_id
        }   
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();
    renderPesanTable(dataAktif?.data?.allPesan || [], 'dataPesan', true);

    const queryArsip = `
      query {
        allPesanArsip {
            id
            pengirim
            penerima
            isi
            parent_id
            tgl_pesan
            jenis_id
        }
      }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();
    renderPesanTable(dataArsip?.data?.allPesanArsip || [], 'dataPesanArsip', false);
}


function renderPesanTable(pesans, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!pesans.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    pesans.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditLevelModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveLevel(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreLevel(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteLevel(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
        }

        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.pengirim}</td>
                <td class="border p-2">${item.penerima}</td>
                <td class="border p-2">${item.isi}</td>
                <td class="border p-2">${item.parent_id}</td>
                <td class="border p-2">${item.tgl_pesan}</td>
                <td class="border p-2">${item.jenis_id}</td>
                <td class="border p-2">${item.jenis}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}

async function archivePesan(id) {
    if(!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
    mutation {
    deletePesan(id: ${id}){id}
    }
    `;
    await fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ query: mutation})
  });
  loadPesanData();
    
}

async function restoreLevel(id) {
    if (!confirm('Kembalikan dari arsip')) return;
    const mutation =`
    mutation {
    restoreLevel(id: ${id}){id}}
    `;
    await fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ query: mutation})
  });
  loadPesanData();
}

async function forceDeleteLevel(id) {
    if(!confirm('Hapus permanen? Data tidak bisa dikembalikan')) return;
    const mutation = `
    mutation{
    forceDeleteLevel(id: ${id}){id}}`;
    await fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ query: mutation})
  });
  loadPesanData();
}

async function searchPesan() {
    const keyword = document.getElementById('searchPesan').value.trim();
    if (!keyword) {
        loadPesanData();
        return;
    }

    let query = '';

    if (!isNaN(keyword)) {
        query = `
        {
            pesan(id: ${keyword}) {
                id
          pengirim
          penerima
          isi
          parent_id
          tgl_pesan
          jenis_id
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderPesanTable(data.data.Pesan ? [data.data.Pesan] : [], 'dataLevel', true);

    } else {
        query = `
        {
            levelByNama(nama: "%${keyword}%") {
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
        renderPesanTable(data.data.PesanByNama, 'dataPesan', true);
    }
}


document.addEventListener('DOMContentLoaded', loadPesanData);
