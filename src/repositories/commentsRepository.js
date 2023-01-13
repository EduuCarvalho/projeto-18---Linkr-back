import connectionDB from "../database/database.js";

export async function deleteAllCommentsPost(postId) {
    return connectionDB.query(
        `DELETE FROM comments WHERE post_id = $1;`,
        [postId]
    );
}

export async function insertComment(postId, userId, comment) {
    return connectionDB.query(
        `INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3);`,
        [postId, userId, comment]
    );
}

export async function selectComments(userId, postId) {
    return connectionDB.query(
        `SELECT
            c.id AS comment_id,
            u.picture_url AS user_picture_url, 
            u.name AS user_name,
            c.comment,
            COALESCE(p.user_id = u.id, true) AS author_post,
            COALESCE(f.* IS NOT NULL, true) AS is_following
        FROM comments c
        JOIN users u ON u.id = c.user_id
        JOIN posts p ON p.id = c.post_id
        LEFT JOIN following f ON f.follower_id = $1 AND c.user_id = f.user_id
        WHERE c.post_id = $2;`,
        [userId, postId]
    );
}
