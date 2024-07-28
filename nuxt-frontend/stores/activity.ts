import type { Activity, ActivityFilter } from "../types/index";
export const useActivityStore = defineStore("activity", () => {
  const activities = ref<Activity[]>([]);
  const filters = reactive<ActivityFilter>({
    selectedRating: "",
    specialOffer: false,
    price: 0,
  });

  /**
   * Sets the activities array to a new array of activities.
   * @param newActivities - An array of Activity objects or null.
   */
  function setActivities(newActivities: Activity[] | null) {
    if (newActivities && newActivities.length)
      activities.value = [...newActivities];
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
    activities,
    setActivities,
    filters,
    clearFilters,
  };
});
