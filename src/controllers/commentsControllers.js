import { insertComment, selectComments } from "../repositories/commentsRepository.js";

export async function create(req, res) {
    const { post_id, user_id, comment } = req.body;

    try {
        await insertComment(post_id, user_id, comment);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findById(req, res) {
    const { id } = req.params;

    try {
        const { rows } = await selectComments(req.user, id);

        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
