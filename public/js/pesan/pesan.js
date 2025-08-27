async function loadContacts() {
    const query = `
      query {
        allPesan {
          pengirim
          penerima
          isi
          tgl_pesan
        }
      }
    `;
    const res = await fetchGraphQL(query);
    const pesan = res.data.allPesan;

    let kontak = new Map();

    pesan.forEach(p => {
        let friend = (p.pengirim === me) ? p.penerima : p.pengirim;
        if (friend !== me) {
            kontak.set(friend, p);
        }
    });

    renderContacts([...kontak.entries()]);
}

function renderContacts(list) {
    const container = document.getElementById("contactList");
    container.innerHTML = "";
    list.forEach(([friend, lastMsg]) => {
        const div = document.createElement("div");
        div.className = "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b";
        div.onclick = () => openChat(friend);

        div.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-gray-300"></div>
            <div class="flex-1">
                <p class="font-semibold">${friend}</p>
                <p class="text-xs text-gray-500 truncate">${lastMsg.isi}</p>
            </div>
            <span class="text-xs text-gray-400">${new Date(lastMsg.tgl_pesan).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;
        container.appendChild(div);
    });
}

async function openChat(friend) {
    activeChat = friend;
    document.getElementById("chatHeader").innerText = friend;

    const query = `
      query($me: String!, $friend: String!) {
        allPesan(
          filter: {
            OR: [
              { AND: [{ pengirim: { eq: $me }}, { penerima: { eq: $friend }}] }
              { AND: [{ pengirim: { eq: $friend }}, { penerima: { eq: $me }}] }
            ]
          }
          orderBy: [{ field: "tgl_pesan", order: ASC }]
        ) {
          id pengirim penerima isi tgl_pesan
        }
      }
    `;

    const res = await fetchGraphQL(query, { me, friend });
    renderMessages(res.data.allPesan);
}

function renderMessages(pesan) {
    const container = document.getElementById("chatContainer");
    container.innerHTML = "";
    pesan.forEach(p => {
        const div = document.createElement("div");
        div.className = (p.pengirim === me) ? "flex justify-end" : "flex justify-start";

        div.innerHTML = `
          <div class="max-w-xs ${p.pengirim === me ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-2 rounded-lg shadow">
              <p class="text-sm">${p.isi}</p>
              <p class="text-xs text-right text-gray-500">${new Date(p.tgl_pesan).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        `;
        container.appendChild(div);
    });
    container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
    if (!activeChat) {
        alert("Pilih kontak dulu!");
        return;
    }
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text) return;

    const mutation = `
      mutation($input: CreatePesanInput!) {
        createPesan(input: $input) {
          id pengirim penerima isi tgl_pesan
        }
      }
    `;

    await fetchGraphQL(mutation, {
        input: {
            pengirim: me,
            penerima: activeChat,
            isi: text,
            jenis_id: 1
        }
    });

    input.value = "";
    openChat(activeChat); // refresh chat
}

async function fetchGraphQL(query, variables = {}) {
    const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables })
    });
    return res.json();
}
