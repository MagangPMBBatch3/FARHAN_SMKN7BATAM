<x-layouts.main title="Dashboard">
    <x-slot name="pageTitle">Dashboard</x-slot>

    <div class="mb-6">
        <p class="text-gray-500">Ringkasan data sistem dan aktivitas terbaru</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-sm text-gray-500">Proyek Aktif</h3>
                    <p id="statProyekAktif" class="text-3xl font-extrabold mt-1">—</p>
                    <p id="statProyekTotal" class="text-xs text-gray-400 mt-1">—</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                    <i data-feather="briefcase" class="text-green-500"></i>
                </div>
            </div>
            <div class="w-full bg-gray-100 h-2 rounded mt-4">
                <div id="pbProyek" class="bg-green-500 h-2 rounded" style="width:0%"></div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-sm text-gray-500">Proyek Baru Bulan Ini</h3>
                    <p id="statProyekBaruBulanIni" class="text-3xl font-extrabold mt-1">—</p>
                    <p id="statBulanSekarang" class="text-xs text-gray-400 mt-1">—</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <i data-feather="trending-up" class="text-indigo-500"></i>
                </div>
            </div>
            <div class="w-full bg-gray-100 h-2 rounded mt-4">
                <div id="pbProyekBaru" class="bg-indigo-500 h-2 rounded" style="width:0%"></div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-sm text-gray-500">Total Aktivitas</h3>
                    <p id="statTotalAktivitas" class="text-3xl font-extrabold mt-1">—</p>
                    <p id="statAktivitasSelesai" class="text-xs text-gray-400 mt-1">—</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center">
                    <i data-feather="check-square" class="text-yellow-500"></i>
                </div>
            </div>
            <div class="w-full bg-gray-100 h-2 rounded mt-4">
                <div id="pbAktivitas" class="bg-yellow-500 h-2 rounded" style="width:0%"></div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow col-span-3">
            <h3 class="text-lg font-semibold mb-4">Pertumbuhan Jumlah Proyek</h3>
            <canvas id="lineChart" height="80"></canvas>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow" hidden>
            <h3 class="text-lg font-semibold mb-4">Jumlah Proyek Per Bulan</h3>
            <canvas id="barChart" height="120"></canvas>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow col-span-2">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Proyek Terbaru</h3>
                <span id="lastSync" class="text-xs text-gray-400">—</span>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-600 text-sm">
                            <th class="p-3">#</th>
                            <th class="p-3">Kode</th>
                            <th class="p-3">Nama Proyek</th>
                            <th class="p-3">Tanggal</th>
                            <th class="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyProyek" class="text-gray-700">
                        <tr><td colspan="5" class="p-4 text-center text-gray-400">Memuat...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow">
            <h3 class="text-lg font-semibold mb-4">Notifikasi</h3>
            <ul id="notifList" class="space-y-3 text-sm">
                <li class="text-gray-400">Memuat...</li>
            </ul>
        </div>
    </div>

    <script src="https://unpkg.com/feather-icons"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
    const fmtID = new Intl.DateTimeFormat('id-ID', { day:'2-digit', month:'short', year:'numeric' });
    const fmtMonthID = new Intl.DateTimeFormat('id-ID', { month:'short', year:'numeric' });

    const monthKey = d => {
        const dt = new Date(d);
        if (isNaN(dt)) return '-';
        return fmtMonthID.format(dt);
    };

    const sameMonth = (a, b=new Date()) => {
        const da = new Date(a), db = new Date(b);
        return da.getMonth() === db.getMonth() && da.getFullYear() === db.getFullYear();
    };

    const percent = (num, den) => {
        if (!den || den === 0) return 0;
        return Math.round((num / den) * 100);
    };

    const statusPills = {
        "Approved": "bg-green-100 text-green-700",
        "Telat": "bg-orange-100 text-orange-700",
        "Rejected": "bg-red-100 text-red-700",
        "In Review": "bg-yellow-100 text-yellow-700",
        "Pending": "bg-blue-100 text-blue-700",
        "Tidak ada status": "bg-gray-100 text-gray-500"
    };

    async function gql(query, variables = {}) {
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        if (json.errors) {
            console.error(json.errors);
            throw new Error(json.errors[0]?.message || 'GraphQL error');
        }
        return json.data;
    }

    async function loadDashboard() {
        const query = `
          query DashboardData {
            allUserProfiles { id created_at }
            allProyeks { id kode nama tanggal deleted_at created_at }
            allProyeksArsip { id deleted_at }
            allAktivitas { id nama no_wbs created_at }
            allAktivitasArsip { id nama deleted_at }
            allJamKerja {
              id
              proyek_id
              created_at
              statusJamKerja { id nama }
            }
          }
        `;

        const data = await gql(query);

        // === hitung total proyek & aktivitas
        const totalProyek = data.allProyeks.length;
        const proyekAktif = data.allProyeks.filter(p => !p.deleted_at).length;
        const proyekBaruBulanIni = data.allProyeks.filter(p => p.tanggal && sameMonth(p.tanggal)).length;

        const totalAktivitas = data.allAktivitas.length;
        const aktivitasSelesaiByRule = data.allAktivitas.filter(a => a.no_wbs && String(a.no_wbs).trim() !== '').length;

        document.getElementById('statProyekAktif').textContent = proyekAktif.toLocaleString('id-ID');
        document.getElementById('statProyekTotal').textContent = `${totalProyek} total`;
        document.getElementById('pbProyek').style.width = percent(proyekAktif, Math.max(1, totalProyek)) + '%';

        document.getElementById('pbProyekBaru').style.width = Math.min(100, percent(proyekBaruBulanIni, Math.max(1, totalProyek))) + '%';
        document.getElementById('statTotalAktivitas').textContent = totalAktivitas.toLocaleString('id-ID');
        document.getElementById('statAktivitasSelesai').textContent = `${aktivitasSelesaiByRule} dianggap selesai (rule: no_wbs ≠ null)`;
        document.getElementById('pbAktivitas').style.width = percent(aktivitasSelesaiByRule, Math.max(1, totalAktivitas)) + '%';

        // === chart proyek per bulan
        const buckets = {};
        data.allProyeks.forEach(p => {
            if (!p.tanggal) return;
            const key = monthKey(p.tanggal);
            buckets[key] = (buckets[key] || 0) + 1;
        });

        const labels = Object.keys(buckets).sort((a,b) => {
            const toDate = (label) => {
                const [monName, year] = label.split(' ');
                const map = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
                const m = map.indexOf(monName);
                return new Date(parseInt(year), Math.max(0, m), 1).getTime();
            };
            return toDate(a) - toDate(b);
        });
        const values = labels.map(l => buckets[l]);

        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Jumlah Proyek',
                    data: values,
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37,99,235,0.15)',
                    tension: 0.35,
                    fill: true,
                    pointRadius: 3
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { precision:0 } } }
            }
        });

        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Jumlah Proyek',
                    data: values,
                    backgroundColor: '#10B981'
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { precision:0 } } }
            }
        });

        // === Map jam kerja by proyek_id
        const jamKerjaByProyek = {};
        data.allJamKerja.forEach(j => {
            if (!jamKerjaByProyek[j.proyek_id]) jamKerjaByProyek[j.proyek_id] = [];
            jamKerjaByProyek[j.proyek_id].push(j);
        });

        // === Render tabel proyek terbaru
        const tbody = document.getElementById('tbodyProyek');
        const latest = [...data.allProyeks]
            .filter(p => !!p.tanggal)
            .sort((a,b) => new Date(b.tanggal) - new Date(a.tanggal))
            .slice(0, 8);

        if (!latest.length) {
            tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-400">Belum ada data proyek.</td></tr>`;
        } else {
            tbody.innerHTML = latest.map((p, idx) => {
                const jams = jamKerjaByProyek[p.id] || [];
                let st = "Tidak ada status";

                if (jams.length > 0) {
                    const lastJam = jams.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
                    st = lastJam.statusJamKerja?.nama || "Tidak ada status";
                }

                const pill = statusPills[st] || "bg-gray-100 text-gray-700";
                return `
                  <tr class="border-b hover:bg-gray-50">
                      <td class="p-3">${idx + 1}</td>
                      <td class="p-3">${p.kode ?? '-'}</td>
                      <td class="p-3">${p.nama ?? '-'}</td>
                      <td class="p-3">${p.tanggal ? fmtID.format(new Date(p.tanggal)) : '-'}</td>
                      <td class="p-3">
                          <span class="px-2 py-1 rounded text-xs ${pill}">${st}</span>
                      </td>
                  </tr>
                `;
            }).join('');
        }

        // === Notifikasi
        const notif = [];
        const countProyekBaru = proyekBaruBulanIni;
        if (countProyekBaru > 0) notif.push(`📁 ${countProyekBaru} proyek baru ditambahkan bulan ini`);

        const countAktivitasArsip = data.allAktivitasArsip.filter(a => a.deleted_at).length;
        if (countAktivitasArsip > 0) notif.push(`🗑️ ${countAktivitasArsip} aktivitas dipindahkan ke arsip`);

        document.getElementById('notifList').innerHTML = notif.length
            ? notif.map(n => `<li class="flex items-start gap-2"><span>${n}</span></li>`).join('')
            : `<li class="text-gray-400">Tidak ada notifikasi baru.</li>`;

        document.getElementById('lastSync').textContent = `Sinkron terakhir: ${fmtID.format(new Date())}`;

        feather.replace();
    }

    (async () => {
        try {
            await loadDashboard();
        } catch (e) {
            console.error(e);
            document.getElementById('notifList').innerHTML =
                `<li class="text-red-500">Gagal memuat data: ${e.message}</li>`;
        }
    })();
</script>

</x-layouts.main>
