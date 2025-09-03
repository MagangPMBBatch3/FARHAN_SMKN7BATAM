@props([
    'type' => 'button',
    'variant' => 'primary',
    'size' => 'md',
    'block' => false,
    'disabled' => false
])

@php
$baseClass = "inline-flex items-center justify-center rounded-lg font-semibold focus:ring-2 transition";

$variants = [
    'primary' => "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-400",
    'secondary' => "text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400",
    'danger' => "text-white bg-red-600 hover:bg-red-700 focus:ring-red-400",
    'success' => "text-white bg-green-600 hover:bg-green-700 focus:ring-green-400",
    'warning' => "text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300",
    'info' => "text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-400",
];

$sizes = [
    'sm' => "px-3 py-1 text-sm",
    'md' => "px-4 py-2 text-base",
    'lg' => "px-6 py-3 text-lg",
];

$blockClass = $block ? "w-full" : "";

$disabledClass = $disabled ? "opacity-50 cursor-not-allowed" : "";
@endphp

<button
    type="{{ $type }}"
    @if($disabled) disabled @endif
    {{ $attributes->merge(['class' => "$baseClass {$variants[$variant]} {$sizes[$size]} $blockClass $disabledClass"]) }}
>
    {{ $slot }}
</button>
