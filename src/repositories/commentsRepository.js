import connectionDB from "../database/database.js";

export async function insertComment(postId, userId, comment) {
    return connectionDB.query(
        `INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3);`,
        [postId, userId, comment]
    );
}
