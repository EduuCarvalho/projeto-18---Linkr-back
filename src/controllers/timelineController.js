import {
  deletePost,
  findPost,
  getCountPosts,
  getPosts,
  insertPost,
  updatePost,
} from "../repositories/timelineRepository.js";
import {
  deleteAllHashtagsPost,
  deleteHashtagsPost,
  insertHashtagsPost,
  selectHashtagsPost
} from "../repositories/hashtagsRepository.js";
import { deleteAllLikesPost } from "../repositories/likesRepository.js";

export async function timelinePost(req, res) {
  const userId = req.user;
  const linkId = req.linkId;
  const description = req.description;

  try {
    const { rows } = await insertPost(userId, linkId, description);

    if (description.length > 1) {
      const postId = rows[0].id;
      const hashtags = description.split(" ").filter(
        element =>
          element[0] === "#" && element.length > 1 && /^[a-zA-Z0-9_]+$/.test(element[1])
      );

      for (const hashtag of hashtags) {
        await insertHashtagsPost(postId, hashtag.substring(1));
      };
    }

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getTimelinePosts(req, res) {
  try {
    const posts = await getPosts();

    return res.send({posts}).status(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getCountTimelinePosts(req, res) {
  const {postId} = req.params;

  try {
    const countPosts = await getCountPosts(postId);

    return res.send(countPosts).status(200);
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

    let hashtagsUpdate = [];

    if (description.length > 1) {
      hashtagsUpdate = description
        .split(" ")
        .filter(
          element =>
            element[0] === "#" && element.length > 1 && /^[a-zA-Z0-9_]+$/.test(element[1])
        )
        .map(hashtag => hashtag.substring(1));
    }

    const hashtagsPrevious = await selectHashtagsPost(id);

    if (hashtagsPrevious.rowCount) {
      for (const hashtag of hashtagsPrevious.rows) {
        const index = hashtagsUpdate.indexOf(hashtag.name);

        if (index > -1) {
          hashtagsUpdate.splice(index,1);
        } else {
          await deleteHashtagsPost(hashtag.post_hashtags_id);
        }
      }
    }

    for (const hashtag of hashtagsUpdate) {
      await insertHashtagsPost(id, hashtag);
    };

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
    await deleteAllHashtagsPost(id);
    await deleteAllLikesPost(id);
    await deletePost(id, description);
    res.status(200).send({ message: "The post has been deleted!" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}