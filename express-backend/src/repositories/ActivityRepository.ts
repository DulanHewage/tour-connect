import mongoose from "mongoose";
import { ActivityModel } from "../models/ActivityModel.js";
import {
  Activity,
  FetchActivitiesParams,
  Pagination,
} from "../../../shared/types/index.js";

class ActivityRepository {
  async findActivities(
    params: FetchActivitiesParams
  ): Promise<{ activities: Activity[]; pagination: Pagination }> {
    const aggregateOptions: mongoose.PipelineStage[] = [
      {
        $lookup: {
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "supplier",
        },
      },
    ];

    const matchQuery = this.buildMatchQuery(params);
    if (Object.keys(matchQuery).length > 0) {
      aggregateOptions.push({ $match: matchQuery });
    }

    this.applySorting(aggregateOptions, params);

    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const skip = (page - 1) * pageSize;

    aggregateOptions.push({ $skip: skip });
    aggregateOptions.push({ $limit: pageSize });

    const activities = await ActivityModel.aggregate(aggregateOptions);

    activities.forEach((activity) => {
      activity.supplier = activity.supplier[0];
    });

    const totalItems = await ActivityModel.countDocuments(matchQuery);
    const totalPages = Math.ceil(totalItems / pageSize);

    const pagination: Pagination = {
      totalItems,
      currentPage: page,
      totalPages,
      pageSize,
    };

    return { activities, pagination };
  }

  private buildMatchQuery(
    params: FetchActivitiesParams
  ): mongoose.FilterQuery<any> {
    const matchQuery: mongoose.FilterQuery<any> = {};
    if (params.q !== undefined) {
      matchQuery.title = { $regex: params.q, $options: "i" };
    } else if (params.activityIds?.length) {
      matchQuery._id = {
        $in: params.activityIds.map((id) => new mongoose.Types.ObjectId(id)),
      };
    } else if (params.rating !== undefined) {
      matchQuery.rating = { $gte: params.rating };
    } else if (params.specialOffer !== undefined) {
      matchQuery.specialOffer = params.specialOffer;
    } else if (params.priceRange?.length === 2) {
      const [minPrice, maxPrice] = params.priceRange;
      matchQuery.price = { $gte: minPrice, $lte: maxPrice };
    }
    return matchQuery;
  }

  private applySorting(
    aggregateOptions: mongoose.PipelineStage[],
    params: FetchActivitiesParams
  ) {
    if (params.rating !== undefined) {
      aggregateOptions.push({
        $sort: {
          rating: -1,
        },
      });
    } else if (params.priceRange?.length === 2) {
      aggregateOptions.push({
        $sort: {
          price: 1,
        },
      });
    }
  }
}

export default ActivityRepository;
