function openEditModal(id, nama, email){
    document.getElementById('editId').value = id;
    document.getElementById('editNama').value = nama;
    document.getElementById('editEmail').value = email;
    document.getElementById('modalEdit').classList.remove('hidden');
}
function closeEditModal(){
    document.getElementById('modalEdit').classList.add('hidden');
}

async function update() {
    const id = document.getElementById('editId').value;
    const newNama = document.getElementById('editNama').value;
    const newEmail = document.getElementById('editEmail').value;
    if (!id) return alert('Gagal Mendapatkan Id')
    if (!newNama) return alert("Nama tidak boleh kosong");
    if (!newEmail) return alert("Email tidak boleh kosong");

    const mutation = `
    mutation {
        updateUser(id: "${id}", input: { name: "${newNama}", email: "${newEmail}" }) {
            id
            name
        }
    }
      
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({query: mutation})
    });
    closeEditModal();
    loadUserData();
}