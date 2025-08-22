function openEditJamKerjaModal(jamKerja) {
    document.getElementById('modalEdit').classList.remove('hidden');
    document.getElementById('editId').value = jamKerja.id;
    document.getElementById('editNoWbs').value = jamKerja.no_wbs ?? '';
    document.getElementById('editKodeProyek').value = jamKerja.kode_proyek ?? '';
    document.getElementById('editTanggal').value = jamKerja.tanggal ?? '';
    document.getElementById('editJumlahJam').value = jamKerja.jumlah_jam ?? '';
    document.getElementById('editKeterangan').value = jamKerja.keterangan ?? '';

    fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query { allUserProfiles { id nama_lengkap } }
            `
        })
    })
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById('editUsersProfile');
        select.innerHTML = `<option value="">-- Pilih User --</option>`;
        let found = false;
        data.data.allUserProfiles.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = u.nama_lengkap;
            if (u.id == jamKerja.users_profile_id) {
                opt.selected = true;
                found = true;
            }
            select.appendChild(opt);
        });
        if (!found && jamKerja.users_profile_id) {
            const opt = document.createElement('option');
            opt.value = jamKerja.users_profile_id;
            opt.textContent = "User sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            select.appendChild(opt);
        }
    });

    fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query { allProyeks { id nama } }
            `
        })
    })
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById('editProyek');
        select.innerHTML = `<option value="">-- Pilih Proyek --</option>`;
        let found = false;
        data.data.allProyeks.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nama;
            if (p.id == jamKerja.proyek_id) {
                opt.selected = true;
                found = true;
            }
            select.appendChild(opt);
        });
        if (!found && jamKerja.proyek_id) {
            const opt = document.createElement('option');
            opt.value = jamKerja.proyek_id;
            opt.textContent = "Proyek sudah dihapus";
            opt.selected = true;
            opt.classList.add("text-red-500");
            select.appendChild(opt);
        }
    });

    const selects = [
        { id: 'editAktivitas', query: 'allAktivitas', label: 'nama', value: jamKerja.aktivitas_id, emptyText: '-- Pilih Aktivitas --' },
        { id: 'editStatus', query: 'allStatus', label: 'nama', value: jamKerja.status_id, emptyText: '-- Pilih Status --' },
        { id: 'editMode', query: 'allModeJamKerja', label: 'nama', value: jamKerja.mode_id, emptyText: '-- Pilih Mode --' },
    ];

    selects.forEach(sel => {
        fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `query { ${sel.query} { id ${sel.label} } }` })
        })
        .then(res => res.json())
        .then(data => {
            const selectElem = document.getElementById(sel.id);
            selectElem.innerHTML = `<option value="">${sel.emptyText}</option>`;
            let found = false;
            data.data[sel.query].forEach(optData => {
                const opt = document.createElement('option');
                opt.value = optData.id;
                opt.textContent = optData[sel.label];
                if (optData.id == sel.value) {
                    opt.selected = true;
                    found = true;
                }
                selectElem.appendChild(opt);
            });
            if (!found && sel.value) {
                const opt = document.createElement('option');
                opt.value = sel.value;
                opt.textContent = `${sel.emptyText.replace('-- Pilih ', '')} sudah dihapus`;
                opt.selected = true;
                opt.classList.add("text-red-500");
                selectElem.appendChild(opt);
            }
        });
    });
}

function closeEditJamKerjaModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}
