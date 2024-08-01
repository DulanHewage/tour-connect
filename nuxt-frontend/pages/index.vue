<template>
  <div class="container pt-6 flex flex-col md:flex-row gap-4">
    <aside
      class="w-full md:w-3/12 block rounded-md border border-gray-300/50 h-auto md:h-[calc(100vh-60px)] pb-4"
    >
      <FiltersSidebar />
    </aside>
    <div class="w-full md:w-9/12">
      <BaseTextfield
        v-model="searchFilters.searchQuery"
        placeholder="Search Activity"
      />
      <div v-if="status === 'pending'">loading...</div>
      <div v-else>
        <div class="pt-4 pb-2 text-gray-600 text-sm">
          Showing {{ activities.length }} of
          {{ pagination?.totalItems ? pagination?.totalItems : 0 }} activities
        </div>
        <div class="pb-6 flex flex-col gap-6">
          <ActivityCard
            v-for="activity in activities"
            :key="activity.id"
            :activity="activity"
          />
          <div
            v-if="!activities.length"
            class="flex gap-2 items-center w-full justify-center mt-2"
          >
            <NuxtIcon name="cart-empty" class="text-xl" />
            <span>No activities found for the search.</span>
          </div>
        </div>
      </div>
      <div v-if="error">error occurred while fetching activities</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setActivities } = useActivityStore();
const { getActivities, searchFilters } = useActivityService();

const { activities, pagination, error, status } = await getActivities();

onMounted(() => {
  // sets the activities in the store
  setActivities(activities.value);
});
</script>
