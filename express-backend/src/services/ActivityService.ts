import {
  Activity,
  FetchActivitiesParams,
  JSONResponse,
  Pagination,
} from "../../../shared/types/index.js";
import { createJSONResponse } from "../helpers/index.js";
import ActivityRepository from "../repositories/ActivityRepository.js";

class ActivityService {
  private activityRepository: ActivityRepository;

  constructor() {
    this.activityRepository = new ActivityRepository();
  }

  async fetchActivities(
    params: FetchActivitiesParams = {}
  ): Promise<JSONResponse<Activity[]>> {
    try {
      const { activities, pagination } =
        await this.activityRepository.findActivities(params);
      return createJSONResponse(activities, pagination);
    } catch (error: any) {
      console.error("Error fetching activities:", error);
      throw new Error("Failed to fetch activities. " + error.message);
    }
  }
}

export default ActivityService;
