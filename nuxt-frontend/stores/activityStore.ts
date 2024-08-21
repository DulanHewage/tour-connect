import type { Activity, ActivityFilter } from "../../shared/types";
export const useActivityStore = defineStore("activity", () => {
  const activitiesResult = ref<Activity[]>([]);
  const filters = reactive<ActivityFilter>({
    searchQuery: "",
    selectedRating: "",
    specialOffer: false,
    price: 0,
  });

  /**
   * Sets the activities array to a new array of activities.
   * @param newActivities - An array of Activity objects or null.
   */
  function setActivitiesResult(newActivities: Activity[] | null) {
    if (newActivities && newActivities.length)
      activitiesResult.value = [...newActivities];
  }
  /**
   * Clears all the filters by resetting their values.
   */
  function clearFilters() {
    filters.selectedRating = "";
    filters.specialOffer = false;
    filters.price = 0;
  }

  return {
    activitiesResult,
    setActivitiesResult,
    filters,
    clearFilters,
  };
});
