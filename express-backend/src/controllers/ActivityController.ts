import { Request, Response } from "express";
import ActivityService from "../services/ActivityService.js";
import {
  handleErrorResponse,
  commaSeparatedStringToArray,
} from "../helpers/index.js";
import { FetchActivitiesParams } from "../../../shared/types/index.js";
import { fetchActivitiesSchema } from "../validations/activityValidations.js";

const activityService = new ActivityService();

class ActivityController {
  /**
   * Fetches and returns activities based on the provided query parameters.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves with no value, indicating the operation's completion.
   *
   */
  static async fetchActivities(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = fetchActivitiesSchema.validate(req.query);

      if (error) {
        throw new Error(`Invalid input: ${error.details[0].message}`);
      }

      const fetchActivitiesParams: FetchActivitiesParams =
        ActivityController.buildFetchActivitiesParams(value);

      const activities = await activityService.fetchActivities(
        fetchActivitiesParams
      );
      res.status(200).json(activities);
    } catch (error) {
      if (error instanceof Error) {
        handleErrorResponse(error, res, 400);
      } else {
        handleErrorResponse("An unexpected error occurred", res);
      }
    }
  }

  /**
   * Builds the FetchActivitiesParams object from the request query parameters.
   *
   * @param {Request} req - The request object containing query parameters.
   * @returns {FetchActivitiesParams} The constructed FetchActivitiesParams object.
   */
  private static buildFetchActivitiesParams(query: any): FetchActivitiesParams {
    console.log("query", query);
    const fetchActivitiesParams: FetchActivitiesParams = {
      rating: query.rating ? Number(query.rating) : undefined,
      specialOffer: query.specialOffer,
      q: query.q,
      page: query.page ? Number(query.page) : undefined,
      pageSize: query.pageSize ? Number(query.pageSize) : undefined,
    };

    if (query.activityIds) {
      fetchActivitiesParams.activityIds = commaSeparatedStringToArray(
        query.activityIds
      );
    }

    if (query.priceRange) {
      const [minPrice, maxPrice] = query.priceRange.split(",").map(Number);
      fetchActivitiesParams.priceRange = [minPrice, maxPrice];
    }

    return fetchActivitiesParams;
  }
}

export default ActivityController;
