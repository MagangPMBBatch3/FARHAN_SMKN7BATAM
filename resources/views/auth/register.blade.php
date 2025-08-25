<x-layouts.auth title="Register">
    <script src="https://cdn.tailwindcss.com"></script>

    <form id="registerForm" class="bg-white p-6 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>

        <!-- Alert Error -->
        <div id="errorMsg" class="hidden bg-red-100 text-red-700 p-2 rounded mb-4 text-sm"></div>
        <!-- Alert Success -->
        <div id="successMsg" class="hidden bg-green-100 text-green-700 p-2 rounded mb-4 text-sm"></div>

        <!-- Nama -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Nama Lengkap</label>
            <input type="text" name="name" class="border w-full p-2 rounded focus:ring-2 focus:ring-blue-400" required>
        </div>

        <!-- Email -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Email</label>
            <input type="email" name="email" class="border w-full p-2 rounded focus:ring-2 focus:ring-blue-400" required>
        </div>

        <!-- Password -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Password</label>
            <input type="password" name="password" id="password" class="border w-full p-2 rounded focus:ring-2 focus:ring-blue-400" required>
        </div>

        <!-- Konfirmasi Password -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Konfirmasi Password</label>
            <input type="password" id="password_confirmation" class="border w-full p-2 rounded focus:ring-2 focus:ring-blue-400" required>
        </div>

        <!-- Tombol -->
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded transition">
            Register
        </button>

        <!-- Link ke Login -->
        <p class="mt-4 text-center text-sm text-gray-600">
            Sudah punya akun? 
            <a href="/login" class="text-blue-500 hover:underline">Login</a>
        </p>
    </form>

    <script>
        document.getElementById("registerForm").addEventListener("submit", async function(e) {
            e.preventDefault();

            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const password = this.password.value.trim();
            const confirm = document.getElementById("password_confirmation").value.trim();

            const errorMsg = document.getElementById("errorMsg");
            const successMsg = document.getElementById("successMsg");

            errorMsg.classList.add("hidden");
            successMsg.classList.add("hidden");

            if (password !== confirm) {
                errorMsg.textContent = "Password dan konfirmasi tidak sama.";
                errorMsg.classList.remove("hidden");
                return;
            }
            if (password.length < 6) {
                errorMsg.textContent = "Password minimal 6 karakter.";
                errorMsg.classList.remove("hidden");
                return;
            }

            const query = `
              mutation {
                createUser(input: {
                  name: "${name}",
                  email: "${email}",
                  password: "${password}"
                }) {
                  id
                  name
                  email
                }
              }
            `;

            try {
                const res = await fetch("/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query })
                });
                const data = await res.json();

                if (data.errors) {
                    errorMsg.textContent = data.errors[0].message;
                    errorMsg.classList.remove("hidden");
                } else {
                    successMsg.textContent = "Registrasi berhasil! Silakan login.";
                    successMsg.classList.remove("hidden");
                    this.reset();
                }
            } catch (err) {
                errorMsg.textContent = "Terjadi kesalahan koneksi.";
                errorMsg.classList.remove("hidden");
            }
        });
    </script>
</x-layouts.auth>
