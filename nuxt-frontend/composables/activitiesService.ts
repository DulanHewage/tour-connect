import type {
  Activity,
  Supplier,
  ActivityFilter,
  SearchQuery,
  JSONResponse,
  Pagination,
} from "../../shared/types";

export const useActivityService = () => {
  const { apiBase } = useAPIBase();

  const suppliers = ref<Supplier[] | []>([]);
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
        return await Promise.all([
          $fetch<JSONResponse<Supplier[]>>(`${apiBase}/suppliers`),
          $fetch<JSONResponse<Activity[]>>(`${apiBase}/activities`, {
            query: query,
          }),
        ]);
      }
    );
    let pagination: Pagination | null = null;
    // sets the suppliers & activities state
    if (data.value) {
      if (data.value[0]) suppliers.value = data.value[0].result;
      if (data.value[1]) {
        activities.value = data.value[1].result;
        pagination = data.value[1].metadata?.pagination || null;
      }
    }

    activities.value = activities.value.map((activity: Activity) => {
      let supplier: Supplier | null = null;
      if (activity.supplier) {
        suppliers.value.find((supplier) => supplier.id === activity.supplierId);
      }
      return { ...activity, supplier };
    });

    return { activities, pagination, error, status, refresh };
  };
  const getActivityById = async (id: number) => {
    let activity = activities.value.find(
      (activity: Activity) => activity.id === id
    );
    if (!activity) {
      const { data } = await useAsyncData<Activity[]>(
        "activity",
        async () => await $fetch(`${apiBase}/activities/${id}`)
      );
      if (data.value && data.value[0]) {
        activity = data.value[0];
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
