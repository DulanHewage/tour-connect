import { Request, Response } from "express";
import ActivityService from "../services/ActivityService.js";
import {
  handleErrorResponse,
  commaSeperatedStringToArray,
} from "../helpers/index.js";
import { FetchActivitiesParams } from "../../../shared/types/index.js";
const activityService = new ActivityService();

class ActivityController {
  /**
   * Fetches and returns activities based on the provided ID in the request parameters.
   * If no ID is provided, returns all activities.
   *
   * @param {Request} req - The request object, potentially containing an 'id' parameter to specify the activity to fetch.
   * @param {Response} res - The response object used to send the fetched data or an error message.
   * @returns {Promise<void>} A promise that resolves with no value, indicating the operation's completion.
   *                          The actual activities are sent back in the response body.
   */
  static async fetchActivities(req: Request, res: Response): Promise<void> {
    try {
      const fetchActivitiesParams: FetchActivitiesParams = {
        rating: req.query.rating ? Number(req.query.rating) : undefined,
        specialOffer: req.query.specialOffer === "true" ? true : undefined,
        q: req.query.q as string,
      };

      if (typeof req.query.activityIds === "string") {
        fetchActivitiesParams.activityIds = commaSeperatedStringToArray(
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

      const activities = await activityService.fetchActivities(
        fetchActivitiesParams
      );
      res.status(200).json(activities);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  }
}

export default ActivityController;
