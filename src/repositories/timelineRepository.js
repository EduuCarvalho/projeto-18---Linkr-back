import connectionDB from "../database/database.js";

export async function insertPost(userId, linkId, description) {
    return connectionDB.query(`
        INSERT INTO posts (user_id, link_id, description)
        VALUES ($1, $2, $3)
    `,
        [userId, linkId, description]
    );
}

export async function getPosts() {
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
        ORDER BY id DESC
        LIMIT 20
    `);

    const likes = await connectionDB.query(`
        SELECT u.name, 
            l.post_id
        FROM likes as l
            JOIN users as u
                ON l.user_id = u.id
    `);

    posts.rows.map((item) => {
        const postLikes = [];

        if (likes.rowCount > 0) {
            for (let i = 0; i < likes.rows.length; i++) {
                if (item.id === likes.rows[i].post_id) {
                    
                    postLikes.push(likes.rows[i].name);
                }
            }
        }

        completePosts.push({ ...item, likes: [...postLikes] });
    });

    return completePosts;
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