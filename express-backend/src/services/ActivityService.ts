import {
  Activity,
  FetchActivitiesParams,
  JSONResponse,
  Pagination,
} from "../../../shared/types/index.js";
import { createJSONResponse } from "../helpers/index.js";
import { ActivityModel } from "../models/ActivityModel.js";
import { SupplierModel } from "../models/SupplierModel.js";
import mongoose from "mongoose";

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
      const activity: Activity | null = await ActivityModel.findOne();
      console.log("activity supplier id: ", activity?.supplierId); // Check the value and type of supplierId

      const supplier = await SupplierModel.findOne({
        _id: activity?.supplierId,
      });
      console.log("selected supplier", supplier); // checked: outputs correcly

      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      console.log(collections); // checked, collection names is correct.

      // const activities = (await ActivityModel.find({})) as Activity[];
      const activities = await ActivityModel.aggregate([
        {
          $lookup: {
            from: "suppliers", // The name of the Supplier collection
            localField: "supplierId",
            foreignField: "_id",
            as: "supplierDetails",
          },
        },
      ]);

      // console.log("activities", activities);

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
    ids: string[]
  ): Array<Activity> {
    return activities.filter((activity) => ids.includes(activity._id));
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
