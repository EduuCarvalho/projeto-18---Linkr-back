import connectionDB from "../database/database.js";
import { likesPostModel } from "../models/timelineModel.js";

export async function postLikeValidation(req, res, next) {
    const userId = req.user;
    const { postId } = req.body;

    const { error } = likesPostModel.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const alreadyLiked = await connectionDB.query(`
            SELECT *
            FROM likes
            WHERE user_id = $1 AND post_id = $2
        `,
            [userId, postId]
        );

        if (alreadyLiked.rowCount !== 0) {
            return res.status(409).send('Post already liked!');
        }

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}