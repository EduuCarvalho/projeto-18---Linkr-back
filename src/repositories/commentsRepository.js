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
