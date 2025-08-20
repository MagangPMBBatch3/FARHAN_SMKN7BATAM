document.addEventListener("DOMContentLoaded", loadProyekUserData);
async function loadProyekUserData() {
  const queryAktif = `
      query {
        allProyekUser {
          id
          proyek_id
          users_profile_id
          proyek{
            nama
          }
          user_profile{
            nama_lengkap
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
  renderProyekUserTable(dataAktif?.data?.allProyekUser || [], "dataProyekUser", true);
  const queryArsip = `
  query {
    allProyekUserArsip{
      id
      proyek_id
      users_profile_id
      proyek{
        nama
      }
      user_profile{
        nama_lengkap
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
  renderProyekUserTable(dataArsip?.data?.allProyekUserArsip || [], "dataProyekUserArsip", false);
}

function renderProyekUserTable(data, tableId, isActive) {
  const tbody = document.getElementById(tableId);
  tbody.innerHTML = "";

  if (!data.length) {
    tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
    return;
  }

  data.forEach((item) => {
    let actions = "";
    console.log(item)
    if (isActive) {
      actions = `
                <button onclick="openEditModal(${item.id}, ${item.proyek_id}, ${item.users_profile_id})" 
                        class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="deleteProyekUser(${item.id})" 
                        class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            `;
    } else {
      actions = `
                <button onclick="restoreProyekUser(${item.id})" 
                        class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
                <button onclick="forceDeleteProyekUser(${item.id})" 
                        class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
            `;
    }

    tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.proyek.nama}</td>
                <td class="border p-2">${item.user_profile.nama_lengkap}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
  });
}

// Mutations
async function deleteProyekUser(id) {
  if (!confirm("Pindahkan ke arsip?")) return;
  const mutation = `
      mutation {
        deleteProyekUser(id: ${id}) { id }
      }
    `;
  await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  loadProyekUserData();
}

async function restoreProyekUser(id) {
  if (!confirm("Kembalikan data dari arsip?")) return;
  const mutation = `
      mutation {
        restoreProyekUser(id: ${id}) { id }
      }
    `;
  await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  loadProyekUserData();
}

async function forceDeleteProyekUser(id) {
  if (!confirm("Hapus permanen? Data tidak bisa dikembalikan")) return;
  const mutation = `
      mutation {
        forceDeleteProyekUser(id: ${id}) { id }
      }
    `;
  await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  loadProyekUserData();
}

// Search
async function searchProyekUser() {
  const keyword = document.getElementById("searchProyekUser").value.trim();
  if (!keyword) {
    loadProyekUserData();
    return;
  }

  let query;
  if (!isNaN(keyword)) {
    // Pencarian by ID
    query = `
      query {
        proyekUser(id: ${keyword}) {
          id
          proyek_id
          users_profile_id
          proyek { nama }
          user_profile { nama_lengkap }
        }
      }
    `;
    const res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const { data } = await res.json();
    renderProyekUserTable(
      data?.proyekUser ? [data.proyekUser] : [],
      "dataProyekUser",
      true
    );

  } else {
    query = `
      query {
        searchProyekUser(keyword: "${keyword}") {
          id
          proyek_id
          users_profile_id
          proyek { nama }
          user_profile { nama_lengkap }
        }
      }
    `;
    const res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const { data } = await res.json();
    renderProyekUserTable(
      data?.searchProyekUser || [],
      "dataProyekUser",
      true
    );
  }
}


