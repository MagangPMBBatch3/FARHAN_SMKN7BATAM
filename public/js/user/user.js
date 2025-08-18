// ==========================
// Load Data User
// ==========================
async function loadUserData() {
    // Query data aktif
    const queryAktif = `
      query {
        allUsers{
          id
          name
          email
        }
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();
    renderUserTable(dataAktif?.data?.allUsers || [], 'dataUser', true);

    // Query data arsip
    const queryArsip = `
      query {
        allUserArsip {
          id
          name
          email
          deleted_at
        }
      }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();
    console.log(dataArsip);
    renderUserTable(dataArsip?.data?.allUserArsip || [], 'dataUserArsip', false);
}

// ==========================
// Render Table User
// ==========================
function renderUserTable(userList, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!userList.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    userList.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditModal(${item.id}, '${item.name}', '${item.email}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveUser(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
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
                <td class="border p-2">${item.name}</td>
                <td class="border p-2">${item.email}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}

// ==========================
// Archive, Restore, Force Delete
// ==========================
async function archiveUser(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteUser(id: ${id}) { id }
        }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadUserData();
}

async function restoreUser(id) {
    if (!confirm('Kembalikan dari arsip?')) return;
    const mutation = `
        mutation {
            restoreUser(id: ${id}) { id }
        }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadUserData();
}

async function forceDeleteUser(id) {
    if (!confirm('Hapus permanen? Data tidak bisa dikembalikan')) return;
    const mutation = `
        mutation {
            forceDeleteUser(id: ${id}) { id }
        }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadUserData();
}

// ==========================
// Search User
// ==========================
async function search() {
    const keyword = document.getElementById('search').value.trim();
    if (!keyword) {
        loadUserData();
        return;
    }

    let query = '';

    if (!isNaN(keyword)) {
        query = `
        {
            user(id: ${keyword}) {
                id
                name
                email
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderUserTable(data.data.user ? [data.data.user] : [], 'dataUser', true);

    } else {
        query = `
        {
            userByName(name: "%${keyword}%") {
                id
                name
                email
            }
        }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderUserTable(data.data.userByName || [], 'dataUser', true);
    }
}

document.addEventListener('DOMContentLoaded', loadUserData);
