import joi from "joi";

export const likesPostModel = joi.object({
    postId: joi.number().required()
});