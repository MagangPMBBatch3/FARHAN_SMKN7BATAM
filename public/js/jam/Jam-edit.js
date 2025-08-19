function modalEdit(id, nama) {
    document.getElementById('editId').value = id;
    document.getElementById('editNama').value = nama;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function update() {
    const id = document.getElementById('editId').value;
    const nama = document.getElementById('editNama').value.trim();
    if (!nama) {
        alert('Nama level harus diisi');
        return;
    }

    const mutation = `
        mutation {
            updateJam(id: ${id}, input: { nama: "${nama}" }) {
                id
                nama
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });

    closeEditLevelModal();
    loadLevelData();
}
