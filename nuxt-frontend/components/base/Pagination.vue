<template>
  <div class="flex items-center space-x-2">
    <button
      @click="onChangePage({ action: 'prev' })"
      :disabled="currentPageRef === 1"
    >
      Prev
    </button>

    <button
      v-for="page in pageButtons"
      :key="page"
      @click="onChangePage({ page })"
      :class="{ 'bg-blue-500': currentPageRef === page }"
    >
      {{ page }}
    </button>
    <button
      @click="onChangePage({ action: 'next' })"
      :disabled="currentPageRef === totalPages"
    >
      Next
    </button>
    <div>Page {{ currentPageRef }} of {{ totalPages }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  pageSize: number;
  totalItems: number;
}>();

const emit = defineEmits(["change", "update:modelValue"]);
const currentPageRef = toRef(props, "modelValue");

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize);
});

const onChangePage = ({ page, action }: { page?: number; action?: string }) => {
  let pageToGo = page;
  if (action === "prev") {
    if (currentPageRef.value > 1) {
      pageToGo = currentPageRef.value - 1;
    }
  }
  if (action === "next") {
    if (currentPageRef.value < totalPages.value) {
      pageToGo = currentPageRef.value + 1;
    }
  }
  if (pageToGo === currentPageRef.value || !pageToGo) return;
  emit("update:modelValue", pageToGo);
  emit("change", pageToGo);
};
const pageButtons = computed(() => {
  const buttons = [];
  for (let i = 1; i <= totalPages.value; i++) {
    buttons.push(i);
  }
  return buttons;
});
</script>
