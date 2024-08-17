import type {
  Activity,
  ActivityFilter,
  SearchQuery,
  JSONResponse,
  Pagination,
} from "../../shared/types";

export const useActivityService = () => {
  const { apiBase } = useAPIBase();
  const activities = ref<Activity[] | []>([]);
  const searchFilters = ref<ActivityFilter>({
    searchQuery: "",
    price: 0,
    selectedRating: 0,
    specialOffer: false,
  });

  const getActivities = async () => {
    const { data, error, status, refresh } = await useAsyncData(
      "activity-grid",
      async () => {
        const query: SearchQuery = {};
        if (searchFilters.value.searchQuery) {
          query["q"] = searchFilters.value.searchQuery;
        }
        return $fetch<JSONResponse<Activity[]>>(`${apiBase}/activities`, {
          query: query,
        });
      }
    );
    let pagination: Pagination | null = null;
    // sets the suppliers & activities state
    if (data.value) {
      activities.value = data.value.result;
      pagination = data.value.metadata?.pagination || null;
    }

    return { activities, pagination, error, status, refresh };
  };
  const getActivityById = async (id: string): Promise<Activity | undefined> => {
    let activity = activities.value.find(
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
  const debouncedGetActivities = useDebounceFn(async () => {
    await getActivities();
  }, 500);

  watch(searchFilters.value, async () => {
    await debouncedGetActivities();
  });

  return { getActivities, getActivityById, searchFilters };
};
