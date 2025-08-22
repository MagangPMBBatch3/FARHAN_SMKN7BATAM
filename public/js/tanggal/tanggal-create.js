function openAddModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
    loadAddModalData()
}
function jamToDecimal(jamStr) {
    const [h, m] = jamStr.split(':').map(Number);
    return parseFloat((h + m / 60).toFixed(2));
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addUser').value = '';
    document.getElementById('addProyek').value = '';
    document.getElementById('addTanggal').value = '';
    document.getElementById('addJam').value = '';
}

async function loadAddModalData() {
    try {
        const queryUser = `query { allUsers { id name } }`;
        const queryProyek = `query { allProyeks { id nama } }`;

        const [resUser, resProyek] = await Promise.all([
            fetch('/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ query: queryUser })
            }),
            fetch('/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ query: queryProyek })
            })
        ]);

        const [dataUser, dataProyek] = await Promise.all([resUser.json(), resProyek.json()]);

        const selectUser = document.getElementById('addUser');
        selectUser.innerHTML = '<option value="">-- Pilih User --</option>';
        dataUser.data.allUsers.forEach(user => {
            if (user && user.name) {
                selectUser.innerHTML += `<option value="${user.id}">${user.name}</option>`;
            }
        });

        const selectProyek = document.getElementById('addProyek');
        selectProyek.innerHTML = '<option value="">-- Pilih Proyek --</option>';
        dataProyek.data.allProyeks.forEach(proyek => {
            if (proyek && proyek.nama) {
                selectProyek.innerHTML += `<option value="${proyek.id}">${proyek.nama}</option>`;
            }
        });

    } catch(err) {
        console.error(err);
        alert("Error->  " + err.message);
    }
}

async function create() {
    const tanggal = document.getElementById('addTanggal').value;
    const jam = document.getElementById('addJam').value;
    const user_id = document.getElementById('addUser').value;
    const proyek_id = document.getElementById('addProyek').value;

    if (!tanggal) return alert("Tanggal tidak boleh kosong");
    if (!jam) return alert("Jam tidak boleh kosong");
    if (!user_id) return alert("User belum dipilih");
    if (!proyek_id) return alert("Proyek belum dipilih");
    const jamDec = jamToDecimal(jam)
    console.log(jamDec)
    const mutation = `
        mutation {
            createJamPerTanggal(input: {
                tanggal: "${tanggal}",
                jam: ${jamDec},
                users_profile_id: ${user_id},
                proyek_id: ${proyek_id}
            }) {
                id
                tanggal
                jam
                users_profile_id
                proyek_id
            }
        }
    `;

    try {
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        const data = await res.json();
        if (data.errors) throw new Error(data.errors[0].message);
        closeAddModal();
        loadData();
    } catch(err) {
        console.error(err);
        alert("Error-> " + err.message);
    }
}
