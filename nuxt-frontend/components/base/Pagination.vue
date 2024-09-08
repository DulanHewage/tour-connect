<template>
  <div
    class="flex items-center space-x-2 text-sm gap-1"
    data-testid="pagination"
  >
    <BaseButton
      size="small"
      variant="text"
      @click="onChangePage({ action: 'prev' })"
      :disabled="currentPageRef === 1"
    >
      <NuxtIcon name="next" class="rotate-180 block" />
    </BaseButton>

    <div class="flex gap-2">
      <div class="text-gray-600" v-if="hideButtons">
        Page {{ currentPageRef }} of {{ totalPages }}
      </div>
      <BaseButton
        v-else
        size="small"
        :variant="currentPageRef === page ? 'primary' : 'stroke'"
        v-for="page in pageButtons"
        :key="page"
        @click="onChangePage({ page })"
      >
        {{ page }}
      </BaseButton>
    </div>
    <BaseButton
      size="small"
      variant="text"
      @click="onChangePage({ action: 'next' })"
      :disabled="currentPageRef === totalPages"
    >
      <NuxtIcon name="next" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  pageSize: number;
  totalItems: number;
  hideButtons?: boolean;
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
