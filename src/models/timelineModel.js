import Joi from "joi";

export const timelinePostModel = Joi.object({
    url: Joi.string().required(),
    description: Joi.string().required().allow("")
});