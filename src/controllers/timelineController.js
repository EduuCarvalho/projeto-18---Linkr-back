import { getPosts, insertPost } from "../repositories/timelineRepository.js";

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

export async function getTimelinePosts(req, res, next) {
    try {
        const posts = await getPosts();

        return res.send(posts).status(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}