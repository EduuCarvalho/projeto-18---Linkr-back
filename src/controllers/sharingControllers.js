import { insertSharing } from "../repositories/sharingRepository";
import { findPost } from "../repositories/timelineRepository";

export async function postSharing(req, res) {
  const userId = req.user;
  const { id } = req.params;

  try {
    const { rows } = await findPost(id);
    const [post] = rows;
    if (!post) {
      res.status(404).send({ message: "The post doesn't exist!" });
      return;
    }

    await insertSharing(userId, post.id);

    res.status(200).send({ message: "The post has been shared!" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
