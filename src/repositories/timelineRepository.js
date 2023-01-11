import connectionDB from "../database/database.js";
import urlMetadata from 'url-metadata';

export async function insertPost(userId, linkId, description) {
    return connectionDB.query(`
        INSERT INTO posts (user_id, link_id, description)
        VALUES ($1, $2, $3)
        RETURNING id
    `,
        [userId, linkId, description]
    );
}

export async function getPosts(ref) {
    const completePosts = [];

    const posts = await connectionDB.query(`
        SELECT p.id, p.description,
            u.name, u.picture_url, u.id as "ownerId",
            l.url,
            COALESCE(s.user_id, NULL) as "who_shared_id", COUNT(s.post_id) as shares
        FROM posts as p
            JOIN users as u
                ON p.user_id = u.id
            JOIN links as l
                ON p.link_id = l.id
            LEFT JOIN shares as s
                ON s.post_id = p.id
        WHERE u.id = s.user_id OR s.user_id IS NULL AND p.id < $1
        GROUP BY p.id, u.id, s.user_id, l.url
        ORDER BY id DESC
        LIMIT 10
    `,
        [ref]
    );

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

        await urlMetadata(posts.rows[i].url).then(response => {
            completePosts.push({
                ...posts.rows[i],
                linkTitle: response.title,
                linkDescription: response.description,
                linkImg: response.image,
                likes: [...postLikes]
            });
        }
        );
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

    return (await countPosts).rows[0]
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