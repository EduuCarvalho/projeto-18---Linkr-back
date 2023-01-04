import connectionDB from "../database/database.js";

export async function insertLike(postId, userId) {
    return connectionDB.query(`
        INSERT INTO likes (post_id, user_id)
        VALUES ($1, $2)
    `,
        [postId, userId]
    );
}