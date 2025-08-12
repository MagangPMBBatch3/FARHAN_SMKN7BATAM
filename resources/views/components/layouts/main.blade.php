<!DOCTYPE html>
<html>
<head>
    <title>{{ $title ?? 'Dashboard' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex">

    <!-- Sidebar -->
    <aside class="w-64 bg-blue-500 text-white h-screen p-4">
        <h2 class="text-xl font-bold mb-6">Menu</h2>
        <ul>
            <li>
                <a href="/dashboard" class="block py-2 hover:bg-blue-500 rounded px-2">Dashboard</a>
            </li>
            <li class="mb-2">
                <a href="/bagian" class="block p-2 rounded hover:bg-gray-700">Bagian</a>
            </li>
            <li class="mb-2">
                <a href="/level" class="block p-2 rounded hover:bg-gray-700">Level</a>
            </li>
            <li>
                <form action="/logout" method="POST">
                    @csrf
                    <button type="submit" class="w-full text-left py-2 hover:bg-red-500 rounded px-2">Logout</button>
                </form>
            </li>
        </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-6">
        {{-- @include('components.navbar') --}}
        {{ $slot }}
    </div>

</body>
</html>
