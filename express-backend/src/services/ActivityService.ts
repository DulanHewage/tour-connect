import {
  Activity,
  FetchActivitiesParams,
  JSONResponse,
  ActivityStats,
} from "../../../shared/types/index.js";
import { createJSONResponse, handleErrorResponse } from "../helpers/index.js";
import ActivityRepository from "../repositories/ActivityRepository.js";
import NodeCache from "node-cache";
import { ActivityModel } from "../models/ActivityModel.js";
import { Request, Response } from "express";

class ActivityService {
  private activityRepository: ActivityRepository;
  private cache: NodeCache;

  constructor() {
    this.activityRepository = new ActivityRepository();
    this.cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes
  }

  async fetchActivities(
    params: FetchActivitiesParams = {}
  ): Promise<JSONResponse<Activity[]>> {
    try {
      const cacheKey = this.generateCacheKey(params);
      const cachedResult = this.cache.get<JSONResponse<Activity[]>>(cacheKey);

      if (cachedResult) {
        return cachedResult;
      }

      const { activities, pagination } =
        await this.activityRepository.findActivities(params);
      const result = createJSONResponse(activities, pagination);

      this.cache.set(cacheKey, result);
      return result;
    } catch (error: any) {
      console.error("Error fetching activities:", error);
      throw new Error("Failed to fetch activities. " + error.message);
    }
  }
  async getActivityStats(_: Request, res: Response): Promise<ActivityStats> {
    const stats = await ActivityModel.aggregate([
      {
        $group: {
          _id: null,
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
        },
      },
    ]);
    if (stats.length > 0) {
      const activityStats: ActivityStats = {
        maxPrice: stats[0].maxPrice,
        minPrice: stats[0].minPrice,
      };
      return activityStats;
    } else {
      throw new Error("No activities found");
    }
  }

  private generateCacheKey(params: FetchActivitiesParams): string {
    return `activities_${JSON.stringify(params)}`;
  }
}

export default ActivityService;
