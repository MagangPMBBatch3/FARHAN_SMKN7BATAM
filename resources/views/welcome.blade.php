<!DOCTYPE html>
<html lang="en" class="h-full bg-gray-100">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Simple Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-full flex">

  <!-- Sidebar -->
  <aside class="w-64 bg-white shadow-md h-screen sticky top-0">
    <div class="p-6 font-bold text-xl border-b">My Dashboard</div>
    <nav class="mt-6">
      <a href="#" class="block px-6 py-3 hover:bg-gray-200 font-medium">Dashboard</a>
      <a href="#" class="block px-6 py-3 hover:bg-gray-200 font-medium">Users</a>
      <a href="#" class="block px-6 py-3 hover:bg-gray-200 font-medium">Settings</a>
      <a href="#" class="block px-6 py-3 hover:bg-gray-200 font-medium">Reports</a>
    </nav>
  </aside>

  <!-- Main content -->
  <div class="flex-1 flex flex-col h-screen overflow-auto">
    <!-- Navbar -->
    <header class="bg-white shadow-md flex items-center justify-between px-6 h-16 sticky top-0 z-10">
      <div class="font-semibold text-lg">Dashboard Navbar</div>
      <div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
      </div>
    </header>

    <!-- Content area -->
    <main class="flex-1 p-6 bg-gray-100">
      <h1 class="text-2xl font-semibold mb-4">Welcome to the Dashboard</h1>
      <p class="text-gray-700">
        This is a dummy content area. You can put your charts, tables, or other content here.
      </p>

      <!-- Dummy cards -->
      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="font-semibold text-lg">Users</h2>
          <p class="mt-2 text-3xl">1,234</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h2 class="font-semibold text-lg">Sales</h2>
          <p class="mt-2 text-3xl">$56,789</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h2 class="font-semibold text-lg">Visits</h2>
          <p class="mt-2 text-3xl">12,345</p>
        </div>
      </div>
    </main>
  </div>

</body>
=======
</html>
>>>>>>> 0f5cd1e9858b04547f21f95c482d161349abe964
