<template>
  <div class="flex items-center">
    <input
      :checked="modelValue === value"
      @change="handleChange"
      :id="id"
      type="radio"
      :value="value"
      :disabled="disabled"
      :name="name"
      class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 cursor-pointer transition-colors"
    />
    <label
      v-if="slots.default"
      :for="id"
      class="ms-2 text-sm font-medium text-gray-900"
    >
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  value: string | number;
  id?: string;
  name: string;
  disabled?: boolean;
}

defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);
const slots = defineSlots();

// Handles the change event of the radio input
// and emits the update:modelValue event with the new value
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit("update:modelValue", target.value);
  }
}
</script>
