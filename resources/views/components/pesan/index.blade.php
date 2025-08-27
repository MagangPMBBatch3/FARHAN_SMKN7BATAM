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
            </div>

            {{-- Pesan --}}
            <div id="chatMessages" class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
                <div class="text-gray-500 text-center">Belum ada pesan</div>
            </div>

            {{-- Input pesan --}}
            <div class="p-4 border-t bg-white flex">
                <input id="chatInput" type="text" placeholder="Tulis pesan..." class="flex-1 border rounded px-3 py-2 focus:outline-none">
                <button id="sendBtn" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Kirim</button>
            </div>
        </div>
    </div>

    <script>
        const endpoint = "/graphql";
        let currentChat = null;
        const myUsername = "{{ auth()->user()->name }}"; // sesuaikan dengan user login

        const queryContacts = `
            query {
                allUsers {
                    id
                    name
                    updated_at
                }
            }
        `;

        const queryMessages = (withUser) => `
            query {
                allPesan {
                    id
                    pengirim
                    penerima
                    isi
                    tgl_pesan
                }
            }
        `;

        const mutationCreateMessage = (pengirim, penerima, isi) => `
    mutation {
        createPesan(input: {
            pengirim: ${JSON.stringify(pengirim)},
            penerima: ${JSON.stringify(penerima)},
            isi: ${JSON.stringify(isi)},
            jenis_id: 1,
            tgl_pesan: ${JSON.stringify(new Date().toISOString())}
        }) {
            id
            isi
        }
    }
`;


        async function graphqlFetch(query) {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });
            return (await res.json()).data;
        }

        async function loadContacts() {
            const data = await graphqlFetch(queryContacts);
            const contacts = data.allUsers.filter(u => u.name !== myUsername);
            const list = document.getElementById("contactList");
            list.innerHTML = "";
            contacts.forEach(c => {
                const div = document.createElement("div");
                div.className = "p-3 border-b hover:bg-gray-100 cursor-pointer";
                div.innerHTML = `
                    <div class="font-semibold">${c.name}</div>
                    <div class="text-xs text-gray-500">Terakhir online: ${c.updated_at || "-"}</div>
                `;
                div.onclick = () => openChat(c);
                list.appendChild(div);
            });
        }

        async function loadMessages() {
            if (!currentChat) return;
            const data = await graphqlFetch(queryMessages(currentChat.name));
            const msgs = data.allPesan.filter(p =>
                (p.pengirim === myUsername && p.penerima === currentChat.name) ||
                (p.pengirim === currentChat.name && p.penerima === myUsername)
            );
            const chatBox = document.getElementById("chatMessages");
            chatBox.innerHTML = "";
            if (msgs.length === 0) {
                chatBox.innerHTML = '<div class="text-gray-500 text-center">Belum ada pesan</div>';
            } else {
                msgs.forEach(m => appendMessage(m.pengirim === myUsername ? "me" : "them", m.isi, m.pengirim === myUsername));
            }
        }

        function openChat(contact) {
            currentChat = contact;
            document.getElementById("chatName").textContent = contact.name;
            document.getElementById("chatStatus").textContent = contact.updated_at ? "Terakhir online " + contact.updated_at : "Online";
            loadMessages();
        }

        document.getElementById("sendBtn").addEventListener("click", async () => {
            const input = document.getElementById("chatInput");
            const msg = input.value.trim();
            if (!msg || !currentChat) return;
            await graphqlFetch(mutationCreateMessage(myUsername, currentChat.name, msg));
            input.value = "";
            loadMessages();
        });

        function appendMessage(sender, text, sent) {
            const container = document.createElement("div");
            container.className = sender === "me" ? "flex justify-end" : "flex justify-start";

            const bubble = document.createElement("div");
            bubble.className = sender === "me"
                ? "bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs"
                : "bg-gray-200 text-black px-3 py-2 rounded-lg max-w-xs";

            bubble.innerHTML = `<div>${text}</div>
                <div class="text-xs text-right mt-1 ${sender==="me" ? "text-gray-200" : "text-gray-500"}">${sent ? "✔✔" : ""}</div>`;
            container.appendChild(bubble);
            const chatBox = document.getElementById("chatMessages");
            chatBox.appendChild(container);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        loadContacts();
    </script>
</x-layouts.main>
