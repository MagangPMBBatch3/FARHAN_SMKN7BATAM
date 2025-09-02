async function addModal() {
    const query = `
        query {
            allUsers {
                id
                name
                email
            }
            allStatus {
                id
                nama
            }
            allBagian {
                id
                nama
            }
            allLevel {
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
    if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        return;
    }

    const data = result.data;

    populateSelect("addUsersProfile", data.allUsers, "id", "name", {
        "data-email": "email",
    });
    populateSelect("addStatus", data.allStatus, "id", "nama");
    populateSelect("addBagian", data.allBagian, "id", "nama");
    populateSelect("addLevel", data.allLevel, "id", "nama");

    document
        .getElementById("addUsersProfile")
        .addEventListener("change", function () {
            const selected = this.options[this.selectedIndex];
            document.getElementById("addNama").value =
                selected.textContent || "";
            document.getElementById("addEmail").value =
                selected.getAttribute("data-email") || "";
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

async function createUserProfile() {
    const form = document.getElementById("formAddUserProfile");
    const fotoFile = document.getElementById("addFoto").files[0];

    let fotoPath = "";
    if (fotoFile) {
        const uploadData = new FormData();
        uploadData.append("foto", fotoFile);

        const token = document
            .querySelector('meta[name="csrf-token"]') 
            .getAttribute("content");

        const uploadRes = await fetch("/upload", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token,
            },
            body: uploadData,
        });

        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
            fotoPath = uploadResult.path;
        } else {
            alert("Upload foto gagal!");
            return;
        }
    }

    const mutation = `
      mutation {
        createUserProfile(input: {
          user_id: ${form.addUsersProfile.value},
          nama_lengkap: "${form.addNama.value}",
          nrp: "${form.addNrp.value}",
          alamat: "${form.addAlamat.value}",
          foto: "${fotoPath}",
          status_id: ${form.addStatus.value},
          bagian_id: ${form.addBagian.value},
          level_id: ${form.addLevel.value}
        }) {
          id
          nama_lengkap
          nrp
          alamat
          foto
          user { id name email }
          bagian { id nama }
          level { id nama }
          status { id nama }
        }
      }
    `;

    const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });

    const result = await res.json();

    if (result.data?.createUserProfile) {
        const profile = result.data.createUserProfile;
        alert(`User Profile ${profile.nama_lengkap} berhasil ditambahkan`);

        closeAddModal();
    } else {
        alert("Gagal menambahkan User Profile");
        console.error(result);
    }
}

function closeAddModal() {
    document.getElementById("modalAdd").classList.add("hidden");
}
