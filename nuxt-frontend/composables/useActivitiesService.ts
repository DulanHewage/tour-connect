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
  const pagination = ref<Pagination | null>(null);
  /**
   * Fetches activities based on the current search filters.
   * @returns {Promise<{ activities: Ref<Activity[]>; pagination: Pagination | null; error: any; status: any; refresh: any }>}
   */
  const getActivities = async (filters: ActivityFilter) => {
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
        if (filters.currentPage) {
          query["page"] = filters.currentPage;
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
    const { activitiesResult } = useActivityStore();

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

  return { getActivities, getActivityById, activities, pagination };
};
