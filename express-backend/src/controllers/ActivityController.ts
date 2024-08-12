import { Request, Response } from "express";
import ActivityService from "../services/ActivityService.js";
import {
  handleErrorResponse,
  commaSeparatedStringToArray,
} from "../helpers/index.js";
import { FetchActivitiesParams } from "../../../shared/types/index.js";

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
      const fetchActivitiesParams: FetchActivitiesParams =
        ActivityController.buildFetchActivitiesParams(req);

      const activities = await activityService.fetchActivities(
        fetchActivitiesParams
      );
      res.status(200).json(activities);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  }

  /**
   * Builds the FetchActivitiesParams object from the request query parameters.
   *
   * @param {Request} req - The request object containing query parameters.
   * @returns {FetchActivitiesParams} The constructed FetchActivitiesParams object.
   */
  private static buildFetchActivitiesParams(
    req: Request
  ): FetchActivitiesParams {
    const fetchActivitiesParams: FetchActivitiesParams = {
      rating: req.query.rating ? Number(req.query.rating) : undefined,
      specialOffer: req.query.specialOffer === "true" ? true : undefined,
      q: req.query.q as string,
    };

    if (typeof req.query.activityIds === "string") {
      fetchActivitiesParams.activityIds = commaSeparatedStringToArray(
        req.query.activityIds
      );
    }
    if (typeof req.query.priceRange === "string") {
      const priceRange = req.query.priceRange.split(",").map(Number);
      if (priceRange.length === 2) {
        fetchActivitiesParams.priceRange = [priceRange[0], priceRange[1]];
      }
    }
    if (typeof req.query.page === "string") {
      fetchActivitiesParams.page = Number(req.query.page);
    }
    if (typeof req.query.pageSize === "string") {
      fetchActivitiesParams.pageSize = Number(req.query.pageSize);
    }

    return fetchActivitiesParams;
  }
}

export default ActivityController;
