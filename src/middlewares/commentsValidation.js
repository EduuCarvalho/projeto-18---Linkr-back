import { commentsPostModel } from "../models/commentsModel.js";
import connectionDB from "../database/database.js";

export async function commentsPostValidation(req, res, next) {
    const { error } = commentsPostModel.validate(req.body, { abortEarly: false });

    if (error) return res.status(422).send(error.details.map(detail => detail.message));

    try {
        const postExists = await connectionDB.query(
            `SELECT * 
            FROM posts
            WHERE id = $1;`,
            [post_id]
        );

        if (postExists.rowCount === 0) return res.status(404).send("Post doesn't exist");

        const userExists = await connectionDB.query(
            `SELECT * 
            FROM user
            WHERE id = $1;`,
            [user_id]
        );

        if (userExists.rowCount === 0) return res.status(404).send("User doesn't exist");
    } catch (err) {
        res.status(500).send(err.message);
    }

    next();
}
