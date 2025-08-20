// ==========================
// Load Data User
// ==========================
async function loadData() {
  // Query data aktif
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
  renderUserTable(dataAktif?.data?.allUserProfiles || [], "dataUserProfiles", true);

  // Query data arsip
  const queryArsip = `
      query {
        allUserProfiles {
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
  console.log(dataArsip);
  renderUserTable(
    dataArsip?.data?.allUserProfilesArsip || [],
    "dataUserProfilesArsip",
    false
  );
}

// ==========================
// Render Table User
// ==========================
function renderUserTable(userList, tableId, isActive) {
  const tbody = document.getElementById(tableId);
  console.log("a" + tbody);
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
                <button onclick="openEditModal(${item.id}, '${item.nama_lengkap}', '${item.email}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveUserProfile(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    } else {
      actions = `
                <button onclick="restoreUser(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteUser(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
    }

    tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.user_id}</td>
                <td class="border p-2">${item.nama_lengkap}</td>
                <td class="border p-2">${item.user.email}</td>
                <td class="border p-2">${item.nrp}</td>
                <td class="border p-2">${item.alamat}</td>
                <td class="border p-2">${item.foto}</td>
                <td class="border p-2">${item.bagian.nama}</td>
                <td class="border p-2">${item.level.nama}</td>
                <td class="border p-2">${item.status.nama}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
  });
}

// ==========================
// Archive, Restore, Force Delete
// ==========================
async function archiveUser(id) {
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

async function restoreUser(id) {
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

// ==========================
// Search User
// ==========================
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
    renderUserTable(data.data.userProfileByName || [], "dataUserProfiles", true);
  }
}

document.addEventListener("DOMContentLoaded", loadData);
