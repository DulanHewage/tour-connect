import Joi from "joi";

export const fetchActivitiesSchema = Joi.object({
  rating: Joi.number().min(0).max(5),
  specialOffer: Joi.boolean(),
  q: Joi.string(),
  activityIds: Joi.string(),
  priceRange: Joi.string().pattern(/^\d+,\d+$/),
  page: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1).max(100),
});
