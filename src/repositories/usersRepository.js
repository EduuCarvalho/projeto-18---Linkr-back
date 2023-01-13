import urlMetadata from "url-metadata";
import connectionDB from "../database/database.js";
import { findWhoShared } from "./sharingRepository.js";

export function searchUsers(userId, pattern) {
  return connectionDB.query(
    `SELECT
      u.id,
      u.name,
      u.picture_url,
      COALESCE(f.* IS NOT NULL, true) AS is_following
    FROM users u
    LEFT JOIN following f ON f.follower_id = $1 AND f.user_id = u.id
    WHERE LOWER(name) LIKE LOWER($2)
    ORDER BY is_following DESC`,
    [userId, pattern + "%"]
  );
}

export function selectUser(id) {
  return connectionDB.query(
    'SELECT id, name, "picture_url" FROM users WHERE id = $1',
    [id]
  );
}

export async function selectUserPosts(userId, ref) {
  const completePosts = [];

  const posts = await connectionDB.query(`
        SELECT p.id, p.description,
            u.name, u.picture_url, u.id as "ownerId",
            l.url,
            COALESCE(s.user_id, NULL) as "who_shared_id"
        FROM posts as p
            JOIN users as u
                ON p.user_id = u.id
            JOIN links as l
                ON p.link_id = l.id
            LEFT JOIN shares as s
                ON s.post_id = p.id
        WHERE p.id < $2 AND u.id = $1
        GROUP BY p.id, u.id, s.user_id, l.url
        ORDER BY id DESC
        LIMIT 10
    `, [userId, ref]);

  const { rows: whoSharedList } = await findWhoShared();
  const whoSharedHash = {};
  for (let i = 0; i < whoSharedList.length; i++) {
    whoSharedHash[whoSharedList[i]["who_shared_id"]] =
      whoSharedList[i]["who_shared_name"];
  }

  posts.rows.forEach((post) => {
    if (post["who_shared_id"] === null) post["who_shared_name"] = null;
    else
      post["who_shared_name"] = whoSharedHash[post["who_shared_id"]]
        ? whoSharedHash[post["who_shared_id"]]
        : null;
  });

  const likes = await connectionDB.query(`
        SELECT u.name, 
            l.post_id
        FROM likes as l
            JOIN users as u
                ON l.user_id = u.id
    `);

  for (let i = 0; i < posts.rows.length; i++) {
    const postLikes = [];

    if (likes.rowCount > 0) {
      for (let j = 0; j < likes.rows.length; j++) {
        if (posts.rows[i].id === likes.rows[j].post_id) {
          postLikes.push(likes.rows[j].name);
        }
      }
    }

    await urlMetadata(posts.rows[i].url).then((response) => {
      completePosts.push({
        ...posts.rows[i],
        linkTitle: response.title,
        linkDescription: response.description,
        linkImg: response.image,
        likes: [...postLikes],
      });
    });
  }

  return completePosts;
}