<template>
  <button
    class="rounded-md transition-colors"
    :class="[variant, size]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "stroke" | "text";
    size?: "small" | "base";
  }>(),
  {
    variant: "primary",
    size: "base",
  }
);
</script>

<style scoped>
.primary {
  @apply bg-sky-600 text-white  hover:bg-sky-500;
}
.stroke {
  @apply border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white;
}
.small {
  @apply text-sm py-1 px-2;
}
.base {
  @apply text-base py-2 px-4;
}
.text {
  @apply text-sm border-none bg-transparent text-gray-600 p-0;
}
</style>
