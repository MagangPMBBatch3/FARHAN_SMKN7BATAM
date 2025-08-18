async function loadData(queryType = "all") {
    let query;
    const searchValue = document.getElementById('search').value.trim();

    if (queryType === "search" && searchValue) {
    if (!isNaN(searchValue)) {
        query = `
        query {
            getProyeks(search: "${searchValue}"){
                id
                kode
                nama
                tanggal
                nama_sekolah
            }
        }
        `;
    } else {
        query = `
        query {
            getProyeks(search: "%${searchValue}%"){
                id
                kode
                nama
                tanggal
                nama_sekolah
            }
        }
        `;
    }
} else {
    query = `
    query {
        allProyeks {
            id
            kode
            nama
            tanggal
            nama_sekolah
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

    const tbody = document.getElementById('dataProyek');
    tbody.innerHTML = '';

    let items = [];
    if (data && data.data) {
    if (data.data.allProyeks) items = data.data.allProyeks;
    if (data.data.proyekByNama) items = data.data.proyekByNama;
    if (data.data.proyek) items = [data.data.proyek];
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
            <td class="border px-2 py-1">${item.kode}</td>
            <td class="border px-2 py-1">${item.nama}</td>
            <td class="border px-2 py-1">${item.tanggal}</td>
            <td class="border px-2 py-1">${item.nama_sekolah}</td>
            <td class="border px-2 py-1">
               <button onclick='openEditModal({id:"${item.id}", nama:"${item.nama}", kode:"${item.kode}", tanggal:"${item.tanggal}", nama_sekolah:"${item.nama_sekolah}"})' class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>

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
