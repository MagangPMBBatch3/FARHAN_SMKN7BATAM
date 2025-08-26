async function loadJamData() {
    const queryAktif = `
      query {
        allJamKerja {
          id
            users_profile_id
            no_wbs
            kode_proyek
            proyek_id
            aktivitas_id
            tanggal
            jumlah_jam
            keterangan
            status_id
            mode_id
            userProfile{
              nama_lengkap
            }
            Aktivitas{
              no_wbs
              nama
            }
            Proyek{
              kode
              nama
            }
          ModeJamKerja{
            nama
          }
          statusJamKerja{
            nama
          }
        }
      }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });
    const dataAktif = await resAktif.json();
    renderJamTable(dataAktif?.data?.allJamKerja || [], 'dataJam', true);

    const queryArsip = `
      query {
        allJamKerjaArsip {
            id
            users_profile_id
            no_wbs
            kode_proyek
            proyek_id
            aktivitas_id
            tanggal
            jumlah_jam
            keterangan
            status_id
            mode_id
            userProfile{
              nama_lengkap
            }
            Aktivitas{
              no_wbs
              nama
            }
            Proyek{
              kode
              nama
            }
          ModeJamKerja{
            nama
          }
          statusJamKerja{
            nama
          }
        }
      }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });
    const dataArsip = await resArsip.json();
    renderJamTable(dataArsip?.data?.allJamKerjaArsip || [], 'dataJamArsip', false);

}
//* ================== CACHE DATA ==================
let cacheUserProfiles = null;
let cacheProyeks = null;
let cacheAktivitas = null;
let cacheStatus = null;
let cacheMode = null;

//* ================== HELPER ==================
function decimalToTime(decimal) {
    if (!decimal && decimal !== 0) return "";
    const h = Math.floor(decimal);
    const m = Math.round((decimal - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function timeToDecimal(timeStr) {
    if (!timeStr) return null; //? --> null handler
    const [h, m] = timeStr.split(':').map(Number);
    return parseFloat((h + (m / 60)).toFixed(2));
}

//* ================== MODAL EDIT ==================
async function modalEdit(id, userId, proyekId, aktivitasId, statusId, modeId, no_wbs, kode, tanggal, jumlah_jam, keterangan) {
    document.getElementById('modalEdit').classList.remove('hidden');
    document.getElementById('editId').value = id;
    document.getElementById('editTanggal').value = tanggal ?? '';
    document.getElementById('editJumlahJam').value = jumlah_jam !== null ? decimalToTime(jumlah_jam) : '';
    document.getElementById('editKeterangan').value = keterangan ?? '';

    try {
        if (!cacheUserProfiles || !cacheProyeks || !cacheAktivitas || !cacheStatus || !cacheMode) {
            const query = `
                query {
                    allUserProfiles { id nama_lengkap }
                    allProyeks { id nama kode }
                    allAktivitas { id nama no_wbs }
                    allStatusJamKerja { id nama }
                    allModeJamKerja { id nama } 
                }
            `;
            const res = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();
            cacheUserProfiles = data.data.allUserProfiles;
            cacheProyeks = data.data.allProyeks;
            cacheAktivitas = data.data.allAktivitas;
            cacheStatus = data.data.allStatusJamKerja;
            cacheMode = data.data.allModeJamKerja;
        }

        function populateSelect(selectElem, dataList, currentValue, emptyText, textField = "nama") {
            selectElem.innerHTML = '';
            const frag = document.createDocumentFragment();
            let found = false;

            dataList.forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.id;
                opt.textContent = item[textField] || item.nama;
                if (String(item.id) === String(currentValue)) {
                    opt.selected = true;
                    found = true;
                }
                frag.appendChild(opt);
            });

            if (!found && currentValue) {
                const opt = document.createElement('option');
                opt.value = currentValue;
                opt.textContent = `${emptyText.replace('-- Pilih ', '')} sudah dihapus`;
                opt.selected = true;
                opt.classList.add("text-red-500");
                frag.insertBefore(opt, frag.firstChild);
            }

            if (!currentValue) {
                selectElem.insertAdjacentHTML('afterbegin', `<option value="">${emptyText}</option>`);
            }

            selectElem.appendChild(frag);
        }

        populateSelect(document.getElementById('editUsersProfile'), cacheUserProfiles, userId, '-- Pilih User --', "nama_lengkap");
        populateSelect(document.getElementById('editProyek'), cacheProyeks, proyekId, '-- Pilih Proyek --');
        populateSelect(document.getElementById('editAktivitas'), cacheAktivitas, aktivitasId, '-- Pilih Aktivitas --');
        populateSelect(document.getElementById('editStatus'), cacheStatus, statusId, '-- Pilih Status --');
        populateSelect(document.getElementById('editMode'), cacheMode, modeId, '-- Pilih Mode --');

        const proyekTerpilih = cacheProyeks.find(p => String(p.id) === String(proyekId));
        document.getElementById('editKodeProyek').value = proyekTerpilih ? proyekTerpilih.kode : (kode ?? '');
        document.getElementById('editKodeProyek').readOnly = true;

        const aktivitasTerpilih = cacheAktivitas.find(a => String(a.id) === String(aktivitasId));
        document.getElementById('editNoWbs').value = aktivitasTerpilih ? aktivitasTerpilih.no_wbs : (no_wbs ?? '');
        document.getElementById('editNoWbs').readOnly = true;

        document.getElementById('editProyek').addEventListener('change', e => {
            const p = cacheProyeks.find(x => String(x.id) === e.target.value);
            document.getElementById('editKodeProyek').value = p ? p.kode : '';
        });

        document.getElementById('editAktivitas').addEventListener('change', e => {
            const a = cacheAktivitas.find(x => String(x.id) === e.target.value);
            document.getElementById('editNoWbs').value = a ? a.no_wbs : '';
        });

    } catch (err) {
        console.error(err);
        alert("Gagal memuat data dropdown");
    }
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
    document.getElementById('editUsersProfile').value = '';
    document.getElementById('editProyek').value = '';
    document.getElementById('editAktivitas').value = '';
    document.getElementById('editStatus').value = '';
    document.getElementById('editMode').value = '';
    document.getElementById('editNoWbs').value = '';
    document.getElementById('editKodeProyek').value = '';
}

//* ================== UPDATE DATA JAM KERJA ==================
async function updateJamKerja(id, formData) {
    const jamDecimal = timeToDecimal(formData.jumlah_jam);

    const mutation = `
        mutation UpdateJamKerja($id: ID!, $input: UpdateJamKerjaInput!) {
            updateJamKerja(id: $id, input: $input) {
                id
                jumlah_jam
                updated_at
            }
        }
    `;

    const variables = {
        id: id,
        input: {
            users_profile_id: parseInt(formData.users_profile_id),
            no_wbs: formData.no_wbs,
            kode_proyek: formData.kode_proyek,
            proyek_id: parseInt(formData.proyek_id),
            aktivitas_id: parseInt(formData.aktivitas_id),
            tanggal: formData.tanggal,
            jumlah_jam: jamDecimal,

            keterangan: formData.keterangan,
            status_id: parseInt(formData.status_id),
            mode_id: parseInt(formData.mode_id),
        }
    };

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation, variables })
        });

        const result = await response.json();
        if (result.errors) {
            console.error("Update error:", result.errors);
            alert("Gagal update data!");
        } else {
            console.log("Runtest-> Update success:", result.data.updateJamKerja);
            alert("Data berhasil diupdate!");
            closeEditModal();
            loadJamData();
        }
    } catch (err) {
        console.error("Network error:", err);
    }
}

//* ================== HANDLE SUBMIT FORM EDIT ==================
document.getElementById("formEditJamKerja").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const formData = {
        users_profile_id: document.getElementById("editUsersProfile").value,
        no_wbs: document.getElementById("editNoWbs").value,
        kode_proyek: document.getElementById("editKodeProyek").value,
        proyek_id: document.getElementById("editProyek").value,
        aktivitas_id: document.getElementById("editAktivitas").value,
        tanggal: document.getElementById("editTanggal").value,
        jumlah_jam: document.getElementById("editJumlahJam").value,
        keterangan: document.getElementById("editKeterangan").value,
        status_id: document.getElementById("editStatus").value,
        mode_id: document.getElementById("editMode").value
    };

    updateJamKerja(id, formData);
});
