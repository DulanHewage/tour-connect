<template>
  <div class="container pt-6 flex flex-col md:flex-row gap-4">
    <aside
      class="w-full md:w-3/12 block rounded-md border border-gray-300/50 h-auto md:h-[calc(100vh-60px)] pb-4"
    >
      <FiltersSidebar />
    </aside>
    <div class="w-full md:w-9/12">
      <BaseTextfield
        v-model="filters.searchQuery"
        placeholder="Search Activity"
        @update:modelValue="currentPage = 1"
      />

      <div class="flex justify-between">
        <div
          class="pt-4 pb-2 text-gray-600 text-sm"
          data-testid="showing-entries"
        >
          Showing {{ activities.length }} of
          {{ pagination?.totalItems ? pagination?.totalItems : 0 }}
          activities
        </div>
        <BasePagination
          hide-buttons
          v-model="currentPage"
          @change="onChangePage"
          :page-size="10"
          :total-items="pagination?.totalItems ? pagination?.totalItems : 0"
        />
      </div>
      <div v-if="status === 'pending'">loading...</div>
      <div v-else>
        <div
          class="pb-6 flex flex-col gap-6"
          data-testid="activity-card-wrapper"
        >
          <ActivityCard
            v-for="activity in activities"
            :key="activity._id"
            :activity="activity"
          />
          <div
            v-if="!activities.length"
            class="flex gap-2 items-center w-full justify-center mt-2"
          >
            <NuxtIcon name="cart-empty" class="text-xl" />
            <span data-testid="no-activities-message"
              >No activities found for the search.</span
            >
          </div>
        </div>
      </div>
      <div v-if="error">error occurred while fetching activities</div>
      <div class="w-full flex justify-center pb-6">
        <BasePagination
          v-model="currentPage"
          @change="onChangePage"
          :page-size="10"
          :total-items="pagination?.totalItems ? pagination?.totalItems : 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setActivitiesResult, filters, setCurrentPage } = useActivityStore();
const { setActivities, activities, pagination } = useActivityService();

const currentPage = ref(1);
// fetching activities on sever side
let { error, status } = await setActivities(filters, currentPage.value);

const debouncedGetActivities = useDebounceFn(async () => {
  const result = await setActivities(filters, currentPage.value);
  error = result.error;
  status = result.status;
  setActivitiesResult(activities.value);
}, 500);

async function onChangePage(page: number) {
  // getActivities({ ...filters, page });
  setCurrentPage(page);
  await debouncedGetActivities();
}

watch(
  filters,
  async () => {
    setCurrentPage(1);
    currentPage.value = 1;
    await debouncedGetActivities();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  // sets the activities in the store
  // so when single activity page is opened
  // it doesn't make an API call again
  setActivitiesResult(activities.value);
});
</script>
