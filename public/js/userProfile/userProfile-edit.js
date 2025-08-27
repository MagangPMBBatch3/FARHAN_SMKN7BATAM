async function editModal(id) {
    const query = `
      query {
        userProfile(id: ${id}) {
          id
          nama_lengkap
          nrp
          alamat
          foto
          user { id name email }
          status { id nama }
          bagian { id nama }
          level { id nama }
        }
        allUsers { id name email }
        allStatus { id nama }
        allBagian { id nama }
        allLevel { id nama }
      }
    `;

    const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    const { data } = await response.json();
    const profile = data.userProfile;
    console.log(profile);

    document.getElementById("editId").value = profile.id;
    document.getElementById("editNama").value = profile.nama_lengkap;
    document.getElementById("editEmail").value = profile.user?.email || "";
    document.getElementById("editNrp").value = profile.nrp;
    document.getElementById("editAlamat").value = profile.alamat;
    document.getElementById("currentFoto").value = profile.foto;

    populateSelect("editUsersProfile", data.allUsers, "id", "name", {
        "data-email": "email",
    });
    populateSelect("editStatus" || 0, data.allStatus, "id", "nama");
    populateSelect("editBagian" || 0, data.allBagian, "id", "nama");
    populateSelect("editLevel" || 0, data.allLevel, "id", "nama");

    document.getElementById("editUsersProfile").value = profile.user?.id || "";
    document.getElementById("editStatus").value = profile.status?.id || "";
    document.getElementById("editBagian").value = profile.bagian?.id || "";
    document.getElementById("editLevel").value = profile.level?.id || "";

    const usersMap = {};
    data.allUsers.forEach((u) => {
        usersMap[u.id] = { name: u.name, email: u.email };
    });

    const userSelect = document.getElementById("editUsersProfile");
    userSelect.addEventListener("change", function () {
        const selectedId = this.value;
        if (usersMap[selectedId]) {
            document.getElementById("editNama").value =
                usersMap[selectedId].name;
            document.getElementById("editEmail").value =
                usersMap[selectedId].email;
        } else {
            document.getElementById("editNama").value = "";
            document.getElementById("editEmail").value = "";
        }
    });

    // Tampilkan modal
    document.getElementById("editModal").classList.remove("hidden");
}

function populateSelect(selectId, data, valueKey, textKey, extraAttrs = {}) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">-- Pilih --</option>';
    data.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item[valueKey];
        opt.textContent = item[textKey];
        for (let attr in extraAttrs) {
            opt.setAttribute(attr, item[extraAttrs[attr]]);
        }
        select.appendChild(opt);
    });
}

async function updateUserProfile() {
    const id = document.getElementById("editId").value;
    let fotoPath = document.getElementById("currentFoto").value;

    const fotoFile = document.getElementById("editFoto").files[0];
    if (fotoFile) {
        const formData = new FormData();
        formData.append("foto", fotoFile);

        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        const uploadResp = await fetch("/upload", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrf,
            },
            body: formData,
        });

        const uploadResult = await uploadResp.json();

        if (uploadResult.success) {
            fotoPath = uploadResult.path;
        } else {
            alert("Upload foto gagal!");
            return;
        }
    }

    const variables = {
        id: parseInt(id),
        input: {
            user_id: parseInt(
                document.getElementById("editUsersProfile").value
            ),
            nama_lengkap: document.getElementById("editNama").value,
            nrp: document.getElementById("editNrp").value,
            alamat: document.getElementById("editAlamat").value,
            foto: fotoPath,
            status_id: parseInt(document.getElementById("editStatus").value),
            bagian_id: parseInt(document.getElementById("editBagian").value),
            level_id: parseInt(document.getElementById("editLevel").value),
        },
    };

    const mutation = `
      mutation UpdateUserProfile($id: ID!, $input: UpdateUserProfileInput!) {
        updateUserProfile(id: $id, input: $input) {
          id
          nama_lengkap
          nrp
          alamat
          foto
        }
      }
    `;

    const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.errors) {
        console.error(result.errors);
        alert("Gagal update data!");
        return;
    }

    alert("Data berhasil diupdate!");
    document.getElementById("editModal").classList.add("hidden");
        window.location.reload();
        loadData();
}

function closeEditModal() {
    document.getElementById("editModal").classList.add("hidden");
}
