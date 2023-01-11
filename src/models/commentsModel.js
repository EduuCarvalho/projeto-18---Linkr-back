import joi from "joi";

export const commentsPostModel = joi.object({
    "post_id": joi.number().integer().strict().min(1).required(),
    "user_id": joi.number().integer().strict().min(1).required(),
    "comment": joi.string().required()
});
