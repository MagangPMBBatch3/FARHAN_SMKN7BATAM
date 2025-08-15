async function loadData(queryType = "all") {
    let query;
    const searchValue = document.getElementById('search').value.trim();

    if (queryType === "search" && searchValue) {
    if (!isNaN(searchValue)) {
        query = `
        query {
            user(id: ${searchValue}){
                id
                name
            }
        }
        `;
    } else {
        query = `
        query {
            userByName(name: "%${searchValue}%"){
                id
                name
                email
            }
        }
        `;
    }
} else {
    query = `
    query {
        allUsers {
            id
            name
            email
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

    const tbody = document.getElementById('dataUser');
    tbody.innerHTML = '';

    let items = [];
    if (data.data.allUsers) items = data.data.allUsers;
    if (data.data.userByNama) items = data.data.userByNama;
    if (data.data.user) items = [data.data.user];

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center p-2">Data tidak ditemukan</td></tr>`;
    }

    items.forEach(item => {
    if (!item) return;
    tbody.innerHTML += `
        <tr class="border-b">
            <td class="border px-2 py-1">${item.id}</td>
            <td class="border px-2 py-1">${item.name}</td>
            <td class="border px-2 py-1">${item.email}</td>
            <td class="border px-2 py-1">
                <button onclick="openEditModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="hapusBagian(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            </td>
        </tr>
    `;
});

}

function searchUser() {
    loadData("search");
}

async function hapusBagian(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const mutation = `
        mutation {
            deleteUser(id: ${id}) {
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
