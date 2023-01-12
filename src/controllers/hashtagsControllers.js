import { selectPostsByHashtag } from "../repositories/hashtagsRepository.js";

export async function findPostsByHashtag(req, res) {
    const { hashtag } = req.params;
    const ref = req.ref;

    try {
        const posts = await selectPostsByHashtag(hashtag, ref);

        res.send({ posts });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
