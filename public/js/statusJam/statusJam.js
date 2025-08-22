async function loadData() {
    const queryAktif = `
      query {
        allStatusJamKerja{
          id
          nama
        }
      }
    `;

    const resAktif = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryAktif }),
    });
    const dataAktif = await resAktif.json();
    renderUserTable(dataAktif?.data?.allStatusJamKerja || [], "dataStatusJam", true);
    const queryArsip = `
    query {
        allStatusJamKerja{
          id
          nama
        }
      }
    `;

    const resArsip = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryArsip }),
    });
    const dataArsip = await resArsip.json();
    console.log(dataArsip);
    renderUserTable(
        dataArsip?.data?.allStatusJamKerja || [],
        "dataStatusJamArsip",
        false
    );
}

function renderUserTable(userList, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = "";

    if (!userList.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    userList.forEach((item) => {
        let actions = "";
        if (isActive) {
            actions = `
                <button onclick="openEditModal(${item.id}, '${item.name}', '${item.email}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveJamPerTanggal(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
        } else {
            actions = `
                <button onclick="restoreJamPerTanggal(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteJamPerTanggal(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
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

async function archiveJamPerTanggal(id) {
    if (!confirm("Pindahkan ke arsip?")) return;
    const mutation = `
        mutation {
            deleteJamPerTanggal(id: ${id}) { id }
        }
    `;
    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });
    loadData();
}

async function restoreJamPerTanggal(id) {
    if (!confirm("Kembalikan dari arsip?")) return;
    const mutation = `
        mutation {
            restoreJamPerTanggal(id: ${id}) { id }
        }
    `;
    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });
    loadData();
}

async function forceDeleteJamPerTanggal(id) {
    if (!confirm("Hapus permanen? Data tidak bisa dikembalikan")) return;
    const mutation = `
        mutation {
            forceDeleteJamPerTanggal(id: ${id}) { id }
        }
    `;
    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });
    loadData();
}

async function search() {
    const keyword = document.getElementById("search").value.trim();
    if (!keyword) {
        loadData();
        return;
    }

    let query = "";

    if (!isNaN(keyword)) {
        query = `
        {
            jamPerTanggal(id: ${keyword}) {
                id
          nama
            }
        }
        `;
        const res = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        console.log(data);
        renderUserTable(
            data.data.jamPerTanggal ? [data.data.jamPerTanggal] : [],
            "dataStatusJam",
            true
        );
    } else {
        query = `
        {
            userByName(name: "%${keyword}%") {
                id
          nama
        }
            }
        }
        `;
        const res = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        renderUserTable(data.data.jamPerTanggal || [], "dataStatusJam", true);
    }
}

document.addEventListener("DOMContentLoaded", loadData);
