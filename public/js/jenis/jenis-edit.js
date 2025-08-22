function openEditModal(id, nama){
    document.getElementById('editId').value = id;
    document.getElementById('editJenis').value = nama;
    document.getElementById('modalEdit').classList.remove('hidden');
}
function closeEditModal(){
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateJenisPesan() {
    const id = document.getElementById('editId').value;
    const Jenis = document.getElementById('editJenis').value;
    if (!Jenis) return alert("Nama tidak boleh kosong");

    const mutation = `
    mutation {
        updateJenisPesan(id: ${id}, input: { nama: "${Jenis}"} ) {
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