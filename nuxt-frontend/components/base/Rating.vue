<script setup lang="ts">
interface Props {
  modelValue: number;
  maxStars: number;
  readonly?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);
const stars = ref<Array<boolean>>(new Array(props.maxStars).fill(false));

// Watches rounded `modelValue`, updates `stars` to reflect rating.
watch(
  () => Math.round(props.modelValue),
  (newValue) => {
    for (let i = 0; i < props.maxStars; i++) {
      stars.value[i] = i < newValue;
    }
  },
  { immediate: true }
);

// Updates rating if not readonly, emits new value.
const updateRating = (index: number) => {
  if (!props.readonly) {
    const newRating = index + 1;
    stars.value = stars.value.map((_, i) => i < newRating);
    emits("update:modelValue", newRating);
  }
};
</script>

<template>
  <div class="flex gap-2 items-center flex-wrap">
    <div class="flex gap-1">
      <span
        v-for="(star, index) in stars"
        :key="index"
        @click="updateRating(index)"
        :role="props.readonly ? 'listitem' : 'button'"
        :aria-label="'Rate ' + (index + 1) + ' stars'"
        tabindex="0"
      >
        <svg
          v-if="star"
          class="w-4 h-4 text-sky-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4 text-gray-300 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
      </span>
    </div>
    <div class="text-gray-600 text-sm">
      <slot>
        <span> {{ modelValue }} out of {{ maxStars }} </span>
      </slot>
    </div>
  </div>
</template>
