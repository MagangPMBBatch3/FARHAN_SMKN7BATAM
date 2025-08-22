function openAddJenisModal(){
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal(){
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addJenis').value = '';
}

async function createJenis(){
    const Jenis = document.getElementById('addJenis').value;
    if (!Jenis) return alert("Jenis tidak boleh kosong");

    const mutation = `

    mutation {
    createJenisPesan(input: { nama: "${Jenis}"}){}
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
    closeAddModal();
    loadData();
}