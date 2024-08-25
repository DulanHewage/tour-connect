import type { Activity, ActivityFilter } from "../../shared/types";
export const useActivityStore = defineStore("activity", () => {
  const activitiesResult = ref<Activity[]>([]);
  const filters = reactive<ActivityFilter>({
    searchQuery: "",
    selectedRating: "",
    specialOffer: false,
    price: 0,
  });

  const currentPage = ref(1);

  /**
   * Sets the activities array to a new array of activities.
   * @param newActivities - An array of Activity objects or null.
   */
  function setActivitiesResult(newActivities: Activity[] | null) {
    if (newActivities && newActivities.length)
      activitiesResult.value = [...newActivities];
  }

  /**
   * Updates individual fields of the filters object.
   * @param newFilters - An object containing the new filter values.
   */
  function setFilters(newFilters: Partial<ActivityFilter>) {
    Object.keys(newFilters).forEach((key) => {
      const filterKey = key as keyof ActivityFilter;
      if (filterKey in filters) {
        (filters[filterKey] as any) = newFilters[filterKey]!;
      }
    });
  }

  /**
   * Clears all the filters by resetting their values.
   */
  function clearFilters() {
    filters.searchQuery = "";
    filters.selectedRating = "";
    filters.specialOffer = false;
    filters.price = 0;
    currentPage.value = 1;
  }

  function setCurrentPage(page: number) {
    currentPage.value = page;
  }

  return {
    activitiesResult,
    setActivitiesResult,
    filters,
    clearFilters,
    setFilters,
    currentPage,
    setCurrentPage,
  };
});
