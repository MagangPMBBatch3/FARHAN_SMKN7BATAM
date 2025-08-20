async function loadProyekUserData() {
    const queryAktif = `
      query {
        allProyekUser {
          id
          proyek_id
          users_profile_id
        }
      }
    `;

  const resAktif = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryAktif }),
  });
    const dataAktif = await resAktif.json();
    renderProyekUserTable(dataAktif?.data?.allProyekUser || [], 'dataProyekUser', true);
}

async function openAddProyekUserModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
    const queryProyek = `
        query {
            allProyeks {
                id
                nama
            }
        }
    `;

    const resProyek = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: queryProyek })
    });
    const dataProyek = await resProyek.json();
    const selectProyek = document.getElementById('addProyek');
    selectProyek.innerHTML = '<option value="">-- Pilih Proyek --</option>';
    dataProyek.data.allProyeks.forEach(proyek => {
        if (proyek && proyek.nama) {
            selectProyek.innerHTML += `<option value="${proyek.id}">${proyek.nama}</option>`;
        } else {
            selectProyek.innerHTML += `<option value="" disabled class="text-red-500">Proyek sudah dihapus</option>`;
        }
    });
    const queryUser = `
        query {
            allUsers {
                id
                name
            }
        }
    `;

    const resUser = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: queryUser })
    });
    const dataUser = await resUser.json();
    const selectUser = document.getElementById('addUser');
    selectUser.innerHTML = '<option value="">-- Pilih User --</option>';
    dataUser.data.allUsers.forEach(User => {
        if (User && User.name) {
            selectUser.innerHTML += `<option value="${User.id}">${User.name}</option>`;
        } else {
            selectUser.innerHTML += `<option value="" disabled class="text-red-500">User sudah dihapus</option>`;
        }
    });
    
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addProyek').value = '';
}

async function create() {
    const Proyek = document.getElementById('addProyek').value;
    const User = document.getElementById('addUser').value;
    console.log(Proyek, User)
    if (!Proyek) return alert("Proyek tidak boleh kosong");
    if (!User) return alert("User tidak boleh kosong");


    const mutation = `

        mutation {
        createProyekUser(input: { proyek_id: ${Proyek}, users_profile_id: ${User}}){
                id
                proyek_id
                users_profile_id
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    closeAddModal();
    loadProyekUserData();
}