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

async function modalAdd() {
    const query = `
        query {
            allUserProfiles {
                id
                nama_lengkap
            }
            allProyeks {
                id
                kode
                nama
            }
            allAktivitas {
                id
                no_wbs
                nama
            }
            allStatusJamKerja {
                id
                nama
            }
            allModeJamKerja {
                id
                nama
            }
        }
    `;

    const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    const result = await res.json();

    console.log("GraphQL Result:", result);

    if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        return;
    }

    const data = result.data;

    populateSelect(
        "addUsersProfile",
        data.allUserProfiles,
        "id",
        "nama_lengkap"
    );
    populateSelect("addProyek", data.allProyeks, "id", "nama", {
        "data-kode": "kode",
    });
    populateSelect("addAktivitas", data.allAktivitas, "id", "nama", {
        "data-wbs": "no_wbs",
    });
    populateSelect("addStatus", data.allStatusJamKerja, "id", "nama");
    populateSelect("addMode", data.allModeJamKerja, "id", "nama");

    document
        .getElementById("addAktivitas")
        .addEventListener("change", function () {
            const selected = this.options[this.selectedIndex];
            document.getElementById("addNoWbs").value =
                selected.getAttribute("data-wbs") || "";
        });

    document
        .getElementById("addProyek")
        .addEventListener("change", function () {
            const selected = this.options[this.selectedIndex];
            document.getElementById("addKodeProyek").value =
                selected.getAttribute("data-kode") || "";
        });

    document.getElementById("modalAdd").classList.remove("hidden");
}

function populateSelect(
    selectId,
    data,
    valueField,
    textField,
    extraAttrs = {}
) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">-- Pilih --</option>';

    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valueField];
        option.textContent = item[textField];
        for (const attr in extraAttrs) {
            if (item[extraAttrs[attr]]) {
                option.setAttribute(attr, item[extraAttrs[attr]]);
            }
        }

        select.appendChild(option);
    });
}

document.getElementById("addAktivitas").addEventListener("change", function () {
    const selected = this.options[this.selectedIndex];
    document.getElementById("addNoWbs").value =
        selected.getAttribute("data-wbs") || "";
});

document.getElementById("addProyek").addEventListener("change", function () {
    const selected = this.options[this.selectedIndex];
    document.getElementById("addKodeProyek").value =
        selected.getAttribute("data-kode") || "";
});
function timeToDecimal(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return h + m / 60;
}

async function createJamKerja() {
    const form = document.getElementById("formAddJamKerja");

    const jumlahJamDecimal = timeToDecimal(form.addJumlahJam.value);

    const query = `
     mutation {
    createJamKerja(input: {
      users_profile_id: ${form.addUsersProfile.value},
      no_wbs: "${form.addNoWbs.value}",
      kode_proyek: "${form.addKodeProyek.value}",
      proyek_id: ${form.addProyek.value},
      aktivitas_id: ${form.addAktivitas.value},
      tanggal: "${form.addTanggal.value}",
      jumlah_jam: ${jumlahJamDecimal},
      status_id: ${form.addStatus.value},
      mode_id: ${form.addMode.value},
      keterangan: "${form.addKeterangan.value}"
    }) {
      id
    }
  }
`;

    const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    const result = await res.json();

    if (result.data) {
        alert("Data berhasil ditambahkan");
        closeModal();
        loadJamData();
    } else {
        alert("Gagal menambahkan data");
        console.error(result);
    }
}

function closeModal() {
    document.getElementById("modalAdd").classList.add("hidden");
}
