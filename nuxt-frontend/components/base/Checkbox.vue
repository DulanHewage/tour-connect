<template>
  <div class="flex items-center">
    <input
      :checked="modelValue"
      @change="handleChange($event)"
      :id="id"
      type="checkbox"
      :value="value"
      :disabled="disabled"
      class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 cursor-pointer transition-colors"
    />
    <label
      v-if="slots.default"
      :for="id"
      class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
    >
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  value?: boolean;
  id?: string;
  disabled?: boolean;
}

defineProps<Props>();
const emit = defineEmits();
const slots = defineSlots();

// Handles the change event of the checkbox input
// and emits the update:modelValue event with the new value
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit("update:modelValue", target.checked);
  }
}
</script>
