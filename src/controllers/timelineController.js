import { insertPost } from "../repositories/timelineRepository.js";

export async function timelinePost(req, res) {
    const userId = req.user;
    const linkId = req.linkId;
    const description = req.description;

    try {
        await insertPost(userId, linkId, description);

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}