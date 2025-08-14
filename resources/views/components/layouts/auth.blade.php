<!DOCTYPE html>
<html>
    <head>
        <title>{{ $title ?? 'Login' }}</title>
        <script src="https://cdn.tailwincss.com"></script>
    </head>
    <body class="bg-gray-100 flex items-center justify-center h-screen">
        {{ $slot }}
    </body>
</html>