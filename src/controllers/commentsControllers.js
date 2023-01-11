import { insertComment } from "../repositories/commentsRepository.js";

export async function create(req, res) {
    const { post_id, user_id, comment } = req.body;

    try {
        await insertComment(post_id, user_id, comment);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
