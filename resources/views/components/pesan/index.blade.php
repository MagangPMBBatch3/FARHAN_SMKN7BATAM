<x-layouts.main title="Room Chat">
    <div class="flex h-screen bg-gray-100">

        {{-- Sidebar Kontak --}}
        <div class="w-1/4 bg-white border-r flex flex-col">
            <div class="p-4 font-bold text-lg border-b">Kontak</div>
            <div id="contactList" class="flex-1 overflow-y-auto"></div>
        </div>

        {{-- Area Chat --}}
        <div class="flex-1 flex flex-col">
            <div id="chatHeader" class="p-4 border-b bg-white flex items-center justify-between">
                <div>
                    <div id="chatName" class="font-bold">Pilih Kontak</div>
                    <div id="chatStatus" class="text-sm text-gray-500">-</div>
                </div>
                <div id="replyInfo" class="text-xs text-gray-500"></div>
            </div>

            {{-- Pesan --}}
            <div id="chatMessages" class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
                <div class="text-gray-500 text-center">Belum ada pesan</div>
            </div>

            {{-- Input pesan --}}
            <div class="p-4 border-t bg-white flex">
                <input id="chatInput" type="text" placeholder="Tulis pesan..."
                    class="flex-1 border rounded px-3 py-2 focus:outline-none">
                <button id="sendBtn" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Kirim</button>
            </div>
        </div>
    </div>

    <script>
        const endpoint = "/graphql";
        let currentChat = null;
        let replyTo = null; // ID pesan yang direply
        const myUsername = "{{ auth()->user()->name }}";

        const queryContacts = `query { allUsers { id name updated_at } }`;
        const queryMessages = `query { allPesan { id pengirim penerima isi parent_id tgl_pesan } }`;

        function formatDateMySQL(date = new Date()) {
            const pad = n => n.toString().padStart(2, '0');
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        }

        const mutationCreateMessage = (pengirim, penerima, isi, parent_id = null) => `
mutation {
    createPesan(input: {
        pengirim: "${pengirim}",
        penerima: "${penerima}",
        isi: "${isi.replace(/"/g, '\\"')}",
        parent_id: ${parent_id},
        jenis_id: 1,
        tgl_pesan: "${formatDateMySQL()}"
    }) { id isi parent_id }
}`;

        async function graphqlFetch(query) {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });
            const json = await res.json();
            if (json.errors) console.error("GraphQL errors:", json.errors);
            return json.data || {};
        }

        async function loadContacts() {
            const data = await graphqlFetch(queryContacts);
            if (!data.allUsers) return;
            const contacts = data.allUsers.filter(u => u.name !== myUsername);
            const list = document.getElementById("contactList");
            list.innerHTML = "";
            contacts.forEach(c => {
                const div = document.createElement("div");
                div.className = "p-3 border-b hover:bg-gray-100 cursor-pointer";
                div.innerHTML = `<div class="font-semibold">${c.name}</div>
            <div class="text-xs text-gray-500">Terakhir online: ${c.updated_at || "-"}</div>`;
                div.onclick = () => openChat(c);
                list.appendChild(div);
            });
        }

        async function loadMessages() {
            if (!currentChat) return;
            const data = await graphqlFetch(queryMessages);
            if (!data.allPesan) return;

            // filter dan sort
            const msgs = data.allPesan.filter(p =>
                (p.pengirim === myUsername && p.penerima === currentChat.name) ||
                (p.pengirim === currentChat.name && p.penerima === myUsername)
            ).sort((a, b) => new Date(a.tgl_pesan) - new Date(b.tgl_pesan));

            const chatBox = document.getElementById("chatMessages");
            chatBox.innerHTML = "";

            if (msgs.length === 0) {
                chatBox.innerHTML = '<div class="text-gray-500 text-center">Belum ada pesan</div>';
            } else {
                msgs.forEach(m => appendMessage(
                    m,
                    msgs, // passing semua pesan untuk nested lookup
                    m.pengirim === myUsername ? "me" : "them"
                ));
            }
        }

        function openChat(contact) {
            currentChat = contact;
            document.getElementById("chatName").textContent = contact.name;
            document.getElementById("chatStatus").textContent = contact.updated_at ? "Terakhir online " + contact.updated_at : "Online";
            replyTo = null;
            document.getElementById("replyInfo").textContent = "";
            loadMessages();
        }

        async function sendMessage() {
            const input = document.getElementById("chatInput");
            const msg = input.value.trim();
            if (!msg || !currentChat) return;

            await graphqlFetch(mutationCreateMessage(myUsername, currentChat.name, msg, replyTo));
            input.value = "";
            replyTo = null;
            document.getElementById("replyInfo").textContent = "";
            loadMessages();
        }

        // Recursive function untuk nested reply
        function buildReplyChain(msg, allMsgs) {
            if (!msg.parent_id) return '';
            const parent = allMsgs.find(m => m.id === msg.parent_id);
            if (!parent) return '';
            const nested = buildReplyChain(parent, allMsgs);
            return nested + `<div class="text-xs text-gray-500 border-l-2 border-gray-300 pl-2 mb-1 italic">Reply: ${parent.isi}</div>`;
        }

        function appendMessage(msg, allMsgs, sender) {
            const container = document.createElement("div");
            container.className = sender === "me" ? "flex justify-end" : "flex justify-start";

            const bubble = document.createElement("div");
            bubble.className = sender === "me"
                ? "bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs break-words"
                : "bg-gray-200 text-black px-3 py-2 rounded-lg max-w-xs break-words";

            const parentHtml = buildReplyChain(msg, allMsgs);
            const time = new Date(msg.tgl_pesan).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            bubble.innerHTML = `${parentHtml}<div>${msg.isi}</div>
        <div class="text-xs text-right mt-1 ${sender === "me" ? "text-gray-200" : "text-gray-500"}">${sender === "me" ? "✔✔" : ""} ${time}</div>`;

            bubble.style.cursor = "pointer";
            bubble.onclick = () => {
                replyTo = msg.id;
                document.getElementById("replyInfo").textContent = `Membalas: ${msg.isi}`;
            };

            container.appendChild(bubble);
            const chatBox = document.getElementById("chatMessages");
            chatBox.appendChild(container);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        document.getElementById("sendBtn").onclick = sendMessage;
        document.getElementById("chatInput").addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });
        setInterval(() => { if (currentChat) loadMessages(); }, 1500);
        loadContacts();
    </script>
</x-layouts.main>