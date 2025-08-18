function openEditModal(data){
    document.getElementById('editId').value = data.id;
    document.getElementById('editKode').value = data.kode;
    document.getElementById('editNama').value = data.nama;
    document.getElementById('editTanggal').value = data.tanggal;
    document.getElementById('editNama_Sekolah').value = data.nama_sekolah;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal(){
    document.getElementById('modalEdit').classList.add('hidden');
}

async function update() {
    const id = document.getElementById('editId').value;
    const kode = document.getElementById('editKode').value;
    const tanggal = document.getElementById('editTanggal').value;
    const nama_sekolah = document.getElementById('editNama_Sekolah').value;
    const newNama = document.getElementById('editNama').value;
    if (!id) return alert('Gagal Mendapatkan Id')
    if (!newNama) return alert("Nama tidak boleh kosong");
    if (!tanggal) return alert("Tanggal tidak boleh kosong");
    if (!kode) return alert("Kode tidak boleh kosong");
    if (!nama_sekolah) return alert("Nama Sekolah tidak boleh kosong");

    const mutation = `
    mutation {
        updateProyek(id: "${id}", input: { nama: "${newNama}", kode: "${kode}", tanggal: "${tanggal}", nama_sekolah: "${nama_sekolah}" }) {
            id
            kode
            nama
            tanggal
            nama_sekolah
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