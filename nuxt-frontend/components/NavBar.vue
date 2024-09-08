<template>
  <div class="bg-sky-500 h-16 items-center flex">
    <nav
      class="flex justify-between w-full container"
      aria-label="Main Navigation"
    >
      <NuxtLink class="text-lg text-white font-bold" to="/"
        >Tour Connect</NuxtLink
      >
      <div class="flex gap-2 *:text-white">
        <NuxtLink to="/" :active-class="'underline'" aria-label="Home"
          >Home</NuxtLink
        >
        <NuxtLink to="/about" :active-class="'underline'" aria-label="About"
          >About</NuxtLink
        >
      </div>
    </nav>
  </div>
</template>
