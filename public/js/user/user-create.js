function openAddModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addNama').value = '';
}

async function create() {
    const nama = document.getElementById('addNama').value;
    const email = document.getElementById('addEmail').value;
    const password = document.getElementById('addPassword').value;
    if (!nama) return alert("Nama tidak boleh kosong");
    if (!password) return alert("Password tidak boleh kosong");
    if (!email) return alert("Email tidak boleh kosong");

    const mutation = `

        mutation {
        createUser(input: { name: "${nama}", email: "${email}", password: "${password}" }){
                id
                name
                email
                }
                }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    closeAddModal();
    loadUserData();
}