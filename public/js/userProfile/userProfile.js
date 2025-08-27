async function loadData() {
    const queryAktif = `
      query {
        allUserProfiles{
            id
    user_id
    nama_lengkap
    nrp
    alamat
    foto
    bagian_id
    level_id
    status_id
    user {
      email
    }
    bagian {
      nama
    }
    level {
      nama
    }
    status {
      nama
    }
        }
      }
    `;

    const resAktif = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryAktif }),
    });
    const dataAktif = await resAktif.json();
    renderUserTable(
        dataAktif?.data?.allUserProfiles || [],
        "dataUserProfiles",
        true
    );

    const queryArsip = `
      query {
        allUserProfileArsip {
            id
    user_id
    nama_lengkap
    nrp
    alamat
    foto
    bagian_id
    level_id
    status_id
    user {
      email
    }
    bagian {
      nama
    }
    level {
      nama
    }
    status {
      nama
    }
        }
      }
    `;

    const resArsip = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryArsip }),
    });
    const dataArsip = await resArsip.json();
    renderUserTable(
        dataArsip?.data?.allUserProfileArsip || [],
        "dataUserProfilesArsip",
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
            <button 
            onclick="editModal(
                ${item.id}, 
                ${item.user_id}, 
                '${item.nama_lengkap}', 
                '${item.user.email}', 
                '${item.nrp || "-"}', 
                '${item.alamat || "-"}', 
                '${item.foto || "-"}', 
                '${item.status_id || "-"}', 
                '${item.bagian_id || "-"}', 
                '${item.level_id || "-"}'
            )" 
            class="bg-yellow-500 text-white px-2 py-1 rounded">
            Edit
        </button>
                <button onclick="archiveUserProfile(${
                    item.id
                })" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
                <a href="/admin/user-profiles/${item.id}" 
       class="bg-blue-500 text-white px-2 py-1 rounded">Profil</a>
            `;
        } else {
            actions = `
                <button onclick="restoreUserProfile(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteUserProfile(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
        }

        tbody.innerHTML += `
        <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2" hidden>${item.user_id}</td>
        <td class="border p-2">${item.nama_lengkap}</td>
        <td class="border p-2">${item.user?.email || "-"}</td>
        <td class="border p-2">${item.nrp || "-"}</td>
        <td class="border p-2">${item.alamat || "-"}</td>
        <td class="border p-2" style="
    max-width: 120px; 
    white-space: nowrap; 
    overflow: hidden; 
    color: blue;
    text-overflow: ellipsis;
" title="${item.foto || "-"}"><a href="${item.foto || "-"}">${item.foto || "-"}</a>
    
</td>
        <td class="border p-2">${item.bagian?.nama || "-"}</td>
        <td class="border p-2">${item.level?.nama || "-"}</td>
        <td class="border p-2">${item.status?.nama || "-"}</td>
        <td class="border p-2">${actions}</td>
    </tr>
        `;
    });
}

async function archiveUserProfile(id) {
    if (!confirm("Pindahkan ke arsip?")) return;
    const mutation = `
        mutation {
            deleteUserProfile(id: ${id}) { id }
        }
    `;
    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });
    loadData();
}

async function restoreUserProfile(id) {
    if (!confirm("Kembalikan dari arsip?")) return;
    const mutation = `
        mutation {
            restoreUserProfile(id: ${id}) { id }
        }
    `;
    await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });
    loadData();
}

async function forceDeleteUserProfile(id) {
    if (!confirm("Hapus permanen? Data tidak bisa dikembalikan")) return;
    const mutation = `
        mutation {
            forceDeleteUserProfile(id: ${id}) { id }
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
            userProfile(id: ${keyword}) {
                id
    user_id
    nama_lengkap
    nrp
    alamat
    foto
    bagian_id
    level_id
    status_id
    user {
      email
    }
    bagian {
      nama
    }
    level {
      nama
    }
    status {
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
        renderUserTable(
            data.data.userProfile ? [data.data.userProfile] : [],
            "dataUserProfiles",
            true
        );
    } else {
        query = `
        {
            userProfileByName(nama_lengkap: "%${keyword}%") {
                id
    user_id
    nama_lengkap
    nrp
    alamat
    foto
    bagian_id
    level_id
    status_id
    user {
      email
    }
    bagian {
      nama
    }
    level {
      nama
    }
    status {
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
        renderUserTable(
            data.data.userProfileByName || [],
            "dataUserProfiles",
            true
        );
    }
}

document.addEventListener("DOMContentLoaded", loadData);
