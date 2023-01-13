import connectionDB from "../database/database.js";
import urlMetadata from "url-metadata";
import { findWhoShared } from "./sharingRepository.js";

export async function insertPost(userId, linkId, description) {
  return connectionDB.query(
    `
        INSERT INTO posts (user_id, link_id, description)
        VALUES ($1, $2, $3)
        RETURNING id
    `,
    [userId, linkId, description]
  );
}
export async function getPosts(ref, userId) {
    const completePosts = [];

  const posts = await connectionDB.query(`
        SELECT p.id, p.description,
            u.name, u.picture_url, u.id as "ownerId",
            l.url,
            COALESCE(s.user_id, NULL) as "who_shared_id",
            COALESCE(COUNT(c.id), 0) as "total_comments",
            COALESCE(
                json_agg(
                    json_build_object(
                      'comment_id', c.id,
                      'user_picture_url', un.picture_url, 
                      'user_name', un.name,
                      'comment', c.comment,
                      'author_post', COALESCE(u.id = un.id, true)
                    )
                ) FILTER (WHERE c.* IS NOT NULL),
                '[]'
            ) as "comments"
        FROM posts as p
            JOIN users as u
                ON p.user_id = u.id
            JOIN links as l
                ON p.link_id = l.id
            LEFT JOIN shares as s
                ON s.post_id = p.id
            LEFT JOIN comments c
                ON c.post_id = p.id
            LEFT JOIN following f
                ON p.user_id = f.user_id
            LEFT JOIN users un ON c.user_id = u.id
        WHERE p.id < $1 AND (f.follower_id = $2)
        GROUP BY p.id, u.id, s.user_id, l.url
        ORDER BY id DESC
        LIMIT 10
    `,
        [ref, userId]
    );

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

export async function getCountPosts(postId){
    const countPosts = connectionDB.query(`
        SELECT COUNT(*) AS "recentPosts"
        FROM posts
        WHERE id > $1
    `,
    [postId]
  );

  return (await countPosts).rows[0];
}

export function findPost(post_id) {
  return connectionDB.query("SELECT * FROM posts WHERE id = $1", [post_id]);
}

export function updatePost(post_id, description) {
  return connectionDB.query("UPDATE posts SET description = $1 WHERE id = $2", [
    description,
    post_id,
  ]);
}

export function deletePost(post_id) {
  return connectionDB.query("DELETE FROM posts WHERE id = $1", [post_id]);
}
