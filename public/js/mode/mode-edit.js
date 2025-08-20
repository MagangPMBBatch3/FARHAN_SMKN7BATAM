function openEditModal(id, mode){
    document.getElementById('editId').value = id;
    document.getElementById('editMode').value = mode;
    document.getElementById('modalEdit').classList.remove('hidden');
}
function closeEditModal(){
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateMode() {
    const id = document.getElementById('editId').value;
    const Mode = document.getElementById('editMode').value;
    if (!Mode) return alert("Nama tidak boleh kosong");

    const mutation = `
    mutation {
        updateModeJamKerja(id: ${id}, input: { nama: "${Mode}"} ) {
          id
          nama
        }
      }
      
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({query: mutation})
    });
    closeEditModal();
    loadData();
}