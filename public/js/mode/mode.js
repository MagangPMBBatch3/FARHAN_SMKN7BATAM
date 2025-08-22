async function loadData(queryType = "all") {
    const searchValue = document.getElementById('search').value.trim();

    let queryAktif;
    if (queryType === "search" && searchValue) {
        if (!isNaN(searchValue)) {
            queryAktif = `
            query {
                modeJamKerja(id: "${searchValue}"){
                    id
                    nama
                }
            }
            `;
        } else {
            queryAktif = `
            query {
                modeJamKerjaByNama(nama: "%${searchValue}%"){
                    id
                    nama
                }
            }
            `;
        }
    } else {
        queryAktif = `
        query {
            allModeJamKerja {
                id
                nama
            }        
        }
        `;
    }

    const queryArsip = `
      query {
        modeJamKerjaArsip {
          id
          nama
          deleted_at
        }
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();

    renderModeJamKerjaTable(
        dataAktif?.data?.allModeJamKerja || 
        dataAktif?.data?.modeJamKerjaByNama || 
        (dataAktif?.data?.modeJamKerja ? [dataAktif.data.modeJamKerja] : []), 
        "dataModeJamKerja", 
        true
    );

    renderModeJamKerjaTable(dataArsip?.data?.modeJamKerjaArsip || [], "dataModeJamKerjaArsip", false);
}

function renderModeJamKerjaTable(items, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    if (!tbody) {
        console.error(`Element #${tableId} tidak ditemukan`);
        return;
    }
    tbody.innerHTML = '';

    if (!items.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    items.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveMode(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreMode(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteMode(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
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

async function archiveMode(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const mutation = `
        mutation {
            deleteModeJamKerja(id: ${id}) {
                id
            }
        }
    `;

    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    });

    loadData();
}
async function forceDeleteMode(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const mutation = `
        mutation {
            forceDeleteModeJamKerja(id: ${id}) {
                id
            }
        }
    `;

    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    });

    loadData();
}

async function restoreMode(id) {
    const mutation = `
        mutation {
            restoreModeJamKerja(id: ${id}) {
                id
            }
        }
    `;

    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    });

    loadData();
}

function search() {
    loadData("search");
}

document.addEventListener("DOMContentLoaded", () => loadData());
