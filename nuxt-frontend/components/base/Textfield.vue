<template>
  <div class="relative">
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900"
      v-if="label"
      >{{ label }}</label
    >
    <input
      :id="id"
      :type="type"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 outline-none p-2.5 pr-[30px] w-full transition-all"
      :value="modelValue"
      @input="updateValue"
      :aria-labelledby="id"
      :placeholder="placeholder"
    />
    <div class="absolute right-0 top-1/2 -translate-y-1/2 pr-2.5">
      <NuxtIcon name="magnifying-glass" class="text-sky-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    id?: string;
    placeholder?: string;
    type?: string;
  }>(),
  {
    type: "text",
  }
);

const emit = defineEmits(["update:modelValue"]);

// Emits the update:modelValue event with the new value
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
