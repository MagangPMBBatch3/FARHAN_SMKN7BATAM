function openAddModal(){
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal(){
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addNama').value = '';
}

async function create(){
    const nama = document.getElementById('addNama').value;
    const kode = document.getElementById('addKode').value;
    const tanggal = document.getElementById('addTanggal').value;
    const nama_sekolah = document.getElementById('addNamaSekolah').value;
    if (!nama) return alert("Nama tidak boleh kosong");
    if (!kode) return alert("Kode tidak boleh kosong");
    if (!tanggal) return alert("Tanggal tidak boleh kosong");
    if (!nama_sekolah) return alert("nama sekolah tidak boleh kosong");


    const mutation = `

        mutation {
        createProyek(input: { nama: "${nama}", kode: "${kode}", tanggal: "${tanggal}", nama_sekolah: "${nama_sekolah}"})
                id
                nama
                kode
                nama_sekolah
                }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({query: mutation})
    });
    closeAddModal();
    loadData();
}