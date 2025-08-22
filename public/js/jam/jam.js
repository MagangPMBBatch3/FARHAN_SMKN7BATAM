function decimalToTime(decimal) {
  if (!decimal && decimal !== 0) return "";
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
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
        userProfile { nama_lengkap }
        Aktivitas { no_wbs nama }
        Proyek { kode nama }
        ModeJamKerja { nama }
        statusJamKerja { nama }
      }
    }
  `;

  const resAktif = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryAktif }),
  });
  const dataAktif = await resAktif.json();
  renderJamTable(dataAktif?.data?.allJamKerja || [], "dataJam", true);

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
        userProfile { nama_lengkap }
        Aktivitas { no_wbs nama }
        Proyek { kode nama }
        ModeJamKerja { nama }
        statusJamKerja { nama }
      }
    }
  `;

  const resArsip = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryArsip }),
  });
  const dataArsip = await resArsip.json();
  renderJamTable(dataArsip?.data?.allJamKerjaArsip || [], "dataJamArsip", false);
}

function renderJamTable(items, tableId, isActive) {
  const tbody = document.getElementById(tableId);
  tbody.innerHTML = "";

  if (!items.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="12" class="text-center text-gray-500 p-3">Tidak ada data</td>
      </tr>
    `;
    return;
  }

  items.forEach((item) => {
    let actions = "";
    if (isActive) {
      actions = `
        <button 
          onclick="modalEdit(
            ${item.id},
            ${item.users_profile_id ?? "null"},
            ${item.proyek_id ?? "null"},
            ${item.aktivitas_id ?? "null"},
            ${item.status_id ?? "null"},
            ${item.mode_id ?? "null"},
            \`${item.no_wbs ?? ""}\`,
            \`${item.kode_proyek ?? ""}\`,
            \`${item.tanggal ?? ""}\`,
            \`${item.jumlah_jam ?? ""}\`,
            \`${item.keterangan ?? ""}\`
          )"
          class="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button onclick="archiveJam(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
      `;
    } else {
      actions = `
        <button onclick="restoreJam(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
        <button onclick="forceDeleteJam(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
      `;
    }

    tbody.innerHTML += `
      <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.userProfile?.nama_lengkap ?? ""}</td>
        <td class="border p-2">${item.no_wbs ?? ""}</td>
        <td class="border p-2">${item.kode_proyek ?? ""}</td>
        <td class="border p-2">${item.Proyek?.nama ?? ""}</td>
        <td class="border p-2">${item.Aktivitas?.nama ?? ""}</td>
        <td class="border p-2">${item.tanggal ?? ""}</td>
        <td class="border p-2">${decimalToTime(item.jumlah_jam)}</td>
        <td class="border p-2">${item.keterangan ?? ""}</td>  
        <td class="border p-2">${item.statusJamKerja?.nama ?? ""}</td>
        <td class="border p-2">${item.ModeJamKerja?.nama ?? ""}</td>
        <td class="border p-2">${actions}</td>
      </tr>
    `;
  });
}

async function searchJam() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.trim();

  const query = `
    query {
      searchJamKerja(keyword: "%${keyword}%") {
        id
        no_wbs
        kode_proyek
        tanggal
        jumlah_jam
        keterangan
        userProfile { nama_lengkap }
        Proyek { kode nama }
        Aktivitas { nama }
        statusJamKerja { nama }
        ModeJamKerja { nama }
      }
    }
  `;

  try {
    const res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    console.log("Result dari GraphQL:", result);

    const jamKerjaList = result.data?.searchJamKerja || [];
    renderJamTable(jamKerjaList, "dataJam", true);
  } catch (err) {
    console.error("Error saat search:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadJamData();
  document.getElementById("searchInput").addEventListener("input", searchJam);
});
