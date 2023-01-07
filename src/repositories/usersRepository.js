import urlMetadata from "url-metadata";
import connectionDB from "../database/database.js";

export function searchUsers(pattern) {
  return connectionDB.query(
    'SELECT id, name, "picture_url" FROM users WHERE name LIKE $1',
    [pattern + "%"]
  );
}

export function selectUser(id) {
  return connectionDB.query(
    'SELECT id, name, "picture_url" FROM users WHERE id = $1',
    [id]
  );
}

export async function selectUserPosts(userId) {
  const completePosts = [];

  const posts = await connectionDB.query(`
        SELECT p.id, p.description,
            u.name, u.picture_url,
            l.url
        FROM posts as p
            JOIN users as u
                ON p.user_id = u.id
            JOIN links as l
                on p.link_id =l.id
        WHERE u.id = $1
        ORDER BY id DESC
    `, [userId]);

  const likes = await connectionDB.query(`
        SELECT u.name, 
            l.post_id
        FROM likes as l
            JOIN users as u
                ON l.user_id = u.id
        WHERE u.id = $1
    `, [userId]);

  for (let i = 0; i < posts.rows.length; i++) {
    const postLikes = [];

    if (likes.rowCount > 0) {
      for (let i = 0; i < likes.rows.length; i++) {
        if (posts.rows[i].id === likes.rows[i].post_id) {
          postLikes.push(likes.rows[i].name);
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
