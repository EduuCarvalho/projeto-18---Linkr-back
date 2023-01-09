import { selectPostsByHashtag } from "../repositories/hashtagsRepository.js";

export async function findPostsByHashtag(req, res) {
    const { hashtag } = req.params;

    try {
        const posts = await selectPostsByHashtag(hashtag);

        res.send({ posts });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
