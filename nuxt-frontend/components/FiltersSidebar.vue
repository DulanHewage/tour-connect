<template>
  <div class="px-4 lg:px-6 pt-4 flex justify-between items-center">
    <h2 class="font-medium text-gray-600">Filters</h2>
    <BaseButton
      @click="() => (clearFilters(), radioButtonKey++)"
      v-if="hasFiltersApplied"
      variant="text"
    >
      clear filters
    </BaseButton>
  </div>
  <div class="border-b-[0.5px] border-gray-400/40 border-solid my-4"></div>
  <div class="px-4 lg:px-6">
    <div
      v-for="rating in ratings"
      class="flex gap-2 items-center mb-2"
      :key="rating.value"
    >
      <BaseRadioButton
        v-model="filters.selectedRating"
        name="rating-selection"
        :value="rating.value"
        :id="`rating-${rating.value}`"
        :key="radioButtonKey"
      />
      <BaseRating :model-value="rating.value" :max-stars="5" readonly />
    </div>

    <div class="border-b-[0.5px] border-gray-400/40 border-solid my-4"></div>
    <BaseCheckbox v-model="filters.specialOffer" id="special-offer-checkbox">
      <div class="text-gray-600 text-sm">Special Offer</div></BaseCheckbox
    >
    <div class="border-b-[0.5px] border-gray-400/40 border-solid my-4"></div>
    <div v-if="hasFiltersApplied">
      <p class="text-sm text-gray-600 mb-1">Filters applied:</p>
      <div class="flex gap-1 flex-wrap items-center">
        <BaseTag v-if="filters.selectedRating"
          >{{ filters.selectedRating }}
          {{
            `star${parseInt(filters.selectedRating as string) > 1 ? "s" : ""}`
          }}</BaseTag
        >
        <BaseTag v-if="filters.specialOffer" data-testid="special-offer-tag"
          >special offer</BaseTag
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { filters, clearFilters } = useActivityStore();

// computed property to check if any filters are applied
const hasFiltersApplied = computed<boolean>(() => {
  return (
    filters.selectedRating !== "" ||
    filters.specialOffer ||
    filters.searchQuery.trim() !== ""
  );
});

// used to force re-render of radio buttons
const radioButtonKey = ref(0);

// array of rating values to display in the sidebar
const ratings = [
  { value: 5 },
  { value: 4 },
  { value: 3 },
  { value: 2 },
  { value: 1 },
];
</script>
