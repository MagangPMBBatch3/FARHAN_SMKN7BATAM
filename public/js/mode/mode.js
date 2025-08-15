async function loadData(queryType = "all") {
    let query;
    const searchValue = document.getElementById('search').value.trim();

    if (queryType === "search" && searchValue) {
    if (!isNaN(searchValue)) {
        query = `
        query {
            modeJamKerja(id: "${searchValue}"){
                id
                nama
            }
        }
        `;
    } else {
        query = `
        query {
            modeJamKerja(search: "%${searchValue}%"){
                id
                nama
            }
        }
        `;
    }
} else {
    query = `
    query {
        allModeJamKerja {
            id
            nama
        }        
    }
    `;
}


    const res = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
    });
    const data = await res.json();

    const tbody = document.getElementById('dataModeJamKerja');
    tbody.innerHTML = '';

    let items = [];
    if (data && data.data) {
    if (data.data.allModeJamKerja) items = data.data.allModeJamKerja;
    if (data.data.modeJamKerjaByNama) items = data.data.modeJamKerjaByNama;
    if (data.data.modeJamKerja) items = [data.data.modeJamKerja];
} else {
    console.error("GraphQL Error:", data.errors || "Tidak ada data");
}

    if (items.length === 0) {
        tbody.innerHTML = console.log(searchValue + `<tr><td colspan="3" class="text-center p-2">Data tidak ditemukan</td></tr>`);
    }

    items.forEach(item => {
    if (!item) return;
    tbody.innerHTML += `
        <tr class="border-b">
            <td class="border px-2 py-1">${item.id}</td>
            <td class="border px-2 py-1">${item.nama}</td>
            <td class="border px-2 py-1">
                <button onclick="openEditModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="hapusBagian(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            </td>
        </tr>
    `;
});

}

function searchProyek() {
    loadData("search");
}

async function hapusBagian(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const mutation = `
        mutation {
            deleteProyek(id: ${id}) {
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

document.addEventListener("DOMContentLoaded", () => loadData());
