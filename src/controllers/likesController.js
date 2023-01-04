import { insertLike } from "../repositories/likesRepository.js";

export async function postLike(req, res) {
    const { postId } = req.body;
    const userId = req.user;

    try {
        await insertLike(postId, userId);

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}