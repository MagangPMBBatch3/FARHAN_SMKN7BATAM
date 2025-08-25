<x-layouts.auth title="Login">
    <script src="https://cdn.tailwindcss.com"></script>

    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <form action="/login" method="POST" 
              class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            @csrf
            <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>

            {{-- Error message --}}
            @if ($errors->any())
                <div class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {{ $errors->first() }}
                </div>
            @endif

            {{-- Email --}}
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" 
                       class="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" 
                       placeholder="Masukkan email anda" required>
            </div>

            {{-- Password --}}
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" 
                       class="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" 
                       placeholder="Masukkan password" required>
            </div>

            {{-- Submit button --}}
            <button type="submit" 
                    class="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium transition duration-200">
                Login
            </button>

            {{-- Link register --}}
            <p class="text-center text-sm text-gray-600 mt-6">
                Belum punya akun? 
                <a href="/register" class="text-blue-600 hover:underline font-medium">Daftar sekarang</a>
            </p>
        </form>
    </div>
</x-layouts.auth>
