import {
  deletePost,
  findPost,
  getPosts,
  insertPost,
  updatePost,
} from "../repositories/timelineRepository.js";
import { hashtagsRepository } from "../repositories/hashtagsRepository.js";

export async function timelinePost(req, res) {
  const userId = req.user;
  const linkId = req.linkId;
  const description = req.description;

  try {
    const { rows } = await insertPost(userId, linkId, description);

    if (description.length > 1) {
      const postId = rows[0].id;
      const words = description.split(" ");

      const hashtags = words.filter(
        element =>
          element[0] === "#" && element.length > 1 && /^[a-zA-Z0-9_]+$/.test(element[1])
      );

      for (let hashtag of hashtags) {
        hashtag = hashtag.substring(1);
        await hashtagsRepository.insertHashtagsPost(postId, hashtag);
      };
    }

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

export async function updateTimelinePost(req, res) {
  const userId = req.user;
  const { id } = req.params;
  const { description } = req.body;
  try {
    const { rows } = await findPost(id);
    const [post] = rows;
    if (!post) {
      res.status(404).send({ message: "The post doesn't exist!" });
      return;
    }
    if (post.user_id !== userId) {
      res
        .status(401)
        .send({ message: "The post does not belong to this user!" });
      return;
    }
    await updatePost(id, description);
    res.status(200).send({ message: "The post has been updated!" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteTimelinePost(req, res) {
  const userId = req.user;
  const { id } = req.params;
  const { description } = req.body;
  try {
    const { rows } = await findPost(id);
    const [post] = rows;
    if (!post) {
      res.status(404).send({ message: "The post doesn't exist!" });
      return;
    }
    if (post.user_id !== userId) {
      res
        .status(401)
        .send({ message: "The post does not belong to this user!" });
      return;
    }
    await deletePost(id, description);
    res.status(200).send({ message: "The post has been deleted!" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
