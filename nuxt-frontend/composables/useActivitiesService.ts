import type {
  Activity,
  ActivityFilter,
  FetchActivitiesParams,
  JSONResponse,
  Pagination,
} from "../../shared/types";

import { useActivityStore } from "@/stores/activityStore";
export const useActivityService = () => {
  const { apiBase } = useAPIBase();
  const activities = ref<Activity[] | []>([]);
  const { activitiesResult } = useActivityStore();
  const pagination = ref<Pagination | null>(null);
  /**
   * Fetches activities based on the current search filters and updates the activities and pagination state.
   *
   * @param {ActivityFilter} filters - The filters to apply to the activity search.
   * @param {number} currentPage - The current page number for pagination.
   * @returns {Promise<{
   *   error: any;
   *   status: any;
   *   refresh: any
   * }>} - An object containing the error, status, and refresh function.
   */
  const setActivities = async (
    filters: ActivityFilter,
    currentPage: number
  ) => {
    activities.value = [];
    const { data, error, status, refresh } = await useAsyncData(
      "activity-grid",
      async () => {
        const query: FetchActivitiesParams = {};
        if (filters.searchQuery) {
          query["q"] = filters.searchQuery;
        }
        if (filters.specialOffer) {
          query["specialOffer"] = filters.specialOffer;
        }
        if (currentPage) {
          query["page"] = currentPage;
        }
        if (filters.pageSize) {
          query["pageSize"] = filters.pageSize;
        }
        return $fetch<JSONResponse<Activity[]>>(`${apiBase}/activities`, {
          query: query,
        });
      }
    );
    // sets the suppliers & activities state
    if (
      data.value &&
      data.value.result?.length &&
      data.value.metadata?.pagination
    ) {
      activities.value = [...data.value.result];
      pagination.value = { ...data.value.metadata.pagination };
    }

    return { error, status, refresh };
  };

  /**
   * Fetches an activity by its ID.
   * @param {string} id - The ID of the activity to fetch.
   * @returns {Promise<Activity | undefined>} The activity if found, otherwise undefined.
   */
  const getActivityById = async (id: string): Promise<Activity | undefined> => {
    let activity = activitiesResult.find(
      (activity: Activity) => activity._id === id
    );
    if (!activity) {
      const { data } = await useAsyncData(
        "activity",
        async () =>
          await $fetch<JSONResponse<Activity[]>>(`${apiBase}/activities`, {
            query: { activityIds: [id] },
          })
      );
      if (data.value) {
        activity = data.value.result[0];
      }
    }
    return activity;
  };

  return { setActivities, getActivityById, activities, pagination };
};
