import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  Activity,
  FetchActivitiesParams,
  JSONResponse,
  Pagination,
} from "../../../shared/types/index.js";
import { createJSONResponse } from "../helpers/index.js";

class ActivityService {
  /**
   * Asynchronously fetches specified activitie(s) based on provided filters and returns them.
   * If no filters are provided, returns all activities.
   *
   * @param {FetchActivitiesParams} params An object containing filter parameters.
   * @returns {Promise<Array<Activity>>} A promise that resolves to an array of user activities, filtered by the provided parameters if any.
   * @throws {Error} Throws an error if reading or parsing the file fails.
   */
  async fetchActivities(
    params: FetchActivitiesParams = {}
  ): Promise<JSONResponse<Activity[]>> {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const filePath = path.resolve(__dirname, "../static/activities.json");
      const fileContent = await fs.readFile(filePath, "utf8");
      const activities: Array<Activity> = JSON.parse(fileContent);

      let filteredActivities = activities;
      const pagination: Pagination = {
        totalItems: activities.length,
      };
      if (params.activityIds?.length) {
        filteredActivities = this.filterByIds(
          filteredActivities,
          params.activityIds
        );
      }

      if (params.rating !== undefined) {
        filteredActivities = this.filterByRating(
          filteredActivities,
          params.rating
        );
      }

      if (params.specialOffer !== undefined) {
        filteredActivities = this.filterBySpecialOffer(
          filteredActivities,
          params.specialOffer
        );
      }

      if (params.priceRange?.length === 2) {
        filteredActivities = this.filterByPriceRange(
          filteredActivities,
          params.priceRange
        );
      }

      if (params.q !== undefined) {
        filteredActivities = this.filterByTitle(filteredActivities, params.q);
      }

      return createJSONResponse(filteredActivities, pagination);
    } catch (error: any) {
      throw new Error("Failed to fetch activities. " + error.message);
    }
  }

  private filterByIds(
    activities: Array<Activity>,
    ids: number[]
  ): Array<Activity> {
    return activities.filter((activity) => ids.includes(activity.id));
  }

  private filterByRating(
    activities: Array<Activity>,
    rating: number
  ): Array<Activity> {
    return activities.filter((activity: Activity) => {
      if (rating) {
        const selectedRating =
          typeof rating === "string" ? parseInt(rating) : rating;
        return Math.round(activity.rating) >= selectedRating;
      }
      return true;
    });
  }

  private filterBySpecialOffer(
    activities: Array<Activity>,
    specialOffer: boolean
  ): Array<Activity> {
    return activities.filter(
      (activity) => activity.specialOffer === specialOffer
    );
  }

  private filterByPriceRange(
    activities: Array<Activity>,
    priceRange: [number, number]
  ): Array<Activity> {
    const [minPrice, maxPrice] = priceRange;
    return activities.filter(
      (activity) => activity.price >= minPrice && activity.price <= maxPrice
    );
  }

  private filterByTitle(
    activities: Array<Activity>,
    title: string
  ): Array<Activity> {
    const lowerCaseTitle = title.toLowerCase();
    return activities.filter((activity) =>
      activity.title.toLowerCase().includes(lowerCaseTitle)
    );
  }
}

export default ActivityService;
