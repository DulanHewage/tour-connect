<template>
  <div class="bg-sky-500 h-16 items-center flex">
    <nav class="flex justify-between w-full container">
      <NuxtLink class="text-lg text-white font-bold" to="/">WanderHub</NuxtLink>
      <div class="flex gap-2 *:text-white">
        <NuxtLink to="/" :active-class="'underline'">Home</NuxtLink>
        <NuxtLink to="/about" :active-class="'underline'">About</NuxtLink>
      </div>
    </nav>
  </div>
</template>
