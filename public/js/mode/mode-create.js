function openAddModeModal(){
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal(){
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addMode').value = '';
}

async function createMode(){
    const Mode = document.getElementById('addMode').value;
    if (!Mode) return alert("Mode tidak boleh kosong");

    const mutation = `

    mutation {
    createModeJamKerja(input: { nama: "${Mode}"}){
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