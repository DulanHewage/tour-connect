<template>
  <div
    class="absolute left-[0px] -top-[1px] z-[1] overflow-hidden w-[100px] h-[100px] text-right"
  >
    <span
      class="before after text-xs font-semibold text-white uppercase text-center -rotate-45 w-full bg-red-600 shadow-lg absolute top-[19px] -left-[21px] h-5 flex items-center justify-center"
      ><slot
    /></span>
  </div>
</template>

<style scoped>
.before {
  @apply before:content-[''] before:absolute before:left-0 before:top-full before:-z-10;
}
.after {
  @apply after:content-[''] after:absolute after:right-0 after:top-full after:-z-10;
}
</style>
